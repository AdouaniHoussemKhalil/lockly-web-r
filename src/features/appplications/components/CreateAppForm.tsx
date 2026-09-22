import {
  FormBuilder,
  type FormField,
} from "@houssemdi2000/design-system";
import type { CreateAppDto } from "../api/models/CreateAppDto";
import { useCreateApp } from "../hooks/useApps";

type Props = {
  onSuccess: () => void;
};

export const CreateAppForm = ({ onSuccess }: Props ) => {
  const fields: FormField[] = [
    {
      type: "text",
      name: "name",
      placeholder: "Nommer votre application",
      required: true,
      color: "0e329fff",
    },
  ];

  const { mutate: createApp } = useCreateApp(
    "455a490e-6cd9-423e-a458-e3f1281d7ffc"
  );

  const handleCreateApp = (values: Record<string, any>) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
      );

      const dto: CreateAppDto = {
        tenantId: "455a490e-6cd9-423e-a458-e3f1281d7ffc",
        name: payload.name as string,
      };

      createApp(dto);
      onSuccess();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <FormBuilder
        fields={fields}
        isDarkMode
        layout="block"
        btn={{
          label: "Initialiser",
          size: "medium",
        }}
        onSubmit={handleCreateApp}
      />
    </div>
  );
};
