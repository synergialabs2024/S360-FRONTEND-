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
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

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
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageClick = () => {
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
                onClick={() => handleImageClick()}
              />

              <ImageListItemBar
                title={item.title.toUpperCase()}
                position="bottom"
                sx={{
                  backgroundColor: `rgba(${theme.palette.primary.main}, 0.5)`,
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
