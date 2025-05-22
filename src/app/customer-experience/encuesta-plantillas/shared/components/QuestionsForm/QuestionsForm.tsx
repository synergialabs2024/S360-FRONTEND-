import { Button, Grid, IconButton } from '@mui/material';
import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { FieldError } from 'react-hook-form';
import {
  ENCUESTA_PLANTILLA_TYPE_ARRAY_CHOICES,
  EncuestaPlantillas,
  EncuestaPlantillaTypeEnumChoice,
  gridSizeMdLg12,
} from '@/shared';
import { CustomTextArea, SelectArrayString } from '@/shared/components';

interface QuestionError {
  text?: FieldError;
  type?: FieldError;
  options?: FieldError | { [key: number]: { value?: FieldError } };
}

interface QuestionOption {
  id: string;
  value: string;
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

  // Observar todos los tipos de pregunta
  const questionTypes = useWatch({
    control,
    name: 'questions',
    defaultValue: fields.map(() => ({ type: 'boolean' })),
  });

  // Observar todas las opciones
  const allOptions = useWatch({
    control,
    name: 'questions',
    defaultValue: fields.map(() => ({
      options: [{ id: uuidv4(), value: '' }],
    })),
  });

  const addQuestion = () => {
    console.log(encuestaPlantillas);
    append({
      id: `q${fields.length + 1}_${uuidv4()}`,
      text: '',
      type: 'boolean',
      options: [{ id: uuidv4(), value: '' }],
    });
  };

  const addOption = (questionIndex: number) => {
    const options = form.getValues(`questions.${questionIndex}.options`) || [];
    form.setValue(`questions.${questionIndex}.options`, [
      ...options,
      { id: uuidv4(), value: '' },
    ]);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const options = form.getValues(`questions.${questionIndex}.options`) || [];
    options.splice(optionIndex, 1);
    form.setValue(`questions.${questionIndex}.options`, options);
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
        const optionsError = fieldError?.options;

        // Obtener el tipo y opciones desde los valores observados
        const questionType = questionTypes[index]?.type || 'boolean';
        const options: QuestionOption[] = allOptions[index]?.options || [
          { id: uuidv4(), value: '' },
        ];

        const isSingleSelection =
          questionType === EncuestaPlantillaTypeEnumChoice.SELECCION_UNICA;

        const isMultipleSelection =
          questionType === EncuestaPlantillaTypeEnumChoice.SELECCION_MULTIPLE;

        const isRankingSelection =
          questionType === EncuestaPlantillaTypeEnumChoice.SELECCION_RANKING;

        const isAtributoSelection =
          questionType ===
          EncuestaPlantillaTypeEnumChoice.SELECCION_POR_ATRIBUTO;

        const isNivelSelection =
          questionType ===
          EncuestaPlantillaTypeEnumChoice.SELECCION_NIVEL_SATISFACCION;

        return (
          <Grid item container key={field.id} {...gridSizeMdLg12} spacing={2}>
            <Grid item xs={6}>
              <CustomTextArea
                control={control}
                label="Pregunta General"
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

            {/* Mostrar opciones para selección única */}
            {(isSingleSelection ||
              isMultipleSelection ||
              isRankingSelection ||
              isAtributoSelection ||
              isNivelSelection) && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => addOption(index)}
                    >
                      Agregar Opción
                    </Button>
                  </Grid>

                  {options.map(
                    (option: QuestionOption, optionIndex: number) => {
                      // Extraemos el error de manera segura
                      let optionError: FieldError | undefined;
                      let optionHelperText: string | undefined;

                      if (
                        optionsError &&
                        typeof optionsError === 'object' &&
                        !('message' in optionsError)
                      ) {
                        const indexedError = optionsError as {
                          [key: number]: { value?: FieldError };
                        };
                        optionError = indexedError[optionIndex]?.value;
                        optionHelperText = optionError?.message;
                      }

                      return (
                        <Grid item container key={option.id} spacing={2}>
                          <Grid item xs={6}>
                            <CustomTextArea
                              control={control}
                              label={`Opción ${optionIndex + 1}`}
                              {...control.register(
                                `questions.${index}.options.${optionIndex}.value`,
                              )}
                              error={optionError}
                              helperText={optionHelperText}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => removeOption(index, optionIndex)}
                              color="error"
                              disabled={options.length <= 1}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      );
                    },
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        );
      })}
    </>
  );
};

export default QuestionsForm;
