/* eslint-disable indent */
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

import { useAuthStore } from '@/store/auth';
import { ApiResponse, HTTPResStatusCodeEnum } from '../interfaces/common';
import { getEnvs } from '../utils';
import { ToastWrapper } from '../wrappers';

const { VITE_ERPAPI_URL, VITE_STORAGEAPI_URL, VITE_CONSULTAS_URL } = getEnvs();

export type ErpApiParams = {
  isStorageApi?: boolean;
  isCedulaRucApi?: boolean;
};

export const erpAPI = ({
  isStorageApi = false,
  isCedulaRucApi = false,
}: ErpApiParams = {}) => {
  const sendRequest = async <T>(
    method: string,
    url: string,
    auth: boolean,
    typeJson: boolean = true,
    data = null,
  ): Promise<ApiResponse<T>> => {
    const storedToken = useAuthStore.getState().token;
    const logout = useAuthStore.getState().onLogOutWithoutToken;

    // calc url
    const urlApi = isStorageApi
      ? VITE_STORAGEAPI_URL
      : isCedulaRucApi
        ? VITE_CONSULTAS_URL
        : VITE_ERPAPI_URL;

    const config: AxiosRequestConfig = {
      method: method,
      url: urlApi + url,
      data: data,
      responseType: typeJson ? 'json' : 'blob',
      timeout: 60000, // 1 minuto
    };

    if (auth) {
      config.headers = {
        Authorization: 'Token ' + storedToken,
      };
    }
    if (isStorageApi) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }

    let dataResp;
    try {
      dataResp = (await axios<ApiResponse<T>>(config)).data;

      return dataResp;
    } catch (error) {
      if ((error as any).code === 'ERR_NETWORK') {
        ToastWrapper.error('Error de conexión, por favor verifica tu red');
        throw error;
      }
      if ((error as any)?.code === 'ECONNABORTED') {
        ToastWrapper.error(
          'El servidor no responde, por favor intenta más tarde',
        );
        throw error;
      }
      if (!isAxiosError(error)) {
        ToastWrapper.error('Error en el servidor');
        throw error;
      }

      if (error.response?.status === HTTPResStatusCodeEnum.UNAUTHORIZED) {
        logout();
        ToastWrapper.error('Sesión expirada');
        throw new Error('UNAUTHORIZED');
      }
      if (error.response?.status === HTTPResStatusCodeEnum.FORBIDDEN) {
        logout();
        ToastWrapper.error('No tienes permisos para realizar esta acción');
        throw new Error('FORBIDDEN');
      }

      // to be handled by handleAxiosError
      throw error;
    }
  };

  const get = async function <T>(
    url: string,
    auth: boolean,
    typeJson: boolean = true,
  ): Promise<ApiResponse<T>> {
    return sendRequest<T>('GET', url, auth, typeJson);
  };

  const post = async function <T>(
    url: string,
    data: any,
    auth: boolean,
    typeJson: boolean = true,
  ): Promise<ApiResponse<T>> {
    return sendRequest<T>('POST', url, auth, typeJson, data);
  };

  const put = async function <T>(
    url: string,
    data: any,
    auth: boolean,
    typeJson: boolean = true,
  ): Promise<ApiResponse<T>> {
    return sendRequest<T>('PUT', url, auth, typeJson, data);
  };

  const patch = async function <T>(
    url: string,
    data: any,
    auth: boolean,
    typeJson: boolean = true,
  ): Promise<ApiResponse<T>> {
    return sendRequest<T>('PATCH', url, auth, typeJson, data);
  };

  const remove = async function <T>(
    url: string,
    auth: boolean,
    typeJson: boolean = true,
  ): Promise<ApiResponse<T>> {
    return sendRequest<T>('DELETE', url, auth, typeJson);
  };

  return {
    get,
    post,
    put,
    patch,
    remove,
  };
};
