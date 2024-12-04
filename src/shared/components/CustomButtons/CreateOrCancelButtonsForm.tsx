import { Button, Grid } from '@mui/material';

export type CreateOrCancelButtonsFormProps = {
  onCancel: () => void;
  cancelTextBtn?: string;
  onSave: () => void;
  saveTextBtn?: string;
  disabled?: boolean;
  pt?: number;

  cancelBtnHidden?: boolean;
};

const CreateOrCancelButtonsForm: React.FC<CreateOrCancelButtonsFormProps> = ({
  onCancel,
  cancelTextBtn = 'Cancelar',
  onSave,
  saveTextBtn = 'Guardar',
  disabled = false,
  pt = 6,

  cancelBtnHidden = false,
}) => {
  return (
    <Grid container spacing={1} justifyContent="end" pt={pt}>
      <Grid item>
        {!cancelBtnHidden && (
          <Button onClick={onCancel} variant="outlined" color="secondary">
            {cancelTextBtn || 'Cancelar'}
          </Button>
        )}
      </Grid>

      <Grid item>
        <Button
          onClick={onSave}
          variant="contained"
          disabled={disabled}
          color="primary"
        >
          {saveTextBtn || 'Guardar'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateOrCancelButtonsForm;
