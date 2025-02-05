import { useFetchMotivoEgreso } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  MotivoEgreso,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsMotivoInventario,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useNavigate } from 'react-router';

export const returnUrlMotivoEgresoPages =
  ROUTER_PATHS.inventario.motivoEgresosNav;

export type MotivoEgresoPagesProps = {};

const MotivoEgresoPages: React.FC<MotivoEgresoPagesProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_motivoegreso);

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
    data: motivoEgresoMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMotivoEgreso({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      nombre: searchTerm,
      ...filterObject,
    },
  });

  ///* handlers
  const onEdit = (motivoegreso: MotivoEgreso) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Motivo Egreso',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlMotivoEgresoPages}/editar/${motivoegreso.uuid}`);
      },
    });
  };

  ///* columns
  const { motivoEgresoColumns } = useColumnsMotivoInventario();

  return (
    <SingleTableBoxScene
      title="Motivo Egreso"
      createPageUrl={`${returnUrlMotivoEgresoPages}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.inventario_add_motivoegreso)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MotivoEgreso>
        columns={motivoEgresoColumns}
        data={motivoEgresoMaterialPagingRes?.data?.items || []}
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
        rowCount={motivoEgresoMaterialPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.inventario_view_motivoegreso,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.inventario_view_motivoegreso,
        ])}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default MotivoEgresoPages;
