import {
  getUrlParams,
  ToastWrapper,
  UseMutationParams,
  PagingPartialParams,
  UseFetchEnabledParams,
  DeudaCuotaEquipoVenta,
  DeudaCuotaEquipoVentaPaginatedRes,
} from '@/shared';
import { useUiStore } from '@/store/ui';
import { erpAPI } from '@/shared/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum DeudaCuotaEquipoVentaTSQEnum {
  DEUDACUOTAEQUIPOVENTAS = 'deuda-cuota-equipo-ventas',
  DEUDACUOTAEQUIPOVENTA = 'deuda-cuota-equipo-venta',
}

///* tanStack query ---------------
export const useFetchDeudaCuotaEquipoVentas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetDeudaCuotaEquipoVentasParams>) => {
  return useQuery({
    queryKey: [
      DeudaCuotaEquipoVentaTSQEnum.DEUDACUOTAEQUIPOVENTAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getDeudaCuotaEquipoVentas(params),
    enabled: enabled,
  });
};

export const useGetDeudaCuotaEquipoVenta = (uuid: string) => {
  return useQuery({
    queryKey: [DeudaCuotaEquipoVentaTSQEnum.DEUDACUOTAEQUIPOVENTA, uuid],
    queryFn: () => getDeudaCuotaEquipoVenta(uuid),
    retry: false,
  });
};

export const useCreateDeudaCuotaEquipoVenta = <T>({
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
    mutationFn: (params: CreateDeudaCuotaEquipoVentaParams<T>) =>
      createDeudaCuotaEquipoVenta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DeudaCuotaEquipoVentaTSQEnum.DEUDACUOTAEQUIPOVENTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Deuda Cuota Equipo Venta creada correctamente',
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

export const useUpdateDeudaCuotaEquipoVenta = <T>({
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
    mutationFn: (params: UpdateDeudaCuotaEquipoVentaParams<T>) =>
      updateDeudaCuotaEquipoVenta(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DeudaCuotaEquipoVentaTSQEnum.DEUDACUOTAEQUIPOVENTAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Deuda Cuota Equipo Venta actualizada correctamente',
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
export type GetDeudaCuotaEquipoVentasParams = Partial<DeudaCuotaEquipoVenta> &
  PagingPartialParams;
export type CreateDeudaCuotaEquipoVentaParams<T> = T;
export type CreateDeudaCuotaEquipoVentaParamsBase = Omit<
  DeudaCuotaEquipoVenta,
  'id'
>;
export interface UpdateDeudaCuotaEquipoVentaParams<T> {
  id: number;
  data: T;
}

export const getDeudaCuotaEquipoVentas = async (
  params?: GetDeudaCuotaEquipoVentasParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<DeudaCuotaEquipoVentaPaginatedRes>(
    `/deuda-cuota-equipos-venta/?${queryParams}`,
    true,
  );
};

export const getDeudaCuotaEquipoVenta = async (uuid: string) => {
  try {
    return await get<DeudaCuotaEquipoVenta>(
      `/deuda-cuota-equipos-venta/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createDeudaCuotaEquipoVenta = async <T>(
  data: CreateDeudaCuotaEquipoVentaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<DeudaCuotaEquipoVenta>('/deuda-cuota-equipos-venta/', data, true);
};

export const updateDeudaCuotaEquipoVenta = async <T>({
  id,
  data,
}: UpdateDeudaCuotaEquipoVentaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<DeudaCuotaEquipoVenta>(
    `/deuda-cuota-equipos-venta/${id}/`,
    data,
    true,
  );
};
