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
import { Vlan, VlansPaginatedRes } from '@/shared/interfaces/app/netconnect';

const { get, post, patch } = erpAPI();

export enum VlanTSQEnum {
  VLANS = 'vlans',
  VLAN = 'vlan',
}
///* tanStack query ---------------
export const useFetchVlans = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetVlansParams>) => {
  return useQuery({
    queryKey: [VlanTSQEnum.VLANS, ...Object.values(params || {})],
    queryFn: () => getVlans(params),
    enabled: enabled,
  });
};

export const useGetVlan = (uuid: string) => {
  return useQuery({
    queryKey: [VlanTSQEnum.VLAN, uuid],
    queryFn: () => getVlan(uuid),
    retry: false,
  });
};

export const useCreateVlan = <T>({
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
    mutationFn: (params: CreateVlanParams<T>) => createVlan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VlanTSQEnum.VLAN] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'Vlan creado correctamente');
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

export const useUpdateVlan = <T>({
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
    mutationFn: (params: UpdateVlanParams<T>) => updateVlan(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [VlanTSQEnum.VLANS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Vlan actualizado correctamente',
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
export type GetVlansParams = Partial<Vlan> & PagingPartialParams;
export type CreateVlanParams<T> = T;
export type CreateVlanParamsBase = Omit<Vlan, 'id'>;
export interface UpdateVlanParams<T> {
  id: number;
  data: T;
}

export const getVlans = async (params?: GetVlansParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<VlansPaginatedRes>(`/vlan/?${queryParams}`, true);
};

export const getVlan = async (uuid: string) => {
  try {
    return await get<Vlan>(`/vlan/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createVlan = async <T>(data: CreateVlanParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Vlan>('/vlan/', data, true);
};

export const updateVlan = async <T>({ id, data }: UpdateVlanParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Vlan>(`/vlan/${id}/`, data, true);
};
