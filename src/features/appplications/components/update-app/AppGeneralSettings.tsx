import { Bloc, Input, Spacer } from "@houssemdi2000/design-system";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";

export default function AppGeneralInfo() {
  const { form, updateField } = useUpdateAppFormContext();

  return (
    <Bloc padding={0}>
      <Input
        label="Nom de l’application"
        value={form.name}
        onChange={(value: string) => updateField("name", value)}
        borderColor="#a29696ff"
        focusBorder="#0e329fff"
        description="Nom interne utilisé uniquement dans la console d’administration."
        isDarkMode
        showValidationIcon
        isValid={!!form.name.trim()}
      />
      <Spacer />
    </Bloc>
  );
}
