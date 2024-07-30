/* eslint-disable indent */
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

import { useAuthStore } from '@/store/auth';
import { ApiResponse } from '../interfaces/common';
import { getEnvs } from '../utils';

const { VITE_ERPAPI_URL, VITE_STORAGEAPI_URL, VITE_CONSULTAAPI_URL } =
  getEnvs();

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
        ? VITE_CONSULTAAPI_URL
        : VITE_ERPAPI_URL;

    const config: AxiosRequestConfig = {
      method: method,
      url: urlApi + url,
      data: data,
      //timeout: 5000,
      responseType: typeJson ? 'json' : 'blob',
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
      // handle ERR_INTERNET_DISCONNECTED error
      console.warn('ERROR ERP API');

      if (isAxiosError(error) && error.response?.status === 401) {
        logout();
      }
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
