import { Bloc, Input, Tag } from "@houssemdi2000/design-system";
import {
  getMfaSecurityLevel,
  isValidMinutes,
} from "../../../../shared/appHelpers";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";


export default function MfaSection() {
  const { updateField, form } = useUpdateAppFormContext();

  const level = getMfaSecurityLevel(form.mfaExpiresIn);
  return (
    <Bloc padding={0}>
      <Input
        value={form.mfaExpiresIn.toString()}
        label="Durée de validité du code MFA par email (minutes)"
        onChange={(value) => updateField("mfaExpiresIn", Number(value))}
        isValid={isValidMinutes(form.mfaExpiresIn.toString())}
        error={
          isValidMinutes(form.mfaExpiresIn.toString())
            ? undefined
            : "Valeur autorisée : 1 à 15 minutes"
        }
        borderColor="#a29696ff"
        focusBorder="#0e329fff"
        isDarkMode
        showValidationIcon
      />

      <Tag
        label={level.label}
        background={level.color}
        style={{ float: "right", marginTop: 5, marginRight: 10 }}
      />
    </Bloc>
  );
}
