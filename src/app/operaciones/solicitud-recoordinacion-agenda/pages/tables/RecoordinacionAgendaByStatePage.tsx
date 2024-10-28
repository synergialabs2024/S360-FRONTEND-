/* eslint-disable indent */
import EastIcon from '@mui/icons-material/East';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useFetchSolicitudRecoordinacionAgendas } from '@/actions/app';
import {
  GeneralModelStatesEnumChoice,
  SolicitudRecoordinacionAgenda,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export type RecoordinacionAgendaByStatePageProps = {
  state: GeneralModelStatesEnumChoice;
};
type MRTSServiceType = { row: MRT_Row<SolicitudRecoordinacionAgenda> };

const RecoordinacionAgendaByStatePage: React.FC<
  RecoordinacionAgendaByStatePageProps
> = ({ state }) => {
  useCheckPermission(
    PermissionsEnum.operaciones_view_solicitudrecoordinacionagenda,
  );
  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* table ---------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ---------------------
  const {
    data: solicitudsRecoordinacionAgendaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudRecoordinacionAgendas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
      estado_solicitud: state,
    },
  });

  ///* handlers
  const onEdit = (
    solicitudrecoordinacionagenda: SolicitudRecoordinacionAgenda,
  ) => {
    navigate(
      `/supervision-comercial/solicitud-recoordinacion-agenda/${solicitudrecoordinacionagenda?.agendamiento_data?.uuid}?sr=${solicitudrecoordinacionagenda?.uuid}`,
    );
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<SolicitudRecoordinacionAgenda>[]>(
    () => [
      {
        accessorKey: 'estado_solicitud',
        header: 'ESTADO SOLICITUD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_solicitud'),
      },

      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },

      {
        accessorKey: 'agendamiento',
        header: 'AGENDAMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'agendamiento'),
      },

      {
        accessorKey: 'area',
        header: 'AREA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'area'),
      },

      {
        accessorKey: 'departamento',
        header: 'DEPARTAMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'departamento'),
      },

      {
        accessorKey: 'canal_venta',
        header: 'CANAL VENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'canal_venta'),
      },

      {
        accessorKey: 'vendedor',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'vendedor'),
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },

      // approved or rejected
      ...(state === GeneralModelStatesEnumChoice.APROBADO
        ? [
            {
              accessorKey: 'usuario_atiende__razon_social',
              header: 'APROBADO POR',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellNested(row, ['usuario_atiende_data', 'razon_social']),
            },
            {
              accessorKey: 'fecha_atiende',
              header: 'APROBADO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: false,
              enableSorting: false,
              Cell: ({ row }: MRTSServiceType) =>
                formatDateWithTimeCell(row, 'fecha_atiende'),
            },
          ]
        : []),
      ...(state === GeneralModelStatesEnumChoice.RECHAZADO
        ? [
            {
              accessorKey: 'usuario_atiende__razon_social',
              header: 'RECHAZADO POR',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              Cell: ({ row }: MRTSServiceType) =>
                emptyCellNested(row, ['usuario_atiende_data', 'razon_social']),
            },
            {
              accessorKey: 'fecha_atiende',
              header: 'RECHAZADO',
              size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
              enableColumnFilter: false,
              enableSorting: false,
              Cell: ({ row }: MRTSServiceType) =>
                formatDateWithTimeCell(row, 'fecha_atiende'),
            },
          ]
        : []),

      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolicitudRecoordinacionAgenda>
        columns={columns}
        data={solicitudsRecoordinacionAgendaPagingRes?.data?.items || []}
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
        rowCount={solicitudsRecoordinacionAgendaPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.operaciones_change_solicitudrecoordinacionagenda,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.operaciones_change_solicitudrecoordinacionagenda,
        )}
        onEdit={onEdit}
        canDelete={false}
        editIcon={<EastIcon />}
        editIconToolTipTitle="Gestionar"
      />
    </GridTableTabsContainerOnly>
  );
};

export default RecoordinacionAgendaByStatePage;
