import { erpAPI } from '@/axios/erp-api';
import {
  CalendarioFacturacion,
  CalendarioFacturacionesPaginatedRes,
  getUrlParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum CalendarioFacturacionTSQEnum {
  CALENDARIOFACTURACIONES = 'calendario-facturaciones',
  CALENDARIOFACTURACION = 'calendario-facturacion',
}

///* tanStack query
export const useFetchCalendarioFacturaciones = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCalendarioFacturacionesParams>) => {
  return useQuery({
    queryKey: [
      CalendarioFacturacionTSQEnum.CALENDARIOFACTURACIONES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getCalendarioFacturaciones(params),
    enabled: enabled,
  });
};

export const useGetCalendarioFacturacion = (uuid: string) => {
  return useQuery({
    queryKey: [CalendarioFacturacionTSQEnum.CALENDARIOFACTURACION, uuid],
    queryFn: () => getCalendarioFacturacion(uuid),
    retry: false,
  });
};

export const useCreateCalendarioFacturacion = <T>({
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
    mutationFn: (params: CreateCalendarioFacturacionParams<T>) =>
      createCalendarioFacturacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CalendarioFacturacionTSQEnum.CALENDARIOFACTURACIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Calendario Facturacion creado correctamente',
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

export const useUpdateCalendarioFacturacion = <T>({
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
    mutationFn: (params: UpdateCalendarioFacturacionParams<T>) =>
      updateCalendarioFacturacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CalendarioFacturacionTSQEnum.CALENDARIOFACTURACIONES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Calendario Facturacion actualizado correctamente',
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
export type GetCalendarioFacturacionesParams =
  Partial<CalendarioFacturacion> & {
    page?: number;
    page_size?: number;

    filterByState?: boolean;
  };
export type CreateCalendarioFacturacionParams<T> = T;
export type CreateCalendarioFacturacionParamsBase = Omit<
  CalendarioFacturacion,
  'id'
>;
export interface UpdateCalendarioFacturacionParams<T> {
  id: number;
  data: T;
}

export const getCalendarioFacturaciones = async (
  params?: GetCalendarioFacturacionesParams,
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
  return get<CalendarioFacturacionesPaginatedRes>(
    `/calendario-facturacion/?${queryParams}`,
    true,
  );
};

export const getCalendarioFacturacion = async (uuid: string) => {
  try {
    return await get<CalendarioFacturacion>(
      `/calendario-facturacion/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCalendarioFacturacion = async <T>(
  data: CreateCalendarioFacturacionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CalendarioFacturacion>('/calendario-facturacion/', data, true);
};

export const updateCalendarioFacturacion = async <T>({
  id,
  data,
}: UpdateCalendarioFacturacionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CalendarioFacturacion>(
    `/calendario-facturacion/${id}/`,
    data,
    true,
  );
};
