import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  ConfiguracionPlantillaCliente,
  ConfiguracionesPlantillaClientePaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ConfiguracionPlantillaTSQEnum {
  CONFIGURACIONPLANTILLAS = 'configuracion-plantillas',
  CONFIGURACIONPLANTILLA = 'configuracion-plantilla',
}
///* tanStack query ---------------
export const useFetchConfiguracionPlantillas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetConfiguracionPlantillasParams>) => {
  return useQuery({
    queryKey: [
      ConfiguracionPlantillaTSQEnum.CONFIGURACIONPLANTILLAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getConfiguracionPlantillas(params),
    enabled: enabled,
  });
};

export const useGetConfiguracionPlantilla = (uuid: string) => {
  return useQuery({
    queryKey: [ConfiguracionPlantillaTSQEnum.CONFIGURACIONPLANTILLA, uuid],
    queryFn: () => getConfiguracionPlantilla(uuid),
    retry: false,
  });
};

export const useCreateConfiguracionPlantilla = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateConfiguracionPlantillaParams<T>) =>
      createConfiguracionPlantilla(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ConfiguracionPlantillaTSQEnum.CONFIGURACIONPLANTILLAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Configuración de Plantilla creada correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useUpdateConfiguracionPlantilla = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: UpdateConfiguracionPlantillaParams<T>) =>
      updateConfiguracionPlantilla(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ConfiguracionPlantillaTSQEnum.CONFIGURACIONPLANTILLAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Configuración de Plantilla actualizada correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export type GetConfiguracionPlantillasParams =
  Partial<ConfiguracionPlantillaCliente> & PagingPartialParams;
export type CreateConfiguracionPlantillaParams<T> = T;
export type CreateConfiguracionPlantillaParamsBase = Omit<
  ConfiguracionPlantillaCliente,
  'id'
>;
export interface UpdateConfiguracionPlantillaParams<T> {
  id: number;
  data: T;
}

export const getConfiguracionPlantillas = async (
  params?: GetConfiguracionPlantillasParams,
) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ConfiguracionesPlantillaClientePaginatedRes>(
    `/configplantillacliente/?${queryParams}`,
    true,
  );
};

export const getConfiguracionPlantilla = async (uuid: string) => {
  try {
    return await get<ConfiguracionPlantillaCliente>(
      `/configplantillacliente/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createConfiguracionPlantilla = async <T>(
  data: CreateConfiguracionPlantillaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ConfiguracionPlantillaCliente>(
    '/configplantillacliente/',
    data,
    true,
  );
};

export const updateConfiguracionPlantilla = async <T>({
  id,
  data,
}: UpdateConfiguracionPlantillaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ConfiguracionPlantillaCliente>(
    `/configplantillacliente/${id}/`,
    data,
    true,
  );
};
