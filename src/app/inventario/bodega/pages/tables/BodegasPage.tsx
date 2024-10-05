import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import {
  Bodega,
  ChangeModelStateData,
  PermissionsEnum,
} from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import {
  MODEL_BOOLEAN,
  MODEL_STATE_BOOLEAN,
  TABLE_CONSTANTS,
} from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchBodegas, useUpdateBodega } from '@/actions/app/inventario';

export const returnUrlBodegasPage = ROUTER_PATHS.inventario.bodegasNav;

export type BodegasPageProps = {};

const BodegasPage: React.FC<BodegasPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_bodega);

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
  const changeState = useUpdateBodega<ChangeModelStateData>({
    enableNavigate: false,
  });
  const changeExterna = useUpdateBodega<{ es_externa: boolean }>({
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
    data: BodegasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchBodegas({
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
  const onEdit = (bodega: Bodega) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Bodega',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlBodegasPage}/editar/${bodega.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Bodega>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'direccion',
        header: 'DIRECCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.direccion ? row.original.direccion : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Direccion de ${row?.original?.nombre}`}
            />
          );
        },
      },
      {
        accessorKey: 'centro_costo__name',
        header: 'CENTRO COSTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['centro_costo', 'name']),
      },
      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Estado"
            checked={row.original?.state}
            onChangeChecked={() => {
              if (!hasPermission(PermissionsEnum.inventario_change_bodega))
                return;

              setConfirmDialog({
                isOpen: true,
                title: 'Cambiar Estado',
                subtitle:
                  '¿Está seguro que desea cambiar el estado de este registro?',
                onConfirm: () => {
                  setConfirmDialogIsOpen(false);
                  changeState.mutate({
                    id: row.original.id!,
                    data: {
                      state: !row.original?.state,
                    },
                  });
                },
              });
            }}
          />
        ),
      },
      {
        accessorKey: 'es_externa',
        header: 'EXTERNA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Externa"
            checked={row.original?.es_externa}
            isSimpleBoolean
            onChangeChecked={() => {
              if (!hasPermission(PermissionsEnum.inventario_change_bodega))
                return;

              setConfirmDialog({
                isOpen: true,
                title: 'Cambiar Externa',
                subtitle:
                  '¿Está seguro que desea cambiar la externa de este registro?',
                onConfirm: () => {
                  setConfirmDialogIsOpen(false);
                  changeExterna.mutate({
                    id: row.original.id!,
                    data: {
                      es_externa: !row.original?.es_externa,
                    },
                  });
                },
              });
            }}
          />
        ),
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [changeState, changeExterna, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Bodegas"
      createPageUrl={`${returnUrlBodegasPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.inventario_add_bodega,
        PermissionsEnum.administration_view_centrocosto,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Bodega>
        columns={columns}
        data={BodegasPagingRes?.data?.items || []}
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
        rowCount={BodegasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.inventario_add_bodega,
          PermissionsEnum.administration_view_centrocosto,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.inventario_add_bodega,
          PermissionsEnum.administration_view_centrocosto,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default BodegasPage;
