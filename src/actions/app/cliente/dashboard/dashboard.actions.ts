import { useQuery } from '@tanstack/react-query';

import { erpAPI } from '@/shared/axios/erp-api';
import { Dashboard } from '@/shared/interfaces/app/cliente/dashboard/dashboard.interface';
import { getUrlParams, UseFetchEnabledParams } from '@/shared';

const { get } = erpAPI();

export enum DashboardTSQEnum {
  DASHBOARDS = 'dashboards',
  DASHBOARD = 'dashboard',
}
///* tanStack query ---------------
export const useFetchDashboards = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetDashboardsParams>) => {
  return useQuery({
    queryKey: [DashboardTSQEnum.DASHBOARDS, ...Object.values(params || {})],
    queryFn: () => getDashboards(params),
    enabled: enabled,
  });
};

///* axios ---------------
export type GetDashboardsParams = Partial<Dashboard> & {
  page?: number;
  page_size?: number;

  start_date: string;
  end_date: string;

  filterByState?: boolean;
};

export type CreateDashboardParams = Omit<Dashboard, 'id'>;

export const getDashboards = async (params?: GetDashboardsParams) => {
  const stateParams = { ...params };

  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<Dashboard>(`/cliente/dashboard/?${queryParams}`, true);
};
