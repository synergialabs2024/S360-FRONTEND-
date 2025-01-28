/* eslint-disable indent */
import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';

import { useFetchOrdenTrabajos } from '@/actions/app';
import {
  EstadoActivacionEnumChoice,
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
import ModalAuthorizateOrdenTrabajo from '@/shared/hooks/app/tecnico/ModalAuthorizateOrdenTrabajo';

export type ActivacionInstalacionOTByStateProps = {
  activacionState: EstadoActivacionEnumChoice;
  otState?: EstadoOrdenTrabajoEnumChoice;

  isRecoordinada?: boolean;
  onAuthorizate?: boolean;
};

const ActivacionInstalacionOTByState: React.FC<
  ActivacionInstalacionOTByStateProps
> = ({
  otState,
  activacionState,
  isRecoordinada = false,
  onAuthorizate = false,
}) => {
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);

  const navigate = useNavigate();

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
      ...(otState && { estado_orden_trabajo: otState }),
      estado_activacion: activacionState,

      // apply only to PENDIENTE
      is_recoordinada: isRecoordinada,
    },

    refetchInterval: 5000,
  });

  ///* handlers
  const calcEnableActionsColumn = () => {
    let isRequiredOTState = false;
    if (otState) {
      isRequiredOTState = true;
    }

    const otStateIsPending =
      isRequiredOTState && otState === EstadoOrdenTrabajoEnumChoice.PENDIENTE;

    const isActivacionPending =
      activacionState === EstadoActivacionEnumChoice.PENDIENTE;

    const isActivacionGestionada =
      activacionState === EstadoActivacionEnumChoice.GESTIONADA;

    const showEditButtonAsignadas = otStateIsPending && isActivacionPending;

    const showEditButtonInstalacionesGestionadas =
      otStateIsPending && isActivacionGestionada;

    return showEditButtonAsignadas || showEditButtonInstalacionesGestionadas;
  };

  const onEdit = (row: OrdenTrabajo) => {
    activacionState === EstadoActivacionEnumChoice.PENDIENTE
      ? navigate(`/operaciones/activaciones/instalacion/${row.uuid}`)
      : navigate(
          `/operaciones/activaciones/instalacion/actualizacion-serie-onu/${row.uuid}`,
        );
  };

  ///* columns
  const { installAsignadasEsperaOTColumns, installGestionadasOTColumns } =
    useColumnsOrdenTrabajo();

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

      <CustomTable<OrdenTrabajo>
        columns={
          // solicitudServicioBase
          otState === EstadoOrdenTrabajoEnumChoice.PENDIENTE && onAuthorizate
            ? installGestionadasOTColumns
            : otState === EstadoOrdenTrabajoEnumChoice.PENDIENTE
              ? installAsignadasEsperaOTColumns
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
        onEdit={onEdit}
        editIcon={<MdArrowRightAlt />}
        // editIconToolTipTitle="Crear preventa"
        canDelete={false}
        showCustomButtonsSpace
        customButtonsSpace={row => {
          if (!row?.luz_verde) {
            return (
              <ModalAuthorizateOrdenTrabajo
                authOnu={row}
                titleButton="AUTHORIZATE"
              />
            );
          }
          return null;
        }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default ActivacionInstalacionOTByState;
