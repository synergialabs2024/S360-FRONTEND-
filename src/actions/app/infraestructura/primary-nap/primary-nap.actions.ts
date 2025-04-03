import { erpAPI } from '@/shared/axios/erp-api';
import {
  getUrlParams,
  PagingPartialParams,
  PrimaryNap,
  PrimaryNapsPaginatedRes,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum PrimaryNapTSQEnum {
  PRIMARYNAPS = 'primary-naps',
  PRIMARYNAP = 'primary-nap',
}
///* tanStack query ---------------
export const useFetchPrimaryNaps = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPrimaryNapsParams>) => {
  return useQuery({
    queryKey: [PrimaryNapTSQEnum.PRIMARYNAPS, ...Object.values(params || {})],
    queryFn: () => getPrimaryNaps(params),
    enabled: enabled,
  });
};

export const useFetchPrimaryNapsPortPonOLT = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPrimaryNapsParams>) => {
  return useQuery({
    queryKey: [PrimaryNapTSQEnum.PRIMARYNAPS, ...Object.values(params || {})],
    queryFn: () => createPrimaryNapPortPonOLT(params),
    enabled: enabled,
  });
};

export const useGetPrimaryNap = (uuid: string) => {
  return useQuery({
    queryKey: [PrimaryNapTSQEnum.PRIMARYNAP, uuid],
    queryFn: () => getPrimaryNap(uuid),
    retry: false,
  });
};

export const useCreatePrimaryNap = <T>({
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
    mutationFn: (params: CreatePrimaryNapParams<T>) => createPrimaryNap(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PrimaryNapTSQEnum.PRIMARYNAPS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Nap Primaria creada correctamente',
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

export const useUpdatePrimaryNap = <T>({
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
    mutationFn: (params: UpdatePrimaryNapParams<T>) => updatePrimaryNap(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PrimaryNapTSQEnum.PRIMARYNAPS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Nap Primaria actualizada correctamente',
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
export type GetPrimaryNapsParams = Partial<PrimaryNap> &
  PagingPartialParams & {
    coordenadas_radio?: string; // filter by coords & radio
  };

export type CreatePrimaryNapParams<T> = T;
export type CreatePrimaryNapParamsBase = Omit<PrimaryNap, 'id'>;
export interface UpdatePrimaryNapParams<T> {
  id: number;
  data: T;
}

export const getPrimaryNaps = async (params?: GetPrimaryNapsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<PrimaryNapsPaginatedRes>(`/primary_nap/?${queryParams}`, true);
};

export const createPrimaryNapPortPonOLT = async <T>(
  data: CreatePrimaryNapParams<T>,
) => {
  return post<PrimaryNap>('/olt-conect/olt/port-pon-olt/', data, true);
};

export const getPrimaryNap = async (uuid: string) => {
  try {
    return await get<PrimaryNap>(`/primary_nap/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPrimaryNap = async <T>(data: CreatePrimaryNapParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<PrimaryNap>('/primary_nap/', data, true);
};

export const updatePrimaryNap = async <T>({
  id,
  data,
}: UpdatePrimaryNapParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<PrimaryNap>(`/primary_nap/${id}/`, data, true);
};
