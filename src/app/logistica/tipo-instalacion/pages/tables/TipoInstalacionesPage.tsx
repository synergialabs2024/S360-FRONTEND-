import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  ChangeModelStateData,
  PermissionsEnum,
  TipoInstalacion,
} from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import {
  useFetchTipoInstalaciones,
  useUpdateTipoInstalacion,
} from '@/actions/app/logistica';

export const returnUrlTipoInstalacionesPage =
  ROUTER_PATHS.logistica.tipoinstalacionesNav;

export type TipoInstalacionesPageProps = {};

const TipoInstalacionesPage: React.FC<TipoInstalacionesPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

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
  const changeState = useUpdateTipoInstalacion<ChangeModelStateData>({
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
    data: TipoInstalacionesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTipoInstalaciones({
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
  const onEdit = (tipoInstalacion: TipoInstalacion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Tipo Instalacion',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlTipoInstalacionesPage}/editar/${tipoInstalacion.uuid}`,
        );
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<TipoInstalacion>[]>(
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
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
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
              ///* Pendiente a cambio
              if (!hasPermission(PermissionsEnum.administration_change_pais))
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
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Tipo Instalacion"
      createPageUrl={`${returnUrlTipoInstalacionesPage}/crear`}
      ///* Pendiente a cambio
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.administration_add_pais,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<TipoInstalacion>
        columns={columns}
        data={TipoInstalacionesPagingRes?.data?.items || []}
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
        rowCount={TipoInstalacionesPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        ///* Pendiente a cambio
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.administration_add_pais,
        ])}
        // crud
        ///* Pendiente a cambio
        canEdit={hasAllPermissions([PermissionsEnum.administration_add_pais])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default TipoInstalacionesPage;
