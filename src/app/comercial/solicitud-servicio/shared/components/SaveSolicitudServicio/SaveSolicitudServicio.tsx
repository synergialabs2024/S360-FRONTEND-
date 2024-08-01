/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { MdEditLocationAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  CreateSolicitudServicioParamsBase,
  useCreateSolicitudServicio,
  useUpdateSolicitudServicio,
} from '@/actions/app';
import {
  CustomAutocompleteArrString,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomIdentificacionTextField,
  CustomTextField,
  InputAndBtnGridSpace,
  MapModalComponent,
  SampleCheckbox,
  SingleFormBoxScene,
  SingleIconButton,
} from '@/shared/components';
import { IDENTIFICATION_TYPE_ARRAY_CHOICES } from '@/shared/constants/app';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { SolicitudServicio } from '@/shared/interfaces';
import { solicitudServicioFormSchema } from '@/shared/utils';
import { returnUrlSolicitudsServicioPage } from '../../../pages/tables/SolicitudesServicioMainPage';
import { useSearchCedula } from '@/actions/consultas-api';

export interface SaveSolicitudServicioProps {
  title: string;
  solicitudservicio?: SolicitudServicio;
}

type SaveFormData = CreateSolicitudServicioParamsBase & {};

const SaveSolicitudServicio: React.FC<SaveSolicitudServicioProps> = ({
  title,
  solicitudservicio,
}) => {
  const navigate = useNavigate();

  ///* local state -----------------
  const [openMapModal, setOpenMapModal] = useState(false);

  ///* form -----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudServicioFormSchema) as any,
    defaultValues: {},
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const watchedCoords = form.watch('coordenadas');

  const { Map, latLng, setLatLng } = useMapComponent({
    form,
    initialCoords: solicitudservicio?.id
      ? solicitudservicio.coordenadas
      : watchedCoords,
  });
  useLocationCoords({
    form,
    setLatLng,
  });

  ///* mutations -----------------
  const createSolicitudServicioMutation = useCreateSolicitudServicio({
    navigate,
    returnUrl: returnUrlSolicitudsServicioPage,
    enableErrorNavigate: false,
  });
  const updateSolicitudServicioMutation =
    useUpdateSolicitudServicio<CreateSolicitudServicioParamsBase>({
      navigate,
      returnUrl: returnUrlSolicitudsServicioPage,
    });
  const useSearchCedulaMutation = useSearchCedula({
    enableErrorNavigate: false,
  });

  const handleFetchCedulaRucInfo = async (value: string) => {
    const res = await useSearchCedulaMutation.mutateAsync(value);
    console.log('res', res);
  };

  ///* handlers -----------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (solicitudservicio?.id) {
      updateSolicitudServicioMutation.mutate({
        id: solicitudservicio.id!,
        data,
      });
      return;
    }

    ///* create
    createSolicitudServicioMutation.mutate(data);
  };

  ///* effects -----------------
  useEffect(() => {
    if (!solicitudservicio?.id) return;
    reset(solicitudservicio);
  }, [solicitudservicio, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudsServicioPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomAutocompleteArrString
        label="Tipo de identificación"
        name="tipo_identificacion"
        control={form.control}
        defaultValue={form.getValues('tipo_identificacion')}
        options={IDENTIFICATION_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.tipo_identificacion}
        helperText={errors.tipo_identificacion?.message}
        size={gridSizeMdLg6}
        disableClearable
        onChangeValue={() => {
          form.setValue('identificacion', '');
          form.setValue('razon_social', '');
        }}
      />
      <InputAndBtnGridSpace
        inputNode={
          <CustomIdentificacionTextField
            label="Identificación"
            name="identificacion"
            control={form.control}
            selectedDocumentType={watchedIdentificationType}
            defaultValue={form.getValues('identificacion')}
            error={errors.identificacion}
            helperText={errors.identificacion?.message}
            onFetchCedulaRucInfo={async value => {
              await handleFetchCedulaRucInfo(value);
            }}
            disabled={!watchedIdentificationType}
          />
        }
        btnLabel="Buscar"
        iconBtn={<CiSearch />}
        onClick={() => {
          alert('search');
        }}
      />

      <CustomTextField
        label="Razon social"
        name="razon_social"
        control={form.control}
        defaultValue={form.getValues().razon_social}
        error={errors.razon_social}
        helperText={errors.razon_social?.message}
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
      <CustomCellphoneTextField
        label="Celular"
        name="celular"
        control={form.control}
        defaultValue={form.getValues().celular}
        error={errors.celular}
        helperText={errors.celular?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Dirección"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
      />

      <InputAndBtnGridSpace
        mainGridSize={gridSize}
        inputGridSize={gridSizeMdLg11}
        inputNode={
          <CustomCoordsTextField
            label="Coordenadas"
            name="coordenadas"
            control={form.control}
            defaultValue={form.getValues().coordenadas}
            error={errors.coordenadas}
            helperText={errors.coordenadas?.message}
            onChangeValue={(value, isValidCoords) => {
              if (isValidCoords) {
                const s = value.split(',');
                setLatLng({ lat: s[0], lng: s[1] });
              }
            }}
          />
        }
        btnLabel="Ver mapa"
        overrideBtnNode
        customBtnNode={
          <>
            <SingleIconButton
              startIcon={<MdEditLocationAlt />}
              label={'Ver mapa'}
              color={'default' as any}
              onClick={() => {
                setOpenMapModal(true);
              }}
            />

            <MapModalComponent
              open={openMapModal}
              onClose={() => {
                setOpenMapModal(false);
              }}
              contentNodeOverride={
                <Map
                  coordenadas={
                    latLng
                      ? {
                          lat: latLng.lat,
                          lng: latLng.lng,
                        }
                      : { lat: 0, lng: 0 }
                  }
                  canDragMarker={true}
                  setLatLng={setLatLng}
                />
              }
            />
          </>
        }
        btnGridSize={gridSizeMdLg1}
      />

      <SampleCheckbox
        label="Es discapacitado"
        name="es_discapacitado"
        control={form.control}
        defaultValue={form.getValues().es_discapacitado}
        size={gridSizeMdLg6}
        disabled
      />
      <SampleCheckbox
        label="Es tercera edad"
        name="es_tercera_edad"
        control={form.control}
        defaultValue={form.getValues().es_tercera_edad}
        size={gridSizeMdLg6}
        disabled
      />
      <SampleCheckbox
        label="Es cliente"
        name="es_cliente"
        control={form.control}
        defaultValue={form.getValues().es_cliente}
        size={gridSizeMdLg6}
        disabled
      />

      <CustomTextField
        label="Categoria score desicion"
        name="categoria_score_desicion"
        control={form.control}
        defaultValue={form.getValues().categoria_score_desicion}
        error={errors.categoria_score_desicion}
        helperText={errors.categoria_score_desicion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Valor maximo"
        name="valor_maximo"
        control={form.control}
        defaultValue={form.getValues().valor_maximo}
        error={errors.valor_maximo}
        helperText={errors.valor_maximo?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Valor minimo"
        name="valor_minimo"
        control={form.control}
        defaultValue={form.getValues().valor_minimo}
        error={errors.valor_minimo}
        helperText={errors.valor_minimo?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Score inclusion"
        name="score_inclusion"
        control={form.control}
        defaultValue={form.getValues().score_inclusion}
        error={errors.score_inclusion}
        helperText={errors.score_inclusion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Score sobreendeudamiento"
        name="score_sobreendeudamiento"
        control={form.control}
        defaultValue={form.getValues().score_sobreendeudamiento}
        error={errors.score_sobreendeudamiento}
        helperText={errors.score_sobreendeudamiento?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Score servicios"
        name="score_servicios"
        control={form.control}
        defaultValue={form.getValues().score_servicios}
        error={errors.score_servicios}
        helperText={errors.score_servicios?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Rango capacidad pago"
        name="rango_capacidad_pago"
        control={form.control}
        defaultValue={form.getValues().rango_capacidad_pago}
        error={errors.rango_capacidad_pago}
        helperText={errors.rango_capacidad_pago?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudServicio;
