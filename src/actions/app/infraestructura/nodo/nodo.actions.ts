import {
  getUrlParams,
  handleAxiosError,
  ToastWrapper,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  Nodo,
  NodosPaginatedRes,
} from '@/shared/interfaces/app/infraestructura';
import { useUiStore } from '@/store/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { get, post, patch } = erpAPI();

export enum NodoTSQEnum {
  NODOS = 'nodos',
  NODO = 'nodo',
}
///* tanStack query ---------------
export const useFetchNodos = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetNodosParams>) => {
  return useQuery({
    queryKey: [NodoTSQEnum.NODOS, ...Object.values(params || {})],
    queryFn: () => getNodos(params),
    enabled: enabled,
  });
};

export const useGetNodo = (uuid: string) => {
  return useQuery({
    queryKey: [NodoTSQEnum.NODO, uuid],
    queryFn: () => getNodo(uuid),
    retry: false,
  });
};

export const useCreateNodo = <T>({
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
    mutationFn: (params: CreateNodoParams<T>) => createNodo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NodoTSQEnum.NODOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'Nodo creado correctamente');
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

export const useUpdateNodo = <T>({
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
    mutationFn: (params: UpdateNodoParams<T>) => updateNodo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NodoTSQEnum.NODOS] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Nodo actualizado correctamente',
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
export type GetNodosParams = Partial<Nodo> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateNodoParams<T> = T;
export type CreateNodoParamsBase = Omit<Nodo, 'id'>;
export interface UpdateNodoParams<T> {
  id: number;
  data: T;
}

export const getNodos = async (params?: GetNodosParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<NodosPaginatedRes>(`/nodo/?${queryParams}`, true);
};

export const getNodo = async (uuid: string) => {
  try {
    return await get<Nodo>(`/nodo/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createNodo = async <T>(data: CreateNodoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Nodo>('/nodo/', data, true);
};

export const updateNodo = async <T>({ id, data }: UpdateNodoParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Nodo>(`/nodo/${id}/`, data, true);
};
