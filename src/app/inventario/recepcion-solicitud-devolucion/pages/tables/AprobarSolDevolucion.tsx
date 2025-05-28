import {
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableServerSideFiltering,
  SolicitudDevolucion,
  useColumnsSolicitudDevolucion,
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
import { useFetchSolicitudDevolucion } from '@/actions/app';

export const returnUrlAprobarSolDevolucionPage =
  ROUTER_PATHS.inventario.solicitudDevolucionAprobarNav;

export type AprobarSolDevolucionPageProps = {};

const AprobarSolDevolucionPage: React.FC<
  AprobarSolDevolucionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_solicituddevolicion);

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
    data: solDevolucionPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudDevolucion({
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
  const onEdit = (solicitudDevolucion: SolicitudDevolucion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cambiar estado solicitud',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlAprobarSolDevolucionPage}/editar/${solicitudDevolucion.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { solicitudDevolucionColumns } = useColumnsSolicitudDevolucion();

  return (
    <SingleTableBoxScene
      title="Aprobar solicitud de devolucion"
      createPageUrl={`${returnUrlAprobarSolDevolucionPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_change_solicituddevolicion,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SolicitudDevolucion>
        columns={solicitudDevolucionColumns}
        data={solDevolucionPagingRes?.data?.items || []}
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
        rowCount={solDevolucionPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasPermission(
          PermissionsEnum.inventario_change_solicituddevolicion,
        )}
        // crud
        canEdit={hasPermission(
          PermissionsEnum.inventario_change_solicituddevolicion,
        )}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default AprobarSolDevolucionPage;
