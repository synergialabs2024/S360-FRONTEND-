import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useFetchTraficos } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Trafico } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { Button } from '@mui/material';
import ModalDetalleConsumo from '../../Custom/ModalDetalleConsumo';

export const returnUrlTraficosPage = ROUTER_PATHS.administracionRed.traficosNav;

export type TraficosPageProps = {};

const TraficosPage: React.FC<TraficosPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

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
    data: TraficosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTraficos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      username: searchTerm,
      ...filterObject,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Trafico>[]>(
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
        accessorKey: 'acciones',
        header: 'ACCIONES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return (
            <>
              <div style={{ display: 'flex', gap: '10px' }}>
                <ModalDetalleConsumo
                  viewMoreText="CONSUMO"
                  listItems={row.original}
                />
                <Button onClick={() => console.log(row.original)}>TRACE</Button>
                <Button onClick={() => console.log(row.original)}>PING</Button>
              </div>
            </>
          );
        },
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Traficos"
      ///* Pendiente a cambio
      showCreateBtn={hasPermission(PermissionsEnum.administration_add_pais)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Trafico>
        columns={columns}
        data={TraficosPagingRes?.data?.items || []}
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
        rowCount={TraficosPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default TraficosPage;
