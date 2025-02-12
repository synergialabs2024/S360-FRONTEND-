import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getEnvs,
  getUrlParams,
  MovimientoMaterial,
  MovimientoMaterialesPaginatedRes,
  PagingPartialParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { useUiStore } from '@/store/ui';
import axios from 'axios';

const { get, post, patch } = erpAPI();

export enum MovimientoMaterialTSQEnum {
  MOVIMIENTOMATERIALES = 'movimiento-materiales',
  MOVIMIENTOMATERIAL = 'movimiento-material',
}

///* tanStack query
export const useFetchMovimientoMateriales = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetMovimientoMaterialesParams>) => {
  return useQuery({
    queryKey: [
      MovimientoMaterialTSQEnum.MOVIMIENTOMATERIALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getMovimientoMateriales(params),
    enabled: enabled,
  });
};

export const useGetMovimientoMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [MovimientoMaterialTSQEnum.MOVIMIENTOMATERIAL, uuid],
    queryFn: () => getMovimientoMaterial(uuid),
    retry: false,
  });
};

export const useCreateMovimientoMaterial = <T>({
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
    mutationFn: (params: CreateMovimientoMaterialParams<T>) =>
      createMovimientoMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MovimientoMaterialTSQEnum.MOVIMIENTOMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Movimiento Material creado correctamente',
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

export const useUpdateMovimientoMaterial = <T>({
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
    mutationFn: (params: UpdateMovimientoMaterialParams<T>) =>
      updateMovimientoMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MovimientoMaterialTSQEnum.MOVIMIENTOMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Movimiento Material actualizado correctamente',
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
export type GetMovimientoMaterialesParams = Partial<MovimientoMaterial> &
  PagingPartialParams;

export type CreateMovimientoMaterialParams<T> = T;
export type CreateMovimientoMaterialParamsBase = Omit<MovimientoMaterial, 'id'>;
export interface UpdateMovimientoMaterialParams<T> {
  id: number;
  data: T;
}

export const getMovimientoMateriales = async (
  params?: GetMovimientoMaterialesParams,
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
  return get<MovimientoMaterialesPaginatedRes>(
    `/movimiento-material/?${queryParams}`,
    true,
  );
};

export const getMovimientoMaterial = async (uuid: string) => {
  try {
    return await get<MovimientoMaterial>(`/movimiento-material/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createMovimientoMaterial = async <T>(
  data: CreateMovimientoMaterialParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<MovimientoMaterial>('/movimiento-material/', data, true);
};

export const updateMovimientoMaterial = async <T>({
  id,
  data,
}: UpdateMovimientoMaterialParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<MovimientoMaterial>(`/movimiento-material/${id}/`, data, true);
};

///*  Reporte
const { VITE_ERPAPI_URL } = getEnvs();

export const ReportMovimientoMaterialExcel = async (params: any) => {
  try {
    const response = await axios.get(
      `${VITE_ERPAPI_URL}/movimiento-material/report/excel/`,
      {
        params,
        responseType: 'blob',
      },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Reporte Movimiento Material.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error descargando el Excel:', error);
  }
};
