import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableServerSideFiltering,
  SolicitudTransferenciaMaterial,
  useColumnsTransferenciaMaterial,
} from '@/shared';
import { useNavigate } from 'react-router';
import { ROUTER_PATHS } from '@/router/constants';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchSolicitudTransferenciaMateriales } from '@/actions/app';

export const returnUrlAprobarSolTransferenciaPage =
  ROUTER_PATHS.inventario.solicitudTransferenciaAprobarNav;

export type AprobarSolTransferenciaPageProps = {};

const AprobarSolTransferenciaPage: React.FC<
  AprobarSolTransferenciaPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.inventario_view_solicitudtransferenciamaterial,
  );

  const navigate = useNavigate();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

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
    data: solTransferenciaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudTransferenciaMateriales({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      estado_solicitud: 'APROBADO',
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (solicitudTransferencia: SolicitudTransferenciaMaterial) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlAprobarSolTransferenciaPage}/editar/${solicitudTransferencia.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { transferenciaMaterialColumns } = useColumnsTransferenciaMaterial();

  return (
    <SingleTableBoxScene
      title="Aprobar solicitud de transferencia"
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolicitudTransferenciaMaterial>
        columns={transferenciaMaterialColumns}
        data={solTransferenciaPagingRes?.data?.items || []}
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
        rowCount={solTransferenciaPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.inventario_change_solicitudtransferenciamaterial,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicitudtransferenciamaterial,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default AprobarSolTransferenciaPage;
