import { createContext, useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";
import type { UpdateAppDto } from "../api/models/UpdateAppDto";
import type { AppDetailsDto } from "../api/models/AppDetailsDto";
import { useUpdateAppForm } from "../hooks/useUpdateAppForm";

type UpdateAppFormContextType = {
  form: {
    name: string;
    redirectUrl: string;
    resetPasswordUrl: string;
    tokenExpiresIn: number;
    mfaExpiresIn: number;
    email: string ;
    isActive: boolean;
  };
  updateField: <K extends keyof UpdateAppFormContextType["form"]>(
    key: K,
    value: UpdateAppFormContextType["form"][K]
  ) => void;
  updateAppDto: UpdateAppDto;
  canActive: boolean;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

export const UpdateAppFormContext =
  createContext<UpdateAppFormContextType | null>(null);

export const useUpdateAppFormContext = () => {
  const ctx = useContext(UpdateAppFormContext);
  if (!ctx) {
    throw new Error(
      "useUpdateAppFormContext must be used inside UpdateAppFormProvider"
    );
  }
  return ctx;
};

type Props = PropsWithChildren<{
  app: AppDetailsDto;
}>;

export function UpdateAppFormProvider({ app, children }: Props) {
  const { form, updateField, updateAppDto, isFormValid } = useUpdateAppForm(app);
  const canActive =
    app?.isActive === false &&
    app?.name !== undefined &&
    app?.name?.trim() !== "" &&
    app?.redirectUrl !== undefined &&
    app?.redirectUrl?.trim() !== "" &&
    app?.resetPasswordUrl !== undefined &&
    app?.resetPasswordUrl?.trim() !== "" &&
    app?.tokenExpiresIn !== undefined &&
    app?.tokenExpiresIn > 0  &&
    app?.mfaSettings?.expiryMinutes !== undefined &&
    app?.mfaSettings?.expiryMinutes > 0 &&
    app?.branding?.supportEmail !== undefined &&
    app?.branding?.supportEmail?.trim() !== "" &&
    isFormValid

    const [isActive, setIsActive] = useState(app?.isActive);

  return (
    <UpdateAppFormContext.Provider
      value={{ form, updateField, updateAppDto, canActive, isActive, setIsActive }}
    >
      {children}
    </UpdateAppFormContext.Provider>
  );
}
