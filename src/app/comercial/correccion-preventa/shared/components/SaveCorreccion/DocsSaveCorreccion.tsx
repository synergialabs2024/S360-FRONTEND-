import { EstadoCorreccionPreventaEnumChoice, Preventa } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';

export type DocsSaveCorreccionProps = {
  preventa?: Preventa;
  estadoValidacionAceptacion: string;

  cedulaNoRostroImg: File | null;
  setCedulaNoRostroImg: any;

  fotoAceptacionNoRostroImg: File | null;
  setFotoAceptacionNoRostroImg: any;

  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const DocsSaveCorreccion: React.FC<DocsSaveCorreccionProps> = ({
  estadoValidacionAceptacion,
  cedulaNoRostroImg,
  setCedulaNoRostroImg,
  fotoAceptacionNoRostroImg,
  setFotoAceptacionNoRostroImg,
  UploadImageDropZoneComponent,
}) => {
  return (
    <>
      <CustomTypoLabel
        text="Documentos Adjuntos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      {estadoValidacionAceptacion ===
        EstadoCorreccionPreventaEnumChoice.FOTO_CEDULA_NO_ROSTRO && (
        <>
          <UploadImageDropZoneComponent
            buttonLabel="Foto corrección - Cédula frontal"
            selectedImage={cedulaNoRostroImg}
            setSelectedImage={setCedulaNoRostroImg}
          />
        </>
      )}

      {estadoValidacionAceptacion ===
        EstadoCorreccionPreventaEnumChoice.FOTO_ACEPTACION_NO_ROSTRO && (
        <>
          <UploadImageDropZoneComponent
            buttonLabel="Foto corrección - Aceptación"
            selectedImage={fotoAceptacionNoRostroImg}
            setSelectedImage={setFotoAceptacionNoRostroImg}
          />
        </>
      )}

      {estadoValidacionAceptacion ===
        EstadoCorreccionPreventaEnumChoice.ROSTROS_NO_COINCIDEN && (
        <>
          <UploadImageDropZoneComponent
            buttonLabel="Foto corrección - Cédula frontal"
            selectedImage={cedulaNoRostroImg}
            setSelectedImage={setCedulaNoRostroImg}
          />

          <UploadImageDropZoneComponent
            buttonLabel="Foto corrección - Aceptación"
            selectedImage={fotoAceptacionNoRostroImg}
            setSelectedImage={setFotoAceptacionNoRostroImg}
          />
        </>
      )}
    </>
  );
};

export default DocsSaveCorreccion;
