import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { EncuestaAsesores, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { Asunto } from '@/shared/interfaces/app/ticket';
import { useUpdateAsunto } from '@/actions/app/tickets/parametros/asunto/asunto.actions';
import { useFetchEncuestaAsesores } from '@/actions/app/customer-experience/encuesta-asesores/encuesta-asesores.actions';

export const returnUrlEncuestaAsesoresPage =
  ROUTER_PATHS.customerExperience.encuestaAsesoresNav;

export type EncuestaAsesoresPageProps = {};

const EncuestaAsesoresPage: React.FC<EncuestaAsesoresPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_tickettecnico);

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateAsunto({
    enableNavigate: false,
  });

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
    data: AsuntosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchEncuestaAsesores({
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
  const columns = useMemo<MRT_ColumnDef<EncuestaAsesores>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene title="Encuesta Asesores">
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Asunto>
        columns={columns}
        data={AsuntosPagingRes?.data?.items || []}
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
        rowCount={AsuntosPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.tecnico_change_asuntoticket,
        )}
      />
    </SingleTableBoxScene>
  );
};

export default EncuestaAsesoresPage;
