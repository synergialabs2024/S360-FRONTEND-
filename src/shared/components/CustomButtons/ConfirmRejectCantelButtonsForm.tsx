import { Button, Grid } from '@mui/material';

import { ColorButtonType, SxPropsType } from '@/shared/interfaces';

export type ConfirmRejectCantelButtonsFormProps = {
  onCancel: () => void;
  cancelTextBtn?: string;

  onReject: () => void;
  rejectTextBtn?: string;
  showRejectBtn?: boolean;

  onConfirm: () => void;
  confirmTextBtn?: string;

  showAuxiliarBtn?: boolean;
  auxiliarBtn?: React.ReactNode;

  sxContainer?: SxPropsType;

  //
  confirmVariantBtn?: 'text' | 'contained' | 'outlined';
  cancelColorBtn?: ColorButtonType;
};

const ConfirmRejectCantelButtonsForm: React.FC<
  ConfirmRejectCantelButtonsFormProps
> = ({
  onCancel,
  cancelTextBtn = 'Cancelar',

  onReject,
  rejectTextBtn = 'Rechazar',

  onConfirm,
  confirmTextBtn = 'Confirmar',

  showAuxiliarBtn = false,
  auxiliarBtn = null,
  sxContainer,

  showRejectBtn = true,

  confirmVariantBtn = 'contained',
  cancelColorBtn = 'inherit',
}) => {
  return (
    <Grid container spacing={1} sx={sxContainer} justifyContent="end" pt={6}>
      <>
        <Grid item>
          <Button onClick={onCancel} variant="text" color={cancelColorBtn}>
            {cancelTextBtn}
          </Button>
        </Grid>

        {/* -------- AUXILIAR --------  */}
        {showAuxiliarBtn && auxiliarBtn}

        <span className="spacer"></span>
      </>

      {/* -------- REJECT --------  */}
      {showRejectBtn && (
        <Grid item>
          <Button onClick={onReject} variant="text" color="error">
            {rejectTextBtn}
          </Button>
        </Grid>
      )}

      {/* -------- CONFIRMAR --------  */}
      <Grid item>
        <Button onClick={onConfirm} variant={confirmVariantBtn}>
          {confirmTextBtn}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConfirmRejectCantelButtonsForm;
