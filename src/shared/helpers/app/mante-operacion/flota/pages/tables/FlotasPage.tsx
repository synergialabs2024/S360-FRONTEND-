import { useNavigate } from 'react-router-dom';

import { useFetchFlotas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsFlota,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Flota, PermissionsEnum } from '@/shared/interfaces';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlFlotasPage =
  ROUTER_PATHS.mantenimientoOperacion.flotasNav;

export type FlotasPageProps = {};

const FlotasPage: React.FC<FlotasPageProps> = () => {
  useCheckPermission(PermissionsEnum.mantenimientoope_view_flota);

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
    data: FlotasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchFlotas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (flota: Flota) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Flota',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlFlotasPage}/editar/${flota.uuid}`);
      },
    });
  };

  ///* columns
  const { flotasColumns } = useColumnsFlota();

  return (
    <SingleTableBoxScene
      title="Flotas"
      createPageUrl={`${returnUrlFlotasPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.mantenimientoope_add_flota)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Flota>
        columns={flotasColumns}
        data={FlotasPagingRes?.data?.items || []}
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
        rowCount={FlotasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.mantenimientoope_change_flota,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.mantenimientoope_change_flota,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default FlotasPage;
