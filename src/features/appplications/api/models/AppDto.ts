export interface AppDto {
  id: string;
  name: string;
  tokenExpiresIn?: number;
  resetTokenExpiresIn?: number;
  isActive: boolean;
  allowedOrigins?: string[];

  redirectUrl: string;
  logoutUrl?: string;
  resetPasswordUrl: string;
  scopes?: string[];
  createdAt: string;
}
