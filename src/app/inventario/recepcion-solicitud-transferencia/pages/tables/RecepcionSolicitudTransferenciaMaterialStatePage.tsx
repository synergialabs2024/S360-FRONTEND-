import { useNavigate } from 'react-router';

import { useFetchSolicitudTransferenciaMateriales } from '@/actions/app';
import {
  InventarioEnumChoice,
  PermissionsEnum,
  SolicitudTransferenciaMaterial,
  TABLE_CONSTANTS,
  useColumnsTransferenciaMaterial,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlRecepcionSolicitudTransferenciaMaterialesPage } from './RecepcionSolicitudTransferenciaMaterialMainPages';

export type RecepcionSolicitudTransferenciaMaterialStatePageProps = {
  state: string;
};

const RecepcionSolicitudTransferenciaMaterialStatePage: React.FC<
  RecepcionSolicitudTransferenciaMaterialStatePageProps
> = ({ state }) => {
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
    data: solicitudTransferenciaMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudTransferenciaMateriales({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      secuencial: searchTerm,
      ...filterObject,

      estado_solicitud: state,
      filterByState: false,
    },
  });

  ///* handlers
  const calcEnableActionsColumn = () => {
    hasPermission(
      PermissionsEnum.inventario_change_solicitudtransferenciamaterial,
    );
    if (state === InventarioEnumChoice.PENDIENTE) {
      return true;
    }
    return false;
  };

  const onEdit = (
    solicitudTransferenciaMaterial: SolicitudTransferenciaMaterial,
  ) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlRecepcionSolicitudTransferenciaMaterialesPage}/editar/${solicitudTransferenciaMaterial.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { transferenciaMaterialColumns } = useColumnsTransferenciaMaterial();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por Numero de Registro"
      />
      <CustomTable<SolicitudTransferenciaMaterial>
        columns={transferenciaMaterialColumns}
        data={solicitudTransferenciaMaterialPagingRes?.data?.items || []}
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
        rowCount={solicitudTransferenciaMaterialPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicitudtransferenciamaterial,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default RecepcionSolicitudTransferenciaMaterialStatePage;
