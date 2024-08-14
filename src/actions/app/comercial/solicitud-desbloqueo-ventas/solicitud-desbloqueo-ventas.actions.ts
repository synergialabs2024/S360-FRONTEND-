import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  SolicitudDesbloqueoVentas,
  SolicitudServiciosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum SolicitudDesbloqueoVentasTSQEnum {
  SOLICITUDDESBLOQUEOVENTASS = 'solicitud-desbloqueo-ventass',
  SOLICITUDDESBLOQUEOVENTAS = 'solicitud-desbloqueo-ventas',
}
///* tanStack query ---------------
export const useFetchSolicitudDesbloqueoVentass = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudDesbloqueoVentassParams>) => {
  return useQuery({
    queryKey: [
      SolicitudDesbloqueoVentasTSQEnum.SOLICITUDDESBLOQUEOVENTASS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudDesbloqueoVentass(params),
    enabled: enabled,
  });
};

export const useGetSolicitudDesbloqueoVentas = (uuid: string) => {
  return useQuery({
    queryKey: [
      SolicitudDesbloqueoVentasTSQEnum.SOLICITUDDESBLOQUEOVENTAS,
      uuid,
    ],
    queryFn: () => getSolicitudDesbloqueoVentas(uuid),
    retry: false,
  });
};

export const useCreateSolicitudDesbloqueoVentas = <T>({
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
    mutationFn: (params: CreateSolicitudDesbloqueoVentasParams<T>) =>
      createSolicitudDesbloqueoVentas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SolicitudDesbloqueoVentasTSQEnum.SOLICITUDDESBLOQUEOVENTASS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'SolicitudDesbloqueoVentas creado correctamente',
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

export const useUpdateSolicitudDesbloqueoVentas = <T>({
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
    mutationFn: (params: UpdateSolicitudDesbloqueoVentasParams<T>) =>
      updateSolicitudDesbloqueoVentas(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SolicitudDesbloqueoVentasTSQEnum.SOLICITUDDESBLOQUEOVENTASS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'SolicitudDesbloqueoVentas actualizado correctamente',
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
export type GetSolicitudDesbloqueoVentassParams =
  Partial<SolicitudDesbloqueoVentas> & PagingPartialParams;
export type CreateSolicitudDesbloqueoVentasParams<T> = T;
export type CreateSolicitudDesbloqueoVentasParamsBase = Omit<
  SolicitudDesbloqueoVentas,
  'id'
>;
export interface UpdateSolicitudDesbloqueoVentasParams<T> {
  id: number;
  data: T;
}

export const getSolicitudDesbloqueoVentass = async (
  params?: GetSolicitudDesbloqueoVentassParams,
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
  return get<SolicitudServiciosPaginatedRes>(
    `/solicituddesbloqueoventas/?${queryParams}`,
    true,
  );
};

export const getSolicitudDesbloqueoVentas = async (uuid: string) => {
  try {
    return await get<SolicitudDesbloqueoVentas>(
      `/solicituddesbloqueoventas/uuid/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSolicitudDesbloqueoVentas = async <T>(
  data: CreateSolicitudDesbloqueoVentasParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudDesbloqueoVentas>(
    '/solicituddesbloqueoventas/',
    data,
    true,
  );
};

export const updateSolicitudDesbloqueoVentas = async <T>({
  id,
  data,
}: UpdateSolicitudDesbloqueoVentasParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudDesbloqueoVentas>(
    `/solicituddesbloqueoventas/${id}/`,
    data,
    true,
  );
};

///* action data types ---------------
export type CreateSolicitudDesbloqueoVentasData = Pick<
  SolicitudDesbloqueoVentas,
  | 'motivo'
  | 'modelo'
  | 'modelo_id'
  | 'modelo_estado'
  | 'solicitud_desbloqueo_estado' // first state created
> & {};

export type ApproveOrRejectSolicitudDesbloqueoVentasData = Pick<
  SolicitudDesbloqueoVentas,
  | 'motivo'
  | 'solicitud_desbloqueo_estado'
  | 'modelo'
  | 'modelo_id'
  | 'modelo_estado'
> & {};
