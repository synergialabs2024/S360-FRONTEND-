import { useFetchRubros } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumnsRubrosCliente,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Rubro } from '@/shared/interfaces';

export const returnUrlRubrosPage = ROUTER_PATHS.cobranza.rubrosNav;

export type RubrosPageProps = {};

const RubrosPage: React.FC<RubrosPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_view_rubro);

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
    data: RubrosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchRubros({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      cliente__razon_social: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns -----
  const { columnsRubrosGeneric } = useColumnsRubrosCliente();

  return (
    <SingleTableBoxScene
      title="Rubros"
      createPageUrl={`${returnUrlRubrosPage}/crear`}
      showCreateBtn={false}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Rubro>
        columns={columnsRubrosGeneric}
        data={RubrosPagingRes?.data?.items || []}
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
        rowCount={RubrosPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
        // no requiere crear ni editar, entonces no maneja store (activeServiceLine)
        // crud
      />
    </SingleTableBoxScene>
  );
};

export default RubrosPage;
