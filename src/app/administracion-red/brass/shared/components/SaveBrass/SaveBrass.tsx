import {
  CreateBrasParamsBase,
  useCreateBras,
  useFetchCiudades,
  useFetchPaises,
  useFetchProvincias,
  useUpdateBras,
} from '@/actions/app';
import {
  Brass,
  brassFormSchema,
  Ciudad,
  gridSizeMdLg6,
  Pais,
  PermissionsEnum,
  Provincia,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { useUiConfirmModalStore } from '@/store/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { returnUrlBrassPage } from '../../../pages/tables/BrassPage';
import { useEffect, useState } from 'react';
import {
  CustomAutocomplete,
  CustomCoordsTextField,
  CustomPasswordTextField,
  CustomTextField,
  InputAndBtnGridSpace,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { MdEdit } from 'react-icons/md';

export interface SaveBrassProps {
  title: string;
  brass?: Brass;
}

type SaveFormData = CreateBrasParamsBase & {};

const SaveBrass: React.FC<SaveBrassProps> = ({ title, brass }) => {
  //Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

  ///* local state -----------------
  const [canWritePassword, setCanWritePassword] = useState<boolean>(true);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(brassFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const watchedPais = form.watch('pais');
  const watchedProvincia = form.watch('provincia');
  const watchedCiudad = form.watch('ciudad');

  const { Map, latLng, napsByCoords, setLatLng } = useMapComponent({
    form,
    initialCoords: brass?.id ? brass?.coordenadas : '',
  });
  useLocationCoords({
    isEditting: !!brass?.id,
    form,
    setLatLng,
  });

  ///* fetch data
  const {
    data: paisesPagingRes,
    isLoading: isLoadingPaises,
    isRefetching: isRefetchingPaises,
  } = useFetchPaises({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: provinciasPagingRes,
    isLoading: isLoadingProvincias,
    isRefetching: isRefetchingProvincias,
  } = useFetchProvincias({
    enabled: !!watchedPais,
    params: {
      pais: watchedPais,
      page_size: 1000,
    },
  });
  const {
    data: ciudadesPagingRes,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    enabled: !!watchedProvincia,
    params: {
      provincia: watchedProvincia,
      page_size: 1000,
    },
  });

  ///* mutations
  const createBrasMutation = useCreateBras({
    navigate,
    returnUrl: returnUrlBrassPage,
    enableErrorNavigate: false,
  });
  const updateBrasMutation = useUpdateBras<CreateBrasParamsBase>({
    navigate,
    returnUrl: returnUrlBrassPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (brass?.id) {
      updateBrasMutation.mutate({ id: brass.id!, data });
      return;
    }

    ///* create
    createBrasMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!brass?.id) return;
    reset(brass);
  }, [brass, reset]);

  // alerts
  useEffect(() => {
    if (isLoadingProvincias || isRefetchingProvincias || !watchedPais) return;
    !provinciasPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron provincias para el país seleccionado',
      );
    if (isLoadingCiudades || isRefetchingCiudades || !watchedProvincia) return;
    !ciudadesPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ciudades para la provincia seleccionada',
      );
  }, [
    watchedPais,
    watchedProvincia,
    watchedCiudad,
    provinciasPagingRes,
    ciudadesPagingRes,
    isLoadingProvincias,
    isLoadingCiudades,
    isRefetchingProvincias,
    isRefetchingCiudades,
  ]);

  const customLoader =
    isLoadingPaises ||
    isRefetchingPaises ||
    isLoadingProvincias ||
    isRefetchingProvincias ||
    isLoadingCiudades ||
    isRefetchingCiudades;

  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlBrassPage)}
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

      <CustomTextField
        label="Ip"
        name="ip"
        control={form.control}
        defaultValue={form.getValues().ip}
        error={errors.ip}
        helperText={errors.ip?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="Username"
        name="username"
        control={form.control}
        defaultValue={form.getValues().username}
        error={errors.username}
        helperText={errors.username?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <InputAndBtnGridSpace
        inputNode={
          <CustomPasswordTextField
            label="Password"
            name="password"
            defaultValue={form.getValues().password}
            control={form.control}
            errors={errors?.password}
            helperText={errors?.password?.message}
            disabled={!canWritePassword}
          />
        }
        showIconBtn={!!brass?.id}
        btnLabel="Cambiar Contraseña"
        iconBtn={<MdEdit />}
        onClick={() => {
          !canWritePassword &&
            setConfirmDialog({
              isOpen: true,
              title: 'Cambiar Contraseña',
              subtitle:
                '¿Está seguro que desea cambiar la contraseña de este usuario?',
              onConfirm: () => {
                setCanWritePassword(true);
                setConfirmDialogIsOpen(false);
              },
            });
        }}
      />
      <CustomTextField
        label="Direccion"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />
      <CustomAutocomplete<Pais>
        label="Pais"
        name="pais"
        // options
        options={paisesPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().pais}
        isLoadingData={isLoadingPaises || isRefetchingPaises}
        // vaidation
        control={form.control}
        error={errors.pais}
        helperText={errors.pais?.message}
      />
      <CustomAutocomplete<Provincia>
        label="Provincia"
        name="provincia"
        // options
        options={provinciasPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().provincia}
        isLoadingData={isLoadingProvincias || isRefetchingProvincias}
        // vaidation
        control={form.control}
        error={errors.provincia}
        helperText={errors.provincia?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<Ciudad>
        label="Ciudad"
        name="ciudad"
        // options
        options={ciudadesPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().ciudad}
        isLoadingData={isLoadingCiudades || isRefetchingCiudades}
        // vaidation
        control={form.control}
        error={errors.ciudad}
        helperText={errors.ciudad?.message}
        size={gridSizeMdLg6}
      />

      <CustomCoordsTextField
        label="Coordenadas"
        name="coordenadas"
        control={form.control}
        defaultValue={form.getValues().coordenadas}
        error={errors.coordenadas}
        helperText={errors.coordenadas?.message}
        onChangeValue={(value, isValidCoords) => {
          if (!isValidCoords) return;
          const s = value.split(',');
          setLatLng({ lat: s[0], lng: s[1] });
        }}
      />
      <Map
        coordenadas={latLng}
        setLatLng={setLatLng}
        showNaps
        naps={napsByCoords || []}
      />
    </SingleFormBoxScene>
  );
};

export default SaveBrass;
