import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  RadioBase,
  RadioBasesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum RadioBaseTSQEnum {
  RADIOBASES = 'radiobases',
  RADIOBASE = 'radiobase',
}
///* tanStack query ---------------
export const useFetchRadioBases = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetRadioBasesParams>) => {
  return useQuery({
    queryKey: [RadioBaseTSQEnum.RADIOBASES, ...Object.values(params || {})],
    queryFn: () => getRadioBases(params),
    enabled: enabled,
  });
};

export const useGetRadioBase = (uuid: string) => {
  return useQuery({
    queryKey: [RadioBaseTSQEnum.RADIOBASE, uuid],
    queryFn: () => getRadioBase(uuid),
    retry: false,
  });
};

export const useCreateRadioBase = <T>({
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
    mutationFn: (params: CreateRadioBaseParams<T>) => createRadioBase(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RadioBaseTSQEnum.RADIOBASES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'RadioBase creado correctamente',
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

export const useUpdateRadioBase = <T>({
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
    mutationFn: (params: UpdateRadioBaseParams<T>) => updateRadioBase(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RadioBaseTSQEnum.RADIOBASES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'RadioBase actualizado correctamente',
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
export type GetRadioBasesParams = Partial<RadioBase> &
  PagingPartialParams & {
    coordenadas_radio?: string; // filter by coords & radio
  };
export type CreateRadioBaseParams<T> = T;
export type CreateRadioBaseParamsBase = Omit<RadioBase, 'id'>;
export interface UpdateRadioBaseParams<T> {
  id: number;
  data: T;
}

export const getRadioBases = async (params?: GetRadioBasesParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<RadioBasesPaginatedRes>(`/radiobase/?${queryParams}`, true);
};

export const getRadioBase = async (uuid: string) => {
  try {
    return await get<RadioBase>(`/radiobase/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createRadioBase = async <T>(data: CreateRadioBaseParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<RadioBase>('/radiobase/', data, true);
};

export const updateRadioBase = async <T>({
  id,
  data,
}: UpdateRadioBaseParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<RadioBase>(`/radiobase/${id}/`, data, true);
};
