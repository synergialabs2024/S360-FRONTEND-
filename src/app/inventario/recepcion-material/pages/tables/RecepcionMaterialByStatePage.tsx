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
  SolicitudMaterial,
  InventarioEnumChoice,
  useTableServerSideFiltering,
  useColumnsSolicitudMaterial,
} from '@/shared';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlRecepcionMaterialPage } from './RecepcionMaterialMainPage';
import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';

export type RecepcionMaterialByStatePageProps = {
  state: string;
};

const RecepcionMaterialByStatePage: React.FC<
  RecepcionMaterialByStatePageProps
> = ({ state }) => {
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
    data: solicitudMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudMaterial({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      secuencial: searchTerm,
      ...filterObject,
      filterByState: false,

      estado_solicitud: state,
    },
  });

  ///* handlers
  const calcEnableActionsColumn = () => {
    hasPermission(PermissionsEnum.inventario_change_solicitudmaterial);
    if (state === InventarioEnumChoice.PENDIENTE) {
      return true;
    }
    return false;
  };

  const onEdit = (solicitudmaterial: SolicitudMaterial) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlRecepcionMaterialPage}/editar/${solicitudmaterial.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { solicitudMaterialColumns } = useColumnsSolicitudMaterial();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por Numero de Registro"
      />
      <CustomTable<SolicitudMaterial>
        columns={solicitudMaterialColumns}
        data={solicitudMaterialPagingRes?.data?.items || []}
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
        rowCount={solicitudMaterialPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicitudmaterial,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default RecepcionMaterialByStatePage;
