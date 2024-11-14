import {
  useFetchClientesActivosAltoConsumo,
  useFetchClientesActivosMoroso,
  useFetchClientesSuspendidosConsumo,
  useFetchClientesSuspendidosConsumoMK,
} from '@/actions/app';
import {
  AuditoriaConsumo,
  AuditoriaConsumoEnumChoice,
  useButtonsAuditoriaConsumo,
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
    data: ClientesSuspendidosConsumoPagingRes,
    isLoading: isLoadingCSC,
    isRefetching: isRefetchingCSC,
  } = useFetchClientesSuspendidosConsumo({
    enabled: true,
    params: {
      identificacion: searchTerm,
      ...filterObject,
      page_size: pageSize,
      page: pageIndex + 1,
    },
  });

  const {
    data: ClientesActivosAltoConsumoPagingRes,
    isLoading: isLoadingCAAC,
    isRefetching: isRefetchingCAAC,
  } = useFetchClientesActivosAltoConsumo({
    enabled: true,
    params: {
      identificacion: searchTerm,
      ...filterObject,
      page_size: pageSize,
      page: pageIndex + 1,
    },
  });

  const {
    data: ClientesActivosMorosoPagingRes,
    isLoading: isLoadingCAM,
    isRefetching: isRefetchingCAM,
  } = useFetchClientesActivosMoroso({
    enabled: true,
    params: {
      identificacion: searchTerm,
      ...filterObject,
      page_size: pageSize,
      page: pageIndex + 1,
    },
  });

  const {
    data: ClientesSuspendidosConsumoMKPagingRes,
    isLoading: isLoadingCSCMK,
    isRefetching: isRefetchingCSCMK,
  } = useFetchClientesSuspendidosConsumoMK({
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

  ///* buttons

  const {
    buttonClientesSuspendidosConsumo,
    buttonClientesActivosAltoConsumo,
    buttonActivosMoroso,
    buttonSuspendidosConsumoMK,
  } = useButtonsAuditoriaConsumo();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
        sxContainer={{
          mb: 5,
        }}
        customSpaceNode={
          <>
            {state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO ? (
              <>{buttonClientesSuspendidosConsumo()}</>
            ) : state === AuditoriaConsumoEnumChoice.ACTIVOS_ALTO_CONSUMO ? (
              <>{buttonClientesActivosAltoConsumo()}</>
            ) : state === AuditoriaConsumoEnumChoice.ACTIVOS_MOROSO ? (
              <>{buttonActivosMoroso()}</>
            ) : state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO_MK ? (
              <>{buttonSuspendidosConsumoMK()}</>
            ) : null}
          </>
        }
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
        data={ClientesSuspendidosConsumoPagingRes?.data?.items || []}
        isLoading={
          state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO
            ? isLoadingCSC
            : state === AuditoriaConsumoEnumChoice.ACTIVOS_ALTO_CONSUMO
              ? isLoadingCAAC
              : state === AuditoriaConsumoEnumChoice.ACTIVOS_MOROSO
                ? isLoadingCAM
                : state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO_MK
                  ? isLoadingCSCMK
                  : isLoadingCSC
        }
        isRefetching={
          state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO
            ? isRefetchingCSC
            : state === AuditoriaConsumoEnumChoice.ACTIVOS_ALTO_CONSUMO
              ? isRefetchingCAAC
              : state === AuditoriaConsumoEnumChoice.ACTIVOS_MOROSO
                ? isRefetchingCAM
                : state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO_MK
                  ? isRefetchingCSCMK
                  : isRefetchingCSC
        }
        // // filters - server side
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={
          state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO
            ? ClientesSuspendidosConsumoPagingRes?.data?.meta?.count
            : state === AuditoriaConsumoEnumChoice.ACTIVOS_ALTO_CONSUMO
              ? ClientesActivosAltoConsumoPagingRes?.data?.meta?.count
              : state === AuditoriaConsumoEnumChoice.ACTIVOS_MOROSO
                ? ClientesActivosMorosoPagingRes?.data?.meta?.count
                : state === AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO_MK
                  ? ClientesSuspendidosConsumoMKPagingRes?.data?.meta?.count
                  : ClientesSuspendidosConsumoPagingRes?.data?.meta?.count
        }
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default AuditoriaConsumosByStatePage;
