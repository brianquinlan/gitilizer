// Screen selection (PRD NAV-1) and routes (PRD Q-6, assumed).
import { AppBar, Footer } from "./components/Chrome.tsx";
import { ListPage } from "./pages/ListPage.tsx";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { SignInPage } from "./pages/Simple.tsx";
import { WelcomePage } from "./pages/WelcomePage.tsx";
import { useRoute } from "./router.tsx";
import { useStore } from "./store.tsx";

export function App() {
  const { me, signedOut } = useStore();
  const { path } = useRoute();

  if (signedOut || path === "/sign-in") {
    if (signedOut && path !== "/sign-in") history.replaceState(null, "", `/sign-in?next=${encodeURIComponent(path + location.search)}`);
    return <div className="shell"><SignInPage /><Footer /></div>;
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
