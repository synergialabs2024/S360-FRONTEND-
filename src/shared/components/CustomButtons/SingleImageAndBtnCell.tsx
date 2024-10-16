import { useState } from 'react';
import { MdImage } from 'react-icons/md';

import { ScrollableDialogProps, SingleIconButton } from '@/shared/components';
import { Grid } from '@mui/material';
import { ScrollableDialogPropsProps } from '../CustomDialogs/ScrollableDialogProps';

export type SingleImageAndBtnCellProps = {
  url: string;
  title: string;
} & Partial<ScrollableDialogPropsProps>;

const SingleImageAndBtnCell: React.FC<SingleImageAndBtnCellProps> = ({
  url,
  title,

  //
  cancelTextBtn = 'Cerrar',
  cancelVariantBtn = 'text',
  confirmTextBtn = 'Confirmar',
  confirmVariantBtn = 'text',
  onClose,

  minWidth = '50%',
  width = '100%',
  showCustomActions = false,
  customActions,
}) => {
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  return (
    <>
      <SingleIconButton
        startIcon={<MdImage />}
        color="inherit"
        label="Ver Imagen"
        onClick={() => {
          setOpenPhotoModal(true);
        }}
      />

      <ScrollableDialogProps
        title={title}
        open={openPhotoModal}
        onClose={() => {
          setOpenPhotoModal(false);
          onClose && onClose();
        }}
        cancelTextBtn={cancelTextBtn}
        contentNode={
          <Grid container justifyContent="center">
            <img
              src={
                url ||
                'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
              }
              alt="User"
              style={{ width: '100%' }}
            />
          </Grid>
        }
        // other props
        {...{
          cancelVariantBtn,
          confirmTextBtn,
          confirmVariantBtn,
          minWidth,
          width,
          showCustomActions,
          customActions,
        }}
      />
    </>
  );
};

export default SingleImageAndBtnCell;
