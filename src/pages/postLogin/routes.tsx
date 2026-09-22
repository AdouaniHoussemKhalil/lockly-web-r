import {Routes, Route } from "react-router-dom";
import { routes } from "../../routes/routes";
import Apps from "./apps/Apps";
import UpdateAppPage from "./apps/update-app/UpdateAppPage";
import ManageBrandingApp from "./apps/manage-branding-app/ManageBrandingApp";
import Consumers from "./apps/consumers/Consumers";

const PostLoginRoutes = () => {
  return (
      <Routes>
        <Route path={routes.apps} element={<Apps />} />
        <Route path={routes.updateApp(":appId")} element={<UpdateAppPage />} />
        <Route path={routes.updateAppBranding(":appId")} element={<ManageBrandingApp />} />
        <Route path={routes.appConsumers(":appId")} element={<Consumers />} />
      </Routes>
  );
};

export default PostLoginRoutes;
