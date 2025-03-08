import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';

export type SaveEventoMensajeriaTMImageProps = {
  Image_url: File | null;

  setImage_url: any;
  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const SaveEventoMensajeriaTMImage: React.FC<
  SaveEventoMensajeriaTMImageProps
> = ({
  Image_url,

  setImage_url,
  UploadImageDropZoneComponent,
}) => {
  return (
    <>
      <CustomTypoLabel
        text="Imagen"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <UploadImageDropZoneComponent
        buttonLabel="Imagen"
        selectedImage={Image_url}
        setSelectedImage={setImage_url}
      />
    </>
  );
};

export default SaveEventoMensajeriaTMImage;
