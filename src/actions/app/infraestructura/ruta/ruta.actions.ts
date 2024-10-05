import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Ruta,
  RutasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum RutaTSQEnum {
  RUTAS = 'rutas',
  RUTA = 'ruta',
}
///* tanStack query ---------------
export const useFetchRutas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetRutasParams>) => {
  return useQuery({
    queryKey: [RutaTSQEnum.RUTAS, ...Object.values(params || {})],
    queryFn: () => getRutas(params),
    enabled: enabled,
  });
};

export const useGetRuta = (uuid: string) => {
  return useQuery({
    queryKey: [RutaTSQEnum.RUTA, uuid],
    queryFn: () => getRuta(uuid),
    retry: false,
  });
};

export const useCreateRuta = <T>({
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
    mutationFn: (params: CreateRutaParams<T>) => createRuta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RutaTSQEnum.RUTAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'Ruta creado correctamente');
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

export const useUpdateRuta = <T>({
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
    mutationFn: (params: UpdateRutaParams<T>) => updateRuta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RutaTSQEnum.RUTAS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ruta actualizado correctamente',
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
export type GetRutasParams = Partial<Ruta> & PagingPartialParams;
export type CreateRutaParams<T> = T;
export type CreateRutaParamsBase = Omit<Ruta, 'id'>;
export interface UpdateRutaParams<T> {
  id: number;
  data: T;
}

export const getRutas = async (params?: GetRutasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<RutasPaginatedRes>(`/ruta/?${queryParams}`, true);
};

export const getRuta = async (uuid: string) => {
  try {
    return await get<Ruta>(`/ruta/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createRuta = async <T>(data: CreateRutaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Ruta>('/ruta/', data, true);
};

export const updateRuta = async <T>({ id, data }: UpdateRutaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Ruta>(`/ruta/${id}/`, data, true);
};
