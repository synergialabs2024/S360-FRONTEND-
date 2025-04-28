import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { useUiStore } from '@/store/ui';

import {
  getUrlParams,
  SolicitudMaterial,
  SolicitudMaterialPaginatedRes,
  ToastWrapper,
  TransferenciaMaterial,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';

const { get, post, patch } = erpAPI();

export enum solicitudMaterialTSQEnum {
  SOLICITUDMATERIALES = 'solicitud-materiales',
  SOLICITUDMATERIAL = 'solicitud-material',
}

///* tanStack query
export const useFetchSolicitudMaterial = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudMaterialParams>) => {
  return useQuery({
    queryKey: [
      solicitudMaterialTSQEnum.SOLICITUDMATERIALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudMateriales(params),
    enabled: enabled,
  });
};

export const useGetSolicitudMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIAL, uuid],
    queryFn: () => getSolicitudMaterial(uuid),
    retry: false,
  });
};

export const useGetSolicitudMaterial_Transferencia = (
  uuid: string,
  p0: { enabled: boolean },
) => {
  console.log(p0);
  return useQuery({
    queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIAL, uuid],
    queryFn: () => getSolicitudMaterial_Transeferencia(uuid),
    retry: false,
  });
};

export const useCreateSolicitudMaterial = <T>({
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
    mutationFn: (params: CreatesolicitudMaterialParams<T>) =>
      createsolicitudMaterial(params),
    onSuccess: resp => {
      queryClient.invalidateQueries({
        queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIALES],
      });
      customOnSuccess && customOnSuccess(resp.data);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Solicitud de Material creado correctamente',
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

export const useUpdatesolicitudMaterial = <T>({
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
    mutationFn: (params: UpdatesolicitudMaterialParams<T>) =>
      updatesolicitudMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Solicitud de Material actualizado correctamente',
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
export type GetSolicitudMaterialParams = Partial<SolicitudMaterial> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};

export type CreatesolicitudMaterialParams<T> = T;
export type CreatesolicitudMaterialParamsBase = Omit<SolicitudMaterial, 'id'>;
export interface UpdatesolicitudMaterialParams<T> {
  id: number;
  data: T;
}

export const getSolicitudMateriales = async (
  params?: GetSolicitudMaterialParams,
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
  return get<SolicitudMaterialPaginatedRes>(
    `/solicitud-material/?${queryParams}`,
    true,
  );
};

export const getSolicitudMaterial = async (uuid: string) => {
  try {
    return await get<TransferenciaMaterial>(
      `/solicitud-material/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};
export const getSolicitudMaterial_Transeferencia = async (uuid: string) => {
  return await get<TransferenciaMaterial>(`/solicitud-material/${uuid}`, true);
};

export const createsolicitudMaterial = async <T>(
  data: CreatesolicitudMaterialParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudMaterial>('/solicitud-material/', data, true);
};

export const updatesolicitudMaterial = async <T>({
  id,
  data,
}: UpdatesolicitudMaterialParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudMaterial>(`/solicitud-material/${id}/`, data, true);
};
