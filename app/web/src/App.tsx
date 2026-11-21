// Screen selection (PRD NAV-1) and routes (PRD Q-6, assumed).
import { AppBar, Footer } from "./components/Chrome.tsx";
import { ListPage } from "./pages/ListPage.tsx";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { WelcomePage } from "./pages/WelcomePage.tsx";
import { useRoute } from "./router.tsx";
import { useStore } from "./store.tsx";

export function App() {
  const { me, signedOut } = useStore();
  const { path } = useRoute();

  // NAV-10: signed out, for example when the session ended in an open tab: the home page, which brings the
  // developer back here after signing in. There is no sign-in page (AUTH-4).
  if (signedOut) {
    const here = path + location.search;
    location.replace(here === "/" ? "/" : `/?next=${encodeURIComponent(here)}`);
    return <div className="shell" />;
  }
  if (!me) return <div className="shell" />;

  let page;
  if (path.startsWith("/settings")) page = <SettingsPage />;
  else if (me.screen === "welcome") page = <WelcomePage />;
  else if (path.startsWith("/icebox")) page = <ListPage view="icebox" />;
  else page = <ListPage view="prioritized" />;

  return (
    <div className="shell">
      <AppBar />
      <main className="main">{page}</main>
      <Footer />
    </div>
  );
}
