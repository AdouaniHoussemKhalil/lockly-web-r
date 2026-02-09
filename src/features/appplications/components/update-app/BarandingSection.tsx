import {
  Bloc,
  Button,
  Grid,
  Input,
  Spacer,
  Text,
} from "@houssemdi2000/design-system";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes/routes";

type props = {
  appId: string;
};

export default function BarandingSection({ appId }: props) {
  const { form, updateField } = useUpdateAppFormContext();
  const navigate = useNavigate();

  const handleManageBranding = () => {
    navigate(routes.updateAppBranding(appId));
  };

  return (
    <Bloc padding={0}>
      <Text isDarkMode variant="title" as="h4">
        Brading
      </Text>
      <Spacer />
      <Bloc padding={0} layout="navbar"></Bloc>
      <Grid
        items={[
          {
            className: "large",
            children: (
              <Input
                label="Email d'envoi"
                value={form.email}
                onChange={(value: string) => updateField("email", value)}
                borderColor="#a29696ff"
                focusBorder="#0e329fff"
                description="Le mail d'envoi utilisé pour les notifications"
                isDarkMode
                showValidationIcon
                isValid={!!form.email.trim()}
              />
            ),
          },
          {
            className: "small",
            span: 12,
            children: (
              <Button
                icon={<FiArrowRight />}
                iconPosition="right"
                mt={15}
                size="small"
                label="Gérer"
                variant="light"
                onClick={handleManageBranding}
              />
            ),
          },
        ]}
      />
      <Spacer />
    </Bloc>
  );
}
