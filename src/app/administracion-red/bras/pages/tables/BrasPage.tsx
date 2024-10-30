import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { Button } from '@mui/material';

import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Bras, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { useFetchBras } from '@/actions/app';
import { useQueryClient } from '@tanstack/react-query';

export const returnUrlBrasPage = ROUTER_PATHS.administracionRed.brasNav;

export type BrasPageProps = {};

const BrasPage: React.FC<BrasPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);
  const queryClient = useQueryClient();

  const consultaBras = () => {
    queryClient.invalidateQueries({ queryKey: ['bras'] });
  };

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data
  const {
    data: BrasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchBras({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      username: searchTerm,
      ...filterObject,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Bras>[]>(
    () => [
      {
        accessorKey: 'Username',
        header: 'USER_NAME',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'Username'),
      },
      {
        accessorKey: 'Interface',
        header: 'INTERFACE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'Interface'),
      },
      {
        accessorKey: 'MAC',
        header: 'MAC',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'MAC'),
      },
      {
        accessorKey: 'Vlan',
        header: 'VLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'Vlan'),
      },
      {
        accessorKey: 'IPaddress',
        header: 'IP_ADDRESS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'IPaddress'),
      },
      {
        accessorKey: 'IPv6address',
        header: 'IPV6_ADDRESS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'IPv6address'),
      },
      {
        accessorKey: 'Accesstype',
        header: 'ACCESS_TYPE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'Accesstype'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene title="Bras" showCreateBtn={false} isMainTableStates>
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
          sxContainer={{
            mb: 5,
          }}
          customSpaceNode={
            <Button
              component="span"
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => {
                consultaBras();
              }}
              style={{ cursor: 'pointer' }}
              sx={{ m: 1 }}
            >
              CONSULTA BRAS
            </Button>
          }
        />

        <CustomTable<Bras>
          columns={columns}
          data={BrasPagingRes?.data?.items || []}
          isLoading={isLoading}
          isRefetching={isRefetching}
          // // filters - server side
          enableManualFiltering={true}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          // // search
          enableGlobalFilter={false}
          // // pagination
          pagination={pagination}
          onPaging={setPagination}
          rowCount={BrasPagingRes?.data?.meta?.count}
          enableActionsColumn={false}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default BrasPage;
