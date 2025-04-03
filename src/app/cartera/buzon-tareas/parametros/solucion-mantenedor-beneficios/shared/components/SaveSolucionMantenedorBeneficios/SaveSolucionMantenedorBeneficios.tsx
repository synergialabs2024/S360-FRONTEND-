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
import { returnUrlSolucionMantenedorBeneficiosPage } from '../../../pages/tables/SolucionMantenedorBeneficiosPage';
import { SolucionMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas';
import {
  CreateSolucionMantenedorBeneficioParamsBase,
  useCreateSolucionMantenedorBeneficio,
  useUpdateSolucionMantenedorBeneficio,
} from '@/actions/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios';
import { solucionMantenedorBeneficiosFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios';

export type SaveSolucionMantenedorBeneficiosProps = {
  title: string;
  solucionMantenedorBeneficios?: SolucionMantenedorBeneficios;
};

type SaveFormData = CreateSolucionMantenedorBeneficioParamsBase & {};

const SaveSolucionMantenedorBeneficios: React.FC<
  SaveSolucionMantenedorBeneficiosProps
> = ({ title, solucionMantenedorBeneficios }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solucionMantenedorBeneficiosFormSchema) as any,
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
  const createSolucionMantenedorBeneficio =
    useCreateSolucionMantenedorBeneficio({
      navigate,
      returnUrl: returnUrlSolucionMantenedorBeneficiosPage,
      enableErrorNavigate: false,
    });

  const updateSolucionMantenedorBeneficio =
    useUpdateSolucionMantenedorBeneficio({
      navigate,
      returnUrl: returnUrlSolucionMantenedorBeneficiosPage,
      enableErrorNavigate: false,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (solucionMantenedorBeneficios?.id) {
      updateSolucionMantenedorBeneficio.mutate({
        id: solucionMantenedorBeneficios.id!,
        data,
      });
      return;
    }

    ///* create
    createSolucionMantenedorBeneficio.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!solucionMantenedorBeneficios?.id) return;
    reset(solucionMantenedorBeneficios);
  }, [solucionMantenedorBeneficios, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolucionMantenedorBeneficiosPage)}
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

export default SaveSolucionMantenedorBeneficios;
