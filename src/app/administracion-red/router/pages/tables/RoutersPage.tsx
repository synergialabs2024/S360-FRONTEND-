import { useNavigate } from 'react-router-dom';

import { useFetchRouters } from '@/actions/app';
import { useColumnsRouters } from '@/app/administracion-red/shared/hooks';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Router } from '@/shared/interfaces';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlRoutersPage = ROUTER_PATHS.administracionRed.routersNav;

export type RoutersPageProps = {};

const RoutersPage: React.FC<RoutersPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_view_router);

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
    data: RoutersPagingRes,
    isLoading,
    isRefetching,
  } = useFetchRouters({
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
  const onEdit = (router: Router) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Router',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlRoutersPage}/editar/${router.uuid}`);
      },
    });
  };

  ///* columns
  const { routersColumns } = useColumnsRouters();

  return (
    <SingleTableBoxScene
      title="Router"
      createPageUrl={`${returnUrlRoutersPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.infraestructura_add_router)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Router>
        columns={routersColumns}
        data={RoutersPagingRes?.data?.items || []}
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
        rowCount={RoutersPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.infraestructura_change_router,
        )}
        // crud
        canEdit={hasPermission(PermissionsEnum.infraestructura_change_router)}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default RoutersPage;
