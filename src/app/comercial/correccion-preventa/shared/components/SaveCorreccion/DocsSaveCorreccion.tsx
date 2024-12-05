import {
  EstadoCorreccionPreventaEnumChoice,
  Preventa,
  ToastWrapper,
} from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';
import { hasExceededHours } from '@/shared/helpers/calculators/elapsed-hours-calculator.helpers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { returnUrlCorreccionPreventasPage } from '../../../pages/tables/CorreccionPreventasMainPage';

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
  preventa,
  estadoValidacionAceptacion,
  cedulaNoRostroImg,
  setCedulaNoRostroImg,
  fotoAceptacionNoRostroImg,
  setFotoAceptacionNoRostroImg,
  UploadImageDropZoneComponent,
}) => {
  const navigate = useNavigate();

  const fechaAceptacion = preventa?.fecha_aceptacion;
  const fechaLimiteValidacionAceptacion =
    preventa?.fecha_limite_validacion_aceptacion;

  useEffect(() => {
    const isExceeded72 = hasExceededHours(
      fechaAceptacion!,
      fechaLimiteValidacionAceptacion!,
    );
    // Si no esta dentro del tiempo de aceptacion y limite de validacion aceptacion
    if (!isExceeded72) {
      navigate(returnUrlCorreccionPreventasPage);
      ToastWrapper.error(
        'EL tiempo limite para la correccion ha vencido y tu venta ha sido considerada como venta cortesia',
      );
    }
    console.log(isExceeded72);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fechaAceptacion, fechaLimiteValidacionAceptacion]);

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
