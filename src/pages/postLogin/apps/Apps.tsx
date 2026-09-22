import {
  Bloc,
  Modal,
  Spacer,
} from "@houssemdi2000/design-system";
import ApplicationsList from "../../../features/appplications/components/view-apps/AppsList";
import { useState } from "react";
import { CreateAppForm } from "../../../features/appplications/components/CreateAppForm";
import ViewAppsHeader from "../../../features/appplications/components/view-apps/Header";
import { FiX } from "react-icons/fi";


export default function Apps() {
  const [open, setOpen] = useState(false);

  return (
    <>
     <ViewAppsHeader setOpen={setOpen} />
     <Spacer/>
      <Bloc layout="sidebar" padding={0}>
        <Bloc padding={0}>
          <ApplicationsList />
        </Bloc>
      </Bloc>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Créer une nouvelle application"
        width="450px"
        isDarkMode={true}
        closeIcon={<FiX />}
      >
        <CreateAppForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
