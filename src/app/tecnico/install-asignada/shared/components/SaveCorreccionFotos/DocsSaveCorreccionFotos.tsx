import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';

export type DocsSaveCorreccionFotosProps = {
  ontImg: File | null;
  setOntImg: any;

  potenciaOntImg: File | null;
  setPotenciaOntImg: any;

  ontEncontradaCasaImg: File | null;
  setOntEncontradaCasaImg: any;

  etiquetaImg: File | null;
  setEtiquetaImg: any;

  napImg: File | null;
  setNapImg: any;

  potenciaNapImg: File | null;
  setPotenciaNapImg: any;

  premioImg: File | null;
  setPremioImg: any;

  testSpeedImg: File | null;
  setTestSpeedImg: any;

  actaEntregaUpsImg: File | null;
  setActaEntregaUpsImg: any;

  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const DocsSaveCorreccionFotos: React.FC<DocsSaveCorreccionFotosProps> = ({
  ontImg,
  setOntImg,

  potenciaOntImg,
  setPotenciaOntImg,

  ontEncontradaCasaImg,
  setOntEncontradaCasaImg,

  etiquetaImg,
  setEtiquetaImg,

  napImg,
  setNapImg,

  potenciaNapImg,
  setPotenciaNapImg,

  premioImg,
  setPremioImg,

  testSpeedImg,
  setTestSpeedImg,

  actaEntregaUpsImg,
  setActaEntregaUpsImg,

  UploadImageDropZoneComponent,
}) => {
  return (
    <>
      <CustomTypoLabel
        text="Documentos Adjuntos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Ont"
          selectedImage={ontImg}
          setSelectedImage={setOntImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Potencia Ont"
          selectedImage={potenciaOntImg}
          setSelectedImage={setPotenciaOntImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Ont Encontrada en Casa"
          selectedImage={ontEncontradaCasaImg}
          setSelectedImage={setOntEncontradaCasaImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Etiqueta"
          selectedImage={etiquetaImg}
          setSelectedImage={setEtiquetaImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Nap"
          selectedImage={napImg}
          setSelectedImage={setNapImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Potencia Nap"
          selectedImage={potenciaNapImg}
          setSelectedImage={setPotenciaNapImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Premio"
          selectedImage={premioImg}
          setSelectedImage={setPremioImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Test Speed"
          selectedImage={testSpeedImg}
          setSelectedImage={setTestSpeedImg}
        />
      </>
      <>
        <UploadImageDropZoneComponent
          buttonLabel="Foto corrección - Acta Entrega Ups"
          selectedImage={actaEntregaUpsImg}
          setSelectedImage={setActaEntregaUpsImg}
        />
      </>
    </>
  );
};

export default DocsSaveCorreccionFotos;
