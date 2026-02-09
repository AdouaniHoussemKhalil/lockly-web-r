import { Header, Button, Modal } from "@houssemdi2000/design-system";
import { FiSave, FiTrash, FiCloud, FiCloudOff } from "react-icons/fi";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";
import { useState } from "react";

type Props = {
  handleSave: () => void;
  isUpdateLoading: boolean;
  isAppActive: boolean;
  handleActivation: () => void;
  isActivationLoading: boolean;
  handleDelete: () => void;
  isDeleteLoading: boolean;
};

export default function AppHeader({
  handleSave,
  handleActivation,
  isActivationLoading,
  isUpdateLoading,
  isAppActive,
  handleDelete,
  isDeleteLoading
}: Props) {
  const isDarkMode = localStorage.getItem("mode") === "dark";

  const { canActive } = useUpdateAppFormContext();

  const [isDeleteConfirmedOpenModal, setIsDeleteConfirmedOpenModal] =
    useState(false);

  const handleConfirmDelete = () => {
    handleDelete();
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmedOpenModal(true);
  };

  return (
    <Header
      isDarkMode={isDarkMode}
      right={
        <>
          <Button
            size="small"
            onClick={handleSave}
            icon={<FiSave />}
            label="Enregistrer"
            isLoading={isUpdateLoading}
          />
          <Button
            size="small"
            icon={isAppActive ? <FiCloudOff /> : <FiCloud />}
            variant={isAppActive ? "secondary" : "light"}
            onClick={handleActivation}
            label={isAppActive ? "Désactiver" : "Activer"}
            isLoading={isActivationLoading}
            disabled={!isAppActive ? !canActive : false}
          />
          <Button
            size="small"
            icon={<FiTrash />}
            variant="danger"
            label="Supprimer"
            onClick={handleDeleteClick}
          />
          <Modal
            open={isDeleteConfirmedOpenModal}
            title="Confirmation de suppression"
            onClose={() => setIsDeleteConfirmedOpenModal(false)}
            isDarkMode
            footer={
              <Button
                label="Confirmer"
                variant="danger"
                onClick={handleConfirmDelete}
                isLoading={isDeleteLoading}
              />
            }
          >
            <p>Êtes-vous sûr de vouloir supprimer cette application ?</p>
          </Modal>
        </>
      }
    />
  );
}
