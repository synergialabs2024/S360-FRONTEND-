import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getUrlParams,
  ToastWrapper,
  CuentaContable,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  CuentaContablePaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get, post, patch } = erpAPI();

export enum CuentaContableTSQEnum {
  CUENTACONTABLES = 'cuenta-contables',
  CUENTACONTABLE = 'cuenta-contable',
}

///* tanStack query ---------------
export const useFetchCuentaContables = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCuentaContablesParams>) => {
  return useQuery({
    queryKey: [
      CuentaContableTSQEnum.CUENTACONTABLES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getCuentaContables(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};
export const useGetCuentaContable = (uuid: string) => {
  return useQuery({
    queryKey: [CuentaContableTSQEnum.CUENTACONTABLE, uuid],
    queryFn: () => getCuentaContable(uuid),
    retry: false,
  });
};
export const useCreateCuentaContable = <T>({
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
    mutationFn: (params: CreateCuentaContableParams<T>) =>
      createCuentaContable(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CuentaContableTSQEnum.CUENTACONTABLES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cuenta Contable creado correctamente',
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
export const useUpdateCuentaContable = <T>({
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
    mutationFn: (params: UpdateCuentaContableParams<T>) =>
      updateCuentaContable(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CuentaContableTSQEnum.CUENTACONTABLES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cuenta Contable actualizado correctamente',
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
export type GetCuentaContablesParams = Partial<CuentaContable> &
  PagingPartialParams;
export type CreateCuentaContableParams<T> = T;
export type CreateCuentaContableParamsBase = Omit<CuentaContable, 'id'>;
export interface UpdateCuentaContableParams<T> {
  id: number;
  data: T;
}

export const getCuentaContables = async (params?: GetCuentaContablesParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.estado === undefined) {
    delete stateParams.estado;
  } else if (stateParams.filterByState !== false) {
    stateParams.estado = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<CuentaContablePaginatedRes>(
    `/cuenta_contable/?${queryParams}`,
    true,
  );
};
export const getCuentaContable = async (uuid: string) => {
  try {
    return await get<CuentaContable>(`/cuenta_contable/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};
export const createCuentaContable = async <T>(
  data: CreateCuentaContableParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CuentaContable>('/cuenta_contable/', data, true);
};
export const updateCuentaContable = async <T>({
  id,
  data,
}: UpdateCuentaContableParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CuentaContable>(`/cuenta_contable/${id}/`, data, true);
};
