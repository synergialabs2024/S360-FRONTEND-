import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useFetchAutenticacionClientes } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { AutenticacionCliente, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@mui/material';

export const returnUrlAutenticacionClientesPage =
  ROUTER_PATHS.administracionRed.autenticacionClientesNav;

export type AutenticacionClientesPageProps = {};

const AutenticacionClientesPage: React.FC<
  AutenticacionClientesPageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);
  const queryClient = useQueryClient();

  const consultaAuthCliente = () => {
    queryClient.invalidateQueries({ queryKey: ['autenticacion-clientes'] });
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
    data: AutenticacionClientesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAutenticacionClientes({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<AutenticacionCliente>[]>(
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
    <SingleTableBoxScene
      title="Autenticacion de Clientes"
      showCreateBtn={false}
      isMainTableStates
    >
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
              consultaAuthCliente();
            }}
            style={{ cursor: 'pointer' }}
            sx={{ m: 1 }}
          >
            CONSULTA BRAS
          </Button>
        }
      />

      <CustomTable<AutenticacionCliente>
        columns={columns}
        data={AutenticacionClientesPagingRes?.data?.items || []}
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
        rowCount={AutenticacionClientesPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default AutenticacionClientesPage;
