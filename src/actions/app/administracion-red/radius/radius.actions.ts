import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  Radius,
  RadiusSPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum RadiusTSQEnum {
  RADIUSS = 'radiuss',
  RADIUS = 'radius',
}
///* tanStack query ---------------
export const useFetchRadiuss = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetRadiussParams>) => {
  return useQuery({
    queryKey: [RadiusTSQEnum.RADIUSS, ...Object.values(params || {})],
    queryFn: () => getRadiuss(params),
    enabled: enabled,
  });
};

export const useGetRadius = (uuid: string) => {
  return useQuery({
    queryKey: [RadiusTSQEnum.RADIUS, uuid],
    queryFn: () => getRadius(uuid),
    retry: false,
  });
};

export const useCreateRadius = <T>({
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
    mutationFn: (params: CreateRadiusParams<T>) => createRadius(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RadiusTSQEnum.RADIUS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Radius creado correctamente',
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

export const useUpdateRadius = <T>({
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
    mutationFn: (params: UpdateRadiusParams<T>) => updateRadius(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RadiusTSQEnum.RADIUSS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Radius actualizado correctamente',
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
export type GetRadiussParams = Partial<Radius> & PagingPartialParams;
export type CreateRadiusParams<T> = T;
export type CreateRadiusParamsBase = Omit<Radius, 'id'>;
export interface UpdateRadiusParams<T> {
  id: number;
  data: T;
}

export const getRadiuss = async (params?: GetRadiussParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<RadiusSPaginatedRes>(`/radius/?${queryParams}`, true);
};

export const getRadius = async (uuid: string) => {
  try {
    return await get<Radius>(`/radius/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createRadius = async <T>(data: CreateRadiusParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Radius>('/radius/', data, true);
};

export const updateRadius = async <T>({ id, data }: UpdateRadiusParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Radius>(`/radius/${id}/`, data, true);
};
