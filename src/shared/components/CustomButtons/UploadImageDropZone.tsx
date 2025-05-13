import { Box, CardMedia, Grid, IconButton, Tooltip } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

import { gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  GridSizeType,
  JustifyContentType,
  SxPropsType,
} from '@/shared/interfaces';
import { ToastWrapper } from '@/shared/wrappers';

export interface UploadImagePreviewBtnProps {
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

  ///*
  maxFileSizeMB?: number;
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

  ///*
  maxFileSizeMB = 6,
}) => {
  const [imagenUrl, setImagenUrl] = useState<string | undefined>(imageUrl);
  const [dragActive, setDragActive] = useState(false);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise(resolve => {
      if (maxFileSizeMB && file.size > maxFileSizeMB * 1024 * 1024) {
        ToastWrapper.error(
          `La imagen no debe superar los ${maxFileSizeMB} MB.`,
        );
        return resolve(false);
      }

      const img = new Image();
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        ToastWrapper.error('Error al cargar la imagen para validación.');
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      ///*
      const isValid = await validateImage(selectedFile);
      if (!isValid) {
        return setSelectedImage(null);
      }

      setSelectedImage(selectedFile);
      onChangeImage && onChangeImage(imageUrl, selectedFile);
    }
    event.target.value = '';
  };
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      ///*
      const isValid = await validateImage(file);
      if (!isValid) return;

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
          <Box
            sx={{
              border: dragActive ? '2px dashed #00AAFF' : '2px dashed #B8BDC1',
              borderRadius: '4px',
              padding: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: disabledInputAndRemoveBtn
                ? '#F5F5F5'
                : 'transparent',
            }}
          >
            {buttonLabel}
          </Box>
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
