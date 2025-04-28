import { Button, Grid, IconButton } from '@mui/material';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { FieldError } from 'react-hook-form';
import {
  ENCUESTA_PLANTILLA_TYPE_ARRAY_CHOICES,
  EncuestaPlantillas,
  gridSizeMdLg12,
} from '@/shared';
import { CustomTextArea, SelectArrayString } from '@/shared/components';

interface QuestionError {
  text?: FieldError;
  type?: FieldError;
}

export interface SaveEncuestaPlantillasProps {
  form: UseFormReturn<any>;
  encuestaPlantillas?: EncuestaPlantillas;
}

const QuestionsForm: React.FC<SaveEncuestaPlantillasProps> = ({
  form,
  encuestaPlantillas,
}) => {
  const {
    control,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () => {
    console.log(encuestaPlantillas);
    append({
      id: `q${fields.length + 1}_${uuidv4()}`,
      text: '',
      type: 'boolean',
    });
  };

  // Tipo seguro para los errores
  const questionErrors = errors.questions as QuestionError[] | undefined;

  return (
    <>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={addQuestion}>
        Agregar Pregunta
      </Button>

      {fields.map((field, index) => {
        const fieldError = questionErrors?.[index];
        const textError = fieldError?.text;
        const typeError = fieldError?.type;

        return (
          <Grid item container key={field.id} {...gridSizeMdLg12} spacing={2}>
            <Grid item xs={6}>
              <CustomTextArea
                control={control}
                label="Pregunta"
                {...control.register(`questions.${index}.text`)}
                error={textError}
                helperText={textError?.message}
              />
            </Grid>

            <Grid item xs={4}>
              <SelectArrayString
                label="Tipo"
                name={`questions.${index}.type`}
                control={control}
                defaultValue={''}
                options={ENCUESTA_PLANTILLA_TYPE_ARRAY_CHOICES}
                error={typeError}
                helperText={typeError?.message}
              />
            </Grid>

            {/* 
            <SelectArrayString
                gridSize={gridSizeMdLg6}
                error={errors.franja_horaria}
                label="Tipo"
                {...control.register(`questions.${index}.type`)}
                defaultValue="boolean"
                options={ENCUESTA_PLANTILLA_TYPE_ARRAY_CHOICES}
              />
            */}

            <Grid item xs={1}>
              <IconButton onClick={() => remove(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default QuestionsForm;
