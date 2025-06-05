import { gridSize } from '@/shared';
import { CustomTypoLabel, CustomTypoLabelEnum } from '@/shared/components';
import { UploadImagePreviewBtnProps } from '@/shared/components/CustomButtons/UploadImageDropZone';

export type SaveConfEmpresaImageSecundaryProps = {
  Image_url_2: File | null;
  setImage_url_2: any;

  UploadImageDropZoneComponent: React.FC<UploadImagePreviewBtnProps>;
};

const SaveConfEmpresaImageSecundary: React.FC<
  SaveConfEmpresaImageSecundaryProps
> = ({
  Image_url_2,
  setImage_url_2,

  UploadImageDropZoneComponent,
}) => {
  return (
    <>
      <CustomTypoLabel
        text="Logo Secundario de Contrato"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <UploadImageDropZoneComponent
        buttonLabel="Segundo Logo"
        selectedImage={Image_url_2}
        setSelectedImage={setImage_url_2}
        sizeContainer={gridSize}
        //maxFileSizeMB={5}
      />
    </>
  );
};

export default SaveConfEmpresaImageSecundary;
