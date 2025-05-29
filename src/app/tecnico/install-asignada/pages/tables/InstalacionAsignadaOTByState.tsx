import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  OrdenTrabajoTSQEnum,
  UpdHoraInicioOTData,
  useFetchOrdenTrabajos,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import {
  EstadoActivacionEnumChoice,
  EstadoOrdenTrabajoEnumChoice,
  OrdenTrabajo,
  PermissionsEnum,
  TABLE_CONSTANTS,
  TipoOrdenTrabajoEnumChoice,
  ToastWrapper,
  useColumnsOrdenTrabajo,
  UserRolesEnumChoice,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useAuthStore } from '@/store/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import dayjs from 'dayjs';
import { hasPermission } from '@/shared/utils/auth';

export type InstalacionAsignadaOTByStateProps = {
  state: EstadoOrdenTrabajoEnumChoice;
  isRecoordinada?: boolean;
};

const InstalacionAsignadaOTByState: React.FC<
  InstalacionAsignadaOTByStateProps
> = ({ state, isRecoordinada = false }) => {
  ///* hooks ---------------------
  useCheckPermission(PermissionsEnum.tecnico_view_ordentrabajo);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* local states ---------------------
  const [selectedOT, setSelectedOT] = useState<OrdenTrabajo | null>(null);

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const user = useAuthStore(s => s.user);

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

      // filter by tecnico
      ...(user?.role === UserRolesEnumChoice.TECNICO && {
        oneAtTime: true,
      }),
    },
  });

  ///* mutations ---------------------
  const updOt = useGenericPATCH<UpdHoraInicioOTData, OrdenTrabajo>(
    `/orden-trabajo/${selectedOT?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'Hora de inicio registrada correctamente',
      customOnSuccess() {
        navigate(`/tecnico/instalaciones-asignadas/${selectedOT?.uuid}`);
        setConfirmDialogIsOpen(false);
      },
      customOnError() {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  ///* handlers ---------------------
  const calcEnableActionsColumn = () => {
    return (
      state === EstadoOrdenTrabajoEnumChoice.PENDIENTE &&
      hasPermission(PermissionsEnum.tecnico_change_ordentrabajo)
    );
  };
  const onEdit = (row: OrdenTrabajo) => {
    setSelectedOT(row);

    const needSetHoraInicio = !row?.hora_inicio_real;

    // requiere gestion de activaciones para poder subir cambios
    if (
      row?.estado_activacion !== EstadoActivacionEnumChoice.GESTIONADA &&
      user?.role === UserRolesEnumChoice.TECNICO
    ) {
      ToastWrapper.error(
        'La instalación asignada aún no ha sido gestionada por activaciones.',
      );
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Gestionar instalación asignada',
      subtitle:
        'Una vez ingreses en el formulario se registrará la hora de inicio de la gestión y esta no podrá ser modificada. ¿Estás seguro de continuar?',
      onConfirm: () => {
        if (needSetHoraInicio) {
          updOt.mutate({
            hora_inicio_real: dayjs().format(),
          });

          return;
        }

        navigate(`/tecnico/instalaciones-asignadas/${row.uuid}`);
        setConfirmDialogIsOpen(false);
      },
    });
  };

  ///* columns
  const {
    installAsignadasEsperaOTColumns,
    installGestionadasOTColumns,
    installPreRechazadoOTColumns,
  } = useColumnsOrdenTrabajo();

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
          state === EstadoOrdenTrabajoEnumChoice.PENDIENTE
            ? installAsignadasEsperaOTColumns
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
        editIconToolTipTitle="Gestionar"
        canEdit={calcEnableActionsColumn()}
        onEdit={onEdit}
        onConditionEdit={ot => {
          if (user?.role !== UserRolesEnumChoice.TECNICO) return true;

          return (
            ot.estado_orden_trabajo ===
              EstadoOrdenTrabajoEnumChoice.PENDIENTE && !!ot?.can_be_managed
          );
        }}
        arrowIcon
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default InstalacionAsignadaOTByState;
