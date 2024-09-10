import { useQuery } from '@tanstack/react-query';

import { handleAxiosError } from '@/shared/axios';

import { erpAPI } from '@/shared/axios/erp-api';
import {
  TrazabilidadVenta,
  trazabilidadVentasPaginatedRes,
  UseFetchEnabledParams,
} from '@/shared';
import { getUrlParams } from '@/shared/utils';

const { get } = erpAPI();

export enum trazabilidadVentaTSQEnum {
  TRAZABILIDADVENTAS = 'trazabilidades-venta',
  TRAZABILIDADVENTA = 'trazabilidad-venta',
}
///* tanStack query ---------------
export const useFetchTrazabilidadVentas = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetTrazabilidadVentasParams>) => {
  return useQuery({
    queryKey: [
      trazabilidadVentaTSQEnum.TRAZABILIDADVENTAS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getTrazabilidadVentas(params),
    enabled: enabled,
  });
};

export const useGetTrazabilidadVenta = (uuid: string) => {
  return useQuery({
    queryKey: [trazabilidadVentaTSQEnum.TRAZABILIDADVENTA, uuid],
    queryFn: () => getTrazabilidadVenta(uuid),
    retry: false,
  });
};

///* axios ---------------
export type GetTrazabilidadVentasParams = Partial<TrazabilidadVenta> & {
  page?: number;
  page_size?: number;
};

export const getTrazabilidadVentas = async (
  params?: GetTrazabilidadVentasParams,
) => {
  const stateParams = { ...params };
  const queryParams = getUrlParams(stateParams);
  return get<trazabilidadVentasPaginatedRes>(
    `/trazabilidadventa/?${queryParams}`,
    true,
  );
};

export const getTrazabilidadVenta = async (uuid: string) => {
  try {
    return await get<TrazabilidadVenta>(`/trazabilidadventa/${uuid}`, true);
  } catch (error) {
    handleAxiosError(error);
  }
};
