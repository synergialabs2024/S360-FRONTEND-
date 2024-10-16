import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  Provincia,
  ProvinciasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ProvinciaTSQEnum {
  PROVINCIAS = 'provincias',
  PROVINCIA = 'provincia',
}

///* tanStack query
export const useFetchProvincias = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetProvinciasParams>) => {
  return useQuery({
    queryKey: [ProvinciaTSQEnum.PROVINCIAS, ...Object.values(params || {})],
    queryFn: () => getProvincias(params),
    enabled: enabled,
  });
};

export const useGetProvincia = (uuid: string) => {
  return useQuery({
    queryKey: [ProvinciaTSQEnum.PROVINCIA, uuid],
    queryFn: () => getProvincia(uuid),
    retry: false,
  });
};

export const useCreateProvincia = ({
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
    mutationFn: createProvincia,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ProvinciaTSQEnum.PROVINCIAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Provincia creado correctamente',
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

export const useUpdateProvincia = <T>({
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
    mutationFn: (params: UpdateProvinciaParams<T>) => updateProvincia(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ProvinciaTSQEnum.PROVINCIAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Provincia actualizado correctamente',
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

///* axios
export type GetProvinciasParams = Partial<Provincia> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateProvinciaParams = Omit<Provincia, 'id'>;
export interface UpdateProvinciaParams<T> {
  id: number;
  data: T;
}

export const getProvincias = async (params?: GetProvinciasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ProvinciasPaginatedRes>(`/provincia/?${queryParams}`, true);
};

export const getProvincia = async (uuid: string) => {
  try {
    return await get<Provincia>(`/provincia/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createProvincia = async (data: CreateProvinciaParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Provincia>('/provincia/', data, true);
};

export const updateProvincia = async <T>({
  id,
  data,
}: UpdateProvinciaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Provincia>(`/provincia/${id}/`, data, true);
};
