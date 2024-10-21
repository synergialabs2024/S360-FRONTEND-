import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useFetchMotivoActualizacions,
  useUpdateMotivoActualizacion,
} from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { MOTIVO_ACTUALIZACION_MODULO_ARRAY_CHOICES } from '@/shared';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { MotivoActualizacion, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlMotivosActualizacionPage =
  ROUTER_PATHS.administracion.motivosActualizacionNav;

export type MotivosActualizacionPageProps = {};

const MotivosActualizacionPage: React.FC<
  MotivosActualizacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_view_motivoactualizacion);

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
  const changeState = useUpdateMotivoActualizacion({
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
    data: MotivosActualizacionPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMotivoActualizacions({
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
  const onEdit = (motivoactualizacion: MotivoActualizacion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar MotivoActualizacion',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlMotivosActualizacionPage}/editar/${motivoactualizacion.uuid}`,
        );
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<MotivoActualizacion>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NAME',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPTION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => (
          <ViewMoreTextModalTableCell longText={row.original?.description} />
        ),
      },
      {
        accessorKey: 'modulo',
        header: 'MODULO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MOTIVO_ACTUALIZACION_MODULO_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modulo'),
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
                    PermissionsEnum.administration_change_motivoactualizacion,
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
      title="Motivos de actualización"
      createPageUrl={`${returnUrlMotivosActualizacionPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.administration_add_motivoactualizacion,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MotivoActualizacion>
        columns={columns}
        data={MotivosActualizacionPagingRes?.data?.items || []}
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
        rowCount={MotivosActualizacionPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.administration_change_motivoactualizacion,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_motivoactualizacion,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default MotivosActualizacionPage;
