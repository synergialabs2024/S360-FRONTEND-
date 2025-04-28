import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  causaMantenedorBeneficiosFormSchema,
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  ToastWrapper,
} from '@/shared';
import { useEffect } from 'react';
import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { returnUrlCausaMantenedorBeneficiosPage } from '../../../pages/tables/CausaMantenedorBeneficiosPage';
import {
  CreateCausaMantenedorBeneficioParamsBase,
  useCreateCausaMantenedorBeneficio,
  useUpdateCausaMantenedorBeneficio,
} from '@/actions/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios';
import { CausaMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios';

export type SaveCausaMantenedorBeneficiosProps = {
  title: string;
  causaMantenedorBeneficios?: CausaMantenedorBeneficios;
};

type SaveFormData = CreateCausaMantenedorBeneficioParamsBase & {};

const SaveCausaMantenedorBeneficios: React.FC<
  SaveCausaMantenedorBeneficiosProps
> = ({ title, causaMantenedorBeneficios }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(causaMantenedorBeneficiosFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createCausaMantenedorBeneficio = useCreateCausaMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlCausaMantenedorBeneficiosPage,
    enableErrorNavigate: false,
  });

  const updateCausaMantenedorBeneficio = useUpdateCausaMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlCausaMantenedorBeneficiosPage,
    enableErrorNavigate: false,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (causaMantenedorBeneficios?.id) {
      updateCausaMantenedorBeneficio.mutate({
        id: causaMantenedorBeneficios.id!,
        data,
      });
      return;
    }

    ///* create
    createCausaMantenedorBeneficio.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!causaMantenedorBeneficios?.id) return;
    reset(causaMantenedorBeneficios);
  }, [causaMantenedorBeneficios, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCausaMantenedorBeneficiosPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Codigo"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
        disabled={!!causaMantenedorBeneficios?.id}
      />

      <CustomTextArea
        label="Descripcion"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveCausaMantenedorBeneficios;
