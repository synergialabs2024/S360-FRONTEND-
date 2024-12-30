import {
  IngresoMaterial,
  IngresoMaterialesPaginatedRes,
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

export enum IngresoMaterialTSQEnum {
  INGRESOMATERIALES = 'ingreso-materiales',
  INGRESOMATERIAL = 'ingreso-material',
}

///* tanStack query
export const useFetchIngresoMateriales = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetIngresoMaterialesParams>) => {
  return useQuery({
    queryKey: [
      IngresoMaterialTSQEnum.INGRESOMATERIALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getIngresoMateriales(params),
    enabled: enabled,
  });
};

export const useGetIngresoMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [IngresoMaterialTSQEnum.INGRESOMATERIAL, uuid],
    queryFn: () => getIngresoMaterial(uuid),
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
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateIngresoMaterialParams<T>) =>
      createIngresoMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IngresoMaterialTSQEnum.INGRESOMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ingreso Material creado correctamente',
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

export const useUpdateIngresoMaterial = <T>({
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
    mutationFn: (params: UpdateIngresoMaterialParams<T>) =>
      updateIngresoMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IngresoMaterialTSQEnum.INGRESOMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Ingreso Material actualizado correctamente',
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
export type GetIngresoMaterialesParams = Partial<IngresoMaterial> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};

export type CreateIngresoMaterialParams<T> = T;
export type CreateIngresoMaterialParamsBase = Omit<IngresoMaterial, 'id'>;
export interface UpdateIngresoMaterialParams<T> {
  id: number;
  data: T;
}

export const getIngresoMateriales = async (
  params?: GetIngresoMaterialesParams,
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
  return get<IngresoMaterialesPaginatedRes>(
    `/solicitud-material/?${queryParams}`,
    true,
  );
};

export const getIngresoMaterial = async (uuid: string) => {
  try {
    return await get<IngresoMaterial>(`/solicitud-material/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createIngresoMaterial = async <T>(
  data: CreateIngresoMaterialParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<IngresoMaterial>('/solicitud-material/', data, true);
};

export const updateIngresoMaterial = async <T>({
  id,
  data,
}: UpdateIngresoMaterialParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<IngresoMaterial>(`/solicitud-material/${id}/`, data, true);
};
