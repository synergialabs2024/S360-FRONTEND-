import { Button, CardMedia, Grid, IconButton, Tooltip } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { MdCloudUpload, MdDeleteForever } from 'react-icons/md';

import { gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  GridSizeType,
  JustifyContentType,
  SxPropsType,
} from '@/shared/interfaces';

interface UploadImagePreviewBtnProps {
  buttonLabel: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  selectedImage: File | null;
  accept?: string;

  isUpdating?: boolean;
  imageUrl?: string;
  setIsUpdatingCb?: Function;

  sizeContainer?: GridSizeType;
  justifyContentBtnLabel?: JustifyContentType;
  sxGrid?: SxPropsType;

  onClickTrash?: () => void;

  disabledInputAndRemoveBtn?: boolean;
  canRemoveImage?: boolean;
  onRemoveImage?: (imageUrl?: any, selectedImage?: any) => void;
  onChangeImage?: (imageUrl?: any, selectedImage?: any) => void;

  maxWidthPreview?: string;
  maxHeightPreview?: string;
}

const UploadImagePreviewBtn: React.FC<UploadImagePreviewBtnProps> = ({
  buttonLabel,
  selectedImage,

  imageUrl,

  accept = 'image/*',

  setSelectedImage,
  onClickTrash,

  disabledInputAndRemoveBtn = false,
  onRemoveImage,
  onChangeImage,

  sizeContainer = gridSizeMdLg6,
  justifyContentBtnLabel = 'center',
  sxGrid,
  maxWidthPreview = '85%',
  maxHeightPreview = 'auto',
}) => {
  const [imagenUrl, setImagenUrl] = useState<string | undefined>(imageUrl);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      setSelectedImage(selectedFile);
    }

    // to ensure that the onChange event is triggered even when the same file is selected
    event.target.value = '';
  };

  return (
    <Grid
      item
      {...sizeContainer}
      sx={{
        ...sxGrid,
      }}
    >
      <input
        type="file"
        accept={accept}
        onChange={e => {
          if (disabledInputAndRemoveBtn) return;
          handleFileChange(e);
          onChangeImage && onChangeImage(imageUrl, selectedImage);
        }}
        style={{ display: 'none' }}
        id={'image-upload-input-' + buttonLabel}
        disabled={!!disabledInputAndRemoveBtn}
      />

      <>
        <label htmlFor={'image-upload-input-' + buttonLabel}>
          <Button
            variant="contained"
            component="span"
            fullWidth
            size="small"
            startIcon={<MdCloudUpload />}
            style={{
              width: '100%',
              padding: '5.5px 14px',
              backgroundColor: '#f9fafb00',

              border: '1px solid #b8bdc1',
              color: '#747474',
              textTransform: 'none',
              fontWeight: '400',
              fontSize: '1.08rem',
              justifyContent: justifyContentBtnLabel,
              minHeight: '52px',
            }}
          >
            {buttonLabel}
          </Button>
        </label>
      </>

      {(selectedImage || imagenUrl) && (
        <div style={{ position: 'relative', marginTop: '10px' }}>
          {disabledInputAndRemoveBtn ? null : (
            <Tooltip title="Remover" arrow>
              <IconButton
                aria-label="Eliminar"
                color="error"
                onClick={() => {
                  setSelectedImage(null);
                  setImagenUrl(undefined);

                  onClickTrash && onClickTrash();
                  onRemoveImage && onRemoveImage(imagenUrl, selectedImage);
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <MdDeleteForever />
              </IconButton>
            </Tooltip>
          )}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              alt="Vista Previa"
              sx={{
                // maxHeight: 600,
                // maxWidth: 300,
                maxWidth: maxWidthPreview,
                maxHeight: maxHeightPreview,
                objectFit: 'cover',
              }}
              image={
                selectedImage ? URL.createObjectURL(selectedImage) : imageUrl
              }
            />
          </div>
        </div>
      )}
    </Grid>
  );
};

export default UploadImagePreviewBtn;
