import {
  EgresoMaterial,
  EgresoMaterialesPaginatedRes,
  getUrlParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum EgresoMaterialTSQEnum {
  EGRESOMATERIALES = 'egreso-materiales',
  EGRESOMATERIAL = 'egreso-material',
}

///* tanStack query
export const useFetchEgresoMateriales = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetEgresoMaterialesParams>) => {
  return useQuery({
    queryKey: [
      EgresoMaterialTSQEnum.EGRESOMATERIALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getEgresoMateriales(params),
    enabled: enabled,
  });
};

export const useGetEgresoMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [EgresoMaterialTSQEnum.EGRESOMATERIAL, uuid],
    queryFn: () => getEgresoMaterial(uuid),
    retry: false,
  });
};

export const useCreateEgresoMaterial = <T>({
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
    mutationFn: (params: CreateEgresoMaterialParams<T>) =>
      createEgresoMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EgresoMaterialTSQEnum.EGRESOMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Egreso Material creado correctamente',
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

export const useUpdateEgresoMaterial = <T>({
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
    mutationFn: (params: UpdateEgresoMaterialParams<T>) =>
      updateEgresoMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EgresoMaterialTSQEnum.EGRESOMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Egreso Material actualizado correctamente',
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
export type GetEgresoMaterialesParams = Partial<EgresoMaterial> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateEgresoMaterialParams<T> = T;
export type CreateEgresoMaterialParamsBase = Omit<EgresoMaterial, 'id'>;
export interface UpdateEgresoMaterialParams<T> {
  id: number;
  data: T;
}

export const getEgresoMateriales = async (
  params?: GetEgresoMaterialesParams,
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
  return get<EgresoMaterialesPaginatedRes>(
    `/egreso-material/?${queryParams}`,
    true,
  );
};

export const getEgresoMaterial = async (uuid: string) => {
  try {
    return await get<EgresoMaterial>(`/egreso-material/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createEgresoMaterial = async <T>(
  data: CreateEgresoMaterialParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<EgresoMaterial>('/egreso-material/', data, true);
};

export const updateEgresoMaterial = async <T>({
  id,
  data,
}: UpdateEgresoMaterialParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<EgresoMaterial>(`/egreso-material/${id}/`, data, true);
};
