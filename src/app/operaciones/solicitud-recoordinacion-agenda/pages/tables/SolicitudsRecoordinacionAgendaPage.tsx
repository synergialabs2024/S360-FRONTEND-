import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  useFetchSolicitudRecoordinacionAgendas,
  useUpdateSolicitudRecoordinacionAgenda,
} from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  PermissionsEnum,
  SolicitudRecoordinacionAgenda,
} from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

const returnUrlSolicitudsRecoordinacionAgendaPage =
  ROUTER_PATHS.supervisionComercial.solicitudRecoordinacionAgendaNav;

export type SolicitudsRecoordinacionAgendaPageProps = {};

const SolicitudsRecoordinacionAgendaPage: React.FC<
  SolicitudsRecoordinacionAgendaPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.operaciones_view_solicitudrecoordinacionagenda,
  );

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ---------------------
  const changeState = useUpdateSolicitudRecoordinacionAgenda({
    enableNavigate: false,
  });

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
    data: SolicitudsRecoordinacionAgendaPagingRes,
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
    },
  });

  ///* handlers
  const onEdit = () => {};

  ///* columns
  const columns = useMemo<MRT_ColumnDef<SolicitudRecoordinacionAgenda>[]>(
    () => [
      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
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

      {
        accessorKey: 'estado_solicitud',
        header: 'ESTADO SOLICITUD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_solicitud'),
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
        accessorKey: 'agendamiento',
        header: 'AGENDAMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'agendamiento'),
      },

      {
        accessorKey: 'usuario_atiende',
        header: 'USUARIO ATIENDE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usuario_atiende'),
      },

      {
        accessorKey: 'area',
        header: 'AREA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'area'),
      },

      {
        accessorKey: 'departamento',
        header: 'DEPARTAMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'departamento'),
      },

      {
        accessorKey: 'canal_venta',
        header: 'CANAL VENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'canal_venta'),
      },

      {
        accessorKey: 'vendedor',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'vendedor'),
      },
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Solicitud Recoordinacion Agenda"
      createPageUrl={`${returnUrlSolicitudsRecoordinacionAgendaPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.operaciones_add_solicitudrecoordinacionagenda,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolicitudRecoordinacionAgenda>
        columns={columns}
        data={SolicitudsRecoordinacionAgendaPagingRes?.data?.items || []}
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
        rowCount={SolicitudsRecoordinacionAgendaPagingRes?.data?.meta?.count}
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
      />
    </SingleTableBoxScene>
  );
};

export default SolicitudsRecoordinacionAgendaPage;
