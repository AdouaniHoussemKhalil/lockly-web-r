import { Bloc, Input, Tag } from "@houssemdi2000/design-system";
import {
  getAuthTokenSecurityLevel,
  isValidMinutes,
} from "../../../../shared/appHelpers";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";


export default function TokenSettingsSection() {
  const { form, updateField } = useUpdateAppFormContext();

  const level = getAuthTokenSecurityLevel(form.tokenExpiresIn);
  return (
    <Bloc padding={0}>
      <Input
        value={form.tokenExpiresIn?.toString() ?? ""}
        label="Durée de validité du token (minutes)"
        onChange={(value) => updateField("tokenExpiresIn", Number(value))}
        isValid={isValidMinutes(form.tokenExpiresIn?.toString() ?? "")}
        error={isValidMinutes(form.tokenExpiresIn?.toString() ?? "") ? undefined : "La valeur doit être comprise entre 5 et 60 minutes"}
        borderColor="#a29696ff"
        focusBorder="#0e329fff"
        showValidationIcon
        isDarkMode
      />

      <Tag
        label={level?.label || "Invalide"}
        background={level?.color || "red"}
        style={{float:"right", marginRight:10, marginTop:5}}
      />
    </Bloc>
  );
}
