import {
  Bloc,
  Input,
  Text,
  Spacer,
  Tooltip,
  IconButton,
} from "@houssemdi2000/design-system";
import { isValidUrl } from "../../../../shared/appHelpers";
import { FiInfo } from "react-icons/fi";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";



export default function RedirectUrlsSection() {
const { form, updateField } = useUpdateAppFormContext();
    
  return (
    <Bloc padding={0}>
      <Bloc layout="navbar" padding={0}>
        <Text isDarkMode variant="title" as="h4">
          URL de redirection (Principale)
        </Text>
        <Tooltip content="Base URL de redirection" position="left">
          <IconButton
            border
            icon={<FiInfo/>}
            variant="ghost"
            size="small"
          />
        </Tooltip>
      </Bloc>
      <Spacer />
      <Spacer />

      <Input
        label="URL de redirection principale"
        value={form.redirectUrl}
        onChange={(value) => updateField("redirectUrl", value)}
        isValid={isValidUrl(form.redirectUrl)}
        error={!isValidUrl(form.redirectUrl) ? "URL invalide" : undefined}
        borderColor="#a29696ff"
        focusBorder="#0e329fff"
        isDarkMode
        showValidationIcon
      />

      <Spacer />

      <Bloc layout="navbar" padding={0}>
        <Text isDarkMode variant="title" as="h4">
          URL de redirection (Réinitialisation de mot de passe)
        </Text>
        <Tooltip
          content="Base URL de redirection pour la réinitialisation du mot de passe"
          position="left"
        >
          <IconButton
            border
            icon={<FiInfo/>}
            variant="ghost"
            size="small"
          />
        </Tooltip>
      </Bloc>

      <Spacer />
      <Spacer/>

      <Input
        label="URL après réinitialisation du mot de passe"
        value={form.resetPasswordUrl ?? ""}
        onChange={(value) => updateField("resetPasswordUrl", value)}
        isValid={isValidUrl(form.resetPasswordUrl)}
        error={
          !isValidUrl(form.resetPasswordUrl)
            ? "URL vide ou invalide"
            : undefined
        }
        isDarkMode
        showValidationIcon
        borderColor="#a29696ff"
        focusBorder="#0e329fff"
      />
    </Bloc>
  );
}
