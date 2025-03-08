import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';

import {
  CustomScanLoad,
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  useCreateEventoMensajeriaTM,
  useUpdateEventoMensajeriaTM,
  CreateEventoMensajeriaTMParamsBase,
} from '@/actions/app';
import {
  ToastWrapper,
  gridSizeMdLg6,
  gridSizeMdLg12,
  PermissionsEnum,
  EventoMensajeriaTM,
  BucketTypeEnumChoice,
  useUploadImageGeneric,
  eventomensajeriaTMFormSchema,
  ImageEventoMensajeriaTMNameEnumChoice,
} from '@/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckPermission } from '@/shared/hooks/auth';
import { uploadFileToBucket } from '@/actions/statics-api';
import SaveEventoMensajeriaTMImage from './SaveEventoMensajeriaTMImage';
import { returnUrlEventoMensajeriaTMPage } from '../../../pages/tables/EventoMensajeriaTMPage';

export interface SaveEventoMensajeriaTMProps {
  title: string;
  eventomensajeriaTM?: EventoMensajeriaTM;
}

type SaveFormData = CreateEventoMensajeriaTMParamsBase & {};

const SaveEventoMensajeriaTM: React.FC<SaveEventoMensajeriaTMProps> = ({
  title,
  eventomensajeriaTM,
}) => {
  ///*  Local State
  const [isCheckingImg, setIsCheckingImg] = useState<boolean>(false);

  useCheckPermission(PermissionsEnum.tecnico_view_eventomensajeriaticketmasivo);

  ///* hooks -----------------------
  const navigate = useNavigate();

  const {
    UploadImageDropZoneComponent,
    image1: Image_url,
    setImage1: setImage_url,
  } = useUploadImageGeneric();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(eventomensajeriaTMFormSchema) as any,
    defaultValues: {
      state: true,
      imagen: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createEventoMensajeriaTMMutation = useCreateEventoMensajeriaTM({
    navigate,
    returnUrl: returnUrlEventoMensajeriaTMPage,
    enableErrorNavigate: false,
  });
  const updateEventoMensajeriaTMMutation =
    useUpdateEventoMensajeriaTM<CreateEventoMensajeriaTMParamsBase>({
      navigate,
      returnUrl: returnUrlEventoMensajeriaTMPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    // validate images -----------
    if (!Image_url) return ToastWrapper.error('La imagen es requerida');

    // upload images ----
    setIsCheckingImg(true);
    const [ImgUrl] = await Promise.all([
      uploadFileToBucket({
        file: Image_url,
        file_name: ImageEventoMensajeriaTMNameEnumChoice.MENSAJE_IMG,
        bucketDir: BucketTypeEnumChoice.IMAGES_EMAIL_TM,
      }),
    ]);

    data.imagen = ImgUrl?.streamUlr || '';

    if (eventomensajeriaTM?.id) {
      updateEventoMensajeriaTMMutation.mutate({
        id: eventomensajeriaTM.id!,
        data,
      });
      return;
    }

    ///* create
    createEventoMensajeriaTMMutation.mutate(data);
    setIsCheckingImg(false);
  };

  ///* effects
  useEffect(() => {
    if (!eventomensajeriaTM?.id) return;
    reset(eventomensajeriaTM);
  }, [eventomensajeriaTM, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlEventoMensajeriaTMPage)}
      onSave={handleSubmit(onSave, () => {})}
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
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
      />
      <SaveEventoMensajeriaTMImage
        UploadImageDropZoneComponent={UploadImageDropZoneComponent}
        Image_url={Image_url}
        setImage_url={setImage_url}
      />
      {eventomensajeriaTM?.imagen && Image_url == null ? (
        <Grid
          mt={9}
          container
          justifyContent="center"
          alignItems="center"
          {...gridSizeMdLg12}
        >
          <img
            src={eventomensajeriaTM.imagen}
            alt="Imagen"
            style={{ maxWidth: '100%', maxHeight: '800px' }}
          />
        </Grid>
      ) : null}
      <CustomScanLoad isOpen={isCheckingImg} name="archivo" />
    </SingleFormBoxScene>
  );
};

export default SaveEventoMensajeriaTM;
