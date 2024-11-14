import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Rubro,
  RubrosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum RubroTSQEnum {
  RUBROS = 'rubros',
  RUBRO = 'rubro',
}
///* tanStack query ---------------
export const useFetchRubros = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetRubrosParams>) => {
  return useQuery({
    queryKey: [RubroTSQEnum.RUBROS, ...Object.values(params || {})],
    queryFn: () => getRubros(params),
    enabled: enabled,
  });
};

export const useGetRubro = (uuid: string) => {
  return useQuery({
    queryKey: [RubroTSQEnum.RUBRO, uuid],
    queryFn: () => getRubro(uuid),
    retry: false,
  });
};

export const useCreateRubro = <T>({
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
    mutationFn: (params: CreateRubroParams<T>) => createRubro(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RubroTSQEnum.RUBROS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Rubro creado correctamente',
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

export const useUpdateRubro = <T>({
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
    mutationFn: (params: UpdateRubroParams<T>) => updateRubro(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RubroTSQEnum.RUBROS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Rubro actualizado correctamente',
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
export type GetRubrosParams = Partial<Rubro> & PagingPartialParams;
export type CreateRubroParams<T> = T;
export type CreateRubroParamsBase = Omit<Rubro, 'id'>;
export interface UpdateRubroParams<T> {
  id: number;
  data: T;
}

export const getRubros = async (params?: GetRubrosParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<RubrosPaginatedRes>(`/rubro/?${queryParams}`, true);
};

export const getRubro = async (uuid: string) => {
  try {
    return await get<Rubro>(`/rubro/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createRubro = async <T>(data: CreateRubroParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Rubro>('/rubro/', data, true);
};

export const updateRubro = async <T>({ id, data }: UpdateRubroParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Rubro>(`/rubro/${id}/`, data, true);
};

///* action types ===================================
export type CreateRubroLibreClienteData = Pick<
  Rubro,
  | 'tipo_rubro'
  | 'fecha_vencimiento'
  | 'valor_total'
  | 'valor_taxes'
  | 'subtotal'
  | 'linea_servicio'
  | 'detalle'
>;
