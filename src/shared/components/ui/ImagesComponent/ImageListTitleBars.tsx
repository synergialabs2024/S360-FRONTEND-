import {
  Fade,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  styled,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useIsMediaQuery } from '@/shared/hooks';

const ImageListContainer = styled('div')({
  width: '93%',
  paddingTop: '1.5rem',
});

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

const ModalContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  maxWidth: '73%',
  position: 'relative', // to position the close button
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
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  padding: theme.spacing(1),
}));

export type ImageListTitleBarType = {
  title: string;
  imgUrl: string;
  id: number;
};

export interface ImageListTitleBarsProps {
  images: ImageListTitleBarType[];
}

const ImageListTitleBars: React.FC<ImageListTitleBarsProps> = ({ images }) => {
  const isMobile = useIsMediaQuery('sm');

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageClick = (imgSrc: string) => {
    setSelectedImage(imgSrc);
    setOpen(true);
  };

  return (
    <Grid item container xs={12} justifyContent="center" alignItems="center">
      <ImageListContainer>
        <ImageList
          cols={isMobile ? 1 : images?.length < 3 ? images.length : 3}
          rowHeight={164}
        >
          {images.map(item => (
            <ImageListItem key={item.imgUrl}>
              <Img
                src={item.imgUrl}
                alt={item.title}
                onClick={() => handleImageClick(item.imgUrl)}
              />

              <ImageListItemBar
                title={item.title.toUpperCase()}
                position="bottom"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.57)',
                  fontWeight: 'bold',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </ImageListContainer>

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
          <ModalContainer>
            {/* ======== Image + zoom ======== */}
            <TransformWrapper>
              <TransformComponent>
                <ModalImg src={selectedImage} alt="Imagen seleccionada" />

                <ZoomIcon fontSize="large" />
              </TransformComponent>
            </TransformWrapper>

            {/* ======== Close Button ======== */}
            <Tooltip title="Cerrar" placement="right" arrow>
              <CloseButton onClick={handleClose}>
                <IoMdCloseCircleOutline />
              </CloseButton>
            </Tooltip>
          </ModalContainer>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default ImageListTitleBars;
