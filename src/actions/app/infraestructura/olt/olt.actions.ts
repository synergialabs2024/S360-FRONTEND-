import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  OLT,
  OltsPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum OLTTSQEnum {
  OLTS = 'olts',
  OLT = 'olt',
}
///* tanStack query ---------------
export const useFetchOLTs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetOLTsParams>) => {
  return useQuery({
    queryKey: [OLTTSQEnum.OLTS, ...Object.values(params || {})],
    queryFn: () => getOLTs(params),
    enabled: enabled,
  });
};

export const useGetOLT = (uuid: string) => {
  return useQuery({
    queryKey: [OLTTSQEnum.OLT, uuid],
    queryFn: () => getOLT(uuid),
    retry: false,
  });
};

export const useCreateOLT = <T>({
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
    mutationFn: (params: CreateOLTParams<T>) => createOLT(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OLTTSQEnum.OLTS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'OLT creado correctamente');
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

export const useUpdateOLT = <T>({
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
    mutationFn: (params: UpdateOLTParams<T>) => updateOLT(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OLTTSQEnum.OLTS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'OLT actualizado correctamente',
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
export type GetOLTsParams = Partial<OLT> & PagingPartialParams;
export type CreateOLTParams<T> = T;
export type CreateOLTParamsBase = Omit<OLT, 'id'>;
export interface UpdateOLTParams<T> {
  id: number;
  data: T;
}

export const getOLTs = async (params?: GetOLTsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<OltsPaginatedRes>(`/olt/?${queryParams}`, true);
};

export const getOLT = async (uuid: string) => {
  try {
    return await get<OLT>(`/olt/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createOLT = async <T>(data: CreateOLTParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<OLT>('/olt/', data, true);
};

export const updateOLT = async <T>({ id, data }: UpdateOLTParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<OLT>(`/olt/${id}/`, data, true);
};
