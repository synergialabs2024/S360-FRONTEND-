import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  RubroTSQEnum,
  useFetchRubros,
  useGetRubroStatisticsLine,
} from '@/actions/app';
import { useGenericPOST } from '@/actions/shared';
import {
  LineaServicio,
  Rubro,
  useColumnsRubrosCliente,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  ChipModelState,
  CustomSingleButton,
  CustomTable,
} from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';
import { useUiConfirmModalStore } from '@/store/ui';
import { ClienteFibraRubroLibreModal } from './libre';

export type ClienteFibraRubroTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibraRubroTab: React.FC<ClienteFibraRubroTabProps> = ({
  serviceLine,
}) => {
  ///* local state -------------------------
  const [isOpenFreeRubroModal, setIsOpenFreeRubroModal] =
    useState<boolean>(false);

  ///* global state -------------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const clearAllRubroStore = useRubroStore(s => s.clearAllMinusSL);

  ///* table -------------------------
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  const {
    // globalFilter,
    pagination,
    searchTerm,
    // onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data -------------------------
  const {
    data: rubrosPagingRes,
    isLoading: isRubrosLoading,
    isRefetching: isRubrosRefetching,
  } = useFetchRubros({
    enabled: !!serviceLine?.uuid,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      ...filterObject,

      cliente: serviceLine?.cliente,
      linea_servicio: serviceLine?.id,

      concepto: searchTerm,
    },
  });

  const { data } = useGetRubroStatisticsLine(serviceLine?.id!);

  const isCustomLoading = isRubrosLoading || isRubrosRefetching;
  useLoaders(isCustomLoading);

  ///* mutations -------------------------
  const createDirectRubro = useGenericPOST<any, any>(
    '/rubro/direct-create/',
    RubroTSQEnum.RUBROS,
    {
      customMessageToast: 'Rubro de creado correctamente',
      customOnSuccess() {},
      customOnSettled() {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  ///* columns -------------------------
  const { columnsRubrosClientView } = useColumnsRubrosCliente({
    showNumberRubro: false,
    showActionColumn: true,
  });

  ///* effects -------------------------
  // clear store
  useEffect(() => {
    return () => {
      clearAllRubroStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid item container xs={12}>
        {/* ================= buttons ================= */}
        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Columna izquierda: estadísticas en grilla 3x3 */}
          <Grid item md={9}>
            {data?.data?.statistics ? (
              <Grid container spacing={1} wrap="wrap">
                {[
                  {
                    label: 'Total Rubro',
                    value: data.data.statistics.total_rubros,
                  },
                  {
                    label: 'Total Rubro Libre',
                    value: data.data.statistics.total_rubros_libre,
                  },
                  {
                    label: 'Total Rubro Producto',
                    value: data.data.statistics.total_rubros_producto,
                  },
                  {
                    label: 'Total Rubro Pagados',
                    value: data.data.statistics.total_rubros_pagados,
                  },
                  {
                    label: 'Total Rubro no Pagados',
                    value: data.data.statistics.total_rubros_no_pagados,
                  },
                  {
                    label: 'Total Rubro con Mikro',
                    value:
                      data.data.statistics.total_rubros_servicio_with_mikro,
                  },
                  {
                    label: 'Total Rubro con Mikro no Pagado',
                    value:
                      data.data.statistics
                        .total_rubros_servicio_with_mikro_pagados,
                  },
                  {
                    label: 'Total Rubro sin Mikro',
                    value:
                      data.data.statistics.total_rubros_servicio_without_mikro,
                  },
                  {
                    label: 'Total Rubro sin Mikro no Pagado',
                    value:
                      data.data.statistics
                        .total_rubros_servicio_without_mikro_pagados,
                  },
                ].map((item, index) => (
                  <Grid item key={index}>
                    <ChipModelState
                      label={`${item.label}: ${item.value}`}
                      color="primary"
                      sxChip={{ height: 'auto' }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : null}
          </Grid>

          {/* Columna derecha: botones */}
          <Grid item container md={3} justifyContent="flex-end" spacing={1}>
            <CustomSingleButton
              label="RUBRO LIBRE"
              color="primary"
              variant="text"
              startIcon={<FiPlus />}
              onClick={() => setIsOpenFreeRubroModal(true)}
              justifyContent="flex-end"
            />
            <CustomSingleButton
              label="RUBRO DE SERVICIO"
              variant="text"
              startIcon={<FiPlus />}
              justifyContent="flex-end"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Crear Rubro de Servicio',
                  subtitle: `¿Está seguro de generar el rubro de para el cliente ${serviceLine?.cliente_data?.razon_social} en el contrato ${serviceLine?.contrato_data?.numero_contrato}? Una vez creado no se podrá eliminar.`,
                  onConfirm: () => {
                    createDirectRubro.mutate({
                      linea_servicio: serviceLine?.id,
                    });
                  },
                });
              }}
            />
          </Grid>
        </Grid>

        {/* ================= table ================= */}
        <Grid item xs={12}>
          <CustomTable<Rubro>
            columns={columnsRubrosClientView}
            data={rubrosPagingRes?.data?.items || []}
            isLoading={isRubrosLoading}
            isRefetching={isRubrosRefetching}
            // // filters - server side
            enableManualFiltering={true}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            // // search
            enableGlobalFilter={false}
            // // pagination
            pagination={pagination}
            onPaging={setPagination}
            rowCount={rubrosPagingRes?.data?.meta?.count}
            // // actions
            enableActionsColumn={false}
            // crud
            canEdit={false}
            canDelete={false}
          />
        </Grid>
      </Grid>

      {/* -------------- modals -------------- */}
      <ClienteFibraRubroLibreModal
        open={isOpenFreeRubroModal}
        onClose={() => setIsOpenFreeRubroModal(false)}
        serviceLine={serviceLine!}
      />
    </>
  );
};

export default ClienteFibraRubroTab;
