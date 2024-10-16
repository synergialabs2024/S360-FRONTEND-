import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  Ciudad,
  CiudadesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum CiudadTSQEnum {
  CIUDADS = 'ciudads',
  CIUDAD = 'ciudad',
}
///* tanStack query ---------------
export const useFetchCiudades = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCiudadsParams>) => {
  return useQuery({
    queryKey: [CiudadTSQEnum.CIUDADS, ...Object.values(params || {})],
    queryFn: () => getCiudads(params),
    enabled: enabled,
  });
};

export const useGetCiudad = (uuid: string) => {
  return useQuery({
    queryKey: ['ciudad', uuid],
    queryFn: () => getCiudad(uuid),
    retry: false,
  });
};

export const useCreateCiudad = ({
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
    mutationFn: createCiudad,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ciudads'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ciudad creado correctamente',
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

export const useUpdateCiudad = <T>({
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
    mutationFn: (params: UpdateCiudadParams<T>) => updateCiudad(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ciudads'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ciudad actualizado correctamente',
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
export type GetCiudadsParams = Partial<Ciudad> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateCiudadParams = Omit<Ciudad, 'id'>;
export interface UpdateCiudadParams<T> {
  id: number;
  data: T;
}

export const getCiudads = async (params?: GetCiudadsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CiudadesPaginatedRes>(`/ciudad/?${queryParams}`, true);
};

export const getCiudad = async (uuid: string) => {
  try {
    return await get<Ciudad>(`/ciudad/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCiudad = async (data: CreateCiudadParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Ciudad>('/ciudad/', data, true);
};

export const updateCiudad = async <T>({ id, data }: UpdateCiudadParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Ciudad>(`/ciudad/${id}/`, data, true);
};
