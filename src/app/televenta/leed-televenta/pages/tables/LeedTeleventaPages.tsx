import { useNavigate } from 'react-router';

import {
  LeedTeleventa,
  useTableFilter,
  TABLE_CONSTANTS,
  PermissionsEnum,
  useColumnsLeedTeleventas,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchLeedteleventas } from '@/actions/app';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  LeedTeleventaPageProps,
  returnUrlLeedTeleventaPage,
} from './LeedTeleventaMainPage';

const LeedTeleventaPage: React.FC<LeedTeleventaPageProps> = () => {
  useCheckPermission(PermissionsEnum.televentas_view_leedteleventa);

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
    },
  });

  ///* handlers
  const onEdit = (leedTeleventa: LeedTeleventa) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Leed Televenta',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlLeedTeleventaPage}/editar/${leedTeleventa.uuid}`);
      },
    });
  };

  ///* columns
  const { leedteleventasColumns } = useColumnsLeedTeleventas();

  return (
    <SingleTableBoxScene
      title="Leed de Televenta"
      createPageUrl={`${returnUrlLeedTeleventaPage}/crear`}
      isMainTableStates
    >
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
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.televentas_view_leedteleventa,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.televentas_change_leedteleventa,
            PermissionsEnum.servicios_view_planinternet,
            PermissionsEnum.administration_view_area,
            PermissionsEnum.administration_view_departamento,
            PermissionsEnum.administration_view_canalventa,
            PermissionsEnum.users_view_user,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default LeedTeleventaPage;
