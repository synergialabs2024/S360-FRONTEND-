import {
  emptyCellOneLevel,
  EstadoTicketTecnicoEnumChoice,
  formatBooleanCell,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  CambioPlan,
  MantenedorSuspension,
} from '@/shared/interfaces/app/cartera';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { useNavigate } from 'react-router';
import { useFetchMantenedorSuspensiones } from '@/actions/app/cartera/mantenedor-suspension/mantenedor-suspension.actions';

export type MantenedorSuspensionByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

export const returnUrlMantenedorSuspensionPage =
  ROUTER_PATHS.cartera.parametrosMantenedorSuspensionNav;

const MantenedorSuspensionByStatePage: React.FC<
  MantenedorSuspensionByStatePageProps
> = () => {
  const navigate = useNavigate();
  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  useCheckPermission(PermissionsEnum.cartera_view_mantenedoractivacionbase);
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
    data: CambioPlanesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMantenedorSuspensiones({
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
  const columns = useMemo<MRT_ColumnDef<CambioPlan>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'code'),
      },
      {
        accessorKey: 'criterio',
        header: 'CRITERIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'criterio'),
      },
      {
        accessorKey: 'meses_suspension',
        header: 'MESES SUSPENSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'meses_suspension'),
      },
      {
        accessorKey: 'tiempo_bloqueo',
        header: 'Tiempo Bloqueo',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tiempo_bloqueo'),
      },
      {
        accessorKey: 'tiempo_limite',
        header: 'Tiempo Limite',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tiempo_limite'),
      },

      {
        accessorKey: 'incluye_facturacion',
        header: 'Incluye Facturacion',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatBooleanCell(row, 'incluye_facturacion'),
      },
      {
        accessorKey: 'incluye_notificacion',
        header: 'Incluye Notificacion',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatBooleanCell(row, 'incluye_notificacion'),
      },

      /* {
        accessorKey: 'usuarios_autorizados',
        header: 'Usuarios Autorizados',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usuarios_autorizados'),
      }, */
      /* {
        accessorKey: 'motivo',
        header: 'Motivo',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'motivo'),
      }, */
    ],
    [],
  );

  ///* handlers ---------------------
  const onEdit = (mantenedorActivacionBase: MantenedorSuspension) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Mantenedor Activacion Base',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlMantenedorSuspensionPage}/editar/${mantenedorActivacionBase.uuid}`,
        );
      },
    });
  };

  return (
    <SingleTableBoxScene
      title="Mantenedor Suspension"
      createPageUrl={`${returnUrlMantenedorSuspensionPage}/crear`}
      showCreateBtn={true}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MantenedorSuspension>
        columns={columns}
        data={CambioPlanesPagingRes?.data?.items || []}
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
        rowCount={CambioPlanesPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canDelete={false}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default MantenedorSuspensionByStatePage;
