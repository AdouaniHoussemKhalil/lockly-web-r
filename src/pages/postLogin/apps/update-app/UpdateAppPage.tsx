import { Loading } from "@houssemdi2000/design-system";
import { useAppDetails } from "../../../../features/appplications/hooks/useApps";
import { useParams } from "react-router-dom";
import { UpdateAppFormProvider } from "../../../../features/appplications/contexts/UpdateAppFormContext";
import UpdateAppContent from "../../../../features/appplications/components/update-app/UpdateAppPageContent";

export default function UpdateAppPage() {
  const { appId } = useParams<{ appId: string }>();
  const tenantId = "455a490e-6cd9-423e-a458-e3f1281d7ffc";

  const { data: app, isLoading } = useAppDetails(tenantId, appId ?? "");

  if (isLoading || !app) {
    return <Loading fullscreen />;
  }

  return (
    <UpdateAppFormProvider app={app}>
      <UpdateAppContent tenantId={tenantId} appId={appId!} />
    </UpdateAppFormProvider>
  );
}