import {
  EstadoPagoEnumChoice,
  EstadoSolicitudMaterialEnumChoice,
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

import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';

export type PreventaByStatePageProps = {
  state: EstadoSolicitudMaterialEnumChoice;
  noAceptados?: boolean;
  pedingPayment?: boolean;
};

const SolicitudMaterialByStatePage: React.FC<PreventaByStatePageProps> = ({
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
  } = useFetchSolicitudMaterial({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      estado_solicitud: state,

      ...(noAceptados && { contrato_aceptado: false }),

      ...(pedingPayment && {
        estado_pago: EstadoPagoEnumChoice.PENDIENTE,
        requiere_pago_previo: true,
        contrato_aceptado: true,
      }),
    },
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
          state === EstadoSolicitudMaterialEnumChoice.PENDIENTE && noAceptados
            ? preventasEsperaAceptacionColumns
            : state === EstadoSolicitudMaterialEnumChoice.APROBADO &&
                pedingPayment
              ? preventaEsperaPagoColumns
              : state === EstadoSolicitudMaterialEnumChoice.RECHAZADO
                ? preventaRealizadas
                : state === EstadoSolicitudMaterialEnumChoice.FINALIZADO
                  ? preventaFallidas
                  : state === EstadoSolicitudMaterialEnumChoice.SIN_GESTION
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
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudMaterialByStatePage;
