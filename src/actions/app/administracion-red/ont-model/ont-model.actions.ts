import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  ONTModel,
  ONTModelsPaginatedRes,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum ONTModelTSQEnum {
  ONTMODELS = 'ont-models',
  ONTMODEL = 'ont-model',
}
///* tanStack query ---------------
export const useFetchONTModels = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetONTModelsParams>) => {
  return useQuery({
    queryKey: [ONTModelTSQEnum.ONTMODELS, ...Object.values(params || {})],
    queryFn: () => getONTModels(params),
    enabled: enabled,
  });
};

export const useGetONTModel = (uuid: string) => {
  return useQuery({
    queryKey: [ONTModelTSQEnum.ONTMODEL, uuid],
    queryFn: () => getONTModel(uuid),
    retry: false,
  });
};

export const useCreateONTModel = <T>({
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
    mutationFn: (params: CreateONTModelParams<T>) => createONTModel(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ONTModelTSQEnum.ONTMODEL],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'ONT Model creado correctamente',
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

export const useUpdateONTModel = <T>({
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
    mutationFn: (params: UpdateONTModelParams<T>) => updateONTModel(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ONTModelTSQEnum.ONTMODELS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'ONT Model actualizado correctamente',
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
export type GetONTModelsParams = Partial<ONTModel> & PagingPartialParams;
export type CreateONTModelParams<T> = T;
export type CreateONTModelParamsBase = Omit<ONTModel, 'id'>;
export interface UpdateONTModelParams<T> {
  id: number;
  data: T;
}

export const getONTModels = async (params?: GetONTModelsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ONTModelsPaginatedRes>(`/ont-model/?${queryParams}`, true);
};

export const getONTModel = async (uuid: string) => {
  try {
    return await get<ONTModel>(`/ont-model/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createONTModel = async <T>(data: CreateONTModelParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<ONTModel>('/ont-model/', data, true);
};

export const updateONTModel = async <T>({
  id,
  data,
}: UpdateONTModelParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<ONTModel>(`/ont-model/${id}/`, data, true);
};
