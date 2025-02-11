import { Grid } from '@mui/material';

import { ScrollableDialogProps } from '@/shared/components';

export type PromocionProductosDisponiblesModalProps = {
  open: boolean;
  onClose: () => void;
};

const PromocionProductosDisponiblesModal: React.FC<
  PromocionProductosDisponiblesModalProps
> = ({ open, onClose }) => {
  ///* handlers ---------------------

  const handleConfirm = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ScrollableDialogProps
      open={open}
      onClose={handleClose}
      minWidth="72%"
      title="Productos Disponibles"
      confirmTextBtn="Reasignar"
      onConfirm={handleConfirm}
      contentNode={
        <Grid container spacing={2}>
          ssss
        </Grid>
      }
    />
  );
};

export default PromocionProductosDisponiblesModal;
