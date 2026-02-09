import {
  Bloc,
  Button,
  Footer,
  Layout,
  Navbar,
  ProfileMenu,
  Sidebar,
  useTheme,
} from "@houssemdi2000/design-system";
import { routes } from "../routes/routes";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleDarkMode } = useTheme();
  const isDarkMode = theme.mode === "dark";

  const isAuthenticated = true;

  const Side = () => {
    return (
      <Sidebar
        items={[
          { label: "Overview", icon: "📊", active: false },
          {
            label: "Applications",
            icon: "🌐",
            href: routes.apps,
            active: location.pathname === routes.apps,
          },
          { label: "Configuration", icon: "🛠️" },
          { label: "Reports", icon: "📈" },
        ]}
        isDarkMode={isDarkMode}
      />
    );
  };
  const Nav = () => {
    return (
      <Navbar
        left={<span>⚡ Lockly</span>}
        right={
          <Bloc layout="navbar" padding={0} style={{gap: '10px'}}>
            <Button
              label={isDarkMode ? "Light" : "Dark"}
              onClick={() => toggleDarkMode()}
            />
            <ProfileMenu
              user={{ name: "Houssem Adouani", email: "houssem@email.com" }}
              actions={[
                {
                  label: "Mon profil",
                  onClick: () => console.log("Profile"),
                },
                {
                  label: "Paramètres",
                  onClick: () => console.log("Settings"),
                },
                { divider: true },
                {
                  label: "Déconnexion",
                  danger: true,
                  onClick: () => console.log("Logout"),
                },
              ]}
              isDarkMode={isDarkMode}
            />
          </Bloc>
        }
        isDarkMode={isDarkMode}
      />
    );
  };

  return (
    <Layout
      withFooter
      footer={<Footer fixed isDarkMode={isDarkMode} center="© 2025 – Lockly" />}
      withSidebar={isAuthenticated}
      sidebar={<Side />}
      withHeader
      header={<Nav />}
      isDarkMode={theme.mode === "dark"}
    >
      {children}
    </Layout>
  );
}
