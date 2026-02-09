import type { AppDto } from "./AppDto";

export interface AppDetailsDto extends AppDto {
  tenantId: string;
  appId: string;
  secretKey: string;
  secretKeyCreatedAt: string;
  isSecretKeyCopied: boolean;
  apiKey: string;
  mfaSettings?: MFASettingsDto;
  allowedOrigins?: string[];
  branding?: AppClientBrandingDto;
  scopes?: string[];
}

export type MFASettingsDto = {
  verificationMode: "code" | "link" | "both";
  expiryMinutes: number;
};

export type AppClientBrandingDto = {
  appName: string;
  primaryColor: string;
  supportEmail: string;
  templates: TemplateDto[];
  logoUrl?: string;
};

export type TemplateDto = {
  id: string;
  isActive: boolean;
};
