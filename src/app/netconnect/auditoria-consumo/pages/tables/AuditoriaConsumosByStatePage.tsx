import { useFetchAuditoriaConsumos } from '@/actions/app';
import {
  AuditoriaConsumo,
  AuditoriaConsumoEnumChoice,
  useColumnsAuditoriaConsumo,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';

export type AuditoriaConsumosByStatePageProps = {
  state: string;
};

const AuditoriaConsumosByStatePage: React.FC<
  AuditoriaConsumosByStatePageProps
> = ({ state }) => {
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
    data: AuditoriaConsumosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAuditoriaConsumos({
    enabled: true,
    params: {
      identificacion: searchTerm,
      ...filterObject,
      page_size: pageSize,
      page: pageIndex + 1,
    },
  });

  ///* columns
  const {
    consumoClientes_Suspendidos_Cosumo,
    consumoClientes_Activos_Alto_Consumo,
    consumoClientes_Activos_Moroso,
    consumoClientes_Suspendidos_Consumo_MK,
  } = useColumnsAuditoriaConsumo();

  console.log(state);

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
        sxContainer={{
          mb: 5,
        }}
      />
      <CustomTable<AuditoriaConsumo>
        columns={
          // solicitudServicioBase
          state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO
            ? consumoClientes_Suspendidos_Cosumo
            : state === AuditoriaConsumoEnumChoice.ACTIVOS_ALTO_CONSUMO
              ? consumoClientes_Activos_Alto_Consumo
              : state === AuditoriaConsumoEnumChoice.ACTIVOS_MOROSO
                ? consumoClientes_Activos_Moroso
                : state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO_MK
                  ? consumoClientes_Suspendidos_Consumo_MK
                  : consumoClientes_Suspendidos_Cosumo
        }
        data={AuditoriaConsumosPagingRes?.data?.items || []}
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
        rowCount={AuditoriaConsumosPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default AuditoriaConsumosByStatePage;
