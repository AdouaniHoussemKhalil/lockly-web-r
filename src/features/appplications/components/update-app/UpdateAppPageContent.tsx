import { Bloc, Container, Grid, Spacer } from "@houssemdi2000/design-system";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";
import { useActivationApp, useDeleteApp, useUpdateApp } from "../../hooks/useApps";
import AppHeader from "./UpdateAppHeader";
import AppGeneralInfo from "./AppGeneralSettings";
import RedirectUrlsSection from "./RedirectUrlsSection";
import TokenSettingsSection from "./TokenSettingsSection";
import MfaSection from "./MfaSection";
import SecretKeySection from "./AppSecretKey";
import BarandingSection from "./BarandingSection";
import AppRemark from "./AppRemark";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes/routes";

function UpdateAppContent({
  tenantId,
  appId,
}: {
  tenantId: string;
  appId: string;
}) {
  const { updateAppDto, isActive, setIsActive } = useUpdateAppFormContext();
  const { mutate: updateApp, isPending } = useUpdateApp(tenantId, appId);
  const { mutate: activationApp, isPending: isActivationPending } =
    useActivationApp(tenantId, appId, isActive);
  
    const navigate = useNavigate();

  const { mutate: deleteApp, isPending: isDeletePending } = useDeleteApp(tenantId, appId, () => navigate(routes.apps));

  const handleSave = () => {
    updateApp(updateAppDto);
  };

  const handleDelete = () => {
    deleteApp();
  }

  const handleActivation = () => {
    activationApp();
    setIsActive(!isActive);
  };

  return (
    <Container>
      <AppHeader
        handleSave={handleSave}
        isAppActive={isActive}
        isUpdateLoading={isPending}
        handleActivation={handleActivation}
        isActivationLoading={isActivationPending}
        handleDelete={handleDelete}
        isDeleteLoading={isDeletePending}
      />

      <Spacer />
      <Grid
        items={[
          {
            className: "1/2",
            children: (
              <Bloc layout="sidebar">
                <AppGeneralInfo />
                <RedirectUrlsSection />
                <BarandingSection appId={appId} />
              </Bloc>
            ),
          },
          {
            className: "1/2",
            children: (
              <Bloc layout="sidebar">
                <TokenSettingsSection />
                <MfaSection />
                <SecretKeySection tenantId={tenantId} appId={appId} />
                <AppRemark/>
              </Bloc>
            ),
          },
        ]}
      />
    </Container>
  );
}
export default UpdateAppContent;
