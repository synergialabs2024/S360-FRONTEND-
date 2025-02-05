import { useFetchMotivoIngreso } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  MotivoIngreso,
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

export const returnUrlMotivoIngresoPages =
  ROUTER_PATHS.inventario.motivoIngresosNav;

export type MotivoIngresoPagesProps = {};

const MotivoIngresoPages: React.FC<MotivoIngresoPagesProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_motivoingreso);

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
    data: motivoIngresoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMotivoIngreso({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      nombre: searchTerm,
      ...filterObject,
    },
  });

  ///* handlers
  const onEdit = (motivoingreso: MotivoIngreso) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Motivo Ingreso',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlMotivoIngresoPages}/editar/${motivoingreso.uuid}`);
      },
    });
  };

  ///* columns
  const { motivoIngresoColumns } = useColumnsMotivoInventario();

  return (
    <SingleTableBoxScene
      title="Motivo Ingreso"
      createPageUrl={`${returnUrlMotivoIngresoPages}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_add_motivoingreso,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MotivoIngreso>
        columns={motivoIngresoColumns}
        data={motivoIngresoPagingRes?.data?.items || []}
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
        rowCount={motivoIngresoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.inventario_view_motivoingreso,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.inventario_view_motivoingreso,
        ])}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default MotivoIngresoPages;
