import EastIcon from '@mui/icons-material/East';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';

import { useFetchSolicitudDesbloqueoVentass } from '@/actions/app';
import { GeneralModelStatesEnumChoice } from '@/shared';
import {
  ChipModelState,
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
import { HandleSolUnblockServicioModal } from '../../shared/components/tables';

export type SolicitudUnblockSolServicioByStatePageProps = {
  state: GeneralModelStatesEnumChoice;
};

const SolicitudUnblockSolServicioByStatePage: React.FC<
  SolicitudUnblockSolServicioByStatePageProps
> = ({ state }) => {
  useCheckPermission(PermissionsEnum.comercial_view_solicituddesbloqueoventas);

  // local state
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [
    selectedSolicitudDesbloqueoVentas,
    setSelectedSolicitudDesbloqueoVentas,
  ] = useState<SolicitudDesbloqueoVentas | null>(null);

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
    setSelectedSolicitudDesbloqueoVentas(solicituddesbloqueoventas);
    console.log('solicituddesbloqueoventas', solicituddesbloqueoventas);
    setOpenModal(true);
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
        Cell: ({ row }) => {
          const state = row.original?.solicitud_desbloqueo_estado;

          return (
            <ChipModelState
              label={state}
              color={
                state === GeneralModelStatesEnumChoice.ESPERA
                  ? 'info'
                  : state === GeneralModelStatesEnumChoice.APROBADO
                    ? 'success'
                    : state === GeneralModelStatesEnumChoice.RECHAZADO
                      ? 'error'
                      : 'warning'
              }
            />
          );
        },
      },

      {
        accessorKey: 'created_at',
        header: 'SOLICITADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },

      // approved or rejected
      ...(state === GeneralModelStatesEnumChoice.APROBADO ? [] : []),
      ...(state === GeneralModelStatesEnumChoice.RECHAZADO ? [] : []),
    ],
    [state],
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
        enableActionsColumn={
          hasPermission(
            PermissionsEnum.comercial_change_solicituddesbloqueoventas,
          ) && state === GeneralModelStatesEnumChoice.ESPERA
        }
        // crud
        canEdit={
          hasPermission(
            PermissionsEnum.comercial_change_solicituddesbloqueoventas,
          ) && state === GeneralModelStatesEnumChoice.ESPERA
        }
        onEdit={onEdit}
        canDelete={false}
        editIcon={<EastIcon />}
        toolTipTitleEditIcon="Gestionar"
      />

      {/* ============== Modal =========== */}
      <HandleSolUnblockServicioModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        selectedSolicitudDesbloqueoVentas={selectedSolicitudDesbloqueoVentas}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudUnblockSolServicioByStatePage;
