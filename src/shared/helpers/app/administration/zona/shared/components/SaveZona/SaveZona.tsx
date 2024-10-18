import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateZonaParams,
  useCreateZona,
  useFetchCiudades,
  useFetchPaises,
  useFetchProvincias,
  useFetchZonas,
  useUpdateZona,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { CoordenadasType } from '@/shared/components/CustomMaps/CustomMap';
import { SAVE_ZONA_PERMISSIONS } from '@/shared/constants/app';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useLoaders, useMapPolygonComponent } from '@/shared/hooks';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { Ciudad, Pais, Provincia } from '@/shared/interfaces';
import { Zona } from '@/shared/interfaces/app/administration/zona';
import { calcOtherZonesMultiPolygon, zonaFormSchema } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { returnUrlZonasPage } from '../../../pages/tables/ZonasPage';

export interface SaveZonaProps {
  title: string;
  zona?: Zona;
}

type SaveFormData = CreateZonaParams & {};

const SaveZona: React.FC<SaveZonaProps> = ({ title, zona }) => {
  useCheckPermissionsArray(SAVE_ZONA_PERMISSIONS);

  const navigate = useNavigate();
  const { MapPolygon, latLng, setLatLng } = useMapPolygonComponent({});
  useLocationCoords({ setLatLng });

  const [coordsArray, setCoordsArray] = useState<CoordenadasType[]>([]);

  ///* form -------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(zonaFormSchema),
    defaultValues: {
      state: true,
      has_coverage: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedCountry = form.watch('pais');
  const watchedProvince = form.watch('provincia');

  ///* fetch data -------------------
  const {
    data: paisesPagingRes,
    isLoading: isLoadingPaises,
    isRefetching: isRefetchingPaises,
  } = useFetchPaises({
    params: {
      page_size: 200,
    },
  });
  const {
    data: provinciasPagingRes,
    isLoading: isLoadingProvincias,
    isRefetching: isRefetchingProvincias,
  } = useFetchProvincias({
    enabled: !!watchedCountry,
    params: {
      pais: watchedCountry,
      page_size: 600,
    },
  });
  const {
    data: ciudadesPagingRes,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    enabled: !!watchedProvince,
    params: {
      provincia: watchedProvince,
      page_size: 1200,
    },
  });

  const {
    data: otherZonesPaging,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    params: {
      page_size: 1200,
    },
  });

  ///* mutations
  const createZonaMutation = useCreateZona({
    navigate,
    returnUrl: returnUrlZonasPage,
    enableErrorNavigate: false,
  });
  const updateZonasMutation = useUpdateZona<CreateZonaParams>({
    navigate,
    returnUrl: returnUrlZonasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    if (!coordsArray.length)
      return ToastWrapper.error(
        'Debe trazar un área de cobertura y guardar el trazo',
      );

    const mapedCoords = coordsArray.map(({ lat, lng }) => ({
      lat: lat?.toString(),
      lng: lng?.toString(),
    }));

    ///* upd
    if (zona?.id) {
      updateZonasMutation.mutate({
        id: zona.id!,
        data: {
          ...data,
          coordenadas: mapedCoords?.length ? mapedCoords : zona?.coordenadas,
        },
      });
      return;
    }

    ///* create
    createZonaMutation.mutate({ ...data, coordenadas: mapedCoords });
  };

  ///* effects
  useEffect(() => {
    if (!zona?.id) return;
    reset(zona);
  }, [zona, reset]);
  // alets: not found province by country
  useEffect(() => {
    if (isLoadingProvincias || isRefetchingProvincias || !watchedCountry)
      return;
    !provinciasPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron provincias para el país seleccionado',
      );

    if (isLoadingCiudades || isRefetchingCiudades || !watchedProvince) return;
    !ciudadesPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ciudades para la provincia seleccionada',
      );
  }, [
    watchedCountry,
    watchedProvince,
    provinciasPagingRes,
    ciudadesPagingRes,
    isLoadingProvincias,
    isLoadingCiudades,
    isRefetchingProvincias,
    isRefetchingCiudades,
  ]);
  useLoaders(
    isLoadingPaises ||
      isRefetchingPaises ||
      isLoadingProvincias ||
      isRefetchingProvincias ||
      isLoadingCiudades ||
      isRefetchingCiudades ||
      isLoadingZonas ||
      isRefetchingZonas,
  );

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlZonasPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Debe completar los campos requeridos');
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
        size={gridSizeMdLg6}
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

      <SampleCheckbox
        label="Tiene cobertura"
        name="has_coverage"
        control={form.control}
        defaultValue={form.getValues().has_coverage}
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

      <>
        <CustomTypoLabel
          text="Área con cobertura"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
          // pb={3}
        />

        <Grid item container xs={12}>
          {/* <Grid item xs={12}>
            {!canDrawPolygon ? (
              <CustomSingleButton
                label="Dibujar área"
                startIcon={<PiPolygonBold />}
                variant="contained"
                onClick={() => setCanDrawPolygon(true)}
                sxGrid={{ pb: 3 }}
              />
            ) : (
              <Grid item container xs={12}>
                <Grid item {...gridSizeMdLg6}>
                  <CustomSingleButton
                    label="Guardar área"
                    startIcon={<MdSaveAs />}
                    variant="contained"
                    onClick={() => setCanDrawPolygon(false)}
                    sxGrid={{ pb: 3 }}
                  />
                </Grid>

                <Grid
                  item
                  {...gridSizeMdLg6}
                  container
                  justifyContent="flex-end"
                >
                  <CustomSingleButton
                    label="Cancelar"
                    startIcon={<MdSaveAs />}
                    variant="text"
                    color="error"
                    onClick={() => {
                      setCanDrawPolygon(false);
                    }}
                    sxGrid={{ pb: 3 }}
                    justifyContent="flex-end"
                  />
                </Grid>
              </Grid>
            )}
          </Grid> */}

          <Grid item xs={12}>
            <MapPolygon
              coordenadas={{
                lat: latLng?.lat,
                lng: latLng?.lng,
              }}
              onSave={coordsArray => {
                setCoordsArray(coordsArray);
              }}
              polygon={
                zona?.coordenadas?.length ? (zona?.coordenadas as any) : []
              }
              otherZones={
                calcOtherZonesMultiPolygon(
                  otherZonesPaging?.data?.items || [],
                  zona?.coordenadas,
                ) as any
              }
            />
          </Grid>
        </Grid>
      </>
    </SingleFormBoxScene>
  );
};

export default SaveZona;
