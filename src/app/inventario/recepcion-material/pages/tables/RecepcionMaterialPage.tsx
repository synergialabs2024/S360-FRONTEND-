import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';
import { ROUTER_PATHS } from '@/router/constants';
import {
  PermissionsEnum,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useColumnsSolicitudMaterial } from '@/shared/hooks/app/inventario/useColumnsSolicitudMaterial';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SolicitudMaterial } from '@/shared/interfaces/app/inventario/solicitud-material.ts';
import { hasPermission } from '@/shared/utils/auth';

export const returnUrlRecepcionMaterialesPage =
  ROUTER_PATHS.inventario.RecepcionMaterialesNav;

export type RecepcionMaterialesPageProps = {};

const RecepcionMaterialesPage: React.FC<RecepcionMaterialesPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_solicitudmaterial);

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
    },
  });

  ///* columns
  const { solicitudMaterialColumns } = useColumnsSolicitudMaterial();

  return (
    <SingleTableBoxScene
      title="Recepcion Material"
      createPageUrl={`${returnUrlRecepcionMaterialesPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_add_solicitudmaterial,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
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
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default RecepcionMaterialesPage;
