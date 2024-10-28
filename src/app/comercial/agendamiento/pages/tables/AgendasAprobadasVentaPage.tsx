import { useState } from 'react';
import { MdEditCalendar } from 'react-icons/md';

import { useFetchAgendamientos } from '@/actions/app';
import {
  Agendamiento,
  EstadoAgendamientoEnumChoice,
  Nullable,
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
import { hasAllPermissions } from '@/shared/utils/auth';
import { RequestRecoordinacionAgendaTableBtn } from '../../shared/components';

export type AgendasAprobadasVentaPageProps = {};

const AgendasAprobadasVentaPage: React.FC<
  AgendasAprobadasVentaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.operaciones_view_agendamiento);

  ///* local state -------------
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentAgendamiento, setCurrentAgendamiento] =
    useState<Nullable<Agendamiento>>(null);

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table -------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data -------------
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

      estado_agendamiento: EstadoAgendamientoEnumChoice.APROBADO,
    },
  });

  ///* handlers -------------
  const onEdit = (agendamiento: Agendamiento) => {
    setOpenModal(true);
    setCurrentAgendamiento(agendamiento);
  };

  ///* columns -------------
  const { agendaEspera } = useColumnsAgendamientos();

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
        columns={agendaEspera}
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
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.operaciones_change_agendamiento,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.operaciones_change_agendamiento,
        ])}
        onEdit={onEdit}
        editIcon={<MdEditCalendar />}
        editIconToolTipTitle="Solicitar recoordinación"
        canDelete={false}
      />

      {/* ============= modal ============= */}
      <RequestRecoordinacionAgendaTableBtn
        open={openModal}
        onClose={() => setOpenModal(false)}
        agendamiento={currentAgendamiento!}
      />
    </GridTableTabsContainerOnly>
  );
};

export default AgendasAprobadasVentaPage;
