import { useNavigate } from 'react-router';

import { useFetchIngresoMateriales } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  IngresoMaterial,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsIngresoMaterial,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlIngresoMaterialesPage =
  ROUTER_PATHS.inventario.ingresoMaterialesNav;

export type IngresoMaterialesPageProps = {};

const SolicitudMaterialPage: React.FC<IngresoMaterialesPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_ingresomaterial);

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
    data: ingresoMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchIngresoMateriales({
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
  const onEdit = (ingresomaterial: IngresoMaterial) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Ingreso Material',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlIngresoMaterialesPage}/editar/${ingresomaterial.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { ingresoMaterialColumns } = useColumnsIngresoMaterial();

  return (
    <SingleTableBoxScene
      title="Solicitud Material"
      createPageUrl={`${returnUrlIngresoMaterialesPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_add_ingresomaterial,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<IngresoMaterial>
        columns={ingresoMaterialColumns}
        data={ingresoMaterialPagingRes?.data?.items || []}
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
        rowCount={ingresoMaterialPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_ingresomaterial,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default SolicitudMaterialPage;
