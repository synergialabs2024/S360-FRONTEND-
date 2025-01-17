import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';
import { ROUTER_PATHS } from '@/router/constants';
import {
  PermissionsEnum,
  RecepcionMaterialEnumChoice,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useColumnsSolicitudMaterial } from '@/shared/hooks/app/inventario/useColumnsSolicitudMaterial';
import { SolicitudMaterial } from '@/shared/interfaces/app/inventario/solicitud-material.ts';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useNavigate } from 'react-router';

export const returnUrlRecepcionMaterialPage =
  ROUTER_PATHS.inventario.RecepcionMaterialesNav;

export type RecepcionMaterialByStatePageProps = {
  state: string;
};

const RecepcionMaterialByStatePage: React.FC<
  RecepcionMaterialByStatePageProps
> = ({ state }) => {
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  const navigate = useNavigate();

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
      name: searchTerm,
      ...filterObject,
      filterByState: false,

      estado_solicitud: state,
    },
  });

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* handlers
  const calcEnableActionsColumn = () => {
    hasPermission(PermissionsEnum.inventario_change_solicitudmaterial);
    if (state === RecepcionMaterialEnumChoice.PENDIENTE) {
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
        text="por identificación"
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
