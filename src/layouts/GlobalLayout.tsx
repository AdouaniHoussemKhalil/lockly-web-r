import {
  Footer,
  Layout,
  Navbar,
  ProfileMenu,
  Sidebar,
  useTheme,
} from "@houssemdi2000/design-system";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleDarkMode } = useTheme();
  const isDarkMode = theme.mode === "dark";

  const isAuthenticated = true;

  return (
    <Layout
      withFooter
      footer={<Footer fixed isDarkMode={isDarkMode} center="© 2025 – Lockly" />}
      withSidebar={isAuthenticated}
      sidebar={
        <Sidebar
          items={[
            { label: "Overview", icon: "📊", active: true },
            { label: "Applications", icon: "🌐" },
            { label: "Configuration", icon: "🛠️" },
            { label: "Reports", icon: "📈" },
          ]}
          isDarkMode={isDarkMode}
        />
      }
      withHeader
      header={
        <Navbar
          logo={<span>⚡ Lockly</span>}
          position="left"
          links={[
            { label: "Dashboard", active: true },
            { label: "Documentation" },
            { label: "Settings" },
            { label: "Contact" },
          ]}
          actions={[
            {
              label: isDarkMode ? "Light" : "Dark",
              onClick: () => toggleDarkMode(),
            },
            {
              label: "FR",
            },
            {
              element: (
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
              )
            },
          ]}
          isDarkMode={isDarkMode}
        />
      }
      isDarkMode={theme.mode === "dark"}
    >
      {children}
    </Layout>
  );
}
