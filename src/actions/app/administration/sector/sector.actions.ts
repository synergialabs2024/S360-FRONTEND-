import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  Sector,
  SectoresPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum SectorTSQEnum {
  SECTORS = 'sectors',
  SECTOR = 'sector',
}
///* tanStack query ---------------
export const useFetchSectores = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSectorsParams>) => {
  return useQuery({
    queryKey: [SectorTSQEnum.SECTORS, ...Object.values(params || {})],
    queryFn: () => getSectors(params),
    enabled: enabled,
  });
};

export const useGetSector = (uuid: string) => {
  return useQuery({
    queryKey: ['sector', uuid],
    queryFn: () => getSector(uuid),
    retry: false,
  });
};

export const useCreateSector = ({
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
    mutationFn: createSector,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sectors'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Sector creado correctamente',
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

export const useUpdateSector = <T>({
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
    mutationFn: (params: UpdateSectorParams<T>) => updateSector(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sectors'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Sector actualizado correctamente',
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
export type GetSectorsParams = Partial<Sector> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateSectorParams = Omit<Sector, 'id'>;
export interface UpdateSectorParams<T> {
  id: number;
  data: T;
}

export const getSectors = async (params?: GetSectorsParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<SectoresPaginatedRes>(`/sector/?${queryParams}`, true);
};

export const getSector = async (uuid: string) => {
  try {
    return await get<Sector>(`/sector/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSector = async (data: CreateSectorParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Sector>('/sector/', data, true);
};

export const updateSector = async <T>({ id, data }: UpdateSectorParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Sector>(`/sector/${id}/`, data, true);
};
