import {
  Cliente,
  EstadoTareaEnumChoice,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsClientes,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useNavigate } from 'react-router';
import { returnUrlActivacionAsignadas } from './PendientesActivacionPage';
import { useFetchClientes } from '@/actions/app';

export type PendientesActivacionByStatePageProps = {
  state: EstadoTareaEnumChoice;
};

const PendientesActivacionByStatePage: React.FC<
  PendientesActivacionByStatePageProps
> = ({ state }) => {
  const navigate = useNavigate();
  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  useCheckPermission(PermissionsEnum.comercial_view_preventa);
  // server side filters - colums table
  const { columnFilters, setColumnFilters } = useTableServerSideFiltering();

  ///* table
  const {
    globalFilter,
    pagination,

    onChangeFilter,
    setPagination,
  } = useTableFilter();

  ///* fetch data
  const {
    data: ticketsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchClientes({
    enabled: true,
    params: {
      page_size: 200,
      only_suspended: true,
    },
  });

  ///* handlers ---------------------
  const calcEnableActionsColumn = () => {
    return (
      state === EstadoTareaEnumChoice.EN_BORRADOR ||
      state === EstadoTareaEnumChoice.SEPARADO
    );
  };
  const onEdit = (cliente: Cliente) => {
    const firstLine = cliente?.linea_servicio_data?.[0];
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Cliente',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlActivacionAsignadas}/${firstLine}`);
      },
    });
  };

  ///* columns
  const { clientesFibraColumnsActivos } = useColumnsClientes();

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

      <CustomTable<Cliente>
        columns={clientesFibraColumnsActivos}
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
        // onEdit={onEdit}
        // customButtonsSpaceEnd={(preventa: Preventa) => {
        //   return <EsperaAgendaPreventaCustomButtons preventa={preventa!} />;
        // }}
        arrowIcon
        showCustomButtonsSpaceEnd={true}
      />
    </GridTableTabsContainerOnly>
  );
};

export default PendientesActivacionByStatePage;
