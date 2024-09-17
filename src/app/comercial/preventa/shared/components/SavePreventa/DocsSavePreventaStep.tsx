import { Grid, useTheme } from '@mui/material';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
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
} from '@/shared';
import {
  CustomSingleButton,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';

export type DocsSavePreventaStepProps = {
  solicitudServicioId: number;
  form: UseFormReturn<any>;

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
  UploadImageDropZoneComponent: React.FC<any>;
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
}) => {
  ///* hooks ---------------------
  const theme = useTheme();

  ///* local states ---------------------
  const [isSupervisorUnlockingSent, setIsSupervisorUnlockingSent] =
    useState<boolean>(false);

  ///* global state -----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ---------------------
  const createSolUnblockSolServiceMutation =
    useCreateSolicitudDesbloqueoVentas<CreateSolicitudDesbloqueoVentasData>({
      // navigate,
      // returnUrl: returnUrlSolicitudsServicioPage,
      enableErrorNavigate: false,
    });

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
                : 'Solictar aprobación'
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
            onClick={async () => {
              setConfirmDialog({
                isOpen: true,
                title: 'Prospecto existente',
                subtitle: `Some Message ${1}`,
                onConfirm: () => {
                  setConfirmDialogIsOpen(false);
                  createSolUnblockSolServiceMutation.mutate({
                    modelo: SalesModelsEnumChoice.SOLICITUD_SERVICIO,
                    modelo_id: solicitudServicioId,
                    modelo_estado:
                      SalesStatesActionsEnumChoice.SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_ESPERA,
                    solicitud_desbloqueo_estado:
                      GeneralModelStatesEnumChoice.ESPERA,
                    motivo: 'SOME MOTIVO',
                    tipo: SolicitudDesbloqueoTypeEnumChoice.FOTO_PLANILLA_PREVENTA,
                  });
                },
                confirmTextBtn: 'Solicitar desbloqueo',
                cancelTextBtn: 'Cerrar',
              });
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
    </>
  );
};

export default DocsSavePreventaStep;
