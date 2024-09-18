import { UseFormReturn } from 'react-hook-form';

import { gridSize, MetodoPagoEnumUUID } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';
import type { SaveFormDataPreventa } from './SavePreventa';

export type DocsSavePreventaStepProps = {
  solicitudServicioId?: number;
  form: UseFormReturn<SaveFormDataPreventa>;

  cedulaFrontalImg: File | null;
  cedulaPosteriorImg: File | null;
  viviendaImg: File | null;
  documentoCuentaBancariaImg: File | null;
  documentoTarjetaCreditoImg: File | null;

  setCedulaFrontalImg: any;
  setCedulaPosteriorImg: any;
  setDocumentoCuentaBancairaImg: any;
  setDocumentoTarjetaCreditoImg: any;
  setViviendaImg: any;
  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const DocsSavePreventaStep: React.FC<DocsSavePreventaStepProps> = ({
  // solicitudServicioId,
  cedulaFrontalImg,
  cedulaPosteriorImg,
  viviendaImg,
  documentoCuentaBancariaImg,
  documentoTarjetaCreditoImg,

  setCedulaFrontalImg,
  setCedulaPosteriorImg,
  setDocumentoCuentaBancairaImg,
  setDocumentoTarjetaCreditoImg,
  setViviendaImg,
  UploadImageDropZoneComponent,

  form,
}) => {
  ///* local states ---------------------

  ///* global state -----------------

  ///* form ---------------------
  const watchedRawPaymentMethod = form.watch('rawPaymentMethod');

  ///* mutations ---------------------
  // const createSolUnblockSolServiceMutation =
  //   useCreateSolicitudDesbloqueoVentas<CreateSolicitudDesbloqueoVentasData>({
  //     // navigate,
  //     customMessageToast: 'Solicitud de aprobración foto planilla enviada',
  //     enableErrorNavigate: false,
  //   });

  ///* handlers ---------------------
  // const onSaveUnblockResquest = async (data: UnlockPlanillaPhotoFormData) => {
  //   setConfirmDialogIsOpen(false);

  //   createSolUnblockSolServiceMutation.mutate({
  //     modelo: SalesModelsEnumChoice.SOLICITUD_SERVICIO,
  //     modelo_id: solicitudServicioId,
  //     modelo_estado:
  //       SalesStatesActionsEnumChoice.SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_ESPERA,
  //     solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice.ESPERA,
  //     motivo: data.motivo,
  //     tipo: SolicitudDesbloqueoTypeEnumChoice.FOTO_PLANILLA_PREVENTA,
  //   });
  // };

  return (
    <>
      <CustomTypoLabel
        text="Documentos Adjuntos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <UploadImageDropZoneComponent
        buttonLabel="Foto cédula frontal"
        selectedImage={cedulaFrontalImg}
        setSelectedImage={setCedulaFrontalImg}
      />
      <UploadImageDropZoneComponent
        buttonLabel="Foto cédula trasera"
        selectedImage={cedulaPosteriorImg}
        setSelectedImage={setCedulaPosteriorImg}
      />

      <UploadImageDropZoneComponent
        buttonLabel="Foto de la vivienda"
        selectedImage={viviendaImg}
        setSelectedImage={setViviendaImg}
        sizeContainer={gridSize}
      />

      {watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO ? (
        <UploadImageDropZoneComponent
          buttonLabel="Foto cuenta bancaria"
          selectedImage={documentoCuentaBancariaImg}
          setSelectedImage={setDocumentoCuentaBancairaImg}
        />
      ) : watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.CREDITO ? (
        <UploadImageDropZoneComponent
          buttonLabel="Foto tarjeta crédito"
          selectedImage={documentoTarjetaCreditoImg}
          setSelectedImage={setDocumentoTarjetaCreditoImg}
        />
      ) : null}

      {/* =============== modal =============== */}
      {/* <ScrollableDialogProps
        open={isOpenModal}
        title="Solictar liberación de foto de planilla"
        contentNode={
          <Grid container spacing={3} py={3}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Si el cliente no dispone de una planilla de servicio básico,
                puede solicitar la liberación de la foto de la planilla en la
                solicitud de servicio{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {form?.getValues().numero_referencia}
                </span>{' '}
                y continuar con el proceso de preventa.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomTextArea
                label="Motivo"
                name="motivo"
                control={formUnblock.control}
                defaultValue={formUnblock.getValues().motivo}
                error={formUnblock.formState.errors.motivo}
                helperText={formUnblock.formState.errors.motivo?.message}
                required={false}
                rows={4}
              />
            </Grid>
          </Grid>
        }
        onConfirm={formUnblock.handleSubmit(onSaveUnblockResquest)}
        onClose={() => {
          formUnblock.reset();
          setConfirmDialogIsOpen(false);
        }}
      /> */}
    </>
  );
};

export default DocsSavePreventaStep;
