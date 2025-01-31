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
  SubtipoMantenedorBeneficios,
  SubtipoMantenedorBeneficiosPaginatedRes,
} from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';

const { get, post, patch } = erpAPI();

export enum SubtipoMantenedorBeneficiosTSQEnum {
  SUBTIPOMANTENEDORBENEFICIOS = 'subtipo-mantenedor-beneficios',
  SUBTIPOMANTENEDORBENEFICIO = 'subtipo-mantenedor-beneficio',
}
///* tanStack query ---------------
export const useFetchSubtipoMantenedorBeneficios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSubtipoMantenedorBeneficiosParams>) => {
  return useQuery({
    queryKey: [
      SubtipoMantenedorBeneficiosTSQEnum.SUBTIPOMANTENEDORBENEFICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSubtipoMantenedorBeneficios(params),
    enabled: enabled,
  });
};

export const useGetSubtipoMantenedorBeneficio = (uuid: string) => {
  return useQuery({
    queryKey: [
      SubtipoMantenedorBeneficiosTSQEnum.SUBTIPOMANTENEDORBENEFICIO,
      uuid,
    ],
    queryFn: () => getSubtipoMantenedorBeneficio(uuid),
    retry: false,
  });
};

export const useCreateSubtipoMantenedorBeneficio = <T>({
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
    mutationFn: (data: CreateSubtipoMantenedorBeneficioParams<T>) =>
      createSubtipoMantenedorBeneficio(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Subtipo Mantenedor Beneficio creado correctamente',
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

export const useUpdateSubtipoMantenedorBeneficio = <T>({
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
    mutationFn: (params: UpdateSubtipoMantenedorBeneficioParams<T>) =>
      updateSubtipoMantenedorBeneficio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          SubtipoMantenedorBeneficiosTSQEnum.SUBTIPOMANTENEDORBENEFICIOS,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Subtipo Mantenedor Beneficio actualizado correctamente',
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
export type GetSubtipoMantenedorBeneficiosParams =
  Partial<SubtipoMantenedorBeneficios> & PagingPartialParams;
export type CreateSubtipoMantenedorBeneficioParams<T> = T;
export type CreateSubtipoMantenedorBeneficioParamsBase = Omit<
  SubtipoMantenedorBeneficios,
  'id'
>;
export interface UpdateSubtipoMantenedorBeneficioParams<T> {
  id: number;
  data: T;
}

export const getSubtipoMantenedorBeneficios = async (
  params?: GetSubtipoMantenedorBeneficiosParams,
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
  return get<SubtipoMantenedorBeneficiosPaginatedRes>(
    `/subtipo-mantenedor-beneficios/?${queryParams}`,
    true,
  );
};

export const getSubtipoMantenedorBeneficio = async (uuid: string) => {
  try {
    return await get<SubtipoMantenedorBeneficios>(
      `/subtipo-mantenedor-beneficios/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSubtipoMantenedorBeneficio = async <T>(
  data: CreateSubtipoMantenedorBeneficioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SubtipoMantenedorBeneficios>(
    '/subtipo-mantenedor-beneficios/',
    data,
    true,
  );
};

export const updateSubtipoMantenedorBeneficio = async <T>({
  id,
  data,
}: UpdateSubtipoMantenedorBeneficioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SubtipoMantenedorBeneficios>(
    `/subtipo-mantenedor-beneficios/${id}/`,
    data,
    true,
  );
};
