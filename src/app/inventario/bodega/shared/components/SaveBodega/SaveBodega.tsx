import {
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { Bodega } from '@/shared/interfaces';
import { bodegaFormSchema } from '@/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  CreateBodegaParams,
  useCreateBodega,
  useUpdateBodega,
} from '@/actions/app/inventario';
import { returnUrlBodegasPage } from '../../../pages/tables/BodegasPage';
import { gridSizeMdLg6 } from '@/shared';

export interface SaveBodegaProps {
  title: string;
  bodega?: Bodega;
}

type SaveFormData = CreateBodegaParams & {};

const SaveBodega: React.FC<SaveBodegaProps> = ({ title, bodega }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(bodegaFormSchema) as any,
    defaultValues: {
      state: true,
      es_externa: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createBodegaMutation = useCreateBodega({
    navigate,
    returnUrl: returnUrlBodegasPage,
    enableErrorNavigate: false,
  });
  const updateBodegaMutation = useUpdateBodega<CreateBodegaParams>({
    navigate,
    returnUrl: returnUrlBodegasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (bodega?.id) {
      updateBodegaMutation.mutate({ id: bodega.id!, data });
      return;
    }

    ///* create
    createBodegaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!bodega?.id) return;
    reset(bodega);
  }, [bodega, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlBodegasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="Centro Costo"
        name="centro_costo"
        control={form.control}
        defaultValue={form.getValues().centro_costo}
        error={errors.centro_costo}
        helperText={errors.centro_costo?.message}
        size={gridSizeMdLg6}
        min={0}
      />
      <CustomTextArea
        label="Direccion"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
        required={false}
      />
      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
      />
      <SampleCheckbox
        label="Externa"
        name="es_externa"
        control={form.control}
        defaultValue={form.getValues().es_externa}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveBodega;
