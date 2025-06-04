import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Grid, Tab } from '@mui/material';
import { useEffect } from 'react';

import {
  useUpdateConfiguracionEmpresa,
  CreateConfiguracionEmpresaParamsBase,
} from '@/actions/app';
import {
  a11yProps,
  CustomAutocompleteArrString,
  CustomTabPanel,
  CustomTextArea,
  CustomTextField,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import {
  BucketTypeEnumChoice,
  ConfiguracionEmpresa,
  configuracionEmpresaFormSchema,
  gridSizeMdLg10,
  gridSizeMdLg12,
  gridSizeMdLg6,
  ToastWrapper,
  useTabsOnly,
  useUploadImageGeneric,
  YES_NO_ARRAY_CHOICES,
} from '@/shared';
import { uploadFileToBucket } from '@/actions/statics-api';
import { returnUrlConfiguracionsEmpresaPage } from '../../pages/tables/ConfiguracionEmpresaPage';
import SaveConfEmpresaImagePrimary from './SaveConfEmpresaImagePrimary';
import SaveConfEmpresaImageSecundary from './SaveConfEmpresaImageSecundary';

export interface SaveConfEmpresaProps {
  title: string;
  conf_empresa?: ConfiguracionEmpresa;
}

type SaveFormData = CreateConfiguracionEmpresaParamsBase & {};

const SaveConfEmpresa: React.FC<SaveConfEmpresaProps> = ({
  title,
  conf_empresa,
}) => {
  ///*  Local State
  const navigate = useNavigate();

  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(configuracionEmpresaFormSchema) as any,
    defaultValues: {},
  });

  const {
    UploadImageDropZoneComponent,
    image1: Image_url_1,
    setImage1: setImage_url_1,
    image2: Image_url_2,
    setImage2: setImage_url_2,
  } = useUploadImageGeneric();

  const {
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = form;

  ///* mutations
  const updateConfEmpresaMutation =
    useUpdateConfiguracionEmpresa<CreateConfiguracionEmpresaParamsBase>({
      navigate,
      returnUrl: returnUrlConfiguracionsEmpresaPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    // validate images -----------
    if (!Image_url_1 && !conf_empresa?.logo_1_url) {
      return ToastWrapper.error('El logo principal es requerida');
    }
    if (!Image_url_2 && !conf_empresa?.logo_2_url) {
      return ToastWrapper.error('El logo secundario es requerida');
    }

    // upload images ----
    if (Image_url_1) {
      const [ImgUrl1] = await Promise.all([
        uploadFileToBucket({
          file: Image_url_1,
          file_name: 'my-company',
          bucketDir: BucketTypeEnumChoice.FILES_MY_COMPANY,
        }),
      ]);
      data.logo_1_url = ImgUrl1?.streamUlr || '';
    }
    if (Image_url_2) {
      const [ImgUrl2] = await Promise.all([
        uploadFileToBucket({
          file: Image_url_2,
          file_name: 'my-company',
          bucketDir: BucketTypeEnumChoice.FILES_MY_COMPANY,
        }),
      ]);
      data.logo_2_url = ImgUrl2?.streamUlr || '';
    }

    ///* upd
    if (conf_empresa?.id) {
      updateConfEmpresaMutation.mutate({ id: conf_empresa.id!, data });
      return;
    }
  };

  ///* effects
  useEffect(() => {
    if (!conf_empresa?.id) return;
    reset(conf_empresa);
  }, [conf_empresa, reset]);

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlConfiguracionsEmpresaPage)}
      onSave={handleSubmit(onSave, () => {})}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Formulario" value={1} {...a11yProps(1)} />
          <Tab label="Imagenes" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
      formSize={gridSizeMdLg10}
    >
      <CustomTabPanel index={1} value={tabValue}>
        <CustomTextField
          label="Nombre del esquema"
          name="schema_name"
          control={form.control}
          defaultValue={form.getValues().schema_name}
          error={errors.schema_name}
          helperText={errors.schema_name?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Razón social"
          name="company_name"
          control={form.control}
          defaultValue={form.getValues().company_name}
          error={errors.company_name}
          helperText={errors.company_name?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Nombre Comercial"
          name="commercial_name"
          control={form.control}
          defaultValue={form.getValues().commercial_name}
          error={errors.commercial_name}
          helperText={errors.commercial_name?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Dirección del Establecimiento Matriz"
          name="main_address"
          control={form.control}
          defaultValue={form.getValues().main_address}
          error={errors.main_address}
          helperText={errors.main_address?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Dirección del Establecimiento Emisor"
          name="establishment_address"
          control={form.control}
          defaultValue={form.getValues().establishment_address}
          error={errors.establishment_address}
          helperText={errors.establishment_address?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Código del Establecimiento Emisor"
          name="establishment_code"
          control={form.control}
          defaultValue={form.getValues().establishment_code}
          error={errors.establishment_code}
          helperText={errors.establishment_code?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Código del Punto de Emisión"
          name="issuing_point_code"
          control={form.control}
          defaultValue={form.getValues().issuing_point_code}
          error={errors.issuing_point_code}
          helperText={errors.issuing_point_code?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Contribuyente Especial"
          name="special_taxpayer"
          control={form.control}
          defaultValue={form.getValues().special_taxpayer}
          error={errors.special_taxpayer}
          helperText={errors.special_taxpayer?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomAutocompleteArrString
          label="Obligado a Llevar Contabilidad"
          name="obligated_accounting"
          control={form.control}
          defaultValue={form.getValues('obligated_accounting')}
          options={YES_NO_ARRAY_CHOICES}
          isLoadingData={false}
          error={errors.obligated_accounting}
          helperText={errors.obligated_accounting?.message}
          size={gridSizeMdLg6}
          disableClearable
        />
        <CustomTextField
          label="Teléfono celular"
          name="mobile"
          control={form.control}
          defaultValue={form.getValues().mobile}
          error={errors.mobile}
          helperText={errors.mobile?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Teléfono convencional"
          name="phone"
          control={form.control}
          defaultValue={form.getValues().phone}
          error={errors.phone}
          helperText={errors.phone?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Email"
          name="email"
          control={form.control}
          defaultValue={form.getValues().email}
          error={errors.email}
          helperText={errors.email?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Dirección de página web"
          name="website"
          control={form.control}
          defaultValue={form.getValues().website}
          error={errors.website}
          helperText={errors.website?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextField
          label="Url oficina virtual aceptacion"
          name="url_oficina_virtual_aceptacion"
          control={form.control}
          defaultValue={form.getValues().url_oficina_virtual_aceptacion}
          error={errors.url_oficina_virtual_aceptacion}
          helperText={errors.url_oficina_virtual_aceptacion?.message}
          size={gridSizeMdLg6}
          ignoreTransform
        />
        <CustomTextArea
          label="Descripcion"
          name="description"
          control={form.control}
          defaultValue={form.getValues().description}
          error={errors.description}
          helperText={errors.description?.message}
          size={gridSizeMdLg12}
        />
      </CustomTabPanel>
      <CustomTabPanel index={2} value={tabValue}>
        <SaveConfEmpresaImagePrimary
          UploadImageDropZoneComponent={UploadImageDropZoneComponent}
          Image_url_1={Image_url_1}
          setImage_url_1={setImage_url_1}
        />
        {conf_empresa?.logo_1_url && Image_url_1 == null ? (
          <Grid
            mt={9}
            container
            justifyContent="center"
            alignItems="center"
            {...gridSizeMdLg12}
          >
            <img
              src={conf_empresa.logo_1_url}
              alt="Imagen"
              style={{ maxWidth: '100%', maxHeight: '800px' }}
            />
          </Grid>
        ) : null}
        <SaveConfEmpresaImageSecundary
          UploadImageDropZoneComponent={UploadImageDropZoneComponent}
          Image_url_2={Image_url_2}
          setImage_url_2={setImage_url_2}
        />
        {conf_empresa?.logo_2_url && Image_url_2 == null ? (
          <Grid
            mt={9}
            container
            justifyContent="center"
            alignItems="center"
            {...gridSizeMdLg12}
          >
            <img
              src={conf_empresa.logo_2_url}
              alt="Imagen"
              style={{ maxWidth: '100%', maxHeight: '800px' }}
            />
          </Grid>
        ) : null}
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveConfEmpresa;
