import {
  Colors,
  FormBuilder,
  type FormField,
} from "@houssemdi2000/design-system";
import type { CreateAppDto } from "../api/models/CreateAppDto";
import { useCreateApp } from "../hooks/useApps";

export const CreateAppForm = () => {
  const fields: FormField[] = [
    {
      type: "text",
      name: "name",
      placeholder: "Nommer votre application",
      required: true,
      color: Colors.primary[500],
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
          label: "Créer",
          size: "medium",
        }}
        onSubmit={handleCreateApp}
      />
    </div>
  );
};
