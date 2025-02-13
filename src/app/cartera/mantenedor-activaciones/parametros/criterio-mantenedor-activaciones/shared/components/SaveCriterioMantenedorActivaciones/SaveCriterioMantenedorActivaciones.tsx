import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
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
import { tipoMantenedorBeneficiosFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { CreateTipoMantenedorBeneficioParamsBase } from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { returnUrlCriterioMantenedorActivacionesPage } from '../../../pages/tables/CriterioMantenedorActivacionesPage';
import { CriterioMantenedorActivacion } from '@/shared/interfaces/app/cartera/mantenedor-activaciones';
import { useCreateCriterioMantenedorActivacion } from '@/actions/app/cartera/buzon-tareas/parametros/criterio-mantenedor-activaciones';

export type SaveCriterioMantenedorActivacionesProps = {
  title: string;
  criterioMantenedorActivacion?: CriterioMantenedorActivacion;
};

type SaveFormData = CreateTipoMantenedorBeneficioParamsBase & {};

const SaveCriterioMantenedorActivaciones: React.FC<
  SaveCriterioMantenedorActivacionesProps
> = ({ title, criterioMantenedorActivacion }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(tipoMantenedorBeneficiosFormSchema) as any,
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
  const createCriterioMantenedorActivacion =
    useCreateCriterioMantenedorActivacion({
      navigate,
      returnUrl: returnUrlCriterioMantenedorActivacionesPage,
      enableErrorNavigate: false,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* create
    createCriterioMantenedorActivacion.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!criterioMantenedorActivacion?.id) return;
    reset(criterioMantenedorActivacion);
  }, [criterioMantenedorActivacion, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCriterioMantenedorActivacionesPage)}
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
      />

      <CustomTextArea
        label="Description"
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

export default SaveCriterioMantenedorActivaciones;
