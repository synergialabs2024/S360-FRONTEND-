/* eslint-disable indent */
import { Grid, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaMapLocationDot } from 'react-icons/fa6';

import { useFetchZonas } from '@/actions/app';
import {
  formatExpirationDateCreditCard,
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg3,
  gridSizeMdLg6,
  LineaServicio,
  MetodoPagoEnumUUID,
  PARENTESCO_TYPE_ARRAY_CHOICES,
  Preventa,
  SolicitudServicio,
  useLoaders,
  useTabsOnly,
} from '@/shared';
import {
  a11yProps,
  CustomCellphoneTextField,
  CustomCoordsTextField,
  CustomNumberTextField,
  CustomTabPanel,
  CustomTextAreaNoForm,
  CustomTextField,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  InputAndBtnGridSpace,
  MapModalComponent,
  NestedTabsScene,
  SelectTextFieldArrayString,
  SingleIconButton,
} from '@/shared/components';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import Cards from 'react-credit-cards-2';

export type FibraClientInfoPartProps = {
  serviceLine: LineaServicio;
};

type FormData = Partial<SolicitudServicio> & Partial<Preventa>;

const FibraClientInfoPart: React.FC<FibraClientInfoPartProps> = ({
  serviceLine,
}) => {
  ///* hooks ---------------------
  const { tabValue, handleTabChange } = useTabsOnly();

  ///* local state ---------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

  const isDebito =
    serviceLine?.metodo_pago_data?.uuid === MetodoPagoEnumUUID.DEBITO;
  const isCredito =
    serviceLine?.metodo_pago_data?.uuid === MetodoPagoEnumUUID.CREDITO;

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

  ///* effects ---------------------
  useEffect(() => {
    if (!serviceLine) return;
    const { solicitud_servicio_data, preventa_data, ...rest } = serviceLine;
    console.log('serviceLine', rest);

    form.reset({
      ...solicitud_servicio_data,
      ...preventa_data,
    });
  }, [form, serviceLine]);

  const isLoading =
    isLoadingZonas || isLoadingNaps || isRefetchingZonas || isRefetchingNaps;
  useLoaders(isLoading);

  return (
    <>
      <CustomTypoLabel
        text="Datos del cliente"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Cliente" value={1} {...a11yProps(1)} />
            <Tab label="Ubicadión cliente y NAP" value={2} {...a11yProps(2)} />
            <Tab label="Método de pago" value={3} {...a11yProps(3)} />
          </FormTabsOnly>
        }
        sxContainer={{
          pt: 0,
          pb: 4,
        }}
      >
        <CustomTabPanel value={tabValue} index={1} ptGrid="0">
          <CustomTextField
            label="Tipo identificación"
            name="tipo_identificacion"
            control={form.control}
            defaultValue={form.getValues().tipo_identificacion}
            error={errors.tipo_identificacion}
            helperText={errors.tipo_identificacion?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Identificación"
            name="identificacion"
            control={form.control}
            defaultValue={form.getValues().identificacion}
            error={errors.identificacion}
            helperText={errors.identificacion?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Nombre"
            name="razon_social"
            control={form.control}
            defaultValue={form.getValues().razon_social}
            error={errors.razon_social}
            helperText={errors.razon_social?.message}
            disabled
          />
          <CustomTextField
            label="Fecha nacimiento"
            name="fecha_nacimiento"
            control={form.control}
            defaultValue={form.getValues().fecha_nacimiento}
            error={errors.fecha_nacimiento}
            helperText={errors.fecha_nacimiento?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomNumberTextField
            label="Edad"
            name="edad"
            control={form.control}
            defaultValue={form.getValues().edad}
            error={errors.edad}
            helperText={errors.edad?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Email"
            name="email"
            type="email"
            control={form.control}
            defaultValue={form.getValues().email}
            error={errors.email}
            helperText={errors.email?.message}
            disabled
            size={gridSizeMdLg6}
          />
          <CustomCellphoneTextField
            label="Celular"
            name="celular"
            control={form.control}
            defaultValue={form.getValues().celular}
            error={errors.celular}
            helperText={errors.celular?.message}
            disabled
            size={gridSizeMdLg6}
          />

          {/* =================== Persona Referencia =================== */}
          <CustomTextField
            label="Nombre Persona Referencia"
            name="nombre_persona_referencia"
            control={form.control}
            defaultValue={form.getValues().nombre_persona_referencia}
            error={errors.nombre_persona_referencia}
            helperText={errors.nombre_persona_referencia?.message}
            disabled
          />
          <SelectTextFieldArrayString
            label="Parentesco Referencia"
            name="parentesco_referencia"
            textFieldKey="parentesco_referencia"
            // options
            options={PARENTESCO_TYPE_ARRAY_CHOICES}
            defaultValue={form.getValues()?.parentesco_referencia || ''}
            // errors
            control={form.control}
            error={form.formState.errors.parentesco_referencia}
            helperText={form.formState.errors.parentesco_referencia?.message}
            gridSize={gridSizeMdLg6}
            disabled
          />
          <CustomCellphoneTextField
            label="Celular Referencia"
            name="celular_adicional"
            control={form.control}
            defaultValue={form.getValues().celular_adicional}
            error={errors.celular_adicional}
            helperText={errors.celular_adicional?.message}
            size={gridSizeMdLg6}
            disabled
          />
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
              value={serviceLine?.solicitud_servicio_data?.direccion || ''}
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
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={3} ptGrid="0">
          <CustomTextFieldNoForm
            label="Método de pago"
            value={serviceLine?.metodo_pago_data?.name || ''}
            disabled
          />

          {isDebito && (
            <>
              <CustomTextFieldNoForm
                label="Entidad financiera"
                value={serviceLine?.entidad_financiera_data?.name || ''}
                disabled
              />
              <CustomTextFieldNoForm
                label="Tipo cuenta bancaria"
                value={serviceLine?.preventa_data?.tipo_cuenta_bancaria || ''}
                disabled
              />
              <CustomTextFieldNoForm
                label="Número cuenta bancaria"
                value={serviceLine?.preventa_data?.numero_cuenta_bancaria || ''}
                disabled
              />
            </>
          )}

          {isCredito && (
            <>
              <CustomTextFieldNoForm
                label="Tarjeta"
                value={serviceLine?.tarjeta_data?.name || ''}
                disabled
              />
              <Grid item xs={12} mt={3} mb={2}>
                <Cards
                  number={
                    serviceLine?.preventa_data?.numero_tarjeta_credito || ''
                  }
                  expiry={
                    serviceLine?.preventa_data?.fecha_vencimiento_tarjeta || ''
                  }
                  cvc=""
                  name={serviceLine?.preventa_data?.titular_tarjeta || ''}
                />
              </Grid>

              <CustomTextFieldNoForm
                label="Número tarjeta crédito"
                value={serviceLine?.preventa_data?.numero_tarjeta_credito || ''}
                disabled
              />
              <CustomTextFieldNoForm
                label="Entidad financiera"
                value={serviceLine?.entidad_financiera_data?.name || ''}
                disabled
              />
              <CustomTextFieldNoForm
                label="Titular tarjeta"
                value={serviceLine?.preventa_data?.titular_tarjeta || ''}
                disabled
              />
              <CustomTextFieldNoForm
                label="Fecha vencimiento tarjeta"
                value={formatExpirationDateCreditCard(
                  serviceLine?.preventa_data?.fecha_vencimiento_tarjeta || '',
                )}
                disabled
              />
            </>
          )}
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default FibraClientInfoPart;
