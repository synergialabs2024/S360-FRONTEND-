import {
  emptyCellNested,
  emptyCellOneLevel,
  EstadoTicketTecnicoEnumChoice,
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
import { MantenedorSuspension } from '@/shared/interfaces/app/cartera';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { useNavigate } from 'react-router';
import { useFetchActivacionesManuales } from '@/actions/app';

export type ActivacionManualByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

export const returnUrlMantenedorSuspensionPage =
  ROUTER_PATHS.cartera.parametrosMantenedorSuspensionNav;

const ActivacionManualByStatePage: React.FC<
  ActivacionManualByStatePageProps
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
  } = useFetchActivacionesManuales({
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
  const columns = useMemo<MRT_ColumnDef<MantenedorSuspension>[]>(
    () => [
      {
        accessorKey: 'tipo_suspension',
        header: 'TIPO SUSPENSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_suspension'),
      },
      {
        accessorKey: 'estado_suspension',
        header: 'ESTADO SUSPENSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_suspension'),
      },
      {
        accessorKey: 'activacion_manual__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'identificacion',
          ]),
      },
      {
        accessorKey: 'activacion_manual__razon_social',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'razon_social',
          ]),
      },
      {
        accessorKey: 'activacion_manual__numero_contrato',
        header: 'NUMERO CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'contrato_data',
            'numero_contrato',
          ]),
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
      title: 'Editar Mantenedor Suspension',
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
      title="Activaciones"
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

export default ActivacionManualByStatePage;
