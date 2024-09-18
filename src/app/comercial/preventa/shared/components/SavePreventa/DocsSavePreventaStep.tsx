import { Grid, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { IoMdUnlock } from 'react-icons/io';

import {
  CreateSolicitudDesbloqueoVentasData,
  useCreateSolicitudDesbloqueoVentas,
} from '@/actions/app';
import {
  GeneralModelStatesEnumChoice,
  gridSize,
  gridSizeMdLg6,
  gridSizeMdLg7,
  MetodoPagoEnumUUID,
  SalesModelsEnumChoice,
  SalesStatesActionsEnumChoice,
  SolicitudDesbloqueoTypeEnumChoice,
  unlockPlanillaPhotoSchema,
} from '@/shared';
import {
  CustomSingleButton,
  CustomTextArea,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  ScrollableDialogProps,
} from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SaveFormDataPreventa } from './SavePreventa';

export type DocsSavePreventaStepProps = {
  solicitudServicioId: number;
  form: UseFormReturn<SaveFormDataPreventa>;

  planillaImg: File | null;
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
  setPlanillaImg: any;
  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

type UnlockPlanillaPhotoFormData = {
  motivo: string;
};

const DocsSavePreventaStep: React.FC<DocsSavePreventaStepProps> = ({
  solicitudServicioId,
  planillaImg,
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
  setPlanillaImg,
  UploadImageDropZoneComponent,

  form,
}) => {
  ///* hooks ---------------------
  const theme = useTheme();

  ///* local states ---------------------
  const [isSupervisorUnlockingSent, setIsSupervisorUnlockingSent] =
    useState<boolean>(false);
  const [isOpenModal, setConfirmDialogIsOpen] = useState<boolean>(false);

  ///* global state -----------------

  ///* form ---------------------
  const watchedRawPaymentMethod = form.watch('rawPaymentMethod');
  const formUnblock = useForm<UnlockPlanillaPhotoFormData>({
    resolver: yupResolver(unlockPlanillaPhotoSchema),
    defaultValues: {
      motivo: '',
    },
  });

  ///* mutations ---------------------
  const createSolUnblockSolServiceMutation =
    useCreateSolicitudDesbloqueoVentas<CreateSolicitudDesbloqueoVentasData>({
      // navigate,
      customMessageToast: 'Solicitud de aprobración foto planilla enviada',
      enableErrorNavigate: false,
    });

  ///* handlers ---------------------
  const onSaveUnblockResquest = async (data: UnlockPlanillaPhotoFormData) => {
    setIsSupervisorUnlockingSent(true);
    setConfirmDialogIsOpen(false);

    createSolUnblockSolServiceMutation.mutate({
      modelo: SalesModelsEnumChoice.SOLICITUD_SERVICIO,
      modelo_id: solicitudServicioId,
      modelo_estado:
        SalesStatesActionsEnumChoice.SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_ESPERA,
      solicitud_desbloqueo_estado: GeneralModelStatesEnumChoice.ESPERA,
      motivo: data.motivo,
      tipo: SolicitudDesbloqueoTypeEnumChoice.FOTO_PLANILLA_PREVENTA,
    });
  };

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
      <Grid item container xs={12} spacing={2}>
        <UploadImageDropZoneComponent
          buttonLabel="Foto de planilla de servicio básico"
          selectedImage={planillaImg}
          setSelectedImage={setPlanillaImg}
        />
        <Grid
          item
          container
          {...gridSizeMdLg6}
          justifyContent="center"
          alignItems="center"
        >
          <CustomSingleButton
            label={
              isSupervisorUnlockingSent
                ? 'Solicitud Enviada'
                : 'Solictar liberación'
            }
            startIcon={<IoMdUnlock />}
            color="warning"
            variant="outlined"
            justifyContent="center"
            sxBtn={{
              color: theme.palette.warning.dark,
              borderColor: theme.palette.warning.dark,
              width: '100%',
            }}
            onClick={() => {
              setConfirmDialogIsOpen(true);
            }}
            disabled={isSupervisorUnlockingSent}
            gridSizeBtn={gridSizeMdLg7}
          />
        </Grid>
      </Grid>
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
      <ScrollableDialogProps
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
      />
    </>
  );
};

export default DocsSavePreventaStep;
