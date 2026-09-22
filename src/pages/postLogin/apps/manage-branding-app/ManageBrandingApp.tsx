import { Bloc, Button, Header, IconButton, Text } from "@houssemdi2000/design-system";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../../routes/routes";
import { FiSave } from "react-icons/fi";


export default function ManageBrandingApp() {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(routes.updateApp(appId ?? ""));
  };

  return (
    <>
      <Header
        isDarkMode
        left={
          <Bloc padding={0} layout="navbar">
            <IconButton
              size="large"
              icon={<FiArrowLeft />}
              onClick={handleBack}
            />
            <Text variant="muted" weight="bold" align="center" children="Manage Branding" />
          </Bloc>
        }
        right={
          <Button variant="primary" size="small" icon={<FiSave />} iconPosition="right" label="Enregistrer" />
        }
      />
    </>
  );
}
