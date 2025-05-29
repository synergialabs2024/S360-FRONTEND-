import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { SAVE_CIUDAD_PERMISSIONS } from '@/shared/constants/app';
import { gridSizeMdLg12 } from '@/shared/constants/ui';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { EncuestaPlantillas } from '@/shared/interfaces';
import { getKeysFormErrorsMessage } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { returnUrlEncuestaPlantillasPage } from '../../../pages/tables/EncuestaPlantillasPage';
import { EncuestaPlantillaFormSchema } from '@/shared/utils/validation-schemas/app/customer-exoerience/encuesta-plantillas/encuesta-plantillas.schema';
import QuestionsForm from '../QuestionsForm/QuestionsForm';
import {
  CreateEncuestaPlantillaParams,
  useCreateEncuestaPlantilla,
  useUpdateEncuestaPlantilla,
} from '@/actions/app';
import { Grid } from '@mui/material';

export interface SaveEncuestaPlantillasProps {
  title: string;
  encuestaPlantillas?: EncuestaPlantillas;
}

type SaveFormData = CreateEncuestaPlantillaParams & {};

const SaveEncuestaPlantillas: React.FC<SaveEncuestaPlantillasProps> = ({
  title,
  encuestaPlantillas,
}) => {
  useCheckPermissionsArray(SAVE_CIUDAD_PERMISSIONS);

  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(EncuestaPlantillaFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createEncuestaMutation = useCreateEncuestaPlantilla({
    navigate,
    returnUrl: returnUrlEncuestaPlantillasPage,
    enableErrorNavigate: false,
  });
  const updateCiudadMutation =
    useUpdateEncuestaPlantilla<CreateEncuestaPlantillaParams>({
      navigate,
      returnUrl: returnUrlEncuestaPlantillasPage,
    });

  const crearSlug = (text: string): string => {
    return text
      .toLowerCase() // Minúsculas
      .normalize('NFD') // Separa tildes (á → a + ´)
      .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
      .replace(/[^\w\s-]/g, '') // Elimina símbolos (excepto guiones)
      .trim() // Quita espacios al inicio/final
      .replace(/\s+/g, '-') // Espacios → guiones
      .replace(/-+/g, '-'); // Evita guiones dobles
  };

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const slug = crearSlug(data.name);

    ///* upd
    if (encuestaPlantillas?.id) {
      updateCiudadMutation.mutate({ id: encuestaPlantillas.id!, data });
      return;
    }

    ///* create
    // createCiudadMutation.mutate(data);
    createEncuestaMutation.mutate({
      name: data.name,
      state: data.state,
      slug: slug,
      description: data.description,
      questions: data.questions,
    });
  };

  ///* effects
  useEffect(() => {
    if (!encuestaPlantillas?.id) return;
    reset(encuestaPlantillas);
  }, [encuestaPlantillas, reset]);

  return (
    <SingleFormBoxScene
      titleNode={title}
      onCancel={() => navigate(returnUrlEncuestaPlantillasPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Campos requeridos: ${keys}`);
      })}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />
      <CustomTextArea
        label="Descripcion"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
      />

      <Grid item container {...gridSizeMdLg12} spacing={2}>
        <QuestionsForm form={form} encuestaPlantillas={encuestaPlantillas} />
      </Grid>

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg12}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveEncuestaPlantillas;
