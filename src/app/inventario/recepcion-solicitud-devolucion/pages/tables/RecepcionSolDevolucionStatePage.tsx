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
  SolicitudDevolucion,
  InventarioEnumChoice,
  useTableServerSideFiltering,
  useColumnsSolicitudDevolucion,
} from '@/shared';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchSolicitudDevolucion } from '@/actions/app';
import { returnUrlRecepcionSolicitudDevolucionMaterialesPage } from './RecepcionSolDevolucionMainPages';

export type RecepcionSolicitudDevolucionMaterialStatePageProps = {
  state: string;
};

const RecepcionSolicitudDevolucionMaterialStatePage: React.FC<
  RecepcionSolicitudDevolucionMaterialStatePageProps
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
    data: solicitudDevolucionMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudDevolucion({
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
    hasPermission(PermissionsEnum.inventario_change_solicituddevolicion);
    if (state === InventarioEnumChoice.PENDIENTE) {
      return true;
    }
    return false;
  };

  const onEdit = (solicitudDevolucionMaterial: SolicitudDevolucion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlRecepcionSolicitudDevolucionMaterialesPage}/editar/${solicitudDevolucionMaterial.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { solicitudDevolucionColumns } = useColumnsSolicitudDevolucion();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por numero de registro"
      />
      <CustomTable<SolicitudDevolucion>
        columns={solicitudDevolucionColumns}
        data={solicitudDevolucionMaterialPagingRes?.data?.items || []}
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
        rowCount={solicitudDevolucionMaterialPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicituddevolicion,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default RecepcionSolicitudDevolucionMaterialStatePage;
