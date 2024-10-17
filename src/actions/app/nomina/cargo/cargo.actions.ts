import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  Cargo,
  CargosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum CargoTSQEnum {
  CARGOS = 'cargos',
  CARGO = 'cargo',
}

///* tanStack query
export const useFetchCargos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCargosParams>) => {
  return useQuery({
    queryKey: [CargoTSQEnum.CARGOS, ...Object.values(params || {})],
    queryFn: () => getCargos(params),
    enabled: enabled,
  });
};

export const useGetCargo = (uuid: string) => {
  return useQuery({
    queryKey: [CargoTSQEnum.CARGO, uuid],
    queryFn: () => getCargo(uuid),
    retry: false,
  });
};

export const useCreateCargo = ({
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
    mutationFn: createCargo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CargoTSQEnum.CARGOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cargo creado correctamente',
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

export const useUpdateCargo = <T>({
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
    mutationFn: (params: UpdateCargoParams<T>) => updateCargo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CargoTSQEnum.CARGOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cargo actualizado correctamente',
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
export type GetCargosParams = Partial<Cargo> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateCargoParams = Omit<Cargo, 'id'>;
export interface UpdateCargoParams<T> {
  id: number;
  data: T;
}

export const getCargos = async (params?: GetCargosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CargosPaginatedRes>(`/cargo/?${queryParams}`, true);
};

export const getCargo = async (uuid: string) => {
  try {
    return await get<Cargo>(`/cargo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCargo = async (data: CreateCargoParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Cargo>('/cargo/', data, true);
};

export const updateCargo = async <T>({ id, data }: UpdateCargoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Cargo>(`/cargo/${id}/`, data, true);
};
