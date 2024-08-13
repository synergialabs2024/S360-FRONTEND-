import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useFetchSolicitudDesbloqueoVentass } from '@/actions/app';
import { GeneralModelStatesEnumChoice } from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  PermissionsEnum,
  SolicitudDesbloqueoVentas,
} from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export type SolicitudUnblockSolServicioByStatePageProps = {
  state: GeneralModelStatesEnumChoice;
};

const SolicitudUnblockSolServicioByStatePage: React.FC<
  SolicitudUnblockSolServicioByStatePageProps
> = ({ state }) => {
  useCheckPermission(PermissionsEnum.comercial_view_solicituddesbloqueoventas);

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

  ///* fetch data
  const {
    data: SolicitudsDesbloqueoVentasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudDesbloqueoVentass({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      solicitud_servicio__identificacion: searchTerm,
      ...filterObject,
      filterByState: false,
      solicitud_desbloqueo_estado: state,
    },
  });

  ///* handlers
  const onEdit = (solicituddesbloqueoventas: SolicitudDesbloqueoVentas) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Gestionar Solicitud Desbloqueo Venta',
      subtitle: `La solicitud de desbloqueo para la solicitud de servicio '${solicituddesbloqueoventas.id}' está pendiente de revisión. Por favor, confirme si desea desbloquear la solicitud de servicio o no.`,
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        alert('Solicitud de desbloqueo de venta gestionada');
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<SolicitudDesbloqueoVentas>[]>(
    () => [
      // identification,estado,fecha-solicitud(created_at),usuario-solicitud(vendedor),
      {
        accessorKey: 'solicitud_servicio__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['modelo_data', 'identificacion']),
      },
      {
        accessorKey: 'solicitud_servicio__codigo',
        header: 'SOLICITUD SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['modelo_data', 'codigo']),
      },
      {
        accessorKey: 'vendedor__razon_social',
        header: 'VENDEDOR SOLICITA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['vendedor_data', 'razon_social']),
      },

      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },
      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellOneLevel(row, 'solicitud_desbloqueo_estado'),
      },

      {
        accessorKey: 'created_at',
        header: 'SOLICITADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
    ],
    [],
  );

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
        sxContainer={{
          mb: 5,
        }}
      />

      <CustomTable<SolicitudDesbloqueoVentas>
        columns={columns}
        data={SolicitudsDesbloqueoVentasPagingRes?.data?.items || []}
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
        rowCount={SolicitudsDesbloqueoVentasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.comercial_change_solicituddesbloqueoventas,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.comercial_change_solicituddesbloqueoventas,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudUnblockSolServicioByStatePage;
