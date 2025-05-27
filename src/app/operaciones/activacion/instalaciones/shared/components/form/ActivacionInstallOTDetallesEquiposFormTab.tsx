/* eslint-disable indent */
import { Grid, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FaMapLocationDot } from 'react-icons/fa6';

import { useFetchZonas } from '@/actions/app';
import { DatosPlanBasicoTecnicoPart } from '@/app/tecnico/install-asignada/shared/components/form';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  OrdenTrabajo,
  useLoaders,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomCoordsTextField,
  CustomTabPanel,
  CustomTextArea,
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  FormTabsOnly,
  InputAndBtnGridSpace,
  MapModalComponent,
  NestedTabsScene,
  SingleIconButton,
} from '@/shared/components';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import ActivacionInstallOTNodoIPsPPPPart from './ActivacionInstallOTNodoIPsPPPPart';
import type { ActicacionInstallOTSaveFormData } from './SaveActivacionInstallPendienteOT';

export type ActivacionInstallOTDetallesEquiposFormTabProps = {
  ordenTrabajo: OrdenTrabajo;
  form: UseFormReturn<ActicacionInstallOTSaveFormData>;
};

const ActivacionInstallOTDetallesEquiposFormTab: React.FC<
  ActivacionInstallOTDetallesEquiposFormTabProps
> = ({ ordenTrabajo, form }) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* local state ---------------------
  const [openMapModal, setOpenMapModal] = useState(false);

  ///* form ---------------------
  const { errors } = form.formState;

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
    initialCoords: ordenTrabajo?.solicitud_servicio_data?.coordenadas || '',
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
      <CustomTypoLabel text="Datos generales de activación" />

      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Servicio" value={1} {...a11yProps(1)} />
            <Tab label="Ubicación cliente y NAP" value={2} {...a11yProps(2)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 4,
        }}
      >
        <CustomTabPanel value={tabValue} index={1} ptGrid="0">
          <DatosPlanBasicoTecnicoPart ordenTrabajo={ordenTrabajo} />
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2} ptGrid="0">
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
              value={ordenTrabajo?.sector_data?.name || ''}
              disabled
            />
            <CustomTextFieldNoForm
              label="Zona"
              value={ordenTrabajo?.zona_data?.name || ''}
              disabled
            />
            <CustomTextFieldNoForm
              label="Ciudad"
              value={ordenTrabajo?.ciudad_data?.name || ''}
              disabled
            />
            <CustomTextFieldNoForm
              label="Provincia"
              value={ordenTrabajo?.provincia_data?.name || ''}
              disabled
            />

            <CustomTextAreaNoForm
              label="Dirección"
              value={
                ordenTrabajo?.solicitud_servicio_data?.direccion_referencia ||
                ''
              }
              disabled
            />
          </>
        </CustomTabPanel>
      </NestedTabsScene>

      <ActivacionInstallOTNodoIPsPPPPart ordenTrabajo={ordenTrabajo} />

      <CustomTextArea
        label="Observación de activación"
        name="observacion_activacion"
        control={form.control}
        defaultValue={form.getValues().observacion_activacion}
        error={errors.observacion_activacion}
        helperText={errors.observacion_activacion?.message}
        required={false}
      />
    </>
  );
};

export default ActivacionInstallOTDetallesEquiposFormTab;
