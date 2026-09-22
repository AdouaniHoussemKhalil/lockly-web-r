import {
  Header,
  Button,
  Modal,
  IconButton,
  Bloc,
} from "@houssemdi2000/design-system";
import { FiSave, FiTrash, FiCloud, FiCloudOff, FiUsers, FiArrowLeft } from "react-icons/fi";
import { useUpdateAppFormContext } from "../../contexts/UpdateAppFormContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../routes/routes";

type Props = {
  handleSave: () => void;
  isUpdateLoading: boolean;
  isAppActive: boolean;
  handleActivation: () => void;
  isActivationLoading: boolean;
  handleDelete: () => void;
  isDeleteLoading: boolean;
};

export default function UpdateAppHeader({
  handleSave,
  handleActivation,
  isActivationLoading,
  isUpdateLoading,
  isAppActive,
  handleDelete,
  isDeleteLoading,
}: Props) {
  const isDarkMode = localStorage.getItem("mode") === "dark";

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(routes.apps);
  }

  const handleViewConsumers = () => {
    navigate(routes.appConsumers("90ed6b6a-1582-448f-8e7c-6b0fd1d781a4"));
  }

  const { canActive, numberOfConsumers } = useUpdateAppFormContext();

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
      left={
        <Bloc padding={0} layout="navbar">
          <IconButton
            size="large"
            icon={<FiArrowLeft />}
            onClick={handleBack}
          />
          <Button
            size="small"
            variant="secondary"
            icon={<FiUsers />}
            iconPosition="right"
            onClick={handleViewConsumers}
            label={`${numberOfConsumers} utilisateur${numberOfConsumers > 1 ? "s" : ""}`}
          />{" "}
        </Bloc>
      }
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
