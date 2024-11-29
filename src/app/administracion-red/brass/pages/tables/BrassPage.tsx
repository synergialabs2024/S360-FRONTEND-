import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsBrass,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Brass, PermissionsEnum } from '@/shared/interfaces';
import { useFetchBrass } from '@/actions/app';
import { useNavigate } from 'react-router';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';

export const returnUrlBrassPage = ROUTER_PATHS.administracionRed.brassNav;

export type BrassPageProps = {};

const BrassPage: React.FC<BrassPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

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
    data: BrasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchBrass({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      username: searchTerm,
      ...filterObject,
    },
  });

  ///* handlers
  const onEdit = (brass: Brass) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Brass',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlBrassPage}/editar/${brass.uuid}`);
      },
    });
  };

  ///* columns
  const { brassColumn } = useColumnsBrass();

  return (
    <SingleTableBoxScene
      title="Bras"
      createPageUrl={`${returnUrlBrassPage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<Brass>
          columns={brassColumn}
          data={BrasPagingRes?.data?.items || []}
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
          rowCount={BrasPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            //Pendiente a cambio
            PermissionsEnum.administration_view_pais,
          ])}
          // crud
          canEdit={hasAllPermissions([
            //Pendiente a cambio
            PermissionsEnum.administration_view_pais,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default BrassPage;
