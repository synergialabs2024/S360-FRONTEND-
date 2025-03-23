import { useFetchPreventas } from '@/actions/app';
import {
  EstadoPreventaEnumChoice,
  PermissionsEnum,
  Preventa,
  TABLE_CONSTANTS,
  useColumnsPreventa,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { EsperaAgendaPreventaCustomButtons } from '../../shared/components';

export type PreventaByStatePageProps = {
  state: EstadoPreventaEnumChoice;
  noAceptados?: boolean;
  pedingPayment?: boolean;
};

const PreventaByStatePage: React.FC<PreventaByStatePageProps> = ({
  state,
  noAceptados,
  pedingPayment,
}) => {
  useCheckPermission(PermissionsEnum.comercial_view_preventa);
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
    data: preventasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPreventas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      estado_preventa: state,

      ...(noAceptados && { contrato_aceptado: false }),

      ...(pedingPayment && {
        // estado_pago: EstadoPagoEnumChoice.PENDIENTE,
        // requiere_pago_previo: true,
        // contrato_aceptado: true,
        espera_pago: true,
      }),
    },
    refetchInterval: 3000,
  });

  ///* columns
  const {
    preventaBaseColumns,
    preventaRealizadas,
    //preventaRechazadas,
    preventasEsperaAceptacionColumns,
    preventaEsperaPagoColumns,
    preventaFallidas,
    preventaSinGestion,
  } = useColumnsPreventa();

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

      <CustomTable<Preventa>
        columns={
          state === EstadoPreventaEnumChoice.ESPERA && noAceptados
            ? preventasEsperaAceptacionColumns
            : state === EstadoPreventaEnumChoice.ESPERA && pedingPayment
              ? preventaEsperaPagoColumns
              : state === EstadoPreventaEnumChoice.FINALIZADO
                ? preventaRealizadas
                : state === EstadoPreventaEnumChoice.FALLIDO
                  ? preventaFallidas
                  : state === EstadoPreventaEnumChoice.SIN_GESTION
                    ? preventaSinGestion
                    : preventaBaseColumns
        }
        data={preventasPagingRes?.data?.items || []}
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
        rowCount={preventasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
        // crud
        canEdit={true}
        canDelete={false}
        // onEdit={onEdit}
        customButtonsSpaceEnd={(preventa: Preventa) => {
          return <EsperaAgendaPreventaCustomButtons preventa={preventa!} />;
        }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default PreventaByStatePage;
