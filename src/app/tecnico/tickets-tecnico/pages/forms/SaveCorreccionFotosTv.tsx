/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { uploadFileToBucket } from '@/actions/statics-api';
import {
  BucketKeyTicketEnumChoice,
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

import { getKeysFormErrorsMessage } from '@/shared/utils';
import {
  useGenericCountdownStore,
  useUiConfirmModalStore,
  useUiStore,
} from '@/store/ui';

import { SingleImageModal } from '@/shared/components/ui';
import { Grid } from '@mui/material';
import { useGenericPATCH } from '@/actions/shared';
import { DocsSaveCorreccionFotos } from '@/app/tecnico/install-asignada/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import {
  TicketTSQEnum,
  UploadTicketVisitaCorreccionFotosData,
} from '@/actions/app/tickets';
import { returnUrlInstallAsignadasOT } from '@/app/tecnico/install-asignada/pages/tables/InstalacionesAsignadasOTMainPage';

export interface SaveCorreccionFotosTvProps {
  title: String;
  ticket?: Ticket;
}

const SaveCorreccionFotosTv: React.FC<SaveCorreccionFotosTvProps> = ({
  title,
  ticket,
}) => {
  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* hooks ---------------------
  const navigate = useNavigate();

  // otp ------

  const clearAllTimers = useGenericCountdownStore(s => s.clearAll);
  const setIsGlobalLoading = useUiStore(state => state.setIsGlobalLoading);

  ///* form --------------------------
  const form = useForm<UploadTicketVisitaCorreccionFotosData>({});

  const { handleSubmit } = form;

  const requestUpdOT = useGenericPATCH<
    UploadTicketVisitaCorreccionFotosData,
    Ticket
  >(`/ticket-tecnico/fix/${ticket?.id!}/`, TicketTSQEnum.TICKETS, {
    customMessageToast: 'Imagenes corregidas enviadas con éxito',
    navigate,
    returnUrl: returnUrlInstallAsignadasOT,
    //   customOnSuccess() {
    //     handleClose();
    //   },
  });

  const {
    UploadImageDropZoneComponent,
    image1: fotoAntesSolucion,
    setImage1: setFotoAntesSolucion,
    image2: fotoDespuesSolucion,
    setImage2: setFotoDespuesSolucion,
    image3: fotoTestVelocidad,
    setImage3: setFotoTestVelocidad,
    image4: fotoPotenciaAntesSolucion,
    setImage4: setFotoPotenciaAntesSolucion,
    image5: fotoPotenciaDespuesSolucion,
    setImage5: setFotoPotenciaDespuesSolucion,
    image6: fotoProblemaEncontrado,
    setImage6: setFotoProblemaEncontrado,
    image7: fotoSolucion,
    setImage7: setFotoSolucion,
    image8: fotoEntregaMesh,
    setImage8: setFotoEntregaMesh,
    image9: fotoEntregaUps,
    setImage9: setFotoEntregaUps,
  } = useUploadImageGeneric();

  const requiredImages = [
    {
      label: 'Foto Antes Solucion',
      image: fotoAntesSolucion,
      setImage: setFotoAntesSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Despues Solucion',
      image: fotoDespuesSolucion,
      setImage: setFotoDespuesSolucion,
      isRequired: true,
    },

    {
      label: 'Foto Test Velocidad',
      image: fotoTestVelocidad,
      setImage: setFotoTestVelocidad,
      isRequired: true,
    },
    {
      label: 'Foto Potencia Antes Solucion',
      image: fotoPotenciaAntesSolucion,
      setImage: setFotoPotenciaAntesSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Potencia Despues Solucion',
      image: fotoPotenciaDespuesSolucion,
      setImage: setFotoPotenciaDespuesSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Problema Encontrado',
      image: fotoProblemaEncontrado,
      setImage: setFotoProblemaEncontrado,
      isRequired: true,
    },

    {
      label: 'Foto Solucion',
      image: fotoSolucion,
      setImage: setFotoSolucion,
      isRequired: true,
    },
    {
      label: 'Foto Entrega Mesh',
      image: fotoEntregaMesh,
      setImage: setFotoEntregaMesh,
      isRequired: true,
    },
    {
      label: 'Foto Entrega Ups',
      image: fotoEntregaUps,
      setImage: setFotoEntregaUps,
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

    console.log('atLeastOneImageUploaded', atLeastOneImageUploaded);

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
        setIsGlobalLoading(true);
        const [
          antesSolucionPhoto,
          despuesSolucionPhoto,
          testVelocidadPhoto,
          potenciaAntesSolucionPhoto,
          potenciaDespuesSolucionPhoto,
          problemaEncontradoPhoto,
          solucionPhoto,
        ] = await Promise.all([
          uploadFileToBucket({
            file: fotoAntesSolucion!,
            file_name: BucketKeyTicketEnumChoice.FOTO_ANTES_SOLUCION,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          }),
          uploadFileToBucket({
            file: fotoDespuesSolucion!,
            file_name: BucketKeyTicketEnumChoice.FOTO_DESPUES_SOLUCION,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          }),
          uploadFileToBucket({
            file: fotoTestVelocidad!,
            file_name: BucketKeyTicketEnumChoice.FOTO_TEST_VELOCIDAD,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          }),
          uploadFileToBucket({
            file: fotoPotenciaAntesSolucion!,
            file_name: BucketKeyTicketEnumChoice.FOTO_POTENCIA_ANTES_SOLUCION,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          }),
          uploadFileToBucket({
            file: fotoPotenciaDespuesSolucion!,
            file_name: BucketKeyTicketEnumChoice.FOTO_POTENCIA_DESPUES_SOLUCION,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          }),
          uploadFileToBucket({
            file: fotoProblemaEncontrado!,
            file_name: BucketKeyTicketEnumChoice.FOTO_PROBLEMA_ENCONTRADO,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          }),
          uploadFileToBucket({
            file: fotoSolucion!,
            file_name: BucketKeyTicketEnumChoice.FOTO_SOLUCION,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          }),
        ]);

        const requiredUrls = [
          { url: antesSolucionPhoto?.streamUlr, name: 'Foto antes solución' },
          {
            url: despuesSolucionPhoto?.streamUlr,
            name: 'Foto después solución',
          },
          { url: testVelocidadPhoto?.streamUlr, name: 'Test de velocidad' },
          {
            url: potenciaAntesSolucionPhoto?.streamUlr,
            name: 'Potencia antes solución',
          },
          {
            url: potenciaDespuesSolucionPhoto?.streamUlr,
            name: 'Potencia después solución',
          },
          {
            url: problemaEncontradoPhoto?.streamUlr,
            name: 'Problema encontrado',
          },
          { url: solucionPhoto?.streamUlr, name: 'Solución' },
        ];

        const missingUrl = requiredUrls.find(item => !item.url);
        if (missingUrl) {
          ToastWrapper.error(
            `La imagen ${missingUrl.name} no se subió correctamente y es requerida`,
          );
          setIsGlobalLoading(false);
          return;
        }

        let entregaMeshPhoto = null;
        if (fotoEntregaMesh) {
          entregaMeshPhoto = await uploadFileToBucket({
            file: fotoEntregaMesh!,
            file_name: BucketKeyTicketEnumChoice.FOTO_ENTREGA_MESH,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          });
        }

        let entregaUpsPhoto = null;
        if (fotoEntregaUps) {
          entregaUpsPhoto = await uploadFileToBucket({
            file: fotoEntregaUps!,
            file_name: BucketKeyTicketEnumChoice.FOTO_ENTREGA_UPS,
            bucketDir: BucketTypeEnumChoice.IMAGES_TICKETS_VISITAS,
          });
        }

        /* const updatedImages: Partial<UploadTicketVisitaCorreccionFotosData> =
          {};

        updatedImages.linea_servicio = ticket!.linea_servicio;

        requiredImages.forEach(({ label, image }) => {
          if (image) {
            switch (label) {
              case 'Foto Antes Solucion':
                updatedImages.url_foto_antes_solucion =
                  antesSolucionPhoto?.streamUlr || '';
                break;
              case 'Foto Despues Solucion':
                updatedImages.url_foto_despues_solucion =
                  despuesSolucionPhoto?.streamUlr;
                break;
              case 'Foto Test Velocidad':
                updatedImages.url_foto_test_velocidad =
                  testVelocidadPhoto?.streamUlr;
                break;
              case 'Foto Potencia Antes Solucion':
                updatedImages.url_foto_potencia_antes_solucion =
                  potenciaAntesSolucionPhoto?.streamUlr;
                break;
              case 'Foto Potencia Despues Solucion':
                updatedImages.url_foto_potencia_despues_solucion =
                  potenciaDespuesSolucionPhoto?.streamUlr;
                break;
              case 'Foto Problema Encontrado':
                updatedImages.url_foto_problema_encontrado =
                  problemaEncontradoPhoto?.streamUlr;
                break;
              case 'Foto Solucion':
                updatedImages.url_foto_solucion = solucionPhoto?.streamUlr;
                break;
              case 'Foto Entrega Mesh':
                updatedImages.url_foto_entrega_mesh =
                  entregaMeshPhoto?.streamUlr;
                break;
              case 'Foto Entrega Ups':
                updatedImages.url_foto_entrega_ups = entregaUpsPhoto?.streamUlr;
                break;
              default:
                break;
            }
          }
        });

        requestUpdOT.mutate(
          updatedImages as UploadTicketVisitaCorreccionFotosData, // Forzar el tipo

          {
            onSuccess: () => {
              navigate(returnUrlInstallAsignadasOT);
            },
          },
        ); */

        requestUpdOT.mutate({
          asunto_ticket_tecnico: ticket?.asunto_ticket_tecnico,
          linea_servicio: ticket?.linea_servicio,

          url_foto_antes_solucion:
            antesSolucionPhoto?.streamUlr.length === 0
              ? ticket?.url_foto_antes_solucion
              : antesSolucionPhoto?.streamUlr,

          url_foto_despues_solucion:
            despuesSolucionPhoto?.streamUlr.length === 0
              ? ticket?.url_foto_despues_solucion
              : despuesSolucionPhoto?.streamUlr,

          url_foto_test_velocidad:
            testVelocidadPhoto?.streamUlr.length === 0
              ? ticket?.url_foto_test_velocidad
              : testVelocidadPhoto?.streamUlr,

          url_foto_potencia_antes_solucion:
            potenciaAntesSolucionPhoto?.streamUlr.length === 0
              ? ticket?.url_foto_potencia_antes_solucion
              : potenciaAntesSolucionPhoto?.streamUlr,

          url_foto_potencia_despues_solucion:
            potenciaDespuesSolucionPhoto?.streamUlr.length === 0
              ? ticket?.url_foto_potencia_despues_solucion
              : potenciaDespuesSolucionPhoto?.streamUlr,

          url_foto_problema_encontrado:
            problemaEncontradoPhoto?.streamUlr.length === 0
              ? ticket?.url_foto_problema_encontrado
              : problemaEncontradoPhoto?.streamUlr,

          url_foto_solucion:
            solucionPhoto?.streamUlr.length === 0
              ? ticket?.url_foto_solucion
              : solucionPhoto?.streamUlr,

          ...(entregaMeshPhoto && {
            url_foto_entrega_mesh:
              entregaMeshPhoto?.streamUlr.length === 0
                ? ticket?.url_foto_entrega_mesh
                : entregaMeshPhoto?.streamUlr,
          }),
          ...(entregaUpsPhoto && {
            url_foto_entrega_ups:
              entregaUpsPhoto?.streamUlr.length === 0
                ? ticket?.url_foto_entrega_ups
                : entregaUpsPhoto?.streamUlr,
          }),
        });
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
        {ticket && (
          <>
            <CustomTypoLabel text={'Motivo Correccion'} color={'#505050'} />

            <CustomTypoLabel
              text={
                ticket.motivo_correccion
                  ? ticket.motivo_correccion.toString()
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
                ticket.observacion_correccion
                  ? ticket.observacion_correccion.toString()
                  : ''
              }
            />
          </>
        )}

        {/* ============= Corrección Docs ============= */}
        <DocsSaveCorreccionFotos
          UploadImageDropZoneComponent={UploadImageDropZoneComponent}
          // Ont
          ontImg={fotoAntesSolucion}
          setOntImg={setFotoAntesSolucion}
          ontImgLabel={titleAndImage(
            'Foto Antes Solucion',
            ticket!.url_foto_antes_solucion || '',
          )}
          // Potencia Ont
          potenciaOntImg={fotoDespuesSolucion}
          setPotenciaOntImg={setFotoDespuesSolucion}
          potenciaOntImgLabel={titleAndImage(
            'Foto Despues Solucion',
            ticket!.url_foto_despues_solucion || '',
          )}
          // Ont Encontrada en Casa
          ontEncontradaCasaImg={fotoTestVelocidad}
          setOntEncontradaCasaImg={setFotoTestVelocidad}
          ontEncontradaCasaImgLabel={titleAndImage(
            'Foto Test Velocidad',
            ticket!.url_foto_test_velocidad || '',
          )}
          // Etiqueta
          etiquetaImg={fotoPotenciaAntesSolucion}
          setEtiquetaImg={setFotoPotenciaAntesSolucion}
          etiquetaImgLabel={titleAndImage(
            'Foto Potencia Antes Solucion',
            ticket!.url_foto_potencia_antes_solucion || '',
          )}
          // Nap
          napImg={fotoPotenciaDespuesSolucion}
          setNapImg={setFotoPotenciaDespuesSolucion}
          napImgLabel={titleAndImage(
            'Foto Potencia Despues Solucion',
            ticket!.url_foto_potencia_despues_solucion || '',
          )}
          // Potencia Nap
          potenciaNapImg={fotoProblemaEncontrado}
          setPotenciaNapImg={setFotoProblemaEncontrado}
          potenciaNapImgLabel={titleAndImage(
            'Foto Potencia Nap',
            ticket!.url_foto_problema_encontrado || '',
          )}
          // Premio
          premioImg={fotoSolucion}
          setPremioImg={setFotoSolucion}
          premioImgLabel={titleAndImage(
            'Foto Solucion',
            ticket!.url_foto_solucion || '',
          )}
          // TestSpeed
          testSpeedImg={fotoEntregaMesh}
          setTestSpeedImg={setFotoEntregaMesh}
          testSpeedImgLabel={titleAndImage(
            'Foto Entrega Mesh',
            ticket!.url_foto_entrega_mesh || '',
          )}
          // Entrega Ups
          actaEntregaUpsImg={fotoEntregaUps}
          setActaEntregaUpsImg={setFotoEntregaUps}
          actaEntregaUpsImgLabel={titleAndImage(
            'Foto Entrega Ups',
            ticket!.url_foto_entrega_ups || '',
          )}
        />
      </>
    </SingleFormBoxScene>
  );
};

export default SaveCorreccionFotosTv;
