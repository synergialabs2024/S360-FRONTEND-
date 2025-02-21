import { useNavigate } from 'react-router';

import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  useTableFilter,
  CuentaContable,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsCuentaContable,
  useTableServerSideFiltering,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useFetchCuentaContables } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlCuentaContablePage =
  ROUTER_PATHS.inventario.cuentaContablesNav;

export type CuentaContablePageProps = {};

const CuentaContablePages: React.FC<CuentaContablePageProps> = () => {
  useCheckPermission(PermissionsEnum.contabilidad_view_cuentacontable);

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
    data: CuentaContablePagingRes,
    isLoading,
    isRefetching,
  } = useFetchCuentaContables({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      nombre: searchTerm,
      ...filterObject,

      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (brass: CuentaContable) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Brass',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlCuentaContablePage}/editar/${brass.uuid}`);
      },
    });
  };

  ///* columns
  const { cuentaContableColumns } = useColumnsCuentaContable();

  return (
    <SingleTableBoxScene
      title="Cuenta Contable"
      createPageUrl={`${returnUrlCuentaContablePage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<CuentaContable>
          columns={cuentaContableColumns}
          data={CuentaContablePagingRes?.data?.items || []}
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
          rowCount={CuentaContablePagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.contabilidad_view_cuentacontable,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.contabilidad_view_cuentacontable,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default CuentaContablePages;
