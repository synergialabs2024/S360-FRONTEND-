import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  getUrlParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Servicio,
  serviciosPaginatedRes,
} from '@/shared/interfaces/app/cliente';
import { useUiStore } from '@/store/ui';

const { get, patch } = erpAPI();

export enum servicioTSQEnum {
  SERVICIOS = 'servicios',
  SERVICIO = 'servicio',
}
///* tanStack query ---------------
export const useFetchServicios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetServiciosParams>) => {
  return useQuery({
    queryKey: [servicioTSQEnum.SERVICIOS, ...Object.values(params || {})],
    queryFn: () => getServicios(params),
    enabled: enabled,
  });
};

export const useGetServicio = (uuid: string) => {
  return useQuery({
    queryKey: [servicioTSQEnum.SERVICIO, uuid],
    queryFn: () => getServicio(uuid),
    retry: false,
  });
};

export const useUpdateServicio = <T>({
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
    mutationFn: (params: UpdateServicioParams<T>) => updateServicio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicios'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        toast.success(
          customMessageToast || 'Servicio actualizado correctamente',
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
export type GetServiciosParams = Partial<Servicio> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateServicioBaseParams = Omit<Servicio, 'id'>;
export interface UpdateServicioParams<T> {
  id: number;
  data: T;
}

export const getServicios = async (params?: GetServiciosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<serviciosPaginatedRes>(`/servicio/?${queryParams}`, true);
};

export const getServicio = async (uuid: string) => {
  try {
    return await get<Servicio>(`/servicio/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateServicio = async <T>({
  id,
  data,
}: UpdateServicioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Servicio>(`/servicio/${id}/`, data, true);
};
