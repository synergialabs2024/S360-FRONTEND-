/* eslint-disable indent */
import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FaMapLocationDot } from 'react-icons/fa6';

import { useFetchZonas } from '@/actions/app';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg6,
  Preventa,
  useLoaders,
} from '@/shared';
import {
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  InputAndBtnGridSpace,
  MapModalComponent,
  SingleIconButton,
} from '@/shared/components';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento';

export type UbicacionSaveAgendaStepProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
  preventa: Preventa;
};

const UbicacionSaveAgendaStep: React.FC<UbicacionSaveAgendaStepProps> = ({
  form,
  preventa,
}) => {
  ///* local state -------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

  ///* form ---------------------
  const { errors } = form.formState;
  const watchedCoords = form.watch('coordenadas');

  ///* fetch data ---------------------
  const { data: zonasPaging } = useFetchZonas({
    params: {
      page_size: 1200,
    },
  });

  const { Map, isLoadingNaps, isRefetchingNaps, setLatLng } = useMapComponent({
    form,
    initialCoords: preventa?.id || watchedCoords ? watchedCoords! : '',
    enableFetchNaps: false,
  });

  const isCustomLoading = isLoadingNaps || isRefetchingNaps;
  useLoaders(isCustomLoading);

  return (
    <>
      <CustomTypoLabel text="Ubicación" />

      <InputAndBtnGridSpace
        mainGridSize={gridSize}
        inputGridSize={gridSizeMdLg11}
        inputNode={
          <CustomTextField
            label="Coordenadas"
            name="coordenadas"
            control={form.control}
            defaultValue={form.getValues().coordenadas || ''}
            error={errors.coordenadas}
            helperText={errors.coordenadas?.message}
            disabled
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
                      {watchedCoords || 'Sin coordenadas'}
                    </span>
                  </Typography>
                </Grid>
              }
              minWidthModal="70%"
              contentNodeOverride={
                <Map
                  coordenadas={
                    watchedCoords
                      ? {
                          lat: +(watchedCoords?.split(',')[0] || 0),
                          lng: +(watchedCoords?.split(',')[1] || 0),
                        }
                      : { lat: 0, lng: 0 }
                  }
                  canDragMarker={false}
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

      <>
        <CustomTextField
          label="Sector"
          name="sectorName"
          control={form.control}
          defaultValue={form.getValues().sectorName}
          error={errors.sectorName}
          helperText={errors.sectorName?.message}
          disabled
        />
        <CustomTextField
          label="Zona"
          name="zoneName"
          control={form.control}
          defaultValue={form.getValues().zoneName}
          error={errors.zoneName}
          helperText={errors.zoneName?.message}
          disabled
        />
        <CustomTextField
          label="Ciudad"
          name="cityName"
          control={form.control}
          defaultValue={form.getValues().cityName}
          error={errors.cityName}
          helperText={errors.cityName?.message}
          size={gridSizeMdLg6}
          disabled
        />
        <CustomTextField
          label="Provincia"
          name="provinceName"
          control={form.control}
          defaultValue={form.getValues().provinceName}
          error={errors.provinceName}
          helperText={errors.provinceName?.message}
          size={gridSizeMdLg6}
          disabled
        />
      </>

      <CustomTextArea
        label="Dirección"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
      />
    </>
  );
};

export default UbicacionSaveAgendaStep;
