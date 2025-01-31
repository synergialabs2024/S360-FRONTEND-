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
  TipoMantenedorBeneficios,
  TipoMantenedorBeneficiosPaginatedRes,
} from '@/shared/interfaces/app/cartera/buzon-tareas/parametros';

const { get, post, patch } = erpAPI();

export enum TipoMantenedorBeneficiosTSQEnum {
  TIPOMANTENEDORBENEFICIOS = 'tipo-mantenedor-beneficios',
  TIPOMANTENEDORBENEFICIO = 'tipo-mantenedor-beneficio',
}
///* tanStack query ---------------
export const useFetchTipoMantenedorBeneficios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTipoMantenedorBeneficiosParams>) => {
  return useQuery({
    queryKey: [
      TipoMantenedorBeneficiosTSQEnum.TIPOMANTENEDORBENEFICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getTipoMantenedorBeneficios(params),
    enabled: enabled,
  });
};

export const useGetTipoMantenedorBeneficio = (uuid: string) => {
  return useQuery({
    queryKey: [TipoMantenedorBeneficiosTSQEnum.TIPOMANTENEDORBENEFICIO, uuid],
    queryFn: () => getTipoMantenedorBeneficio(uuid),
    retry: false,
  });
};

export const useCreateTipoMantenedorBeneficio = <T>({
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
    mutationFn: (data: CreateTipoMantenedorBeneficioParams<T>) =>
      createTipoMantenedorBeneficio(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Tipo Mantenedor Beneficio creado correctamente',
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

export const useUpdateTipoMantenedorBeneficio = <T>({
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
    mutationFn: (params: UpdateTipoMantenedorBeneficioParams<T>) =>
      updateTipoMantenedorBeneficio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TipoMantenedorBeneficiosTSQEnum.TIPOMANTENEDORBENEFICIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Tipo Mantenedor Beneficio actualizado correctamente',
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
export type GetTipoMantenedorBeneficiosParams =
  Partial<TipoMantenedorBeneficios> & PagingPartialParams;
export type CreateTipoMantenedorBeneficioParams<T> = T;
export type CreateTipoMantenedorBeneficioParamsBase = Omit<
  TipoMantenedorBeneficios,
  'id'
>;
export interface UpdateTipoMantenedorBeneficioParams<T> {
  id: number;
  data: T;
}

export const getTipoMantenedorBeneficios = async (
  params?: GetTipoMantenedorBeneficiosParams,
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
  return get<TipoMantenedorBeneficiosPaginatedRes>(
    `/tipo-mantenedor-beneficios/?${queryParams}`,
    true,
  );
};

export const getTipoMantenedorBeneficio = async (uuid: string) => {
  try {
    return await get<TipoMantenedorBeneficios>(
      `/tipo-mantenedor-beneficios/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTipoMantenedorBeneficio = async <T>(
  data: CreateTipoMantenedorBeneficioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<TipoMantenedorBeneficios>(
    '/tipo-mantenedor-beneficios/',
    data,
    true,
  );
};

export const updateTipoMantenedorBeneficio = async <T>({
  id,
  data,
}: UpdateTipoMantenedorBeneficioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<TipoMantenedorBeneficios>(
    `/tipo-mantenedor-beneficios/${id}/`,
    data,
    true,
  );
};
