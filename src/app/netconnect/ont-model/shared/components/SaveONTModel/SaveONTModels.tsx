import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateONTModelParamsBase,
  useCreateONTModel,
  useUpdateONTModel,
} from '@/actions/app';
import {
  CustomAutocompleteArrString,
  CustomScanLoad,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { getKeysFormErrorsMessage, ontModelFormSchema } from '@/shared/utils';
import {
  BucketKeyNameEnumChoice,
  BucketTypeEnumChoice,
  gridSizeMdLg6,
  ONT_MODEL_ETHERNET_PORTS_ARRAY_CHOICES,
  ONT_MODEL_ETHERNET_WIFI_VOID_ARRAY_CHOICES,
  ONT_MODEL_PON_TYPE_ARRAY_CHOICES,
  ONTModel,
  ToastWrapper,
  useUploadImageGeneric,
} from '@/shared';
import { returnUrlONTModelsPage } from '../../../pages/tables/ONTModelsPage';
import DocsSaveONTModalStep from './DocsSaveONTModalStep';
import { uploadFileToBucket } from '@/actions/statics-api';

export interface SaveONTModelsProps {
  title: string;
  ontModel?: ONTModel;
}

export type SaveFormDataONTModel = CreateONTModelParamsBase & {};

const SaveONTModels: React.FC<SaveONTModelsProps> = ({ title, ontModel }) => {
  const [isCheckingImg, setIsCheckingImg] = useState<boolean>(false);

  ///* hooks ---------------
  const navigate = useNavigate();

  const {
    UploadImageDropZoneComponent,
    image1: Image_url,
    setImage1: setImage_url,
  } = useUploadImageGeneric();

  ///* form
  const form = useForm<SaveFormDataONTModel>({
    resolver: yupResolver(ontModelFormSchema) as any,
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
  const createONTModelMutation = useCreateONTModel({
    navigate,
    returnUrl: returnUrlONTModelsPage,
    enableErrorNavigate: false,
  });
  const updateONTModelMutation = useUpdateONTModel<CreateONTModelParamsBase>({
    navigate,
    returnUrl: returnUrlONTModelsPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormDataONTModel) => {
    if (!isValid) return;

    ///* upd
    if (ontModel?.id) {
      updateONTModelMutation.mutate({ id: ontModel.id!, data });
      return;
    }

    // validate images -----------
    if (!Image_url) return ToastWrapper.error('La imagen es requerida');

    // upload images ----
    setIsCheckingImg(true);
    const [ImgUrl] = await Promise.all([
      uploadFileToBucket({
        file: Image_url,
        file_name: BucketKeyNameEnumChoice.ONT_MODEL,
        bucketDir: BucketTypeEnumChoice.IMAGES_ONT_MODEL,
      }),
    ]);

    ///* create
    await createONTModelMutation.mutateAsync({
      ...data,
      image_url: ImgUrl?.streamUlr || '',
    });
    setIsCheckingImg(false);
  };

  ///* effects
  useEffect(() => {
    if (!ontModel?.id) return;
    reset(ontModel);
  }, [ontModel, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlONTModelsPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Faltan campos por requeridos: ${keys}`);
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
      <CustomAutocompleteArrString
        label="Tipo de PON"
        name="pon_type"
        control={form.control}
        defaultValue={form.getValues('pon_type')}
        options={ONT_MODEL_PON_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.pon_type}
        helperText={errors.pon_type?.message}
        size={gridSizeMdLg6}
        disableClearable
      />
      <CustomAutocompleteArrString
        label="Modo"
        name="mode"
        control={form.control}
        defaultValue={form.getValues('mode')}
        options={ONT_MODEL_ETHERNET_PORTS_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.mode}
        helperText={errors.mode?.message}
        size={gridSizeMdLg6}
        disableClearable
      />
      <Controller
        name="ethernet_ports"
        control={form.control}
        defaultValue={form.getValues('ethernet_ports')}
        render={({ field: { onChange, value, ...field } }) => (
          <CustomAutocompleteArrString
            {...field}
            label="Puerto Ethernet"
            options={ONT_MODEL_ETHERNET_WIFI_VOID_ARRAY_CHOICES}
            defaultValue={value}
            isLoadingData={false}
            onChangeValue={onChange} // Solo pasamos el valor convertido
            control={form.control}
            error={errors.ethernet_ports}
            helperText={errors.ethernet_ports?.message}
            size={gridSizeMdLg6}
            disableClearable
          />
        )}
      />
      <Controller
        name="wifi_ssids"
        control={form.control}
        defaultValue={form.getValues('wifi_ssids')}
        render={({ field: { onChange, value, ...field } }) => (
          <CustomAutocompleteArrString
            {...field}
            label="Wifi SSIDS"
            options={ONT_MODEL_ETHERNET_WIFI_VOID_ARRAY_CHOICES}
            defaultValue={value}
            isLoadingData={false}
            onChangeValue={onChange} // Solo pasamos el valor convertido
            control={form.control}
            error={errors.wifi_ssids}
            helperText={errors.wifi_ssids?.message}
            size={gridSizeMdLg6}
            disableClearable
          />
        )}
      />
      <Controller
        name="voip_ports"
        control={form.control}
        defaultValue={form.getValues('voip_ports')}
        render={({ field: { onChange, value, ...field } }) => (
          <CustomAutocompleteArrString
            {...field}
            label="Puerto VOIP"
            options={ONT_MODEL_ETHERNET_WIFI_VOID_ARRAY_CHOICES}
            defaultValue={value}
            isLoadingData={false}
            onChangeValue={onChange} // Solo pasamos el valor convertido
            control={form.control}
            error={errors.voip_ports}
            helperText={errors.voip_ports?.message}
            size={gridSizeMdLg6}
            disableClearable
          />
        )}
      />
      <DocsSaveONTModalStep
        UploadImageDropZoneComponent={UploadImageDropZoneComponent}
        Image_url={Image_url}
        setImage_url={setImage_url}
      />
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
      <CustomScanLoad isOpen={isCheckingImg} name="archivo" />
    </SingleFormBoxScene>
  );
};

export default SaveONTModels;
