import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import {
  Pais,
  PaisesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';

const { get, post, patch } = erpAPI();

///* tanStack query
export const useFetchPaises = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPaisesParams>) => {
  return useQuery({
    queryKey: ['paises', ...Object.values(params || {})],
    queryFn: () => getPaises(params),
    enabled: enabled,
  });
};

export const useGetPais = (uuid: string) => {
  return useQuery({
    queryKey: ['pais', uuid],
    queryFn: () => getPais(uuid),
    retry: false,
  });
};

export const useCreatePais = <T>({
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
    mutationFn: (data: CreatePaisParams<T>) => createPais(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paises'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        toast.success(customMessageToast || 'Pais creado correctamente');
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

export const useUpdatePais = <T>({
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
    mutationFn: (params: UpdatePaisParams<T>) => updatePais(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paises'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        toast.success(customMessageToast || 'Pais actualizado correctamente');
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
/*
export const useDeletePais = () => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: deletePais,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paises'] });
      toast.success('Pais eliminado correctamente');
    },
    onError: error => {
      handleAxiosError(error);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};
*/
///* axios
export type GetPaisesParams = Partial<Pais> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreatePaisBaseParams = Omit<Pais, 'id'>;
export type CreatePaisParams<T> = T;
export interface UpdatePaisParams<T> {
  id: number;
  data: T;
}

export const getPaises = async (params?: GetPaisesParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PaisesPaginatedRes>(`/pais/?${queryParams}`, true);
};

export const getPais = async (uuid: string) => {
  try {
    return await get<Pais>(`/pais/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPais = async <T>(data: CreatePaisParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Pais>('/pais/', data, true);
};

export const updatePais = async <T>({ id, data }: UpdatePaisParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Pais>(`/pais/${id}/`, data, true);
};

/*
export const deletePais = async (id: number) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return remove<Pais>(`/pais/${id}/`, true);
};
*/
