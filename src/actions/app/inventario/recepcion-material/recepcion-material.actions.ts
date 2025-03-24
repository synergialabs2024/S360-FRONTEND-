import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { erpAPI } from '@/axios/erp-api';
import { useUiStore } from '@/store/ui';

import { solicitudMaterialTSQEnum } from '../solicitud-material';
import { RecepcionMaterial, ToastWrapper, UseMutationParams } from '@/shared';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get, patch, post } = erpAPI();

export const useGetRecepcionMaterial = (uuid: string) => {
  return useQuery({
    queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIAL, uuid],
    queryFn: () => getRecepcionMaterial(uuid),
    retry: false,
  });
};

export const useUpdateRecepcionMaterial = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: UpdateRecepcionMaterialParams<T>) =>
      updateRecepcionMaterial(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [solicitudMaterialTSQEnum.SOLICITUDMATERIALES],
      });
      enableToast &&
        ToastWrapper.success(
          customMessageToast ||
            'Solicitud de Material actualizado correctamente',
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
export type GetRecepcionMaterialParams = Partial<RecepcionMaterial> & {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
export type CreateRecepcionMaterialParams<T> = T;
export type CreateRecepcionMaterialParamsBase = Omit<
  RecepcionMaterial,
  'id'
> & { id?: number };
export interface UpdateRecepcionMaterialParams<T> {
  id: number;
  data: T;
}

export const getRecepcionMaterial = async (uuid: string) => {
  try {
    return await get<RecepcionMaterial>(`/solicitud-material/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createRecepcionMaterial = async <T>(
  data: CreateRecepcionMaterialParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<RecepcionMaterial>('/solicitud-material/', data, true);
};

export const updateRecepcionMaterial = async <T>({
  id,
  data,
}: UpdateRecepcionMaterialParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<RecepcionMaterial>(`/solicitud-material/${id}/`, data, true);
};
