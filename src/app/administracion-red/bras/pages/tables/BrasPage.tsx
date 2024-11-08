import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

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
import { useFetchBrass } from '@/actions/app';

export const returnUrlBrasPage = ROUTER_PATHS.administracionRed.brasNav;

export type BrasPageProps = {};

const BrasPage: React.FC<BrasPageProps> = () => {
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
    data: BrasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchBrass({
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
        accessorKey: 'name',
        header: 'NAME',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
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
