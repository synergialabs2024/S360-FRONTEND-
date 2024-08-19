import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchMetodoPagos, useUpdateMetodoPago } from '@/actions/app';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import {
  emptyCellOneLevel,
  formatDateWithTimeCell,
  MetodoPago,
  MODEL_STATE_BOOLEAN,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';

import { useCheckPermission } from '@/shared/hooks/auth';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlMetodosPagoPage =
  ROUTER_PATHS.administracion.metodospagoNav;

export type MetodosPagoPageProps = {};

const MetodosPagoPage: React.FC<MetodosPagoPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_metodopago);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateMetodoPago({
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
    data: metodosPagoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMetodoPagos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (metodopago: MetodoPago) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Metodo Pago',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlMetodosPagoPage}/editar/${metodopago.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<MetodoPago>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.state === 'boolean' ? (
            <CustomSwitch
              title="state"
              checked={row.original?.state}
              onChangeChecked={() => {
                if (
                  !hasPermission(
                    PermissionsEnum.administration_change_metodopago,
                  )
                )
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar state',
                  subtitle:
                    '¿Está seguro que desea cambiar el state de este registro?',
                  onConfirm: () => {
                    changeState.mutate({
                      id: row.original.id!,
                      data: {
                        state: !row.original.state,
                      },
                    });
                    setConfirmDialogIsOpen(false);
                  },
                });
              }}
            />
          ) : (
            'N/A'
          );
        },
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPCIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.description
            ? row.original.description
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Descripcion de ${row?.original?.name}`}
            />
          );
        },
      },

      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },
      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Metodo Pago"
      createPageUrl={`${returnUrlMetodosPagoPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.administration_add_metodopago,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MetodoPago>
        columns={columns}
        data={metodosPagoPagingRes?.data?.items || []}
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
        rowCount={metodosPagoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_metodopago,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default MetodosPagoPage;
