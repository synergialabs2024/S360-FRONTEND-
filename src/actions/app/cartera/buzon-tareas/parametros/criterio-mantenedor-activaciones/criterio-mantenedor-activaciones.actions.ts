/* eslint-disable indent */
import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';

import { useUiStore } from '@/store/ui/ui.store';
import {
  CriterioMantenedorActivacion,
  CriterioMantenedorActivacionBasePaginatedRes,
} from '@/shared/interfaces/app/cartera/mantenedor-activaciones';

const { get, post, patch } = erpAPI();

export enum CriterioMantenedorActivacionesTSQEnum {
  CRITERIOMANTENEDORACTIVACIONES = 'criterio-mantenedor-activaciones',
  CRITERIOMANTENEDORACTIVACION = 'criterio-mantenedor-activacion',
}
///* tanStack query ---------------
export const useFetchCriterioMantenedorActivaciones = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCriterioMantenedorActivacionesParams>) => {
  return useQuery({
    queryKey: [
      CriterioMantenedorActivacionesTSQEnum.CRITERIOMANTENEDORACTIVACIONES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getCriterioMantenedorActivaciones(params),
    enabled: enabled,
  });
};

export const useGetCriterioMantenedorActivacion = (uuid: string) => {
  return useQuery({
    queryKey: [
      CriterioMantenedorActivacionesTSQEnum.CRITERIOMANTENEDORACTIVACION,
      uuid,
    ],
    queryFn: () => getCriterioMantenedorActivacion(uuid),
    retry: false,
  });
};

export const useCreateCriterioMantenedorActivacion = <T>({
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
    mutationFn: (data: CreateCriterioMantenedorActivacionParams<T>) =>
      createCriterioMantenedorActivacion(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Criterio Mantenedor Activacion creado correctamente',
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

export const useUpdateCriterioMantenedorActivacion = <T>({
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
    mutationFn: (params: UpdateCriterioMantenedorActivacionParams<T>) =>
      updateCriterioMantenedorActivacion(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          CriterioMantenedorActivacionesTSQEnum.CRITERIOMANTENEDORACTIVACIONES,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Criterio Mantenedor Activacion actualizado correctamente',
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
export type GetCriterioMantenedorActivacionesParams =
  Partial<CriterioMantenedorActivacion> & PagingPartialParams;
export type CreateCriterioMantenedorActivacionParams<T> = T;
export type CreateCriterioMantenedorActivacionParamsBase = Omit<
  CriterioMantenedorActivacion,
  'id'
>;
export interface UpdateCriterioMantenedorActivacionParams<T> {
  id: number;
  data: T;
}

export const getCriterioMantenedorActivaciones = async (
  params?: GetCriterioMantenedorActivacionesParams,
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
  return get<CriterioMantenedorActivacionBasePaginatedRes>(
    `/criterio-mantenedor-activacion/?${queryParams}`,
    true,
  );
};

export const getCriterioMantenedorActivacion = async (uuid: string) => {
  try {
    return await get<CriterioMantenedorActivacion>(
      `/criterio-mantenedor-activacion/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCriterioMantenedorActivacion = async <T>(
  data: CreateCriterioMantenedorActivacionParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CriterioMantenedorActivacion>(
    '/criterio-mantenedor-activacion/',
    data,
    true,
  );
};

export const updateCriterioMantenedorActivacion = async <T>({
  id,
  data,
}: UpdateCriterioMantenedorActivacionParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CriterioMantenedorActivacion>(
    `/criterio-mantenedor-activacion/${id}/`,
    data,
    true,
  );
};
