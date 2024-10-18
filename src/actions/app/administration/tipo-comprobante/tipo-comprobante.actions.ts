import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  TipoComprobante,
  TipoComprobantesPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum TipoComprobanteTSQEnum {
  TIPOCOMPROBANTES = 'tipo-comprobantes',
  TIPOCOMPROBANTE = 'tipo-comprobante',
}

///* tanStack query
export const useFetchTipoComprobantes = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTipoComprobantesParams>) => {
  return useQuery({
    queryKey: [
      TipoComprobanteTSQEnum.TIPOCOMPROBANTES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getTipoComprobantes(params),
    enabled: enabled,
  });
};

export const useGetTipoComprobante = (uuid: string) => {
  return useQuery({
    queryKey: [TipoComprobanteTSQEnum.TIPOCOMPROBANTE, uuid],
    queryFn: () => getTipoComprobante(uuid),
    retry: false,
  });
};

export const useCreateTipoComprobante = <T>({
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
    mutationFn: (params: CreateTipoComprobanteParams<T>) =>
      createTipoComprobante(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TipoComprobanteTSQEnum.TIPOCOMPROBANTES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tipo Comprobante creado correctamente',
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

export const useUpdateTipoComprobante = <T>({
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
    mutationFn: (params: UpdateTipoComprobanteParams<T>) =>
      updateTipoComprobante(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TipoComprobanteTSQEnum.TIPOCOMPROBANTES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Tipo Comprobante actualizado correctamente',
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
export type GetTipoComprobantesParams = Partial<TipoComprobante> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateTipoComprobanteParams<T> = T;
export type CreateTipoComprobanteParamsBase = Omit<TipoComprobante, 'id'>;
export interface UpdateTipoComprobanteParams<T> {
  id: number;
  data: T;
}

export const getTipoComprobantes = async (
  params?: GetTipoComprobantesParams,
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
  return get<TipoComprobantesPaginatedRes>(
    `/tipo-comprobante/?${queryParams}`,
    true,
  );
};

export const getTipoComprobante = async (uuid: string) => {
  try {
    return await get<TipoComprobante>(`/tipo-comprobante/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTipoComprobante = async <T>(
  data: CreateTipoComprobanteParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<TipoComprobante>('/tipo-comprobante/', data, true);
};

export const updateTipoComprobante = async <T>({
  id,
  data,
}: UpdateTipoComprobanteParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<TipoComprobante>(`/tipo-comprobante/${id}/`, data, true);
};
