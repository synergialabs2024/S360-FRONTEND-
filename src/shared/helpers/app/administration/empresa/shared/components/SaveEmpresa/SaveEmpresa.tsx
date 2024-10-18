import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateEmpresaParamsBase,
  useCreateEmpresa,
  useUpdateEmpresa,
} from '@/actions/app';
import {
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useUploadImageGeneric } from '@/shared/hooks';
import { Empresa } from '@/shared/interfaces';
import { uploadFileUtils } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { returnUrlEmpresasPage } from '../../../pages/tables/EmpresasPage';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { SAVE_EMPRESA_PERMISSIONS } from '@/shared';

export interface SaveEmpresaProps {
  title: string;
  empresa?: Empresa;
}

type SaveFormData = CreateEmpresaParamsBase & {};

const SaveEmpresa: React.FC<SaveEmpresaProps> = ({ title, empresa }) => {
  useCheckPermissionsArray(SAVE_EMPRESA_PERMISSIONS);

  ///* hooks
  const navigate = useNavigate();
  const {
    UploadImageBtnComponent,
    image1: logoImg,
    setImage1: setLogoImg,
    image2: logoImg2,
    setImage2: setLogoImg2,
  } = useUploadImageGeneric();
  const requiredImages = [
    {
      label: 'Logo Empresa',
      image: logoImg,
      setImage: setLogoImg,
      isRequired: true,
    },
    {
      label: 'Logo Empresa 2',
      image: logoImg2,
      setImage: setLogoImg2,
      isRequired: false,
    },
  ];

  ///* global state

  ///* form
  const form = useForm<SaveFormData>({
    // resolver: yupResolver(empresaFormSchema),
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
  const createEmpresaMutation = useCreateEmpresa({
    navigate,
    returnUrl: returnUrlEmpresasPage,
    enableErrorNavigate: false,
  });
  const updateEmpresaMutation = useUpdateEmpresa<CreateEmpresaParamsBase>({
    navigate,
    returnUrl: returnUrlEmpresasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    // validate images
    let thereAreEmptyRequiredImages = false;
    let emptyImageName = '';
    requiredImages.forEach(({ isRequired, image, label }) => {
      if (isRequired && !image) {
        thereAreEmptyRequiredImages = true;
        emptyImageName = label;
      }
    });
    if (thereAreEmptyRequiredImages) {
      return ToastWrapper.error(`${emptyImageName} es requerido`);
    }

    // upload images
    // set promise array to upload images
    const promisesImg = requiredImages.map(({ image, label }) =>
      uploadFileUtils({
        imageFile: image!,
        fileName: label,
      }),
    );
    const [logo1, logo2] = await Promise.all([...promisesImg]);
    console.log({
      logo1,
      logo2,
    });

    // return;

    ///* upd
    if (empresa?.id) {
      updateEmpresaMutation.mutate({ id: empresa.id!, data });
      return;
    }

    ///* create
    createEmpresaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!empresa?.id) return;
    reset(empresa);
  }, [empresa, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlEmpresasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      {/* ------------------------ */}
      {requiredImages.map(({ label, image, setImage }) => (
        <UploadImageBtnComponent
          key={label}
          buttonLabel={label}
          selectedImage={image}
          setSelectedImage={setImage}
        />
      ))}

      {/* ------------------------ */}

      <CustomTextField
        label="Tipo identificacion"
        name="tipo_identificacion"
        control={form.control}
        defaultValue={form.getValues().tipo_identificacion}
        error={errors.tipo_identificacion}
        helperText={errors.tipo_identificacion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Identificacion"
        name="identificacion"
        control={form.control}
        defaultValue={form.getValues().identificacion}
        error={errors.identificacion}
        helperText={errors.identificacion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Razon social"
        name="razon_social"
        control={form.control}
        defaultValue={form.getValues().razon_social}
        error={errors.razon_social}
        helperText={errors.razon_social?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Commercial name"
        name="commercial_name"
        control={form.control}
        defaultValue={form.getValues().commercial_name}
        error={errors.commercial_name}
        helperText={errors.commercial_name?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Email"
        name="email"
        type="email"
        control={form.control}
        defaultValue={form.getValues().email}
        error={errors.email}
        helperText={errors.email?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Address"
        name="address"
        control={form.control}
        defaultValue={form.getValues().address}
        error={errors.address}
        helperText={errors.address?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Phone 1"
        name="phone_1"
        control={form.control}
        defaultValue={form.getValues().phone_1}
        error={errors.phone_1}
        helperText={errors.phone_1?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Phone 2"
        name="phone_2"
        control={form.control}
        defaultValue={form.getValues().phone_2}
        error={errors.phone_2}
        helperText={errors.phone_2?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Phone 3"
        name="phone_3"
        control={form.control}
        defaultValue={form.getValues().phone_3}
        error={errors.phone_3}
        helperText={errors.phone_3?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Is agente retencion"
        name="is_agente_retencion"
        control={form.control}
        defaultValue={form.getValues().is_agente_retencion}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Number agente retencion"
        name="number_agente_retencion"
        control={form.control}
        defaultValue={form.getValues().number_agente_retencion}
        error={errors.number_agente_retencion}
        helperText={errors.number_agente_retencion?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomTextField
        label="Razon social representante"
        name="razon_social_representante"
        control={form.control}
        defaultValue={form.getValues().razon_social_representante}
        error={errors.razon_social_representante}
        helperText={errors.razon_social_representante?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Identificacion representante"
        name="identificacion_representante"
        control={form.control}
        defaultValue={form.getValues().identificacion_representante}
        error={errors.identificacion_representante}
        helperText={errors.identificacion_representante?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Email representante"
        name="email_representante"
        type="email"
        control={form.control}
        defaultValue={form.getValues().email_representante}
        error={errors.email_representante}
        helperText={errors.email_representante?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Phone representante"
        name="phone_representante"
        control={form.control}
        defaultValue={form.getValues().phone_representante}
        error={errors.phone_representante}
        helperText={errors.phone_representante?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Contador"
        name="contador"
        control={form.control}
        defaultValue={form.getValues().contador}
        error={errors.contador}
        helperText={errors.contador?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Genera ats"
        name="genera_ats"
        control={form.control}
        defaultValue={form.getValues().genera_ats}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveEmpresa;
