import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios/axios.utils';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParams,
  SolicitudRecoordinacionAgenda,
  SolicitudesRecoordinacionAgendaPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum SolicitudRecoordinacionAgendaTSQEnum {
  SOLICITUDRECOORDINACIONAGENDAS = 'solicitud-recoordinacion-agendas',
  SOLICITUDRECOORDINACIONAGENDA = 'solicitud-recoordinacion-agenda',
}
///* tanStack query ---------------
export const useFetchSolicitudRecoordinacionAgendas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudRecoordinacionAgendasParams>) => {
  return useQuery({
    queryKey: [
      SolicitudRecoordinacionAgendaTSQEnum.SOLICITUDRECOORDINACIONAGENDAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudRecoordinacionAgendas(params),
    enabled: enabled,
  });
};

export const useGetSolicitudRecoordinacionAgenda = (uuid: string) => {
  return useQuery({
    queryKey: [
      SolicitudRecoordinacionAgendaTSQEnum.SOLICITUDRECOORDINACIONAGENDA,
      uuid,
    ],
    queryFn: () => getSolicitudRecoordinacionAgenda(uuid),
    retry: false,
  });
};

export const useCreateSolicitudRecoordinacionAgenda = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateSolicitudRecoordinacionAgendaParams<T>) =>
      createSolicitudRecoordinacionAgenda(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [
          SolicitudRecoordinacionAgendaTSQEnum.SOLICITUDRECOORDINACIONAGENDAS,
        ],
      });
      customOnSuccess && customOnSuccess(res);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'SolicitudRecoordinacionAgenda creado correctamente',
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

export const useUpdateSolicitudRecoordinacionAgenda = <T>({
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
    mutationFn: (params: UpdateSolicitudRecoordinacionAgendaParams<T>) =>
      updateSolicitudRecoordinacionAgenda(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          SolicitudRecoordinacionAgendaTSQEnum.SOLICITUDRECOORDINACIONAGENDAS,
        ],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'SolicitudRecoordinacionAgenda actualizado correctamente',
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
export type GetSolicitudRecoordinacionAgendasParams =
  Partial<SolicitudRecoordinacionAgenda> & PagingPartialParams;
export type CreateSolicitudRecoordinacionAgendaParams<T> = T;
export type CreateSolicitudRecoordinacionAgendaParamsBase = Omit<
  SolicitudRecoordinacionAgenda,
  'id'
>;
export interface UpdateSolicitudRecoordinacionAgendaParams<T> {
  id: number;
  data: T;
}

export const getSolicitudRecoordinacionAgendas = async (
  params?: GetSolicitudRecoordinacionAgendasParams,
) => {
  const stateParams = { ...params };
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<SolicitudesRecoordinacionAgendaPaginatedRes>(
    `/solicitud-recoordinacion-agenda/?${queryParams}`,
    true,
  );
};

export const getSolicitudRecoordinacionAgenda = async (uuid: string) => {
  try {
    return await get<SolicitudRecoordinacionAgenda>(
      `/solicitud-recoordinacion-agenda/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSolicitudRecoordinacionAgenda = async <T>(
  data: CreateSolicitudRecoordinacionAgendaParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudRecoordinacionAgenda>(
    '/solicitud-recoordinacion-agenda/',
    data,
    true,
  );
};

export const updateSolicitudRecoordinacionAgenda = async <T>({
  id,
  data,
}: UpdateSolicitudRecoordinacionAgendaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudRecoordinacionAgenda>(
    `/solicitud-recoordinacion-agenda/${id}/`,
    data,
    true,
  );
};

///* action types ---------------
export type CreateSolRecoordinacionAgenda = Pick<
  SolicitudRecoordinacionAgenda,
  'descripcion'
> & { agendamiento: number };

export type RejectSolRecoordinacionAgenda = Pick<
  SolicitudRecoordinacionAgenda,
  'descripcion'
> & { agendamiento: number };
