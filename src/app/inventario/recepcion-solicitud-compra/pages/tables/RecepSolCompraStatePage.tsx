import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  SolicitudCompra,
  InventarioEnumChoice,
  useColumnsSolicitudCompra,
  useTableServerSideFiltering,
} from '@/shared';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchSolicitudCompra } from '@/actions/app';
import { returnUrlRecepSolCompraPage } from './RecepcionSolCompraMainPages';

export type RecepSolCompraStatePageProps = {
  state: string;
};

const RecepSolCompraStatePage: React.FC<RecepSolCompraStatePageProps> = ({
  state,
}) => {
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
    data: solicitudCompraMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudCompra({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,

      estado_solicitud: state,
      filterByState: false,
    },
  });

  ///* handlers
  const calcEnableActionsColumn = () => {
    hasPermission(PermissionsEnum.inventario_change_solicitudcompra);
    if (state === InventarioEnumChoice.PENDIENTE) {
      return true;
    }
    return false;
  };

  const onEdit = (solicitudCompraMaterial: SolicitudCompra) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlRecepSolCompraPage}/editar/${solicitudCompraMaterial.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { solicitudCompraColumns } = useColumnsSolicitudCompra();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />
      <CustomTable<SolicitudCompra>
        columns={solicitudCompraColumns}
        data={solicitudCompraMaterialPagingRes?.data?.items || []}
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
        rowCount={solicitudCompraMaterialPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicitudcompra,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default RecepSolCompraStatePage;
