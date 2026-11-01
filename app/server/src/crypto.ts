// Credential encryption (design: Security). AES-256-GCM with the user ID as
// associated data, so a ciphertext can't be moved to another user.
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export class CredentialCipher {
  private key: Buffer;

  constructor(base64Key: string) {
    this.key = Buffer.from(base64Key, "base64");
    if (this.key.length !== 32) throw new Error("CREDENTIAL_KEY must be 32 bytes, base64-encoded");
  }

  encrypt(userId: string, plaintext: string): { ciphertext: string; nonce: string } {
    const nonce = randomBytes(12);
    const c = createCipheriv("aes-256-gcm", this.key, nonce);
    c.setAAD(Buffer.from(userId));
    const body = Buffer.concat([c.update(plaintext, "utf8"), c.final(), c.getAuthTag()]);
    return { ciphertext: body.toString("base64"), nonce: nonce.toString("base64") };
  }

  decrypt(userId: string, ciphertext: string, nonce: string): string {
    const body = Buffer.from(ciphertext, "base64");
    const d = createDecipheriv("aes-256-gcm", this.key, Buffer.from(nonce, "base64"));
    d.setAAD(Buffer.from(userId));
    d.setAuthTag(body.subarray(body.length - 16));
    return Buffer.concat([d.update(body.subarray(0, body.length - 16)), d.final()]).toString("utf8");
  }
}
