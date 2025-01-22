import {
  getUrlParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  SolicitudMaterial,
  SolicitudMaterialPaginatedRes,
} from '@/shared/interfaces/app/inventario/solicitud-material.ts';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum solicitudMaterialTSQEnum {
  SOLICITUDMATERIAL = 'solicitud-material',
  SOLICITUDMATERIALES = 'solicitud-materiales',
}

///* tanStack query
export const useFetchSolicitudMaterial = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudMaterialParams>) => {
  return useQuery({
    queryKey: [
      solicitudMaterialTSQEnum.SOLICITUDMATERIAL,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudMaterial(params),
    enabled: enabled,
  });
};

export const useGetsolicitudMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIAL, uuid],
    queryFn: () => getsolicitudMaterial(uuid),
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
        queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIAL],
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
        queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIAL],
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

export const getSolicitudMaterial = async (
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

export const getsolicitudMaterial = async (uuid: string) => {
  try {
    return await get<SolicitudMaterial>(`/solicitud-material/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
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
