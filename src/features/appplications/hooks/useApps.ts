import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateAppDto } from "../api/models/CreateAppDto";
import { AppService } from "../api/services/AppService";
import type { UpdateAppDto } from "../api/models/UpdateAppDto";

export const useApps = (tenantId: string) => {
  return useQuery({
    queryKey: ["apps", tenantId],
    queryFn: () => AppService.getAll(tenantId),
    enabled: !!tenantId,
  });
};

export const useAppDetails = (tenantId: string, appId: string) => {
  return useQuery({
    queryKey: ["appDetails", tenantId, appId],
    queryFn: () => AppService.getByAppId(tenantId, appId),
    enabled: !!tenantId && !!appId,
  });
};

export const useCreateApp = (tenantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createAppDto: CreateAppDto) =>
      AppService.create(tenantId, createAppDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps", tenantId] });
    },
  });
};
export const useUpdateApp = (tenantId: string, appId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateAppDto: UpdateAppDto) =>
      AppService.update(tenantId, appId, updateAppDto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps", tenantId] });
      queryClient.invalidateQueries({
        queryKey: ["appDetails", tenantId, appId],
      });
    },
  });
};

export const useGenerateSecretKey = (tenantId: string, appId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AppService.generateSecretKey(tenantId, appId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps", tenantId] });
      queryClient.invalidateQueries({
        queryKey: ["appDetails", tenantId, appId],
      });
    },
  });
};

export const useCopySecretKey = (tenantId: string, appId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AppService.copySecretKey(tenantId, appId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps", tenantId] });
      queryClient.invalidateQueries({
        queryKey: ["appDetails", tenantId, appId],
      });
    },
  });
};

export const useActivationApp = (
  tenantId: string,
  appId: string,
  active: boolean,
) => {
  return useMutation({
    mutationFn: () => AppService.activation(tenantId, appId, active),
  });
};

export const useDeleteApp = (
  tenantId: string,
  appId: string,
  action: () => void,
) => {
  return useMutation({
    mutationFn: () => AppService.delete(tenantId, appId),
    onSuccess: () => action(),
  });
};


export const useConsumers = (tenantId: string, appId: string) => {
  return useQuery({
    queryKey: ["consumers", tenantId, appId],
    queryFn: () => AppService.getConsumers(tenantId, appId),
    enabled: !!tenantId && !!appId,
  });
};