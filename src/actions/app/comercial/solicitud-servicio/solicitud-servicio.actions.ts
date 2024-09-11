import { ToastWrapper } from '@/shared/wrappers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';

import { CreateCedulaCitizenParams } from '@/actions/consultas-api';
import { EquifaxEdentificationType, OtpStatesEnumChoice } from '@/shared';
import { erpAPI } from '@/shared/axios/erp-api';
import {
  PagingPartialParamsOnly,
  SolicitudServicio,
  SolicitudServiciosPaginatedRes,
  UseFetchEnabledParams,
  UseMutationParams,
} from '@/shared/interfaces';
import { EquifaxServicioCedula } from '@/shared/interfaces/consultas-api';
import { getUrlParams } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import { CodigoOtpTSQEnum } from '../codigo-otp';

const { get, post, patch } = erpAPI();

export enum SolicitudServicioTSQEnum {
  SOLICITUDSERVICIOS = 'solicitud-servicios',
  SOLICITUDSERVICIO = 'solicitud-servicio',
}
///* tanStack query ---------------
export const useFetchSolicitudServicios = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetSolicitudServiciosParams>) => {
  return useQuery({
    queryKey: [
      SolicitudServicioTSQEnum.SOLICITUDSERVICIOS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getSolicitudServicios(params),
    enabled: enabled,
  });
};

export const useGetSolicitudServicio = (uuid: string) => {
  return useQuery({
    queryKey: [SolicitudServicioTSQEnum.SOLICITUDSERVICIO, uuid],
    queryFn: () => getSolicitudServicio(uuid),
    retry: false,
  });
};

export const useCreateSolicitudServicio = <T>({
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
    mutationFn: (params: CreateSolicitudServicioParams<T>) =>
      createSolicitudServicio(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [SolicitudServicioTSQEnum.SOLICITUDSERVICIOS],
      });
      customOnSuccess && customOnSuccess(res.data);
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Solicitud Servicio creado correctamente',
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

export const useUpdateSolicitudServicio = <T>({
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
    mutationFn: (params: UpdateSolicitudServicioParams<T>) =>
      updateSolicitudServicio(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SolicitudServicioTSQEnum.SOLICITUDSERVICIOS],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Solicitud Servicio actualizado correctamente',
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
export type GetSolicitudServiciosParams = Partial<SolicitudServicio> &
  PagingPartialParamsOnly;
export type CreateSolicitudServicioParams<T> = T;
export type CreateSolicitudServicioParamsBase = Omit<SolicitudServicio, 'id'>;
export interface UpdateSolicitudServicioParams<T> {
  id: number;
  data: T;
}

export const getSolicitudServicios = async (
  params?: GetSolicitudServiciosParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<SolicitudServiciosPaginatedRes>(
    `/solicitudservicio/?${queryParams}`,
    true,
  );
};

export const getSolicitudServicio = async (uuid: string) => {
  try {
    return await get<SolicitudServicio>(`/solicitudservicio/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createSolicitudServicio = async <T>(
  data: CreateSolicitudServicioParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<SolicitudServicio>('/solicitudservicio/', data, true);
};

export const updateSolicitudServicio = async <T>({
  id,
  data,
}: UpdateSolicitudServicioParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<SolicitudServicio>(`/solicitudservicio/${id}/`, data, true);
};

/////* consulta cedula ---------------------
export type ValidateIdentificacionParams = {
  identificacion: string;
};

export const useValidateCedulaSolService = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
  customOnError,
}: UseMutationParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateCedulaCitizenParams<T>) =>
      validateCedulaSolService(params),
    onSuccess: res => {
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      customOnSuccess && customOnSuccess(res?.data);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Cédula validada correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      if (customOnError) {
        customOnError(error);
        return;
      }
      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const validateCedulaSolService = async <T>(
  data: CreateCedulaCitizenParams<T>,
) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post('/solicitudservicio/validate/identificacion/', data, true);
};

/////* consulta equifax ---------------------
export type ConsultarEquifaxParams = {
  identificacion: string;
  tipo_identificacion: EquifaxEdentificationType;
};

export const useConsultarEquifax = ({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
  customOnSuccess,
  customOnError,
}: UseMutationParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: ConsultarEquifaxParams) => consultaEquifax(params),
    onSuccess: res => {
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      customOnSuccess && customOnSuccess(res);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Equifax consultado correctamente',
        );
    },
    onError: error => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        navigate(returnErrorUrl || returnUrl || '');

      if (customOnError) {
        customOnError(error);
        return;
      }

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const consultaEquifax = async (
  data: ConsultarEquifaxParams,
): Promise<EquifaxServicioCedula> => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  const { data: data2 } = await post<EquifaxServicioCedula>(
    '/solicitudservicio/buro/identificacion/',
    data,
    true,
  );

  return data2;
};

/////* OPT code -------------------------------
// create OTP
export type GenerateOtpCodeParams = {
  identificacion: string;
  celular: string;
};
export const createOtpCode = async (data: GenerateOtpCodeParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post('/solicitudservicio/otp/', data, true);
};
export const useCreateOtpCode = ({
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
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: GenerateOtpCodeParams) => createOtpCode(params),
    onSuccess: res => {
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      customOnSuccess && customOnSuccess(res);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Código OTP generado correctamente',
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

// validate OTP
export type ValidateOtpCodeParams = {
  identificacion: string;
  codigo_otp: string;
};
export const validateOtpCode = async (data: ValidateOtpCodeParams) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post('/solicitudservicio/otp/validate/', data, true);
};
export const useValidateOtpCode = ({
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
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ValidateOtpCodeParams) => validateOtpCode(params),
    onSuccess: res => {
      queryClient.invalidateQueries({
        queryKey: [CodigoOtpTSQEnum.CODIGOS_OTP],
      });
      enableNavigate && navigate && returnUrl && navigate(returnUrl);
      customOnSuccess && customOnSuccess(res);
      enableToast &&
        ToastWrapper.success(
          customMessageToast || 'Código OTP validado correctamente',
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

// request unlock OTP
export type RequestUnlockOtpCodeParams = {
  estado_otp: OtpStatesEnumChoice;
};
