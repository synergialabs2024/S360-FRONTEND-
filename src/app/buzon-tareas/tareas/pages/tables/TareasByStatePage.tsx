import {
  EstadoTareaEnumChoice,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  BuzonTareasTSQEnum,
  useFetchBuzonTareas,
} from '@/actions/app/cartera/buzon-tareas';
import { useColumnsBuzonTareas } from '@/shared/hooks/app/buzon-tareas';
import { useUiConfirmModalStore } from '@/store/ui';
import { useNavigate } from 'react-router';
import { BuzonTarea } from '@/shared/interfaces/app/cartera/buzon-tareas';
import { useGenericPATCH } from '@/actions/shared';
import { useEffect, useState } from 'react';
import TareaAsignPendienteTableBtns from '../../shared/components/table/TareaAsignPendienteTableBtns';
import { useAuthStore } from '@/store/auth';

export type TareasByStatePageProps = {
  state: EstadoTareaEnumChoice;
};

const TareasByStatePage: React.FC<TareasByStatePageProps> = ({ state }) => {
  const navigate = useNavigate();
  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  useCheckPermission(PermissionsEnum.cartera_view_buzontareamantenedor);
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* local states ---------------------
  const [selectedBT, setSelectedBT] = useState<BuzonTarea | null>(null);

  ///* table
  const {
    globalFilter,
    pagination,

    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  const user = useAuthStore(s => s.user);

  ///* fetch data
  const {
    data: ticketsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchBuzonTareas({
    enabled: true,
    params: {
      departamento_asignado: user?.departamento,
      page: pageIndex + 1,
      page_size: pageSize,
      ...filterObject,
      estado_tarea: state,
    },
  });

  ///* mutations ---------------------
  const updOt = useGenericPATCH<any, BuzonTarea>(
    `/buzon-tarea-mantenedor/init-gestion-take-task/${selectedBT?.id!}/`,
    BuzonTareasTSQEnum.BUZONTAREAS,
    {
      customMessageToast: 'Hora de inicio registrada correctamente',
      customOnSuccess() {
        navigate(`/buzon-tareas/tareas-asignadas/${selectedBT?.uuid}`);
        setConfirmDialogIsOpen(false);
      },
      customOnError() {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  ///* columns
  const { tareasBaseColumns } = useColumnsBuzonTareas();
  ///* handlers ---------------------
  const calcEnableActionsColumn = () => {
    return (
      state === EstadoTareaEnumChoice.EN_BORRADOR ||
      state === EstadoTareaEnumChoice.SEPARADO
    );
  };
  const onEdit = (row: BuzonTarea) => {
    setSelectedBT(row);

    setConfirmDialog({
      isOpen: true,
      title: 'Gestionar tarea asignada',
      subtitle:
        'Una vez ingreses en el formulario se registrará la hora de inicio de la gestión y esta no podrá ser modificada. ¿Estás seguro de continuar?',
      onConfirm: () => {
        updOt.mutate({});
        navigate(`/buzon-tareas/tareas-asignadas/${row.uuid}`);
        setConfirmDialogIsOpen(false);
      },
    });
  };

  useEffect(() => {
    console.log('user', user);
    console.log('user?.departamento', user?.departamento);
  });

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

      <CustomTable<BuzonTarea>
        columns={
          state === EstadoTareaEnumChoice.EN_BORRADOR
            ? tareasBaseColumns
            : state === EstadoTareaEnumChoice.GESTIONADO
              ? tareasBaseColumns
              : state === EstadoTareaEnumChoice.RECHAZADO
                ? tareasBaseColumns
                : state === EstadoTareaEnumChoice.SEPARADO
                  ? tareasBaseColumns
                  : tareasBaseColumns
        }
        data={ticketsPagingRes?.data?.items || []}
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
        rowCount={ticketsPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={true}
        // crud
        editIconToolTipTitle="Gestionar"
        canEdit={calcEnableActionsColumn()}
        onEdit={onEdit}
        canDelete={false}
        onConditionEdit={ot => {
          return (
            ot.estado_tarea === EstadoTareaEnumChoice.EN_BORRADOR ||
            ot.estado_tarea === EstadoTareaEnumChoice.SEPARADO
          );
        }}
        // onEdit={onEdit}
        // customButtonsSpaceEnd={(preventa: Preventa) => {
        //   return <EsperaAgendaPreventaCustomButtons preventa={preventa!} />;
        // }}
        arrowIcon
        showCustomButtonsSpaceEnd={true}
        customButtonsSpaceEnd={buzonTarea => {
          return <TareaAsignPendienteTableBtns buzonTarea={buzonTarea!} />;
        }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default TareasByStatePage;
