/* eslint-disable indent */
import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMapLocationDot } from 'react-icons/fa6';

import { useFetchZonas } from '@/actions/app';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg3,
  LineaServicio,
  Preventa,
  SolicitudServicio,
  useLoaders,
} from '@/shared';
import {
  CustomCoordsTextField,
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  InputAndBtnGridSpace,
  MapModalComponent,
  SingleIconButton,
} from '@/shared/components';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';

export type FibraClientUbicacionNapPartProps = {
  serviceLine: LineaServicio;
};

type FormData = Partial<SolicitudServicio> & Partial<Preventa>;

const FibraClientUbicacionNapPart: React.FC<
  FibraClientUbicacionNapPartProps
> = ({ serviceLine }) => {
  ///* local state ---------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

  ///* form ---------------------
  const form = useForm<FormData>();
  const {
    formState: { errors },
  } = form;

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
    initialCoords: serviceLine?.solicitud_servicio_data?.coordenadas || '',
    enableFetchNaps: true,
  });

  const {
    data: zonasPaging,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    params: {
      page_size: 1200,
    },
  });

  const isLoading =
    isLoadingZonas || isLoadingNaps || isRefetchingZonas || isRefetchingNaps;
  useLoaders(isLoading);

  return (
    <>
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
            disabled={true}
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
                  canDragMarker={false}
                  setLatLng={setLatLng}
                  showCoverage
                  coverageZones={zonasPaging?.data?.items || []}
                  //
                  showNaps={true}
                  naps={napsByCoords || []}
                />
              }
              canDragMarker={false}
            />
          </>
        }
        btnGridSize={gridSizeMdLg1}
      />

      <>
        <CustomTextFieldNoForm
          label="Sector"
          value={serviceLine?.sector_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Zona"
          value={serviceLine?.zona_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Ciudad"
          value={serviceLine?.ciudad_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Provincia"
          value={serviceLine?.provincia_data?.name || ''}
          disabled
        />

        <CustomTextAreaNoForm
          label="Dirección"
          value={
            serviceLine?.solicitud_servicio_data?.direccion_referencia || ''
          }
          disabled
        />
      </>

      <>
        <CustomTextFieldNoForm
          label="NAP"
          value={serviceLine?.nap_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Distancia NAP"
          value={serviceLine?.preventa_data?.distancia_nap || ''}
          disabled
          size={gridSizeMdLg3}
          endAdornment="m"
        />
        <CustomTextFieldNoForm
          label="Puerto"
          value={serviceLine?.preventa_data?.puerto_nap || ''}
          disabled
          size={gridSizeMdLg3}
        />
      </>
    </>
  );
};

export default FibraClientUbicacionNapPart;
