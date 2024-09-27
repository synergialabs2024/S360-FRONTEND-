import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useFetchAgendamientos } from '@/actions/app';
import {
  Agendamiento,
  EstadoAgendamientoEnumChoice,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsAgendamientos,
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
import { returnUrlAgendamientoOperacionesPage } from './AgendamientosMainPage';

export type AgendamientoEsperaOperacionesPageProps = {};

const AgendamientoEsperaOperacionesPage: React.FC<
  AgendamientoEsperaOperacionesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.operaciones_view_agendamiento);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

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
    data: agendamientosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAgendamientos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
      estado_agendamiento: EstadoAgendamientoEnumChoice.ESPERA,
    },
  });

  ///* handlers
  const onEdit = (agenda: Agendamiento) => {
    // navigate(`${returnUrlAgendamientoOperacionesPage}/${agenda?.id!}`);
    setConfirmDialog({
      isOpen: true,
      title: 'Gestionar Agendamiento',
      subtitle:
        'Al acceder a la gestión del agendamiento, este registro se bloqueará para otros usuarios hasta que finalice la gestión o salga de la misma. ¿Desea continuar?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlAgendamientoOperacionesPage}/${agenda?.uuid!}`);
      },
    });
  };

  ///* columns
  const { agendaBase01 } = useColumnsAgendamientos();

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

      <CustomTable<Agendamiento>
        columns={agendaBase01}
        data={agendamientosPagingRes?.data?.items || []}
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
        rowCount={agendamientosPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={true}
        // crud
        canEdit={true}
        onEdit={onEdit}
        editIcon={<MdArrowRightAlt />}
        canDelete={false}
        editIconToolTipTitle="Gestionar"
        editIconTooltipPlacement="left"
      />
    </GridTableTabsContainerOnly>
  );
};

export default AgendamientoEsperaOperacionesPage;
