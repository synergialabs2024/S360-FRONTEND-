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
  BeneficioMantenedorBeneficios,
  BeneficioMantenedorBeneficiosPaginatedRes,
} from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';

const { get, post, patch } = erpAPI();

export enum BeneficioMantenedorBeneficiosTSQEnum {
  BENEFICIOMANTENEDORBENEFICIOS = 'beneficio-mantenedor-beneficios',
  BENEFICIOMANTENEDORBENEFICIO = 'beneficio-mantenedor-beneficio',
}
///* tanStack query ---------------
export const useFetchBeneficioMantenedorBeneficios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetBeneficioMantenedorBeneficiosParams>) => {
  return useQuery({
    queryKey: [
      BeneficioMantenedorBeneficiosTSQEnum.BENEFICIOMANTENEDORBENEFICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getBeneficioMantenedorBeneficios(params),
    enabled: enabled,
  });
};

export const useGetBeneficioMantenedorBeneficio = (uuid: string) => {
  return useQuery({
    queryKey: [
      BeneficioMantenedorBeneficiosTSQEnum.BENEFICIOMANTENEDORBENEFICIO,
      uuid,
    ],
    queryFn: () => getBeneficioMantenedorBeneficio(uuid),
    retry: false,
  });
};

export const useCreateBeneficioMantenedorBeneficio = <T>({
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
    mutationFn: (data: CreateBeneficioMantenedorBeneficioParams<T>) =>
      createBeneficioMantenedorBeneficio(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Beneficio Mantenedor Beneficios creado correctamente',
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

export const useUpdateBeneficioMantenedorBeneficio = <T>({
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
    mutationFn: (params: UpdateBeneficioMantenedorBeneficioParams<T>) =>
      updateBeneficioMantenedorBeneficio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          BeneficioMantenedorBeneficiosTSQEnum.BENEFICIOMANTENEDORBENEFICIOS,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Beneficio Mantenedor Beneficios actualizado correctamente',
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
export type GetBeneficioMantenedorBeneficiosParams =
  Partial<BeneficioMantenedorBeneficios> & PagingPartialParams;
export type CreateBeneficioMantenedorBeneficioParams<T> = T;
export type CreateBeneficioMantenedorBeneficioParamsBase = Omit<
  BeneficioMantenedorBeneficios,
  'id'
>;
export interface UpdateBeneficioMantenedorBeneficioParams<T> {
  id: number;
  data: T;
}

export const getBeneficioMantenedorBeneficios = async (
  params?: GetBeneficioMantenedorBeneficiosParams,
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
  return get<BeneficioMantenedorBeneficiosPaginatedRes>(
    `/beneficio-mantenedor-beneficios/?${queryParams}`,
    true,
  );
};

export const getBeneficioMantenedorBeneficio = async (uuid: string) => {
  try {
    return await get<BeneficioMantenedorBeneficios>(
      `/beneficio-mantenedor-beneficios/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createBeneficioMantenedorBeneficio = async <T>(
  data: CreateBeneficioMantenedorBeneficioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<BeneficioMantenedorBeneficios>(
    '/beneficio-mantenedor-beneficios/',
    data,
    true,
  );
};

export const updateBeneficioMantenedorBeneficio = async <T>({
  id,
  data,
}: UpdateBeneficioMantenedorBeneficioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<BeneficioMantenedorBeneficios>(
    `/beneficio-mantenedor-beneficios/${id}/`,
    data,
    true,
  );
};
