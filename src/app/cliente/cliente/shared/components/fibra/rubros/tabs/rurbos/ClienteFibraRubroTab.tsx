import { useEffect, useState } from 'react';
import { Grid, Tab } from '@mui/material';
import { FiPlus } from 'react-icons/fi';

import {
  RubroTSQEnum,
  useFetchRubros,
  useGetRubroStatisticsLine,
} from '@/actions/app';
import {
  LineaServicio,
  Rubro,
  useColumnsRubrosCliente,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  ChipModelState,
  CustomSingleButton,
  CustomTable,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { useGenericPOST } from '@/actions/shared';
import { useRubroStore } from '@/store/app/rubros';
import { useUiConfirmModalStore } from '@/store/ui';
import { ClienteFibraRubroLibreModal } from './libre';

export type ClienteFibraRubroTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibraRubroTab: React.FC<ClienteFibraRubroTabProps> = ({
  serviceLine,
}) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

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

  const renderChips = (
    items: { label: string; value: number | string | null | undefined }[],
    color: 'warning' | 'success',
  ) => (
    <Grid container spacing={2} wrap="wrap">
      {items.map((item, index) => (
        <Grid item key={index} xs={12} sm="auto">
          <ChipModelState
            label={`${item.label}: ${item.value ?? 0}`}
            color={color}
            sxChip={{ height: '35px' }}
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Grid item container xs={12}>
        {/* ================= buttons ================= */}
        <Grid
          item
          container
          xs={12}
          sx={{ mb: 5 }}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Columna izquierda: estadísticas en grilla 3x3 */}
          <Grid item md={9}>
            <NestedTabsScene
              tabs={
                <FormTabsOnly value={tabValue} onChange={handleTabChange}>
                  <Tab label="Total" value={1} {...a11yProps(1)} />
                  <Tab label="Total Mikro" value={2} {...a11yProps(2)} />
                </FormTabsOnly>
              }
              sxContainer={{
                pt: 0,
                pb: 0,
                mt: -10,
              }}
            >
              {/* ========================= NORMAL ========================= */}
              <CustomTabPanel index={1} value={tabValue}>
                {data?.data?.statistics &&
                  renderChips(
                    [
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
                    ],
                    'warning',
                  )}
              </CustomTabPanel>

              {/* ========================= MIKRO ========================= */}
              <CustomTabPanel index={2} value={tabValue}>
                {data?.data?.statistics &&
                  renderChips(
                    [
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
                          data.data.statistics
                            .total_rubros_servicio_without_mikro,
                      },
                      {
                        label: 'Total Rubro sin Mikro no Pagado',
                        value:
                          data.data.statistics
                            .total_rubros_servicio_without_mikro_pagados,
                      },
                    ],
                    'success',
                  )}
              </CustomTabPanel>
            </NestedTabsScene>
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
