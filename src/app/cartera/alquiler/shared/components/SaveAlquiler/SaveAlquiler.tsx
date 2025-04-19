import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import {
  CustomTypoLabel,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
  CustomTable,
  CustomSingleButton,
} from '@/shared/components';
import AlquilerTitle from './AlquilerTitle';
import { useRubroStore } from '@/store/app/rubros';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  Alquiler,
  gridSize,
  LineaServicio,
  PermissionsEnum,
  useColumnsAlquiler,
  useTableFilter,
  useTableServerSideFiltering,
  valueTipoRecuerrenciaAlquilerEnumChoice,
} from '@/shared';
import {
  CreateSolicitudServicioParamsBase,
  useFetchAlquileres,
} from '@/actions/app';
import { returnUrlAlquiler } from '../../../pages/tables/AlquilerPages';
import { Box, Card, Grid } from '@mui/material';
import ClienteFibraRubroAlquilerModal from '@/app/cliente/cliente/shared/components/fibra/servicio/alquileres/ClienteFibraRubroAlquilerModal';
import { FiPlus } from 'react-icons/fi';

export interface SaveAlquilerProps {
  soporte_tecnico?: LineaServicio;
}

type SaveFormData = CreateSolicitudServicioParamsBase & {};

const SaveAlquiler: React.FC<SaveAlquilerProps> = ({ soporte_tecnico }) => {
  useCheckPermission(PermissionsEnum.clientes_view_cliente);

  ///* form
  const form = useForm<SaveFormData>({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  ///* hooks ----------------
  const navigate = useNavigate();

  ///* local state -------------------------
  const [isOpenalquilerModal, setIsOpenAlquilerModal] =
    useState<boolean>(false);

  ///* global state ----------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAllMinusSL);

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

      linea_servicio: soporte_tecnico?.id,
      cliente: soporte_tecnico?.cliente,
      contrato: soporte_tecnico?.contrato_data!.id,

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

      linea_servicio: soporte_tecnico?.id,
      cliente: soporte_tecnico?.cliente,
      contrato: soporte_tecnico?.contrato_data!.id,

      ...filterObject,
    },
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    console.log(data);
  };

  ///* effects ----------------
  useEffect(() => {
    return () => {
      clearAllRubroStore();
    };
  }, [clearAllRubroStore]);

  ///* columns
  const { alquilerColumns } = useColumnsAlquiler();

  return (
    <SingleFormBoxScene
      titleNode={<AlquilerTitle alquiler={soporte_tecnico!} />}
      onSave={handleSubmit(onSave, () => {})}
      onCancel={() => navigate(returnUrlAlquiler)}
    >
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
              columns={alquilerColumns}
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
              columns={alquilerColumns}
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
        serviceLine={soporte_tecnico!}
      />
    </SingleFormBoxScene>
  );
};

export default SaveAlquiler;
