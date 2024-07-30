import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { erpAPI, handleAxiosError } from '@/shared/axios';
import {
  Area,
  AreasPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { get, post, patch } = erpAPI();

export enum AreaTSQEnum {
  AREAS = 'areas',
  AREA = 'area',
}
///* tanStack query ---------------
export const useFetchAreas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetAreasParams>) => {
  return useQuery({
    queryKey: [AreaTSQEnum.AREAS, ...Object.values(params || {})],
    queryFn: () => getAreas(params),
    enabled: enabled,
  });
};

export const useGetArea = (uuid: string) => {
  return useQuery({
    queryKey: ['area', uuid],
    queryFn: () => getArea(uuid),
    retry: false,
  });
};

export const useCreateArea = ({
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
    mutationFn: createArea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(customMessageToast || 'Area creado correctamente');
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

export const useUpdateArea = <T>({
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
    mutationFn: (params: UpdateAreaParams<T>) => updateArea(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Area actualizado correctamente',
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
export type GetAreasParams = Partial<Area> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateAreaParams = Omit<Area, 'id'>;
export interface UpdateAreaParams<T> {
  id: number;
  data: T;
}

export const getAreas = async (params?: GetAreasParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<AreasPaginatedRes>(`/area/?${queryParams}`, true);
};

export const getArea = async (uuid: string) => {
  try {
    return await get<Area>(`/area/uuid/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createArea = async (data: CreateAreaParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Area>('/area/', data, true);
};

export const updateArea = async <T>({ id, data }: UpdateAreaParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Area>(`/area/${id}/`, data, true);
};
