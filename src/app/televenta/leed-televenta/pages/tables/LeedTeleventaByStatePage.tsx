import { MdArrowRightAlt } from 'react-icons/md';

import {
  CustomTable,
  CustomSearch,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  useFetchLeedteleventas,
  useUpdateLeedteleventaTakeOne,
} from '@/actions/app';
import {
  LeedTeleventa,
  useTableFilter,
  TABLE_CONSTANTS,
  PermissionsEnum,
  useColumnsLeedTeleventas,
  useTableServerSideFiltering,
  LeedTeleventa_Estado_TMEnumChoice,
} from '@/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';

export type LeedTeleventaByStatePageProps = {
  state: string;
};

const LeedTeleventaByStatePage: React.FC<LeedTeleventaByStatePageProps> = ({
  state,
}) => {
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
    data: LeedTeleventaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchLeedteleventas({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      username: searchTerm,
      ...filterObject,
      filterByState: false,

      estado_leed: state,
    },
  });

  const calcEnableActionsColumn = () => {
    const permisos = hasAllPermissions([
      PermissionsEnum.televentas_change_leedteleventa,
      PermissionsEnum.servicios_view_planinternet,
      PermissionsEnum.administration_view_area,
      PermissionsEnum.administration_view_departamento,
      PermissionsEnum.administration_view_canalventa,
      PermissionsEnum.users_view_user,
    ]);

    if (permisos && state == LeedTeleventa_Estado_TMEnumChoice.ESPERA) {
      return true;
    }
    return false;
  };

  const updateLeedTeleventaTakeOneMutation = useUpdateLeedteleventaTakeOne({
    enableNavigate: true,
    enableErrorNavigate: true,
  });

  ///* handlers
  const onEdit = (row: LeedTeleventa) => {
    if (row.id === undefined) {
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Apartar Leed de Televenta',
      subtitle: '¿Está seguro que desea tomar ese leed?',
      onConfirm: async () => {
        setConfirmDialogIsOpen(false);
        updateLeedTeleventaTakeOneMutation.mutate({
          id: row.id!,
        });
      },
    });
  };

  ///* columns
  const { leedteleventasColumns } = useColumnsLeedTeleventas();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<LeedTeleventa>
        columns={leedteleventasColumns}
        data={LeedTeleventaPagingRes?.data?.items || []}
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
        rowCount={LeedTeleventaPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={calcEnableActionsColumn()}
        onEdit={onEdit}
        editIcon={<MdArrowRightAlt />}
      />
    </GridTableTabsContainerOnly>
  );
};

export default LeedTeleventaByStatePage;
