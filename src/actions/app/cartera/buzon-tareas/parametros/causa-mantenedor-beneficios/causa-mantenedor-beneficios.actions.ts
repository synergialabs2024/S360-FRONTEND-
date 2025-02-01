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
  CausaMantenedorBeneficios,
  CausaMantenedorBeneficiosPaginatedRes,
} from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios';

const { get, post, patch } = erpAPI();

export enum CausaMantenedorBeneficiosTSQEnum {
  CAUSAMANTENEDORBENEFICIOS = 'causa-mantenedor-beneficios',
  CAUSAMANTENEDORBENEFICIO = 'causa-mantenedor-beneficio',
}
///* tanStack query ---------------
export const useFetchCausaMantenedorBeneficios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetCausaMantenedorBeneficiosParams>) => {
  return useQuery({
    queryKey: [
      CausaMantenedorBeneficiosTSQEnum.CAUSAMANTENEDORBENEFICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getCausaMantenedorBeneficios(params),
    enabled: enabled,
  });
};

export const useGetCausaMantenedorBeneficio = (uuid: string) => {
  return useQuery({
    queryKey: [CausaMantenedorBeneficiosTSQEnum.CAUSAMANTENEDORBENEFICIO, uuid],
    queryFn: () => getCausaMantenedorBeneficio(uuid),
    retry: false,
  });
};

export const useCreateCausaMantenedorBeneficio = <T>({
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
    mutationFn: (data: CreateCausaMantenedorBeneficioParams<T>) =>
      createCausaMantenedorBeneficio(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Causa Mantenedor Beneficio creado correctamente',
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

export const useUpdateCausaMantenedorBeneficio = <T>({
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
    mutationFn: (params: UpdateCausaMantenedorBeneficioParams<T>) =>
      updateCausaMantenedorBeneficio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CausaMantenedorBeneficiosTSQEnum.CAUSAMANTENEDORBENEFICIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Causa Mantenedor Beneficio actualizado correctamente',
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
export type GetCausaMantenedorBeneficiosParams =
  Partial<CausaMantenedorBeneficios> & PagingPartialParams;
export type CreateCausaMantenedorBeneficioParams<T> = T;
export type CreateCausaMantenedorBeneficioParamsBase = Omit<
  CausaMantenedorBeneficios,
  'id'
>;
export interface UpdateCausaMantenedorBeneficioParams<T> {
  id: number;
  data: T;
}

export const getCausaMantenedorBeneficios = async (
  params?: GetCausaMantenedorBeneficiosParams,
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
  return get<CausaMantenedorBeneficiosPaginatedRes>(
    `/causa-mantenedor-beneficio/?${queryParams}`,
    true,
  );
};

export const getCausaMantenedorBeneficio = async (uuid: string) => {
  try {
    return await get<CausaMantenedorBeneficios>(
      `/causa-mantenedor-beneficio/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createCausaMantenedorBeneficio = async <T>(
  data: CreateCausaMantenedorBeneficioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<CausaMantenedorBeneficios>(
    '/causa-mantenedor-beneficio/',
    data,
    true,
  );
};

export const updateCausaMantenedorBeneficio = async <T>({
  id,
  data,
}: UpdateCausaMantenedorBeneficioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<CausaMantenedorBeneficios>(
    `/causa-mantenedor-beneficio/${id}/`,
    data,
    true,
  );
};
