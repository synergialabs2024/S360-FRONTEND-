import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  MotivoRubroAdicional,
  MotivosRubroAdicionalPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum MotivoRubroAdicionalTSQEnum {
  MOTIVORUBROADICIONALS = 'motivo-rubro-adicionals',
  MOTIVORUBROADICIONAL = 'motivo-rubro-adicional',
}
///* tanStack query ---------------
export const useFetchMotivoRubroAdicionals = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMotivoRubroAdicionalsParams>) => {
  return useQuery({
    queryKey: [
      MotivoRubroAdicionalTSQEnum.MOTIVORUBROADICIONALS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMotivoRubroAdicionals(params),
    enabled: enabled,
  });
};

export const useGetMotivoRubroAdicional = (uuid: string) => {
  return useQuery({
    queryKey: [MotivoRubroAdicionalTSQEnum.MOTIVORUBROADICIONAL, uuid],
    queryFn: () => getMotivoRubroAdicional(uuid),
    retry: false,
  });
};

export const useCreateMotivoRubroAdicional = <T>({
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
    mutationFn: (params: CreateMotivoRubroAdicionalParams<T>) =>
      createMotivoRubroAdicional(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoRubroAdicionalTSQEnum.MOTIVORUBROADICIONALS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'MotivoRubroAdicional creado correctamente',
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

export const useUpdateMotivoRubroAdicional = <T>({
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
    mutationFn: (params: UpdateMotivoRubroAdicionalParams<T>) =>
      updateMotivoRubroAdicional(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MotivoRubroAdicionalTSQEnum.MOTIVORUBROADICIONALS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'MotivoRubroAdicional actualizado correctamente',
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
export type GetMotivoRubroAdicionalsParams = Partial<MotivoRubroAdicional> &
  PagingPartialParams;
export type CreateMotivoRubroAdicionalParams<T> = T;
export type CreateMotivoRubroAdicionalParamsBase = Omit<
  MotivoRubroAdicional,
  'id'
>;
export interface UpdateMotivoRubroAdicionalParams<T> {
  id: number;
  data: T;
}

export const getMotivoRubroAdicionals = async (
  params?: GetMotivoRubroAdicionalsParams,
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
  return get<MotivosRubroAdicionalPaginatedRes>(
    `/motivo-rubro-adicional/?${queryParams}`,
    true,
  );
};

export const getMotivoRubroAdicional = async (uuid: string) => {
  try {
    return await get<MotivoRubroAdicional>(
      `/motivo-rubro-adicional/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMotivoRubroAdicional = async <T>(
  data: CreateMotivoRubroAdicionalParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MotivoRubroAdicional>('/motivo-rubro-adicional/', data, true);
};

export const updateMotivoRubroAdicional = async <T>({
  id,
  data,
}: UpdateMotivoRubroAdicionalParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MotivoRubroAdicional>(
    `/motivo-rubro-adicional/${id}/`,
    data,
    true,
  );
};
