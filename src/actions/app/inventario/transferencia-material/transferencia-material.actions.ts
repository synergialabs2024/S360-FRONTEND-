import {
  TransferenciaMaterial,
  TransferenciaMaterialesPaginatedRes,
  getUrlParams,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import { useProductosStore } from '@/store/app';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum TransferenciaMaterialTSQEnum {
  TRANSFERENCIAMATERIALES = 'transferencia-materiales',
  TRANSFERENCIAMATERIAL = 'transferencia-material',
}

///* tanStack query
export const useFetchTransferenciaMateriales = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTransferenciaMaterialesParams>) => {
  return useQuery({
    queryKey: [
      TransferenciaMaterialTSQEnum.TRANSFERENCIAMATERIALES,
      ...Object.values(params || {}),
    ],
    queryFn: () => getTransferenciaMateriales(params),
    enabled: enabled,
  });
};

export const useGetTransferenciaMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [TransferenciaMaterialTSQEnum.TRANSFERENCIAMATERIAL, uuid],
    queryFn: () => getTransferenciaMaterial(uuid),
    retry: false,
  });
};

export const useCreateTransferenciaMaterial = <T>({
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
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

  return useMutation({
    mutationFn: (params: CreateTransferenciaMaterialParams<T>) =>
      createTransferenciaMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransferenciaMaterialTSQEnum.TRANSFERENCIAMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Transferencia Material creado correctamente',
        );
      productosEnviar([]);
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

export const useUpdateTransferenciaMaterial = <T>({
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
    mutationFn: (params: UpdateTransferenciaMaterialParams<T>) =>
      updateTransferenciaMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransferenciaMaterialTSQEnum.TRANSFERENCIAMATERIALES],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Transferencia Material actualizado correctamente',
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
///* axios
export type GetTransferenciaMaterialesParams =
  Partial<TransferenciaMaterial> & {
    page?: number;
    page_size?: number;

    filterByState?: boolean;
  };
export type CreateTransferenciaMaterialParams<T> = T;
export type CreateTransferenciaMaterialParamsBase = Omit<
  TransferenciaMaterial,
  'id'
>;
export interface UpdateTransferenciaMaterialParams<T> {
  id: number;
  data: T;
}

export const getTransferenciaMateriales = async (
  params?: GetTransferenciaMaterialesParams,
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
  return get<TransferenciaMaterialesPaginatedRes>(
    `/transferencia-material/?${queryParams}`,
    true,
  );
};

export const getTransferenciaMaterial = async (uuid: string) => {
  try {
    return await get<TransferenciaMaterial>(
      `/transferencia-material/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createTransferenciaMaterial = async <T>(
  data: CreateTransferenciaMaterialParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<TransferenciaMaterial>('/transferencia-material/', data, true);
};

export const updateTransferenciaMaterial = async <T>({
  id,
  data,
}: UpdateTransferenciaMaterialParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<TransferenciaMaterial>(
    `/transferencia-material/${id}/`,
    data,
    true,
  );
};
