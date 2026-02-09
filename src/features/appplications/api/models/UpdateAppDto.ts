export interface UpdateAppDto {
  name?: string | undefined;
  mfaExpiresIn?: number | undefined;
  tokenExpiresIn?: number | undefined;
  redirectUrl?: string | undefined;
  resetPasswordUrl?: string | undefined;
  supportEmail?: string | undefined;
}