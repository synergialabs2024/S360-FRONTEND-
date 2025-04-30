import { useQuery } from '@tanstack/react-query';

import {
  getUrlParams,
  PagingPartialParams,
  PagoOficinaVirtualLog,
  UseFetchEnabledParams,
  PagoOficinaVirtualLogsPaginatedRes,
} from '@/shared';
import { erpAPI } from '@/shared/axios/erp-api';
import { handleAxiosError } from '@/shared/axios/axios.utils';

const { get } = erpAPI();

export enum PagoOficinaVirtualLogTSQEnum {
  PAGOOFICINAVIRTUALLOGS = 'pago-oficina-virtual-logs',
  PAGOOFICINAVIRTUALLOG = 'pago-oficina-virtual-log',
}

///* tanStack query ---------------
export const useFetchPagoOficinaVirtualLogs = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetPagoOficinaVirtualLogsParams>) => {
  return useQuery({
    queryKey: [
      PagoOficinaVirtualLogTSQEnum.PAGOOFICINAVIRTUALLOGS,
      ...Object.values(params || {}),
    ],
    queryFn: () => getPagoOficinaVirtualLogs(params),
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

export const useGetPagoOficinaVirtualLog = (uuid: string) => {
  return useQuery({
    queryKey: [PagoOficinaVirtualLogTSQEnum.PAGOOFICINAVIRTUALLOG, uuid],
    queryFn: () => getPagoOficinaVirtualLog(uuid),
    retry: false,
  });
};

///* axios ---------------
export type GetPagoOficinaVirtualLogsParams = Partial<PagoOficinaVirtualLog> &
  PagingPartialParams;

export const getPagoOficinaVirtualLogs = async (
  params?: GetPagoOficinaVirtualLogsParams,
) => {
  const stateParams = { ...params };

  const queryParams = getUrlParams(stateParams);
  return get<PagoOficinaVirtualLogsPaginatedRes>(
    `/abitmedia-pagos-log/?${queryParams}`,
    true,
  );
};

export const getPagoOficinaVirtualLog = async (uuid: string) => {
  try {
    return await get<PagoOficinaVirtualLog>(
      `/abitmedia-pagos-log/${uuid}`,
      true,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};
