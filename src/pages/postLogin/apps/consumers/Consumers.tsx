import { Loading } from "@houssemdi2000/design-system";
import ConsumersHeader from "../../../../features/appplications/components/consumers/Header";
import { useConsumers } from "../../../../features/appplications/hooks/useApps";
import ConsumersList from "../../../../features/appplications/components/consumers/ConsumersList";
import { useParams } from "react-router-dom";

export default function Consumers() {
  const { appId } = useParams<{ appId: string }>();

  const { data, isLoading } = useConsumers(
    "455a490e-6cd9-423e-a458-e3f1281d7ffc",
    appId ?? "",
  );
  if (isLoading) {
    return <Loading fullscreen />;
  }

  if (!data || data.length === 0) {
    return <div>Aucun utilisateur trouvé</div>;
  }
  return (
    <>
      <ConsumersHeader setOpen={() => {}} />
      <ConsumersList consumers={data} />
    </>
  );
}
