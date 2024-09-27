/* eslint-disable indent */
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FaMapLocationDot } from 'react-icons/fa6';

import {
  useFetchSectores,
  useFetchZonas,
  useGetZoneByCoords,
} from '@/actions/app';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg6,
  Sector,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomCardAlert,
  CustomCoordsTextField,
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  MapModalComponent,
  SingleIconButton,
} from '@/shared/components';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';

export type UbicacionPartAgendaOpeProps = {
  form: UseFormReturn<any>;
  isEdit?: boolean;
  initialCoords?: string;
};

const UbicacionPartAgendaOpe: React.FC<UbicacionPartAgendaOpeProps> = ({
  form,
  initialCoords,
  isEdit = false,
}) => {
  ///* local state ---------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

  ///* form ---------------------
  const { errors } = form.formState;
  const watchedZone = form.watch('zona');
  const watchedThereIsCoverage = form.watch('thereIsCoverage');
  const watchedThereAreNaps = form.watch('thereAreNaps');

  // map --------
  const {
    Map,
    latLng,
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    setLatLng,
  } = useMapComponent({
    form,
    initialCoords: initialCoords ? initialCoords : '',
    enableFetchNaps: true,
  });
  useLocationCoords({
    isEditting: !!isEdit,
    form,
    setLatLng,
  });

  ///* fetch data ---------------------
  const {
    data: zonaByCoordsRes,
    isLoading: isLoadingZonaByCoords,
    isRefetching: isRefetchingZonaByCoords,
  } = useGetZoneByCoords(
    {
      coords: `${latLng?.lat},${latLng?.lng}`,
    },
    !!latLng?.lat && !!latLng?.lng,
  );
  const {
    data: zonasPaging,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    params: {
      page_size: 1200,
    },
  });
  const {
    data: sectoresPaging,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    enabled: !!watchedZone,
    params: {
      page_size: 900,
      zona: watchedZone,
    },
  });

  ///* effects ---------------------
  // set zone to up
  useEffect(() => {
    if (!latLng?.lat || !latLng?.lng) return;

    if (isLoadingZonaByCoords || isRefetchingZonaByCoords) return;
    const zone = zonaByCoordsRes?.data;
    if (!zone) {
      ToastWrapper.error(
        'No se encontraron zonas con cobertura para las coordenadas proporcionadas',
      );
      form.reset({
        ...form.getValues(),
        thereIsCoverage: false,
      });
      return;
    }
    form.reset({
      ...form.getValues(),
      zona: zone?.id,
      ciudad: zone?.ciudad_data?.id!,
      provincia: zone?.provincia_data?.id!,
      cityName: zone?.ciudad_data?.name,
      provinceName: zone?.provincia_data?.name,
      zoneName: zone?.name,
      thereIsCoverage: true,
    });
  }, [
    zonaByCoordsRes,
    isLoadingZonaByCoords,
    isRefetchingZonaByCoords,
    form,
    latLng?.lat,
    latLng?.lng,
  ]);
  //// alerts
  // naps available
  useEffect(() => {
    if (!latLng?.lat || !latLng?.lng) return;
    if (isLoadingNaps || isRefetchingNaps) return;
    const thereAreNaps = !!napsByCoords?.length;
    if (!thereAreNaps) {
      form.reset({
        ...form.getValues(),
        thereAreNaps: false,
      });
      ToastWrapper.error(
        'No se encontraron cajas disponibles para las coordenadas ingresadas',
      );
    }
    form.reset({
      ...form.getValues(),
      thereAreNaps,
    });
  }, [
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    form,
    latLng?.lat,
    latLng?.lng,
  ]);

  const customLoading =
    isLoadingNaps || isRefetchingNaps || isLoadingZonas || isRefetchingZonas;
  useLoaders(customLoading);

  return (
    <>
      <CustomTypoLabel text="Ubicación" />

      <InputAndBtnGridSpace
        mainGridSize={gridSize}
        inputGridSize={gridSizeMdLg11}
        inputNode={
          <CustomCoordsTextField
            label="Coordenadas"
            name="coordenadas"
            control={form.control}
            defaultValue={form.getValues().coordenadas || ''}
            error={errors.coordenadas as any}
            helperText={errors.coordenadas?.message as any}
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
              startIcon={<FaMapLocationDot />}
              label={'Ver mapa'}
              color={'primary'}
              onClick={() => {
                setOpenMapModal(true);
              }}
            />

            <MapModalComponent
              open={openMapModal}
              onClose={() => {
                setOpenMapModal(false);
              }}
              //
              showCustomTitleNode
              customTitleNode={
                <Grid item container xs={12}>
                  <Typography variant="h4">
                    Ubicación | Coordenadas:{' '}
                    <span
                      style={{
                        fontSize: '0.93rem',
                        fontWeight: 400,
                      }}
                    >
                      {latLng?.lat}, {latLng?.lng}
                    </span>
                  </Typography>
                </Grid>
              }
              minWidthModal="70%"
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
                  showCoverage
                  coverageZones={zonasPaging?.data?.items || []}
                />
              }
            />
          </>
        }
        btnGridSize={gridSizeMdLg1}
      />

      {watchedThereIsCoverage ? (
        <>
          <CustomAutocomplete<Sector>
            label="Sector"
            name="sector"
            // options
            options={sectoresPaging?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().sector}
            isLoadingData={isLoadingSectores || isRefetchingSectores}
            // vaidation
            control={form.control}
            error={errors.sector as any}
            helperText={errors.sector?.message as any}
          />
          <CustomTextField
            label="Zona"
            name="zoneName"
            control={form.control}
            defaultValue={form.getValues().zoneName}
            error={errors.zoneName as any}
            helperText={errors.zoneName?.message as any}
            disabled
          />
          <CustomTextField
            label="Ciudad"
            name="cityName"
            control={form.control}
            defaultValue={form.getValues().cityName}
            error={errors.cityName as any}
            helperText={errors.cityName?.message as any}
            size={gridSizeMdLg6}
            disabled
          />
          <CustomTextField
            label="Provincia"
            name="provinceName"
            control={form.control}
            defaultValue={form.getValues().provinceName}
            error={errors.provinceName as any}
            helperText={errors.provinceName?.message as any}
            size={gridSizeMdLg6}
            disabled
          />
        </>
      ) : (
        <>
          <CustomCardAlert
            sizeType="small"
            alertMessage="Ubicación sin cobertura"
            alertSeverity="error"
          />
        </>
      )}

      <CustomTextArea
        label="Dirección"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion as any}
        helperText={errors.direccion?.message as any}
      />

      {watchedThereAreNaps ? (
        <CustomCardAlert
          sizeType="small"
          alertMessage={`Cajas disponibles. La mas cercana está a aprox. ${napsByCoords?.at(0)?.distance}m`}
          alertSeverity="success"
        />
      ) : (
        <CustomCardAlert
          sizeType="small"
          alertMessage="No se encontraron cajas disponibles"
          alertSeverity="error"
        />
      )}
    </>
  );
};

export default UbicacionPartAgendaOpe;
