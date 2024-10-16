import { Button, CardMedia, Grid, IconButton, Tooltip } from '@mui/material';
import { MdCloudUpload, MdDeleteForever } from 'react-icons/md';

import { gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  GridSizeType,
  JustifyContentType,
  SxPropsType,
} from '@/shared/interfaces';

interface UploadUpdatedImagePreviewBtnProps {
  image: ImageToUpdType;
  onChangeImageFile: (
    e: React.ChangeEvent<HTMLInputElement>,
    imageId: string,
  ) => void;

  buttonLabel: string;
  accept?: string;

  sizeContainer?: GridSizeType;
  justifyContentBtnLabel?: JustifyContentType;
  sxGrid?: SxPropsType;

  onClickTrash?: () => void;

  disabledInputAndRemoveBtn?: boolean;
  canRemoveImage?: boolean;
  onRemoveImage?: (imageId?: any) => void;

  maxWidthPreview?: string;
  maxHeightPreview?: string;
}

export type ImageToUpdType = {
  id: string;
  url: string;
  wasUpdated: boolean;
  isEmtpy: boolean;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  text: string;
  showImage: boolean; // condition to show image
};

const UploadUpdatedImagePreviewBtn: React.FC<
  UploadUpdatedImagePreviewBtnProps
> = ({
  buttonLabel,

  image,

  accept = 'image/*',

  onClickTrash,
  onChangeImageFile,

  disabledInputAndRemoveBtn = false,
  onRemoveImage,

  sizeContainer = gridSizeMdLg6,
  justifyContentBtnLabel = 'center',
  sxGrid,
  maxWidthPreview = '85%',
  maxHeightPreview = 'auto',
}) => {
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
          onChangeImageFile(e, image?.id);

          // to ensure that the onChange event is triggered even when the same file is selected
          e.target.value = '';
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

      {(image?.file || image?.url) && (
        <div style={{ position: 'relative', marginTop: '10px' }}>
          {disabledInputAndRemoveBtn ? null : (
            <Tooltip title="Remover" arrow>
              <IconButton
                aria-label="Eliminar"
                color="error"
                onClick={() => {
                  onClickTrash && onClickTrash();
                  onRemoveImage && onRemoveImage(image?.id);
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
              image={image.file ? URL.createObjectURL(image.file) : image.url}
            />
          </div>
        </div>
      )}
    </Grid>
  );
};

export default UploadUpdatedImagePreviewBtn;
