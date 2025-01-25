/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CorreccionDocumentsPreventaData,
  CreatePreventaParamsBase,
  PreventaTSQEnum,
} from '@/actions/app';
import { uploadFileToBucket } from '@/actions/statics-api';
import {
  BucketKeyNameEnumChoice,
  BucketTypeEnumChoice,
  ToastWrapper,
  EstadoCorreccionPreventaEnumChoice,
  useIsMediaQuery,
  useUploadImageGeneric,
} from '@/shared';
import {
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';

import { Preventa, SolicitudServicio } from '@/shared/interfaces';
import { getKeysFormErrorsMessage } from '@/shared/utils';
import { useGenericCountdownStore, useUiConfirmModalStore } from '@/store/ui';
import { returnUrlCorreccionPreventasPage } from '../../../pages/tables/CorreccionPreventasMainPage';

import DocsSaveCorreccion from './DocsSaveCorreccion';
import { SingleImageModal } from '@/shared/components/ui';
import { Grid } from '@mui/material';
import { useGenericPATCH } from '@/actions/shared';
import { hasExceededHours } from '@/shared/helpers/calculators/elapsed-hours-calculator.helpers';

export interface SaveCorreccionProps {
  title: String;
  preventa: Preventa;
}

export type SaveFormDataPreventa = CreatePreventaParamsBase &
  Partial<SolicitudServicio> & {
    preventa: Preventa;
  };

const SaveCorreccion: React.FC<SaveCorreccionProps> = ({ title, preventa }) => {
  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* hooks ---------------------
  const navigate = useNavigate();

  const {
    UploadImageDropZoneComponent,
    image1: cedulaNoRostroImg,
    setImage1: setCedulaNoRostroImg,
    image2: fotoAceptacionNoRostroImg,
    setImage2: setFotoAceptacionNoRostroImg,
  } = useUploadImageGeneric();

  // otp ------

  const clearAllTimers = useGenericCountdownStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<SaveFormDataPreventa>({});

  const { handleSubmit } = form;

  ///* mutations ------------------------
  const sendDocumentsCorreccionPreventa = useGenericPATCH<
    CorreccionDocumentsPreventaData,
    Preventa
  >(
    `/preventa/fix-wrong-acceptance-images/${preventa?.id!}/`,
    PreventaTSQEnum.PREVENTAS,
    {
      customMessageToast: 'Documentos enviados correctamente',
      enableNavigate: false,
      customOnSuccess: () => {
        form.reset();
      },
    },
  );

  ///* handlers ---------------------
  const onSave = async () => {
    // validate images -----------

    const fechaAceptacion = preventa?.fecha_aceptacion;
    const fechaLimiteValidacionAceptacion =
      preventa?.fecha_limite_validacion_aceptacion;

    const isExceeded72 = hasExceededHours(
      fechaAceptacion!,
      fechaLimiteValidacionAceptacion!,
    );

    if (!isExceeded72) {
      ToastWrapper.error(
        'EL tiempo limite para la correccion ha vencido y tu venta ha sido considerada como venta cortesia',
      );
    }

    if (
      preventa.estado_validacion_aceptacion?.toString() ===
      EstadoCorreccionPreventaEnumChoice.FOTO_CEDULA_NO_ROSTRO
    ) {
      if (!cedulaNoRostroImg) {
        return ToastWrapper.error('La foto de la cedula frontal es requerida');
      }
    }

    if (
      preventa.estado_validacion_aceptacion?.toString() ===
      EstadoCorreccionPreventaEnumChoice.FOTO_ACEPTACION_NO_ROSTRO
    ) {
      if (!fotoAceptacionNoRostroImg) {
        return ToastWrapper.error('La foto de aceptacion es requerida');
      }
    }

    if (
      preventa.estado_validacion_aceptacion?.toString() ===
      EstadoCorreccionPreventaEnumChoice.ROSTROS_NO_COINCIDEN
    ) {
      if (!cedulaNoRostroImg && !fotoAceptacionNoRostroImg) {
        return ToastWrapper.error(
          'La foto de la cedula y aceptacion son requeridas',
        );
      }
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Esta seguro de que las imagenes ha sido cargadas correctamente?',
      onConfirm: async () => {
        setConfirmDialogIsOpen(false);
        // upload images ----
        const [correccionImgUrl, fotoAceptacionNoRostroImgUrl] =
          await Promise.all([
            uploadFileToBucket({
              file: cedulaNoRostroImg!,
              file_name: BucketKeyNameEnumChoice.CEDULA_FRONTAL_CORRECCIONES,
              bucketDir:
                BucketTypeEnumChoice.IMAGES_ACEPTACION_CONTRATO_CORRECCIONES,
            }),
            uploadFileToBucket({
              file: fotoAceptacionNoRostroImg!,
              file_name:
                BucketKeyNameEnumChoice.ACEPTACION_CONTRATO_CORRECCIONES,
              bucketDir:
                BucketTypeEnumChoice.IMAGES_ACEPTACION_CONTRATO_CORRECCIONES,
            }),
          ]);
        // create
        sendDocumentsCorreccionPreventa.mutate(
          {
            url_foto_cedula_frontal_corregida:
              preventa.estado_validacion_aceptacion?.toString() ===
                EstadoCorreccionPreventaEnumChoice.FOTO_CEDULA_NO_ROSTRO ||
              preventa.estado_validacion_aceptacion?.toString() ===
                EstadoCorreccionPreventaEnumChoice.ROSTROS_NO_COINCIDEN
                ? correccionImgUrl?.streamUlr || ''
                : preventa.url_foto_cedula_frontal,
            url_foto_aceptacion_corregida:
              preventa.estado_validacion_aceptacion?.toString() ===
                EstadoCorreccionPreventaEnumChoice.FOTO_ACEPTACION_NO_ROSTRO ||
              preventa.estado_validacion_aceptacion?.toString() ===
                EstadoCorreccionPreventaEnumChoice.ROSTROS_NO_COINCIDEN
                ? fotoAceptacionNoRostroImgUrl?.streamUlr || ''
                : preventa.url_foto_aceptacion || '',
          },
          {
            onSuccess: () => {
              navigate(returnUrlCorreccionPreventasPage);
            },
          },
        );
      },
      confirmTextBtn: 'SI, CONTINUAR',
      cancelTextBtn: 'CERRAR',
      onClose: () => {
        setConfirmDialogIsOpen(false);
      },
    });
  };

  const isMobile = useIsMediaQuery('sm');

  const estadoValidacionFotosTextos: Record<string, string> = {
    FOTO_CEDULA_NO_ROSTRO: 'Foto cédula frontal',
    FOTO_ACEPTACION_NO_ROSTRO: 'Foto aceptación',
    ROSTROS_NO_COINCIDEN: 'Rostros no coinciden',
  };

  const texto =
    estadoValidacionFotosTextos[
      preventa?.estado_validacion_aceptacion?.toString()!
    ] || '';

  return (
    <SingleFormBoxScene
      titleNode={title}
      // action btns
      onCancel={() => {
        navigate(returnUrlCorreccionPreventasPage);
        clearAllTimers();
      }}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos por requeridos: ${keys}`);
      })}
    >
      <>
        <CustomTypoLabel
          text={texto}
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {preventa && (
            <>
              <Grid item xs={isMobile ? 1 : 6} sx={isMobile ? { mb: 2 } : {}}>
                <SingleImageModal
                  image={{
                    id: 1,
                    imgUrl: preventa.url_foto_cedula_frontal || '',
                    title: 'Foto cedula frontal',
                  }}
                  widthPercentage="60%"
                />
              </Grid>
              <Grid item xs={isMobile ? 1 : 6}>
                <SingleImageModal
                  image={{
                    id: 2,
                    imgUrl: preventa.url_foto_aceptacion || '',
                    title: 'Foto aceptacion',
                  }}
                  widthPercentage="60%"
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* ============= Corrección Docs ============= */}
        <DocsSaveCorreccion
          preventa={preventa}
          estadoValidacionAceptacion={preventa?.estado_validacion_aceptacion!}
          UploadImageDropZoneComponent={UploadImageDropZoneComponent}
          // cedula no rostro
          cedulaNoRostroImg={cedulaNoRostroImg}
          setCedulaNoRostroImg={setCedulaNoRostroImg}
          // aceptacion no rostro
          fotoAceptacionNoRostroImg={fotoAceptacionNoRostroImg}
          setFotoAceptacionNoRostroImg={setFotoAceptacionNoRostroImg}
        />
      </>
    </SingleFormBoxScene>
  );
};

export default SaveCorreccion;
