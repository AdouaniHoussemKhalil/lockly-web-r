import { Alert, Bloc, Spacer } from "@houssemdi2000/design-system";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";

export default function AppRemark() {
  const { canActive, isActive } = useUpdateAppFormContext();

  const remark = (() => {
    if (!isActive && !canActive) {
      return {
        type: "error" as const,
        message:
          "Cette application ne peut pas être activée. Veuillez compléter les paramètres obligatoires."
      };
    }

    if (!isActive && canActive) {
      return {
        type: "info" as const,
        message:
          "L’application est prête à être activée, mais elle est actuellement désactivée."
      };
    }

    if (isActive) {
      return {
        type: "success" as const,
        message:
          "L’application est active. Toute modification sera appliquée immédiatement."
      };
    }

    return {
      type: "info" as const,
      message:
        "Les modifications apportées à cette application seront appliquées immédiatement."
    };
  })();

  return (
    <Bloc padding={0}>
      <Spacer />
      <Alert
        type={remark.type}
        title="Remarque"
        message={remark.message}
        closable
      />
    </Bloc>
  );
}

