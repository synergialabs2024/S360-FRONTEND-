import {
  Alquiler,
  valueTipoRecuerrenciaAlquilerEnumChoice,
  LineaServicio,
  useColumnsAlquiler,
  useTableFilter,
  useTableServerSideFiltering,
  gridSize,
} from '@/shared';
import {
  CustomSingleButton,
  CustomTable,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import ClienteFibraRubroAlquilerModal from '../rubros/tabs/rurbos/libre/ClienteFibraRubroAlquilerModal';
import { useFetchAlquileres } from '@/actions/app';
import { Box, Card, Grid } from '@mui/material';

export type ClienteFibraAlquileresPartProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraAlquileresPart: React.FC<ClienteFibraAlquileresPartProps> = ({
  serviceLine,
}) => {
  ///* local state -------------------------
  const [isOpenalquilerModal, setIsOpenAlquilerModal] =
    useState<boolean>(false);

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table
  const { pagination, setPagination } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data
  const {
    data: AlquilerCuotasPagingRes,
    isLoading: isLoadingAlquilerCuotas,
    isRefetching: isRefetchingAlquilerCuotas,
  } = useFetchAlquileres({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      tipo_recurrencias: [
        valueTipoRecuerrenciaAlquilerEnumChoice.MENSUAL,
        valueTipoRecuerrenciaAlquilerEnumChoice.CUOTAS,
      ],

      linea_servicio: serviceLine.id,
      cliente: serviceLine.cliente,
      contrato: serviceLine.contrato_data!.id,

      ...filterObject,
    },
  });

  const {
    data: AlquilerUnPagoPagingRes,
    isLoading: isLoadingAlquilerUnPago,
    isRefetching: isRefetchingAlquilerUnPago,
  } = useFetchAlquileres({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      tipo_recurrencia: valueTipoRecuerrenciaAlquilerEnumChoice.UN_SOLO_PAGO,

      linea_servicio: serviceLine.id,
      cliente: serviceLine.cliente,
      contrato: serviceLine.contrato_data!.id,

      ...filterObject,
    },
  });

  ///* columns
  const { alquilerClienteColumns } = useColumnsAlquiler();

  return (
    <>
      <CustomSingleButton
        label="Servicios Recurrentes"
        color="primary"
        variant="text"
        startIcon={<FiPlus />}
        onClick={() => {
          setIsOpenAlquilerModal(true);
        }}
        justifyContent="flex-end"
      />
      <CustomTypoLabel
        text="PRODUCTOS Y OTROS SERVICIOS RECURRENTES (CUOTAS Y MENSUAL)"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <Grid item container justifyContent="center" p={2} {...gridSize}>
        <Card
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <CustomTable<Alquiler>
              columns={alquilerClienteColumns}
              data={AlquilerCuotasPagingRes?.data?.items || []}
              isLoading={isLoadingAlquilerCuotas}
              isRefetching={isRefetchingAlquilerCuotas}
              // // filters - server side
              enableManualFiltering={true}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
              // // search
              enableGlobalFilter={false}
              // // pagination
              pagination={pagination}
              onPaging={setPagination}
              rowCount={AlquilerCuotasPagingRes?.data?.meta?.count}
              enableActionsColumn={false}
            />
          </Box>
        </Card>
      </Grid>

      <CustomTypoLabel
        text="PRODUCTOS Y OTROS SERVICIOS RECURRENTES (UN SOLO PAGO)"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <Grid item container justifyContent="center" p={2} {...gridSize}>
        <Card
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <CustomTable<Alquiler>
              columns={alquilerClienteColumns}
              data={AlquilerUnPagoPagingRes?.data?.items || []}
              isLoading={isLoadingAlquilerUnPago}
              isRefetching={isRefetchingAlquilerUnPago}
              // // filters - server side
              enableManualFiltering={true}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
              // // search
              enableGlobalFilter={false}
              // // pagination
              pagination={pagination}
              onPaging={setPagination}
              rowCount={AlquilerUnPagoPagingRes?.data?.meta?.count}
              enableActionsColumn={false}
            />
          </Box>
        </Card>
      </Grid>
      {/* -------------- modals -------------- */}
      <ClienteFibraRubroAlquilerModal
        open={isOpenalquilerModal}
        onClose={() => setIsOpenAlquilerModal(false)}
        serviceLine={serviceLine!}
      />
    </>
  );
};

export default ClienteFibraAlquileresPart;
