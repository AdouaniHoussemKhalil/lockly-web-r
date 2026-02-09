import api from "../../../../lib/axios";
import type { AppDto } from "../models/AppDto";
import type { AppDetailsDto } from "../models/AppDetailsDto";
import type { CopySecretKeyResponse } from "../models/CopySecretKeyResponse";
import type { CreateAppDto } from "../models/CreateAppDto";
import type { GenerateSecretKeyResponse } from "../models/GenerateSecretKeyResponse";
import type { UpdateAppDto } from "../models/UpdateAppDto";


export const AppService = {
  getAll: async (tenantId: string): Promise<AppDto[]> => {
    const response = await api.get<AppDto[]>(
      `/config/apps/${tenantId}`,
      {
        headers: {
          'X-Tenant-Id': tenantId,
        },
      }
    );

    return response.data;
  },
  getByAppId: async (tenantId: string, appId: string): Promise<AppDetailsDto> => {
    const response = await api.get<AppDetailsDto>(
      `/config/apps/${tenantId}/${appId}`,
      {
        headers: {
          'X-Tenant-Id': tenantId,
        },
      }
    );

    return response.data;
  },
  create: async (tenantId: string, createAppDto: CreateAppDto): Promise<string> => {
    const response = await api.post<string>(
      `/config/apps/create`,
      createAppDto,
      {
        headers: {
          'X-Tenant-Id': tenantId,
        },
      }
    );

    return response.data;
  },
  update: async (tenantId: string, appId: string, updateAppDto: UpdateAppDto): Promise<void> => {
    await api.put<void>(
      `/config/apps/update/${tenantId}/${appId}`,
      updateAppDto,
      {
        headers: {
          'X-Tenant-Id': tenantId,
        },
      }
    );
  },
  generateSecretKey: async (tenantId: string, appId: string): Promise<GenerateSecretKeyResponse> => {
    const response = await api.post<GenerateSecretKeyResponse>(
      `/config/apps/generate-secret-key/${tenantId}/${appId}`,
      {},
      {
        headers: {
          'X-Tenant-Id': tenantId,
        },
      }
    );

    return response.data;
  },

  copySecretKey: async (tenantId: string, appId: string): Promise<CopySecretKeyResponse> => {
    const response = await api.post<CopySecretKeyResponse>(
      `/config/apps/copy-secret-key/${tenantId}/${appId}`,
      {},
      {
        headers: {
          'x-Tenant-id': tenantId,
        },
      }
    );
    return response.data;
  },
  activation: async (tenantId: string, appId: string, active: boolean): Promise<string> => {
  const url = `/config/apps/${active ? 'activate' : 'deactivate'}/${tenantId}/${appId}`;
  const response = await api.put<string>(
    url,
    {
      isActive: active,
    },
    {
      headers: {
        'X-Tenant-Id': tenantId,
      },
    }
  );
  return response.data;
},

  delete: async (tenantId: string, appId: string): Promise<void> => {
    await api.delete<void>(
      `/config/apps/delete/${tenantId}/${appId}`,
      {
        headers: {
          'X-Tenant-Id': tenantId,
        },
      }
    );
  },
};

