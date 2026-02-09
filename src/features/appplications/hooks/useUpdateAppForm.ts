import { useCallback, useMemo, useState } from "react";
import type { AppDetailsDto } from "../api/models/AppDetailsDto";
import type { UpdateAppDto } from "../api/models/UpdateAppDto";

export function useUpdateAppForm(app: AppDetailsDto) {
  const [form, setForm] = useState({
    name: app.name,
    redirectUrl: app.redirectUrl,
    resetPasswordUrl: app.resetPasswordUrl,
    tokenExpiresIn: app.tokenExpiresIn ?? 0,
    mfaExpiresIn: app.mfaSettings?.expiryMinutes ?? 0,
    isActive: app.isActive ?? false,
    email: app.branding?.supportEmail ?? ""
  });

  const isFormValid = useMemo(() => {
    return (
      form.name?.trim() !== "" &&
      form.redirectUrl?.trim() !== "" &&
      form.resetPasswordUrl?.trim() !== "" &&
      form.tokenExpiresIn > 0 &&
      form.mfaExpiresIn > 0 &&
      form.email.trim() !== ""
    );
  }, [form]);

  const updateField = useCallback(
    <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
      setForm(prev => ({ ...prev, [key]: value }));
    },
    []
  );


  const updateAppDto: UpdateAppDto = useMemo(
    () => ({
      name: form.name,
      redirectUrl: form.redirectUrl,
      resetPasswordUrl: form.resetPasswordUrl,
      tokenExpiresIn: form.tokenExpiresIn,
      mfaExpiresIn: form.mfaExpiresIn,
      supportEmail: form.email
    }),
    [form]
  );

  return {
    form,
    isFormValid,
    updateField,
    updateAppDto,
  };
}
