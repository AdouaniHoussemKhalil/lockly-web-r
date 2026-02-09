import { ToastProvider } from "@houssemdi2000/design-system";
import GlobalLayout from "./layouts/GlobalLayout";
import { Routes } from "./routes/routes";

function App() {
  return (
    <ToastProvider>
      <GlobalLayout>
        <Routes />
      </GlobalLayout>
    </ToastProvider>
  );
}

export default App;
