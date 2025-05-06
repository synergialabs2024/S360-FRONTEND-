import { useIsMediaQuery } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';
import { Grid } from '@mui/material';

export type DocsSaveCorreccionFotosProps = {
  ontImg: File | null;
  setOntImg: any;
  ontImgLabel: JSX.Element;

  potenciaOntImg: File | null;
  setPotenciaOntImg: any;
  potenciaOntImgLabel: JSX.Element;

  ontEncontradaCasaImg: File | null;
  setOntEncontradaCasaImg: any;
  ontEncontradaCasaImgLabel: JSX.Element;

  etiquetaImg: File | null;
  setEtiquetaImg: any;
  etiquetaImgLabel: JSX.Element;

  napImg: File | null;
  setNapImg: any;
  napImgLabel: JSX.Element;

  potenciaNapImg: File | null;
  setPotenciaNapImg: any;
  potenciaNapImgLabel: JSX.Element;

  premioImg: File | null;
  setPremioImg: any;
  premioImgLabel: JSX.Element;

  testSpeedImg: File | null;
  setTestSpeedImg: any;
  testSpeedImgLabel: JSX.Element;

  actaEntregaUpsImg: File | null;
  setActaEntregaUpsImg: any;
  actaEntregaUpsImgLabel: JSX.Element;

  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const DocsSaveCorreccionFotos: React.FC<DocsSaveCorreccionFotosProps> = ({
  ontImg,
  setOntImg,
  ontImgLabel,

  potenciaOntImg,
  setPotenciaOntImg,
  potenciaOntImgLabel,

  ontEncontradaCasaImg,
  setOntEncontradaCasaImg,
  ontEncontradaCasaImgLabel,

  etiquetaImg,
  setEtiquetaImg,
  etiquetaImgLabel,

  napImg,
  setNapImg,
  napImgLabel,

  potenciaNapImg,
  setPotenciaNapImg,
  potenciaNapImgLabel,

  premioImg,
  setPremioImg,
  premioImgLabel,

  testSpeedImg,
  setTestSpeedImg,
  testSpeedImgLabel,

  actaEntregaUpsImg,
  setActaEntregaUpsImg,
  actaEntregaUpsImgLabel,

  UploadImageDropZoneComponent,
}) => {
  const isMobile = useIsMediaQuery('sm');
  return (
    <>
      <CustomTypoLabel
        text="Documentos Adjuntos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
        color={'#505050'}
      />

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {ontImg != null ? <></> : ontImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Ont"
          selectedImage={ontImg}
          setSelectedImage={setOntImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {potenciaOntImg != null ? <></> : potenciaOntImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Potencia Ont"
          selectedImage={potenciaOntImg}
          setSelectedImage={setPotenciaOntImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {ontEncontradaCasaImg != null ? <></> : ontEncontradaCasaImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Ont Encontrada en Casa"
          selectedImage={ontEncontradaCasaImg}
          setSelectedImage={setOntEncontradaCasaImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {etiquetaImg != null ? <></> : etiquetaImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Etiqueta"
          selectedImage={etiquetaImg}
          setSelectedImage={setEtiquetaImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {napImg != null ? <></> : napImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Nap"
          selectedImage={napImg}
          setSelectedImage={setNapImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {potenciaNapImg != null ? <></> : potenciaNapImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Potencia Nap"
          selectedImage={potenciaNapImg}
          setSelectedImage={setPotenciaNapImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {premioImg != null ? <></> : premioImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Premio"
          selectedImage={premioImg}
          setSelectedImage={setPremioImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {testSpeedImg != null ? <></> : testSpeedImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Test Speed"
          selectedImage={testSpeedImg}
          setSelectedImage={setTestSpeedImg}
          //maxFileSizeMB={5}
        />
      </Grid>

      <Grid
        item
        xs={isMobile ? 8 : 6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {actaEntregaUpsImg != null ? <></> : actaEntregaUpsImgLabel}
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Acta Entrega Ups"
          selectedImage={actaEntregaUpsImg}
          setSelectedImage={setActaEntregaUpsImg}
          //maxFileSizeMB={5}
        />
      </Grid>
    </>
  );
};

export default DocsSaveCorreccionFotos;
