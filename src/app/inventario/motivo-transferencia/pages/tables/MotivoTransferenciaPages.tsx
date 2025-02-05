import { useFetchMotivoTransferencia } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  MotivoTransferencia,
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

export const returnUrlMotivoTransferenciaPages =
  ROUTER_PATHS.inventario.motivoTransferenciasNav;

export type MotivoTransferenciaPagesProps = {};

const MotivoTransferenciaPages: React.FC<
  MotivoTransferenciaPagesProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_motivotransferencia);

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
    data: motivoTransferenciaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMotivoTransferencia({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      nombre: searchTerm,
      ...filterObject,
    },
  });

  ///* handlers
  const onEdit = (motivotransferencia: MotivoTransferencia) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Motivo Transferencia',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlMotivoTransferenciaPages}/editar/${motivotransferencia.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { motivoTransferenciaColumns } = useColumnsMotivoInventario();

  return (
    <SingleTableBoxScene
      title="Motivo Transferencia"
      createPageUrl={`${returnUrlMotivoTransferenciaPages}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_add_motivotransferencia,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MotivoTransferencia>
        columns={motivoTransferenciaColumns}
        data={motivoTransferenciaPagingRes?.data?.items || []}
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
        rowCount={motivoTransferenciaPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.inventario_view_motivotransferencia,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.inventario_view_motivotransferencia,
        ])}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default MotivoTransferenciaPages;
