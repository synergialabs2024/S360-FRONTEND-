import { gridSize } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';

export type SaveConfEmpresaImagePrimaryProps = {
  Image_url_1: File | null;
  setImage_url_1: any;

  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const SaveConfEmpresaImagePrimary: React.FC<
  SaveConfEmpresaImagePrimaryProps
> = ({
  Image_url_1,
  setImage_url_1,

  UploadImageDropZoneComponent,
}) => {
  return (
    <>
      <CustomTypoLabel
        text="Logo Principal"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <UploadImageDropZoneComponent
        buttonLabel="Primer Logo"
        selectedImage={Image_url_1}
        setSelectedImage={setImage_url_1}
        sizeContainer={gridSize}
        //maxFileSizeMB={5}
      />
    </>
  );
};

export default SaveConfEmpresaImagePrimary;
