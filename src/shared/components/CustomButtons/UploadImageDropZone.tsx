import { CardMedia, Grid, IconButton, Tooltip, Box } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
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
const UploadImageDropZone: React.FC<UploadImagePreviewBtnProps> = ({
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
  sxGrid,
  maxWidthPreview = '85%',
  maxHeightPreview = 'auto',
}) => {
  const [imagenUrl, setImagenUrl] = useState<string | undefined>(imageUrl);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedImage(selectedFile);
      onChangeImage && onChangeImage(imageUrl, selectedFile);
    }
    event.target.value = '';
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      setSelectedImage(file);
      onChangeImage && onChangeImage(imageUrl, file);
    }
  };
  const handleDrag = (
    event: React.DragEvent<HTMLDivElement>,
    isActive: boolean,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(isActive);
  };
  return (
    <Grid item {...sizeContainer} sx={{ ...sxGrid }}>
      <Box
        onDrop={handleDrop}
        onDragOver={e => handleDrag(e, true)}
        onDragEnter={e => handleDrag(e, true)}
        onDragLeave={e => handleDrag(e, false)}
        sx={{
          border: dragActive ? '2px dashed #00aaff' : '2px dashed #b8bdc1',
          borderRadius: '4px',
          padding: '16px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: disabledInputAndRemoveBtn
            ? '#f5f5f5'
            : 'transparent',
        }}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id={'image-upload-input-' + buttonLabel}
          disabled={disabledInputAndRemoveBtn}
        />
        <label htmlFor={'image-upload-input-' + buttonLabel}>
          <p>
            Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
          </p>
        </label>
      </Box>
      {(selectedImage || imagenUrl) && (
        <Box sx={{ position: 'relative', marginTop: '10px' }}>
          {!disabledInputAndRemoveBtn && (
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
                sx={{
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

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              alt="Vista Previa"
              sx={{
                maxWidth: maxWidthPreview,
                maxHeight: maxHeightPreview,
                objectFit: 'cover',
              }}
              image={
                selectedImage ? URL.createObjectURL(selectedImage) : imagenUrl
              }
            />
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default UploadImageDropZone;
