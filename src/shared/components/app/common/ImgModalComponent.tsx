import { Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { SingleIconButton } from '../../CustomButtons';
import {
  IconPhoto,
  IconChevronLeft,
  IconChevronRight,
  IconPhotoOff,
} from '@tabler/icons-react';
import { ScrollableDialogProps } from '../../CustomDialogs';

export type ImgModalComponentProps = {
  urls: Record<string, string>;
  modalTitle?: string;
};

const ImgModalComponent: React.FC<ImgModalComponentProps> = ({
  urls = {},
  modalTitle = 'Imagen',
}) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Title URL
  const imageUrls = Object.values(urls);
  const imageTitles = Object.keys(urls).map(title =>
    title.toUpperCase().replace(/_/g, ' '),
  );

  // Carrusel
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length,
    );
  };

  return (
    <>
      <Grid container item xs={12} spacing={4}>
        <Grid item xs={2}>
          <SingleIconButton
            startIcon={<IconPhoto />}
            label="Imagen"
            color="inherit"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </Grid>
      </Grid>

      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          minWidth="75%"
          title={modalTitle}
          contentNode={
            <>
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    marginBottom: '8px',
                    fontWeight: 'bold',
                  }}
                >
                  {imageTitles[currentIndex]}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {imageUrls.length > 1 && (
                  <IconButton
                    onClick={handlePrevious}
                    style={{ margin: '5px' }}
                  >
                    <IconChevronLeft />
                  </IconButton>
                )}

                {imageUrls[currentIndex] ? (
                  <img
                    src={imageUrls[currentIndex]}
                    alt={`Imagen ${currentIndex + 1}`}
                    style={{
                      maxWidth: '50%',
                      maxHeight: '300px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '50%',
                      height: '300px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f0f0f0',
                      color: '#888',
                    }}
                  >
                    <IconPhotoOff style={{ width: '100px', height: '100px' }} />
                  </div>
                )}

                {imageUrls.length > 1 && (
                  <IconButton onClick={handleNext} style={{ margin: '5px' }}>
                    <IconChevronRight />
                  </IconButton>
                )}
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default ImgModalComponent;
