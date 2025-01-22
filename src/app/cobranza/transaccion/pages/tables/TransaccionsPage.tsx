import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchTransaccions } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Transaccion } from '@/shared/interfaces';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlTransaccionsPage = ROUTER_PATHS.cobranza.transaccionesNav;

export type TransaccionsPageProps = {};

const TransaccionsPage: React.FC<TransaccionsPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_transaccion);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data -----------------
  const {
    data: TransaccionsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTransaccions({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers -----------------
  const onEdit = (transaccion: Transaccion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Transaccion',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlTransaccionsPage}/editar/${transaccion.uuid}`);
      },
    });
  };

  ///* columns -----------------
  const columns = useMemo<MRT_ColumnDef<Transaccion>[]>(() => [], []);

  return (
    <SingleTableBoxScene
      title="Transacciones"
      createPageUrl={`${returnUrlTransaccionsPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.cobranza_add_transaccion)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Transaccion>
        columns={columns}
        data={TransaccionsPagingRes?.data?.items || []}
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
        rowCount={TransaccionsPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.cobranza_change_transaccion,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.cobranza_change_transaccion)}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default TransaccionsPage;
