import {
  EstadoTareaEnumChoice,
  LineaServicio,
  Rubro,
  useColumnsRubrosCliente,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { CustomTable } from '@/shared/components';
import { useFetchRubros } from '@/actions/app';
import { Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import ClienteInfoPagoManualModal from './ClienteInfoReversoModal';

export type ClientesReversoByStatePageProps = {
  state?: EstadoTareaEnumChoice;
  serviceLine: LineaServicio;
};

const ClientesReversoByStatePage: React.FC<ClientesReversoByStatePageProps> = ({
  serviceLine,
}) => {
  const [open, setOpen] = useState(false);

  // const navigate = useNavigate();

  ///* global state -------------------------

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

  ///* fetch data
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
      estado_rubro: 'PAGADO',
    },
  });

  const isCustomLoading = isRubrosLoading || isRubrosRefetching;
  useLoaders(isCustomLoading);

  ///* mutations -------------------------
  // const createPagoManual = useGenericPOST<any, any>(
  //   '/nuevo-pago/',
  //   RubroTSQEnum.RUBROS,
  //   {
  //     customMessageToast: 'Rubro de servicio pagado correctamente',
  //     customOnSuccess() {},
  //     customOnSettled() {
  //       setConfirmDialogIsOpen(false);
  //     },
  //   },
  // );

  const [selectedRubro, setSelectedRubro] = useState<Rubro | null>(null);

  ///* handlers ---------------------
  const onEdit = (rubro: Rubro) => {
    setSelectedRubro(rubro);
    const fechaTransaccion = dayjs().format('YYYYMMDD');
    const partesContrato =
      rubro.contrato_data?.numero_contrato?.split('-') || [];
    const linea = partesContrato[1] || 'L1'; // Valor por defecto 'L2' si no se encuentra
    console.log('linea', linea);
    console.log('fechaTransaccion', fechaTransaccion);
    console.log('rubro', rubro);
    setOpen(true);
    // setConfirmDialog({
    //   isOpen: true,
    //   title: 'Aplicar pago manual',
    //   subtitle: '¿Está seguro que desea realizar el pago manual?',
    //   onConfirm: () => {
    //     createPagoManual.mutate({
    //       contrapartida: rubro.cliente_data?.identificacion,
    //       linea: linea,
    //       deuda: rubro.valor_total,
    //       canalPago: 'WEB',
    //       fechaTransaccion: fechaTransaccion,
    //       ifi: 'S360',
    //     });
    //     setConfirmDialogIsOpen(false);
    //     // navigate(`${returnUrlClientesSuspendidosAsignadas}/${firstLine}`);
    //   },
    // });
  };

  ///* columns -------------------------
  const { columnsRubrosClientView } = useColumnsRubrosCliente();

  return (
    <>
      <Grid item container xs={12}>
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
            enableActionsColumn={true}
            // crud
            editIconToolTipTitle="Gestionar"
            canEdit={true}
            onEdit={onEdit}
            arrowIcon
            showCustomButtonsSpaceEnd={true}
            canDelete={false}
          />
        </Grid>

        {/* -------------- modals -------------- */}
        <ClienteInfoPagoManualModal
          open={open}
          onClose={() => setOpen(false)}
          rubro={selectedRubro!}
        />

        {/* <ScrollableDialogProps
          title="Editar Rubro de Servicio"
          open={open}
          onClose={handleClose}
          minWidth="81%"
          // confirm --------
          onConfirm={form.handleSubmit(onSave, errors => {
            const keys = getKeysFormErrorsMessage(errors);
            ToastWrapper.error(`Campos requeridos: ${keys}`);
          })}
          confirmVariantBtn="outlined"
          confirmTextBtn="Guardar"
          // // content --------
          contentNode={
            <>
            </>
          }
        /> */}
      </Grid>
    </>
  );
};

export default ClientesReversoByStatePage;
