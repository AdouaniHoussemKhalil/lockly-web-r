import { BrowserRouter } from "react-router-dom";
import PostLoginRoutes from "../pages/postLogin/routes";
import { ErrorBoundary } from "../components/errors/ErrorBoundary";

export const routes = {
  apps: "/apps",
  updateApp: (appId: string) => `/apps/update/${appId}`,
  updateAppBranding: (appId: string) => `/apps/update/${appId}/branding`
}

export const Routes = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <PostLoginRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
};
