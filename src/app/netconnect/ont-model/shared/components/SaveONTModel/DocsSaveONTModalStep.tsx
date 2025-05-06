import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import type { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';

export type DocsSaveONTModalStepProps = {
  solicitudServicioId?: number;

  Image_url: File | null;

  setImage_url: any;
  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const DocsSaveONTModalStep: React.FC<DocsSaveONTModalStepProps> = ({
  Image_url,

  setImage_url,
  UploadImageDropZoneComponent,
}) => {
  ///* local states ---------------------

  ///* global state -----------------

  ///* form ---------------------

  return (
    <>
      <CustomTypoLabel
        text="Documentos Adjuntos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <UploadImageDropZoneComponent
        buttonLabel="Imagen"
        selectedImage={Image_url}
        setSelectedImage={setImage_url}
        //maxFileSizeMB={5}
      />
    </>
  );
};

export default DocsSaveONTModalStep;
