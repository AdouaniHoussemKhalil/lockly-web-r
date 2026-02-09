import {
  Bloc,
  Button,
  Modal,
  Spacer,
  Text,
} from "@houssemdi2000/design-system";
import ApplicationsList from "../../../features/appplications/components/AppsList";
import { useState } from "react";
import { CreateAppForm } from "../../../features/appplications/components/CreateAppForm";

export default function Apps() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Bloc layout="sidebar">
        <Text variant="title">MY APPS</Text>
        <Button
          iconPosition="right"
          onClick={() => setOpen(true)}
          label="Add app"
          mt={20}
        />
        <Spacer />
        <div style={{ width: "100%", paddingRight: 10 }}>
          <ApplicationsList />
        </div>
      </Bloc>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Créer une nouvelle application"
        width="450px"
        isDarkMode={true}
      >
        <CreateAppForm />
      </Modal>
    </>
  );
}
