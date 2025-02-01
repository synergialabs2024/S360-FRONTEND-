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
  SolucionMantenedorBeneficios,
  SolucionMantenedorBeneficiosPaginatedRes,
} from '@/shared/interfaces/app/cartera/buzon-tareas';

const { get, post, patch } = erpAPI();

export enum solucionMantenedorBeneficiosTSQEnum {
  SOLUCIONMANTENEDORBENEFICIOS = 'solucion-mantenedor-beneficios',
  SOLUCIONMANTENEDORBENEFICIO = 'solucion-mantenedor-beneficio',
}
///* tanStack query ---------------
export const useFetchSolucionMantenedorBeneficios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolucionMantenedorBeneficiosParams>) => {
  return useQuery({
    queryKey: [
      solucionMantenedorBeneficiosTSQEnum.SOLUCIONMANTENEDORBENEFICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolucionMantenedorBeneficios(params),
    enabled: enabled,
  });
};

export const useGetSolucionMantenedorBeneficio = (uuid: string) => {
  return useQuery({
    queryKey: [
      solucionMantenedorBeneficiosTSQEnum.SOLUCIONMANTENEDORBENEFICIO,
      uuid,
    ],
    queryFn: () => getSolucionMantenedorBeneficio(uuid),
    retry: false,
  });
};

export const useCreateSolucionMantenedorBeneficio = <T>({
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
    mutationFn: (data: CreateSolucionMantenedorBeneficioParams<T>) =>
      createSolucionMantenedorBeneficio(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Solucion Mantenedor Beneficio creado correctamente',
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

export const useUpdateSolucionMantenedorBeneficio = <T>({
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
    mutationFn: (params: UpdateSolucionMantenedorBeneficioParams<T>) =>
      updateSolucionMantenedorBeneficio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          solucionMantenedorBeneficiosTSQEnum.SOLUCIONMANTENEDORBENEFICIOS,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Solucion Mantenedor Beneficio actualizado correctamente',
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
export type GetSolucionMantenedorBeneficiosParams =
  Partial<SolucionMantenedorBeneficios> & PagingPartialParams;
export type CreateSolucionMantenedorBeneficioParams<T> = T;
export type CreateSolucionMantenedorBeneficioParamsBase = Omit<
  SolucionMantenedorBeneficios,
  'id'
>;
export interface UpdateSolucionMantenedorBeneficioParams<T> {
  id: number;
  data: T;
}

export const getSolucionMantenedorBeneficios = async (
  params?: GetSolucionMantenedorBeneficiosParams,
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
  return get<SolucionMantenedorBeneficiosPaginatedRes>(
    `/solucion-mantenedor-beneficio/?${queryParams}`,
    true,
  );
};

export const getSolucionMantenedorBeneficio = async (uuid: string) => {
  try {
    return await get<SolucionMantenedorBeneficios>(
      `/solucion-mantenedor-beneficio/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSolucionMantenedorBeneficio = async <T>(
  data: CreateSolucionMantenedorBeneficioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolucionMantenedorBeneficios>(
    '/solucion-mantenedor-beneficio/',
    data,
    true,
  );
};

export const updateSolucionMantenedorBeneficio = async <T>({
  id,
  data,
}: UpdateSolucionMantenedorBeneficioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolucionMantenedorBeneficios>(
    `/solucion-mantenedor-beneficio/${id}/`,
    data,
    true,
  );
};
