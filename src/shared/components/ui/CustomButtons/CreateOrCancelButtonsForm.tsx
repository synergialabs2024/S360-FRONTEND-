import { Button, Grid } from '@mui/material';

export type CreateOrCancelButtonsFormProps = {
  onCancel: () => void;
  cancelTextBtn?: string;
  onSave: () => void;
  saveTextBtn?: string;
  disabled?: boolean;
  pt?: number;
};

const CreateOrCancelButtonsForm: React.FC<CreateOrCancelButtonsFormProps> = ({
  onCancel,
  cancelTextBtn = 'Cancelar',
  onSave,
  saveTextBtn = 'Guardar',
  disabled = false,
  pt = 6,
}) => {
  return (
    <Grid container spacing={1} justifyContent="end" pt={pt}>
      <Grid item>
        <Button onClick={onCancel} variant="text">
          {cancelTextBtn || 'Cancelar'}
        </Button>
      </Grid>

      <Grid item>
        <Button onClick={onSave} variant="contained" disabled={disabled}>
          {saveTextBtn || 'Guardar'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateOrCancelButtonsForm;
