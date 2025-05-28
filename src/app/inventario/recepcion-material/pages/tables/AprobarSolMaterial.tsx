import {
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  SolicitudMaterial,
  useColumnsSolicitudMaterial,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import { useNavigate } from 'react-router';
import { ROUTER_PATHS } from '@/router/constants';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchSolicitudMaterial } from '@/actions/app';
3;

export const returnUrlAprobarSolMaterialPage =
  ROUTER_PATHS.inventario.solicitudMaterialAprobarNav;

export type AprobarSolMaterialPageProps = {};

const AprobarSolMaterialPage: React.FC<AprobarSolMaterialPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_solicitudmaterial);

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
    data: solMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudMaterial({
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
  const onEdit = (solicitudMaterial: SolicitudMaterial) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlAprobarSolMaterialPage}/editar/${solicitudMaterial.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { solicitudMaterialColumns } = useColumnsSolicitudMaterial();

  return (
    <SingleTableBoxScene
      title="Aprobar solicitud de material"
      createPageUrl={`${returnUrlAprobarSolMaterialPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_change_solicitudmaterial,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolicitudMaterial>
        columns={solicitudMaterialColumns}
        data={solMaterialPagingRes?.data?.items || []}
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
        rowCount={solMaterialPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.inventario_change_solicitudmaterial,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicitudmaterial,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default AprobarSolMaterialPage;
