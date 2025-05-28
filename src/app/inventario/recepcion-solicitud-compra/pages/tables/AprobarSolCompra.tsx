import { useFetchSolicitudCompra } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  PermissionsEnum,
  SolicitudCompra,
  TABLE_CONSTANTS,
  useColumnsSolicitudCompra,
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
import { useNavigate } from 'react-router';

export const returnUrlAprobarSolCompraPage =
  ROUTER_PATHS.inventario.solicitudCompraAprobarNav;

export type AprobarSolCompraPageProps = {};

const AprobarSolCompraPage: React.FC<AprobarSolCompraPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_solicitudcompra);

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
    data: solCompraPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudCompra({
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
  const onEdit = (solicitudCompraMaterial: SolicitudCompra) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlAprobarSolCompraPage}/editar/${solicitudCompraMaterial.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { solicitudCompraColumns } = useColumnsSolicitudCompra();

  return (
    <SingleTableBoxScene
      title="Aprobar solicitud de compra"
      createPageUrl={`${returnUrlAprobarSolCompraPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_change_solicitudcompra,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolicitudCompra>
        columns={solicitudCompraColumns}
        data={solCompraPagingRes?.data?.items || []}
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
        rowCount={solCompraPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.inventario_change_solicitudcompra,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicitudcompra,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default AprobarSolCompraPage;
