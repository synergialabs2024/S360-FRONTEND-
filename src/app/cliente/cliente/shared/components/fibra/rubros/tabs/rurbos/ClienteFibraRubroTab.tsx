import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { RubroTSQEnum, useFetchRubros } from '@/actions/app';
import { useGenericPOST } from '@/actions/shared';
import {
  LineaServicio,
  Rubro,
  useColumnsRubrosCliente,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { CustomSingleButton, CustomTable } from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import { ClienteFibraRubroLibreModal } from './libre';
import { useRubroStore } from '@/store/app/rubros';

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
  const setActiveServiceLine = useRubroStore(s => s.setActiveServiceLine); // to edit
  const clearAllRubroStore = useRubroStore(s => s.clearAll);

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

  const isCustomLoading = isRubrosLoading || isRubrosRefetching;
  useLoaders(isCustomLoading);

  ///* mutations -------------------------
  const createDirectRubro = useGenericPOST<any, any>(
    '/rubro/direct-create/',
    RubroTSQEnum.RUBROS,
    {
      customMessageToast: 'Rubro de servicio creado correctamente',
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
  useEffect(() => {
    if (!serviceLine) return;
    setActiveServiceLine(serviceLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceLine]);
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
        <Grid item container xs={12} my={3}>
          <span className="spacer"></span>

          <Grid item container md={6} justifyContent="flex-end" spacing={1}>
            <CustomSingleButton
              label="RUBRO LIBRE"
              color="primary"
              variant="text"
              startIcon={<FiPlus />}
              onClick={() => {
                setIsOpenFreeRubroModal(true);
              }}
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
                  subtitle: `¿Está seguro de generar el rubro de servicio para el cliente ${serviceLine?.cliente_data?.razon_social} en el contrato ${serviceLine?.contrato_data?.numero_contrato}? Una vez creado no se podrá eliminar.`,
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
