import { useNavigate } from 'react-router-dom';

import {
  useTableFilter,
  useColumnsRuta,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import { useFetchRutas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Ruta } from '@/shared/interfaces';

export const returnUrlRutasPage = ROUTER_PATHS.infraestructura.rutasNav;

export type RutasPageProps = {};

const RutasPage: React.FC<RutasPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_view_ruta);

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
    data: OsLTPagingRes,
    isLoading,
    isRefetching,
  } = useFetchRutas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (ruta: Ruta) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Ruta',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlRutasPage}/editar/${ruta.uuid}`);
      },
    });
  };

  const { rutaColumns } = useColumnsRuta();

  return (
    <SingleTableBoxScene
      title="Rutas"
      createPageUrl={`${returnUrlRutasPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.infraestructura_add_ruta,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />
      <CustomTable<Ruta>
        columns={rutaColumns}
        data={OsLTPagingRes?.data?.items || []}
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
        rowCount={OsLTPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.infraestructura_change_ruta,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.infraestructura_change_ruta,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default RutasPage;
