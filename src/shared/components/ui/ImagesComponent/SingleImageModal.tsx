import { Fade, Grid, IconButton, Modal, styled, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { CustomCardAlert } from '../../CustomAlerts';

// Estilos personalizados
const ImageContainer = styled('div')<{ width: string; height: string }>(
  ({ width, height }) => ({
    width: width,
    height: height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
);

const Img = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
  cursor: 'pointer',
});

const ModalImg = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
  className: 'zoom-cursor',
});

const ModalContent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  maxWidth: '80%',
  position: 'relative',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '-45px',
  top: '-45px', // position the close button
  color: theme.palette.error.contrastText,
}));

const ZoomIcon = styled(FiZoomIn)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  color: theme.palette.common.white,
  fontSize: '2rem',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  padding: theme.spacing(1),
  cursor: 'pointer',
}));

// Tipo para cada imagen
export type SingleImageType = {
  title: string;
  imgUrl: string;
  id: number;
};

// Props del componente
export interface SingleImageModalProps {
  image: SingleImageType;
  widthPercentage?: string;
  heightPercentage?: string;
}

const SingleImageModal: React.FC<SingleImageModalProps> = ({
  image,
  widthPercentage = '100%',
  heightPercentage = 'auto',
}) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageError, setImageError] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setImageError(false);
  };

  const handleImageClick = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    setOpen(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Grid item container justifyContent="center" alignItems="center">
      <ImageContainer width={widthPercentage} height={heightPercentage}>
        {image.imgUrl ? (
          imageError ? (
            <CustomCardAlert
              sizeType="small"
              alertMessage="No se pudo cargar la imagen proporcionada."
              alertSeverity="error"
            />
          ) : (
            <Img
              src={image.imgUrl}
              alt={image.title}
              onClick={() => handleImageClick(image.imgUrl)}
              onError={handleImageError}
            />
          )
        ) : (
          <CustomCardAlert
            sizeType="small"
            alertMessage="No se ha proporcionado la URL de la imagen."
            alertSeverity="warning"
          />
        )}
      </ImageContainer>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={open} timeout={500}>
          <ModalContent>
            {/* ======== Image + Zoom ======== */}
            {!imageError && (
              <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                wheel={{ step: 0.1 }}
              >
                {({ zoomIn }) => (
                  <>
                    <TransformComponent>
                      <ModalImg src={selectedImage} alt="Imagen seleccionada" />
                    </TransformComponent>
                    <ZoomIcon onClick={() => zoomIn()} title="Acercar" />
                  </>
                )}
              </TransformWrapper>
            )}

            {/* ======== Close Button ======== */}
            <Tooltip title="Cerrar" placement="right" arrow>
              <CloseButton onClick={handleClose}>
                <IoMdCloseCircleOutline />
              </CloseButton>
            </Tooltip>

            {/* ======== Alerta en el Modal si la Imagen no se Puede Cargar ======== */}
            {imageError && (
              <CustomCardAlert
                sizeType="small"
                alertMessage="No se pudo cargar la imagen proporcionada."
                alertSeverity="error"
              />
            )}
          </ModalContent>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default SingleImageModal;
