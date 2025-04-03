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
import { TipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros';
import { returnUrlTipoMantenedorBeneficiosPage } from '../../../pages/tables/TipoMantenedorBeneficiosPage';
import { tipoMantenedorBeneficiosFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import {
  CreateTipoMantenedorBeneficioParamsBase,
  useCreateTipoMantenedorBeneficio,
  useUpdateTipoMantenedorBeneficio,
} from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';

export type SaveTipoMantenedorBeneficiosProps = {
  title: string;
  tipoMantenedorBeneficios?: TipoMantenedorBeneficios;
};

type SaveFormData = CreateTipoMantenedorBeneficioParamsBase & {};

const SaveTipoMantenedorBeneficios: React.FC<
  SaveTipoMantenedorBeneficiosProps
> = ({ title, tipoMantenedorBeneficios }) => {
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
  const createTipoMantenedorBeneficio = useCreateTipoMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlTipoMantenedorBeneficiosPage,
    enableErrorNavigate: false,
  });

  const updateTipoMantenedorBeneficio = useUpdateTipoMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlTipoMantenedorBeneficiosPage,
    enableErrorNavigate: false,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (tipoMantenedorBeneficios?.id) {
      updateTipoMantenedorBeneficio.mutate({
        id: tipoMantenedorBeneficios.id!,
        data,
      });
      return;
    }

    ///* create
    createTipoMantenedorBeneficio.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!tipoMantenedorBeneficios?.id) return;
    reset(tipoMantenedorBeneficios);
  }, [tipoMantenedorBeneficios, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTipoMantenedorBeneficiosPage)}
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

export default SaveTipoMantenedorBeneficios;
