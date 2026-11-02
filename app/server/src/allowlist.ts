// Who may sign in to the development environment (PRD NFR-12, Q-80; contributor/DEPLOYMENT.md).
//
// SIGN_IN_ALLOWLIST holds entries separated by spaces, commas or new lines:
//   google:<email>      a Google account, by its verified email address
//   github:<username>   a GitHub account, by username
//   github-id:<number>  a GitHub account, by its numeric ID, which survives renames
// Production leaves it unset, so everyone can sign in. GITILIZER_ENV=development
// refuses to start without it, so a lost setting can't open the development site.

/** What a sign-in tells us about the person, and what is stored on their account. */
export type SignInIdentity = {
  provider: string;
  /** Google's `sub`, or GitHub's numeric user ID (the stub uses the email or username). */
  providerUserId: string;
  email: string;
  /** Google's `email_verified`. An unverified address never matches a `google:` entry. */
  emailVerified: boolean;
  /** The GitHub username at sign-in (`users.sign_in_login`); null for Google. */
  login: string | null;
};

const GITHUB_LOGIN = /^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/i;

export class Allowlist {
  readonly emails = new Set<string>();
  readonly logins = new Set<string>();
  readonly githubIds = new Set<string>();

  /** Parses the setting. Throws on any malformed entry, rather than skipping it. */
  static parse(text: string): Allowlist {
    const list = new Allowlist();
    const bad: string[] = [];
    for (const entry of text.split(/[\s,]+/).filter(Boolean)) {
      const i = entry.indexOf(":");
      const kind = i < 0 ? "" : entry.slice(0, i).toLowerCase();
      const value = entry.slice(i + 1).trim();
      if (kind === "google" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) list.emails.add(value.toLowerCase());
      else if (kind === "github" && GITHUB_LOGIN.test(value.replace(/^@/, ""))) list.logins.add(value.replace(/^@/, "").toLowerCase());
      else if (kind === "github-id" && /^[1-9][0-9]*$/.test(value)) list.githubIds.add(value);
      else bad.push(entry);
    }
    if (bad.length) {
      throw new Error(`SIGN_IN_ALLOWLIST: can't read ${bad.map((b) => `"${b}"`).join(", ")}. Entries look like google:you@gmail.com, github:octocat or github-id:583231.`);
    }
    return list;
  }

  get size(): number {
    return this.emails.size + this.logins.size + this.githubIds.size;
  }

  allows(who: SignInIdentity): boolean {
    if (who.provider === "github") {
      return this.githubIds.has(who.providerUserId) || (who.login !== null && this.logins.has(who.login.toLowerCase()));
    }
    // Google, and the prototype's development stub, which stands in for it.
    return who.emailVerified && this.emails.has(who.email.toLowerCase());
  }
}

/**
 * Reads SIGN_IN_ALLOWLIST and GITILIZER_ENV. Returns null when everyone may sign in.
 * Throws when the development environment has no list.
 */
export function loadAllowlist(env: Record<string, string | undefined>): Allowlist | null {
  const text = env.SIGN_IN_ALLOWLIST?.trim();
  const list = text ? Allowlist.parse(text) : null;
  if (env.GITILIZER_ENV === "development" && !list?.size) {
    throw new Error("GITILIZER_ENV=development needs SIGN_IN_ALLOWLIST: list the accounts that may sign in (contributor/DEPLOYMENT.md).");
  }
  return list;
}
