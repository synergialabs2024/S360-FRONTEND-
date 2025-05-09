import { useFetchOrdenTrabajos } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  EstadoOrdenTrabajoEnumChoice,
  OrdenTrabajo,
  PermissionsEnum,
  TABLE_CONSTANTS,
  TipoOrdenTrabajoEnumChoice,
  useColumnsOrdenTrabajo,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';

export const returnUrlInstalacionesPage =
  ROUTER_PATHS.comercial.instalacionesNav;

export type InstalacionComercialOTByStateProps = {
  state: EstadoOrdenTrabajoEnumChoice;
  isRecoordinada?: boolean;
};

const InstalacionComercialOTByState: React.FC<
  InstalacionComercialOTByStateProps
> = ({ state, isRecoordinada = false }) => {
  const navigate = useNavigate();

  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);

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
    data: OrdensTrabajoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchOrdenTrabajos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      identificacion: searchTerm,
      ...filterObject,
      filterByState: false,

      tipo_orden_trabajo: TipoOrdenTrabajoEnumChoice.INSTALACION,
      estado_orden_trabajo: state,

      // apply only to PENDIENTE
      is_recoordinada: isRecoordinada,
    },
  });

  ///* handlers
  // const onEdit = (instalacion: Instalacion) => {
  //   setConfirmDialog({
  //     isOpen: true,
  //     title: 'Editar Area',
  //     subtitle: '¿Está seguro que desea editar este registro?',
  //     onConfirm: () => {
  //       setConfirmDialogIsOpen(false);
  //       console.log(instalacion);
  //     },
  //   });
  // };

  ///* handlers
  const calcEnableActionsColumn = () => {
    if (state === EstadoOrdenTrabajoEnumChoice.PRE_RECHAZADO) {
      return true;
    }

    return false;
  };

  const calcOnEdit = (row: OrdenTrabajo) => {
    if (state === EstadoOrdenTrabajoEnumChoice.PRE_RECHAZADO) {
      navigate(`/comercial/instalaciones/${row.uuid}`);
    }
  };

  ///* columns
  const {
    installAsignadasEsperaOTColumns,
    installAsignadasRecoordinadasOTColumns,
    installGestionadasOTColumns,
    installPreRechazadoOTColumns,
  } = useColumnsOrdenTrabajo();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />
      <CustomTable<OrdenTrabajo>
        columns={
          // solicitudServicioBase
          state === EstadoOrdenTrabajoEnumChoice.PENDIENTE
            ? installAsignadasEsperaOTColumns
            : state === EstadoOrdenTrabajoEnumChoice.EN_PROCESO
              ? installAsignadasRecoordinadasOTColumns
              : state === EstadoOrdenTrabajoEnumChoice.FINALIZADO
                ? installGestionadasOTColumns
                : state === EstadoOrdenTrabajoEnumChoice.PRE_RECHAZADO
                  ? installPreRechazadoOTColumns
                  : installAsignadasEsperaOTColumns
        }
        data={OrdensTrabajoPagingRes?.data?.items || []}
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
        rowCount={OrdensTrabajoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={calcEnableActionsColumn()}
        onEdit={calcOnEdit}
        editIcon={<MdArrowRightAlt />}
        // editIconToolTipTitle="Crear preventa"
        canDelete={false}
        // onDelete={onDelete}
      />
    </GridTableTabsContainerOnly>
  );
};

export default InstalacionComercialOTByState;
