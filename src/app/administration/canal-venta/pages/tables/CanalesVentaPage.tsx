import { useNavigate } from 'react-router-dom';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  useColumnsCanalVenta,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { ROUTER_PATHS } from '@/router/constants';
import { useFetchCanalVentas } from '@/actions/app';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { CanalVenta, PermissionsEnum } from '@/shared/interfaces';

export const returnUrlCanalesVentaPage =
  ROUTER_PATHS.administracion.canalesVentaNav;

export type CanalesVentaPageProps = {};

const CanalesVentaPage: React.FC<CanalesVentaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_canalventa);

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
    data: canalsVentaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchCanalVentas({
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
  const onEdit = (canalventa: CanalVenta) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar CanalVenta',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlCanalesVentaPage}/editar/${canalventa.uuid}`);
      },
    });
  };

  ///* columns
  const { canalventaColumns } = useColumnsCanalVenta();

  return (
    <SingleTableBoxScene
      title="Canales de Venta"
      createPageUrl={`${returnUrlCanalesVentaPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.administration_add_canalventa,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<CanalVenta>
        columns={canalventaColumns}
        data={canalsVentaPagingRes?.data?.items || []}
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
        rowCount={canalsVentaPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.administration_change_canalventa,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default CanalesVentaPage;
