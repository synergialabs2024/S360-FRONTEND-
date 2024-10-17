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
import { useUiStore } from '@/store/ui';
import {
  OnusConfigurada,
  onusConfiguradasPaginatedRes,
} from '@/shared/interfaces/app/netconnect';

const { get, post, patch } = erpAPI();

export enum onusConfiguradaTSQEnum {
  ONUSCONFIGURADAS = 'onus-configuradas',
  ONUSCONFIGURADA = 'onus-configurada',
}
///* tanStack query ---------------
export const useFetchOnusConfiguradas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetOnusConfiguradasParams>) => {
  return useQuery({
    queryKey: [
      onusConfiguradaTSQEnum.ONUSCONFIGURADAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getOnusConfiguradas(params),
    enabled: enabled,
  });
};

export const useGetOnusConfigurada = (uuid: string) => {
  return useQuery({
    queryKey: [onusConfiguradaTSQEnum.ONUSCONFIGURADA, uuid],
    queryFn: () => getOnusConfigurada(uuid),
    retry: false,
  });
};

export const useCreateOnusConfigurada = <T>({
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
    mutationFn: (params: CreateOnusConfiguradaParams<T>) =>
      createOnusConfigurada(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [onusConfiguradaTSQEnum.ONUSCONFIGURADA],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'OnusConfigurada creado correctamente',
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

export const useUpdateOnusConfigurada = <T>({
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
    mutationFn: (params: UpdateOnusConfiguradaParams<T>) =>
      updateOnusConfigurada(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [onusConfiguradaTSQEnum.ONUSCONFIGURADAS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'OnusConfigurada actualizado correctamente',
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
export type GetOnusConfiguradasParams = Partial<OnusConfigurada> &
  PagingPartialParams;
export type CreateOnusConfiguradaParams<T> = T;
export type CreateOnusConfiguradaParamsBase = Omit<OnusConfigurada, 'id'>;
export interface UpdateOnusConfiguradaParams<T> {
  id: number;
  data: T;
}

export const getOnusConfiguradas = async (
  params?: GetOnusConfiguradasParams,
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
  return get<onusConfiguradasPaginatedRes>(
    `/onus-configurada/?${queryParams}`,
    true,
  );
};

export const getOnusConfigurada = async (uuid: string) => {
  try {
    return await get<OnusConfigurada>(`/onus-configurada/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createOnusConfigurada = async <T>(
  data: CreateOnusConfiguradaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<OnusConfigurada>('/onus-configurada/', data, true);
};

export const updateOnusConfigurada = async <T>({
  id,
  data,
}: UpdateOnusConfiguradaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<OnusConfigurada>(`/onus-configurada/${id}/`, data, true);
};
