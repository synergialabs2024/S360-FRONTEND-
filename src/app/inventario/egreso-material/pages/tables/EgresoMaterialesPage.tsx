import { useFetchEgresoMateriales } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  EgresoMaterial,
  PermissionsEnum,
  useColumnsIngresoMaterial,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { hasPermission } from '@/shared/utils/auth';

export const returnUrlEgresoMaterialesPage =
  ROUTER_PATHS.inventario.egresoMaterialesNav;

export type EgresoMaterialesPageProps = {};

const EgresoMaterialesPage: React.FC<EgresoMaterialesPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_egresomaterial);

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
    data: egresoMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchEgresoMateriales({
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
  const { ingresoMaterialColumns } = useColumnsIngresoMaterial();

  return (
    <SingleTableBoxScene
      title="Egreso Material"
      createPageUrl={`${returnUrlEgresoMaterialesPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_add_egresomaterial,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<EgresoMaterial>
        columns={ingresoMaterialColumns}
        data={egresoMaterialPagingRes?.data?.items || []}
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
        rowCount={egresoMaterialPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default EgresoMaterialesPage;
