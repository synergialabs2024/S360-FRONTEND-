import { useFetchModeloInventarios } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  ModeloInventario,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsModeloInventario,
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

export const returnUrlModeloInventariosPage =
  ROUTER_PATHS.inventario.modeloInventariosNav;

export type ModeloInventariosPagesProps = {};

const ModeloInventariosPages: React.FC<ModeloInventariosPagesProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_modeloinventario);

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
    data: modeloInventarioPagingRes,
    isLoading,
    isRefetching,
  } = useFetchModeloInventarios({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      nombre: searchTerm,
      ...filterObject,
    },
  });

  ///* handlers
  const onEdit = (modelo_inventario: ModeloInventario) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Modelo Inventario',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlModeloInventariosPage}/editar/${modelo_inventario.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { modeloInventarioColumns } = useColumnsModeloInventario();

  return (
    <SingleTableBoxScene
      title="Modelo de Inventario"
      createPageUrl={`${returnUrlModeloInventariosPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_add_modeloinventario,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<ModeloInventario>
        columns={modeloInventarioColumns}
        data={modeloInventarioPagingRes?.data?.items || []}
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
        rowCount={modeloInventarioPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.inventario_view_modeloinventario,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.inventario_view_modeloinventario,
        ])}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default ModeloInventariosPages;
