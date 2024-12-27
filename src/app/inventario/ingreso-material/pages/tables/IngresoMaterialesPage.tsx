import { useFetchIngresoMateriales } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  IngresoMaterial,
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

export const returnUrlIngresoMaterialesPage =
  ROUTER_PATHS.inventario.ingresoMaterialesNav;

export type IngresoMaterialesPageProps = {};

const IngresoMaterialesPage: React.FC<IngresoMaterialesPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_ingresomaterial);

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
    data: ingresoMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchIngresoMateriales({
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
      title="Ingreso Material"
      createPageUrl={`${returnUrlIngresoMaterialesPage}/crear`}
      showCreateBtn={hasPermission(
        PermissionsEnum.inventario_add_ingresomaterial,
      )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<IngresoMaterial>
        columns={ingresoMaterialColumns}
        data={ingresoMaterialPagingRes?.data?.items || []}
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
        rowCount={ingresoMaterialPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default IngresoMaterialesPage;
