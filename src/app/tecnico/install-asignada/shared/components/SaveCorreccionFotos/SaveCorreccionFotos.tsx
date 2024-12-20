/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreatePreventaParamsBase,
  OrdenTrabajoTSQEnum,
  UploadCorreccionFotosInstalacionOTAsignData,
} from '@/actions/app';
import { uploadFileToBucket } from '@/actions/statics-api';
import {
  BucketKeyNameEnumChoice,
  BucketTypeEnumChoice,
  ToastWrapper,
  useIsMediaQuery,
  useUploadImageGeneric,
} from '@/shared';
import {
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';

import { OrdenTrabajo, Preventa, SolicitudServicio } from '@/shared/interfaces';
import { getKeysFormErrorsMessage } from '@/shared/utils';
import { useGenericCountdownStore, useUiConfirmModalStore } from '@/store/ui';

import { SingleImageModal } from '@/shared/components/ui';
import { Grid } from '@mui/material';
import { useGenericPOST } from '@/actions/shared';
import DocsSaveCorreccionFotos from './DocsSaveCorreccionFotos';
import { returnUrlInstallAsignadasOT } from '../../../pages/tables/InstalacionesAsignadasOTMainPage';
import { InstallAsignOTSaveFormData } from '../SaveOrdenTrabajo/SaveOrdenTrabajo';

export interface SaveCorreccionFotosProps {
  title: String;
  ordenTrabajo?: OrdenTrabajo;
}

export type SaveFormDataPreventa = CreatePreventaParamsBase &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {
    ordenTrabajo: OrdenTrabajo;
  };

const SaveCorreccionFotos: React.FC<SaveCorreccionFotosProps> = ({
  title,
  ordenTrabajo,
}) => {
  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* hooks ---------------------
  const navigate = useNavigate();

  const {
    UploadImageDropZoneComponent,
    image1: ontImg,
    setImage1: setOntImg,

    image2: potenciaOntImg,
    setImage2: setPotenciaOntImg,

    image3: ontEncontradaCasaImg,
    setImage3: setOntEncontradaCasaImg,

    image4: etiquetaImg,
    setImage4: setEtiquetaImg,

    image5: napImg,
    setImage5: setNapImg,

    image6: potenciaNapImg,
    setImage6: setPotenciaNapImg,

    image7: premioImg,
    setImage7: setPremioImg,

    image8: testSpeedImg,
    setImage8: setTestSpeedImg,

    image9: actaEntregaUpsImg,
    setImage9: setActaEntregaUpsImg,
  } = useUploadImageGeneric();

  // otp ------

  const clearAllTimers = useGenericCountdownStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<InstallAsignOTSaveFormData>({});

  const { handleSubmit } = form;

  const requestUpdOT = useGenericPOST<
    UploadCorreccionFotosInstalacionOTAsignData,
    OrdenTrabajo
  >(
    '/orden-trabajo/instalaciones/fix-photos/',
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast: 'Imagenes corregidas enviadas con éxito',
      navigate,
      returnUrl: returnUrlInstallAsignadasOT,
      //   customOnSuccess() {
      //     handleClose();
      //   },
    },
  );

  const requiredImages = [
    {
      label: 'Foto Ont',
      image: ontImg,
      setImage: setOntImg,
      isRequired: true,
    },
    {
      label: 'Potencia Ont',
      image: potenciaOntImg,
      setImage: setPotenciaOntImg,
      isRequired: true,
    },
    {
      label: 'Ont Encontrada Casa',
      image: ontEncontradaCasaImg,
      setImage: setOntEncontradaCasaImg,
      isRequired: true,
    },
    {
      label: 'Etiqueta',
      image: etiquetaImg,
      setImage: setEtiquetaImg,
      isRequired: true,
    },
    {
      label: 'Nap',
      image: napImg,
      setImage: setNapImg,
      isRequired: true,
    },
    {
      label: 'Potencia Nap',
      image: potenciaNapImg,
      setImage: setPotenciaNapImg,
      isRequired: true,
    },
    {
      label: 'Premio',
      image: premioImg,
      setImage: setPremioImg,
      isRequired: true,
    },
    {
      label: 'Test Speed',
      image: testSpeedImg,
      setImage: setTestSpeedImg,
      isRequired: true,
    },
    {
      label: 'Acta entrega Ups',
      image: actaEntregaUpsImg,
      setImage: setActaEntregaUpsImg,
      isRequired: true,
    },
  ];

  ///* handlers ---------------------
  const onSave = async () => {
    // validate images -----------

    let atLeastOneImageUploaded = false;

    requiredImages.forEach(({ isRequired, image }) => {
      if (isRequired && image) {
        atLeastOneImageUploaded = true;
      }
    });

    if (!atLeastOneImageUploaded) {
      ToastWrapper.error('No se ha subido ninguna imagen requerida.');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Esta seguro de que las imagenes ha sido cargadas correctamente?',
      onConfirm: async () => {
        setConfirmDialogIsOpen(false);
        // upload images ----
        const [
          ontPhoto,
          potenciaOntPhoto,
          ontEncontradaCasaPhoto,
          etiquetaPhoto,
          napPhoto,
          potenciaNapPhoto,
          premioPhoto,
          testSpeedPhoto,
          actaEntregaUpsPhoto,
        ] = await Promise.all([
          uploadFileToBucket({
            file: ontImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: potenciaOntImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: ontEncontradaCasaImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: etiquetaImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: napImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: potenciaNapImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: premioImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: testSpeedImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
          uploadFileToBucket({
            file: actaEntregaUpsImg!,
            file_name: BucketKeyNameEnumChoice.INSTALL_ASIGNADA_OT,
            bucketDir: BucketTypeEnumChoice.IMAGES_ORDENTRABAJO_INSTALACION,
          }),
        ]);

        // Detectar imágenes subidas y crear un objeto dinámico para actualizar
        const updatedImages: Partial<UploadCorreccionFotosInstalacionOTAsignData> =
          {}; // Objeto dinámico

        updatedImages.orden_trabajo = ordenTrabajo!.id;

        requiredImages.forEach(({ label, image }) => {
          if (image) {
            switch (label) {
              case 'Foto Ont':
                updatedImages.url_foto_ont = ontPhoto?.streamUlr || '';
                break;
              case 'Potencia Ont':
                updatedImages.url_foto_potencia_ont =
                  potenciaOntPhoto?.streamUlr;
                break;
              case 'Ont Encontrada Casa':
                updatedImages.url_foto_ont_encontrado_casa =
                  ontEncontradaCasaPhoto?.streamUlr;
                break;
              case 'Etiqueta':
                updatedImages.url_foto_etiqueta = etiquetaPhoto?.streamUlr;
                break;
              case 'Nap':
                updatedImages.url_foto_nap = napPhoto?.streamUlr;
                break;
              case 'Potencia Nap':
                updatedImages.url_foto_potencia_nap =
                  potenciaNapPhoto?.streamUlr;
                break;
              case 'Premio':
                updatedImages.url_foto_premio = premioPhoto?.streamUlr;
                break;
              case 'Test Speed':
                updatedImages.url_foto_test_speed = testSpeedPhoto?.streamUlr;
                break;
              case 'Acta entrega Ups':
                updatedImages.url_foto_acta_entrega_ups =
                  actaEntregaUpsPhoto?.streamUlr;
                break;
              default:
                break;
            }
          }
        });

        requestUpdOT.mutate(
          updatedImages as UploadCorreccionFotosInstalacionOTAsignData, // Forzar el tipo

          {
            onSuccess: () => {
              navigate(returnUrlInstallAsignadasOT);
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

  const titleAndImage = (title: string, imgUrl: string) => {
    return (
      <Grid item xs={isMobile ? 8 : 6} sx={isMobile ? { mb: 2 } : {}} pb={2}>
        <CustomTypoLabel
          text={title}
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <SingleImageModal
          image={{
            id: 1,
            imgUrl: imgUrl || '',
            title: title,
          }}
          widthPercentage={isMobile ? '100%' : '60%'}
        />
      </Grid>
    );
  };

  return (
    <SingleFormBoxScene
      titleNode={title}
      // action btns
      onCancel={() => {
        navigate(returnUrlInstallAsignadasOT);
        clearAllTimers();
      }}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos requeridos: ${keys}`);
      })}
    >
      <>
        {ordenTrabajo && (
          <>
            <CustomTypoLabel text={'Motivo Correccion'} color={'#505050'} />

            <CustomTypoLabel
              text={
                ordenTrabajo.motivo_correccion
                  ? ordenTrabajo.motivo_correccion.toString()
                  : ''
              }
            />

            <CustomTypoLabel
              text={'Observacion Correccion'}
              pt={CustomTypoLabelEnum.ptMiddlePosition}
              color={'#505050'}
            />
            <CustomTypoLabel
              text={
                ordenTrabajo.observacion_correccion
                  ? ordenTrabajo.observacion_correccion.toString()
                  : ''
              }
            />
          </>
        )}

        {/* ============= Corrección Docs ============= */}
        <DocsSaveCorreccionFotos
          UploadImageDropZoneComponent={UploadImageDropZoneComponent}
          // Ont
          ontImg={ontImg}
          setOntImg={setOntImg}
          ontImgLabel={titleAndImage(
            'Foto Ont',
            typeof ontImg === 'string' ? ontImg : ordenTrabajo!.url_foto_ont,
          )}
          // Potencia Ont
          potenciaOntImg={potenciaOntImg}
          setPotenciaOntImg={setPotenciaOntImg}
          potenciaOntImgLabel={titleAndImage(
            'Foto Potencia Ont',
            ordenTrabajo!.url_foto_potencia_ont || '',
          )}
          // Ont Encontrada en Casa
          ontEncontradaCasaImg={ontEncontradaCasaImg}
          setOntEncontradaCasaImg={setOntEncontradaCasaImg}
          ontEncontradaCasaImgLabel={titleAndImage(
            'Foto Ont Encontrada en Casa',
            ordenTrabajo!.url_foto_ont_encontrado_casa || '',
          )}
          // Etiqueta
          etiquetaImg={etiquetaImg}
          setEtiquetaImg={setEtiquetaImg}
          etiquetaImgLabel={titleAndImage(
            'Foto Etiqueta',
            ordenTrabajo!.url_foto_etiqueta || '',
          )}
          // Nap
          napImg={napImg}
          setNapImg={setNapImg}
          napImgLabel={titleAndImage(
            'Foto Nap',
            ordenTrabajo!.url_foto_nap || '',
          )}
          // Potencia Nap
          potenciaNapImg={potenciaNapImg}
          setPotenciaNapImg={setPotenciaNapImg}
          potenciaNapImgLabel={titleAndImage(
            'Foto Potencia Nap',
            ordenTrabajo!.url_foto_potencia_nap || '',
          )}
          // Premio
          premioImg={premioImg}
          setPremioImg={setPremioImg}
          premioImgLabel={titleAndImage(
            'Foto Premio',
            ordenTrabajo!.url_foto_premio || '',
          )}
          // TestSpeed
          testSpeedImg={testSpeedImg}
          setTestSpeedImg={setTestSpeedImg}
          testSpeedImgLabel={titleAndImage(
            'Foto Test Speed',
            ordenTrabajo!.url_foto_test_speed || '',
          )}
          // Entrega Ups
          actaEntregaUpsImg={actaEntregaUpsImg}
          setActaEntregaUpsImg={setActaEntregaUpsImg}
          actaEntregaUpsImgLabel={titleAndImage(
            'Foto Acta Entrega Ups',
            ordenTrabajo!.url_foto_acta_entrega_ups || '',
          )}
        />
      </>
    </SingleFormBoxScene>
  );
};

export default SaveCorreccionFotos;
