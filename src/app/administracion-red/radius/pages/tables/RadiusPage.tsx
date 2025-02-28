import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';

import { fetchCombinedDataRadiusToken, useFetchRadiuss } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { SingleTableBoxScene } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Radius } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';

export const returnUrlRadiusPage = ROUTER_PATHS.administracionRed.radiusNav;

export type RadiusPageProps = {};

const RadiusPage: React.FC<RadiusPageProps> = () => {
  const [tokenRadius, setTokenRadius] = useState<{ access: string } | null>(
    null,
  );

  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

  // Fetch data
  const {
    data: RadiusPagingRes,
    isLoading,
    isRefetching,
  } = useFetchRadiuss({
    enabled: !!tokenRadius,
    params: {
      token: tokenRadius?.access ?? '',
    },
  });

  useEffect(() => {
    const x = async () => {
      const result = await fetchCombinedDataRadiusToken();
      setTokenRadius(result);
    };
    x();
  }, []);

  // Define columns
  const columns = useMemo<MRT_ColumnDef<Radius>[]>(
    () => [
      {
        accessorKey: 'username',
        header: 'PPP NAME',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'username'),
      },
      {
        accessorKey: 'ppp_pass',
        header: 'PPP PASS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ppp_pass'),
      },
      {
        accessorKey: 'ip_address',
        header: 'PPP ADDRESS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip_address'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene title="Radius" showCreateBtn={false}>
      <SimpleTable<Radius>
        columns={columns}
        data={RadiusPagingRes?.data?.items || []}
        isLoading={isLoading || isRefetching}
        enableGlobalFilter={true}
        showTotal={false}
      />
    </SingleTableBoxScene>
  );
};

export default RadiusPage;
