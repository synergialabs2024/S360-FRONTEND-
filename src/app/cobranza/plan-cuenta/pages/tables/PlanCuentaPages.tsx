import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  CustomTypoLabel,
  SingleTableBoxScene,
  CustomTableSelectExpand,
} from '@/shared/components';
import {
  useTableFilter,
  CuentaContable,
  PermissionsEnum,
  TABLE_CONSTANTS,
  CuentaContable_SubTable,
  useColumnsCuentaContable,
  useTableServerSideFiltering,
} from '@/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useFetchCuentaContables } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlCuentaContablePage } from '@/app/inventario/cuenta-contable/pages/tables/CuentaContablePages';

export type PlanCuentaPagesProps = {};

const PlanCuentaPages: React.FC<PlanCuentaPagesProps> = () => {
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
  const onEdit = (cuenta_contable: CuentaContable_SubTable) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Cuenta Contable',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlCuentaContablePage}/editar/${cuenta_contable.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { cuentaContableColumns, planCuentasBaseColumns01 } =
    useColumnsCuentaContable();

  return (
    <SingleTableBoxScene title="Plan de Cuentas" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTableSelectExpand<CuentaContable>
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
        enableActionsColumn={false}
        // // expandible
        canExpand={true}
        ExpandShow={(row: CuentaContable) => (
          <>
            <CustomTypoLabel text="CUENTAS HIJAS" />
            <CustomTable<CuentaContable_SubTable>
              columns={planCuentasBaseColumns01}
              data={
                Array.isArray(row.cuentas_hijas_data)
                  ? row.cuentas_hijas_data
                  : []
              }
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
          </>
        )}
      />
    </SingleTableBoxScene>
  );
};

export default PlanCuentaPages;
