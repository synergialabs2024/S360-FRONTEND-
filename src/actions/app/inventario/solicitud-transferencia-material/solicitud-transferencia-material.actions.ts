import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { useUiStore } from '@/store/ui';

import {
  getUrlParams,
  PagingPartialParams,
  SolicitudTransferenciaMaterial,
  SolicitudTransferenciaMaterialPaginatedRes,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';

const { get, post, patch } = erpAPI();

export enum solicitudTransferenciaMaterialTSQEnum {
  SOLICITUDTRANSFERENCIAMATERIALES = 'solicitud-transferencia-materiales',
  SOLICITUDTRANSFERENCIAMATERIAL = 'solicitud-transferencia-material',
}

///* tanStack query
export const useFetchSolicitudTransferenciaMateriales = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudTransferenciaMaterialParams>) => {
  return useQuery({
    queryKey: [
      solicitudTransferenciaMaterialTSQEnum.SOLICITUDTRANSFERENCIAMATERIALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudTransferenciaMaterial(params),
    enabled: enabled,
  });
};

export const useGetSolicitudTransferenciaMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [
      solicitudTransferenciaMaterialTSQEnum.SOLICITUDTRANSFERENCIAMATERIAL,
      uuid,
    ],
    queryFn: () => getsolicitudTransferenciaMaterial(uuid),
    retry: false,
  });
};

export const useCreateSolicitudTransferenciaMaterial = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateSolicitudTransferenciaMaterialParams<T>) =>
      createsolicitudTransferenciaMaterial(params),
    onSuccess: resp => {
      queryClient.invalidateQueries({
        queryKey: [
          solicitudTransferenciaMaterialTSQEnum.SOLICITUDTRANSFERENCIAMATERIALES,
        ],
      });
      customOnSuccess && customOnSuccess(resp.data);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Solicitud de Transferencia Material creado correctamente',
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

export const useUpdateSolicitudTransferenciaMaterial = <T>({
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
    mutationFn: (params: UpdateSolicitudTransferenciaMaterialParams<T>) =>
      updatesolicitudTransferenciaMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          solicitudTransferenciaMaterialTSQEnum.SOLICITUDTRANSFERENCIAMATERIALES,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Solicitud de Transferencia Material actualizado correctamente',
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
export type GetSolicitudTransferenciaMaterialParams =
  Partial<SolicitudTransferenciaMaterial> & PagingPartialParams;
export type CreateSolicitudTransferenciaMaterialParams<T> = T;
export type CreateSolicitudTransferenciaMaterialParamsBase = Omit<
  SolicitudTransferenciaMaterial,
  'id'
>;
export interface UpdateSolicitudTransferenciaMaterialParams<T> {
  id: number;
  data: T;
}

export const getSolicitudTransferenciaMaterial = async (
  params?: GetSolicitudTransferenciaMaterialParams,
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
  return get<SolicitudTransferenciaMaterialPaginatedRes>(
    `/solicitud_transferencia_material/?${queryParams}`,
    true,
  );
};

export const getsolicitudTransferenciaMaterial = async (uuid: string) => {
  try {
    return await get<SolicitudTransferenciaMaterial>(
      `/solicitud_transferencia_material/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createsolicitudTransferenciaMaterial = async <T>(
  data: CreateSolicitudTransferenciaMaterialParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudTransferenciaMaterial>(
    '/solicitud_transferencia_material/',
    data,
    true,
  );
};

export const updatesolicitudTransferenciaMaterial = async <T>({
  id,
  data,
}: UpdateSolicitudTransferenciaMaterialParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudTransferenciaMaterial>(
    `/solicitud_transferencia_material/${id}/`,
    data,
    true,
  );
};
