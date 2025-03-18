import { erpAPI } from '@/axios/erp-api';

import {
  getUrlParams,
  ToastWrapper,
  DepartamentoTM,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  DepartamentoTMPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum DepartamentoTMTSQEnum {
  DEPARTAMENTOTMS = 'departamento-ticket-masivos',
  DEPARTAMENTOTM = 'departamento-ticket-masivo',
}

///* tanStack query ---------------
export const useFetchDepartamentoTMs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetDepartamentoTMsParams>) => {
  return useQuery({
    queryKey: [
      DepartamentoTMTSQEnum.DEPARTAMENTOTMS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getDepartamentoTMs(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetDepartamentoTM = (uuid: string) => {
  return useQuery({
    queryKey: [DepartamentoTMTSQEnum.DEPARTAMENTOTM, uuid],
    queryFn: () => getDepartamentoTM(uuid),
    retry: false,
  });
};

export const useCreateDepartamentoTM = <T>({
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
    mutationFn: (params: CreateDepartamentoTMParams<T>) =>
      createDepartamentoTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DepartamentoTMTSQEnum.DEPARTAMENTOTMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Departamento Ticket Masivos creado correctamente',
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

export const useUpdateDepartamentoTM = <T>({
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
    mutationFn: (params: UpdateDepartamentoTMParams<T>) =>
      updateDepartamentoTM(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DepartamentoTMTSQEnum.DEPARTAMENTOTMS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Departamento Ticket Masivos actualizado correctamente',
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
export type GetDepartamentoTMsParams = Partial<DepartamentoTM> &
  PagingPartialParams;
export type CreateDepartamentoTMParams<T> = T;
export type CreateDepartamentoTMParamsBase = Omit<DepartamentoTM, 'id'>;
export interface UpdateDepartamentoTMParams<T> {
  id: number;
  data: T;
}

export const getDepartamentoTMs = async (params?: GetDepartamentoTMsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<DepartamentoTMPaginatedRes>(
    `/departamento-ticket-masivo/?${queryParams}`,
    true,
  );
};

export const getDepartamentoTM = async (uuid: string) => {
  try {
    return await get<DepartamentoTM>(
      `/departamento-ticket-masivo/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createDepartamentoTM = async <T>(
  data: CreateDepartamentoTMParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<DepartamentoTM>('/departamento-ticket-masivo/', data, true);
};

export const updateDepartamentoTM = async <T>({
  id,
  data,
}: UpdateDepartamentoTMParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<DepartamentoTM>(
    `/departamento-ticket-masivo/${id}/`,
    data,
    true,
  );
};
