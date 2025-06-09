import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import {
  CustomTextArea,
  ChipModelState,
  CustomFormLabel,
  CustomTypoLabel,
  CustomTextField,
  ImgModalComponent,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
  CustomNumberTextField,
  CustomTextFieldNoForm,
  CustomCoordsTextField,
  InputAndBtnGridSpace,
  SingleIconButton,
  MapModalComponent,
  CustomAutocomplete,
} from '@/shared/components';
import {
  ColorChipType,
  LineaServicio,
  ShowPingModal,
  gridSizeMdLg6,
  gridSizeMdLg12,
  ShowTraceModal,
  PermissionsEnum,
  soporteTecnicoFormSchema,
  ShowEquipoMaterialUtilizadosModal,
  gridSizeMdLg2,
  ShowHistorialTicketsYSModal,
  gridSize,
  gridSizeMdLg11,
  gridSizeMdLg1,
  ToastWrapper,
  useLoaders,
  Zona,
  Sector,
} from '@/shared';
import {
  CreateSolicitudServicioClienteParamsBase,
  useUpdateSoporteTecnicoCliente,
  SoporteTecnicoClienteParamsBase,
  useFetchZonas,
  useGetZoneByCoords,
  useFetchSectores,
} from '@/actions/app';
import { useRubroStore } from '@/store/app/rubros';
import SoporteTecnicoTitle from './SoporteTecnicoTitle';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSoporteTecnico } from '../../../pages/tables/SoporteTecnicoPages';
import HistorialTickets from '@/shared/hooks/app/sac/historial-tickets/modal/HistorialTickets';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { FaMapLocationDot } from 'react-icons/fa6';

export interface SaveSoporteTecnicoProps {
  soporte_tecnico?: LineaServicio & {
    vendedor_data?: { razon_social: string };
  };
}

type SaveFormData = CreateSolicitudServicioClienteParamsBase & {};

type TipoUtilizado = 'equipo' | 'material';

const SaveSoporteTecnico: React.FC<SaveSoporteTecnicoProps> = ({
  soporte_tecnico,
}) => {
  useCheckPermission(PermissionsEnum.clientes_view_cliente);

  ///* local state ---------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);
  const [onCoord, setOnCoord] = useState<boolean>(false);
  const [dataCoord, setDataCoord] = useState<Zona>();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(soporteTecnicoFormSchema) as any,
    defaultValues: {
      celular: soporte_tecnico?.solicitud_servicio_data?.celular,
      direccion_referencia:
        soporte_tecnico?.solicitud_servicio_data?.direccion_referencia,
      email: soporte_tecnico?.solicitud_servicio_data?.email,
    },
  });

  const watchedZone = form.watch('zona');

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
    initialCoords: String(
      soporte_tecnico?.solicitud_servicio_data?.coordenadas,
    ),
    enableFetchNaps: true,
  });
  useLocationCoords({
    isEditting: true,
    form,
    setLatLng,
  });

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

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const items = [
    {
      tipo: 'equipo',
      title: 'Equipo',
      data: soporte_tecnico?.orden_trabajo_data?.equipos_utilizados,
    },
    {
      tipo: 'material',
      title: 'Material',
      data: soporte_tecnico?.orden_trabajo_data?.materiales_utilizados,
    },
  ];

  ///* hooks ----------------
  const navigate = useNavigate();

  ///* global state ----------------------
  const clearAllRubroStore = useRubroStore(s => s.clearAllMinusSL);

  const updateClienteMutation =
    useUpdateSoporteTecnicoCliente<SoporteTecnicoClienteParamsBase>({
      navigate,
      returnUrl: returnUrlSoporteTecnico,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!onCoord) {
      setOpenMapModal(true);
      return ToastWrapper.warning(
        'La Coordenada debe estar dentro de una zona valida',
      );
    }
    if (soporte_tecnico?.solicitud_servicio_data?.id) {
      updateClienteMutation.mutate({
        id: soporte_tecnico.solicitud_servicio_data.id!,
        data,
      });
      return;
    }
  };

  ///* effects ----------------
  useEffect(() => {
    return () => {
      clearAllRubroStore();
    };
  }, [clearAllRubroStore]);

  ///* effects ---------------------
  // set zone to up
  useEffect(() => {
    if (!latLng?.lat || !latLng?.lng) return;

    if (isLoadingZonaByCoords || isRefetchingZonaByCoords) return;
    const zone = zonaByCoordsRes?.data;
    if (!zone) {
      ToastWrapper.warning(
        'No se encontraron zonas con cobertura para las coordenadas proporcionadas',
      );
      return;
    }
    setDataCoord(zone);
    form.reset({
      ...form.getValues(),
      pais: zone?.pais!,
      provincia: zone?.provincia!,
      ciudad: zone?.ciudad!,
      zona: zone?.id,
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
      ToastWrapper.warning(
        'No se encontraron cajas disponibles para las coordenadas ingresadas',
      );
    }
    setOnCoord(thereAreNaps);
  }, [
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    form,
    latLng?.lat,
    latLng?.lng,
  ]);
  // sectores available
  useEffect(() => {
    if (!watchedZone) return;
    if (isLoadingSectores || isRefetchingSectores) return;
    const thereAreSectores = !!sectoresPaging?.data?.items.length;
    if (!thereAreSectores) {
      ToastWrapper.warning(
        'No se encontraron sectores para la zona seleccionada',
      );
    }
  }, [watchedZone, sectoresPaging, isLoadingSectores, isRefetchingSectores]);

  console.log(soporte_tecnico?.contrato_data?.sector);
  useEffect(() => {
    const coordenadasStr = form.getValues().coordenadas;
    if (coordenadasStr) {
      const [lat, lng] = coordenadasStr.split(',').map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        setLatLng({ lat, lng });
      }
    }
  }, []);

  const customLoading =
    isLoadingNaps || isRefetchingNaps || isLoadingZonas || isRefetchingZonas;
  useLoaders(customLoading);

  return (
    <SingleFormBoxScene
      titleNode={<SoporteTecnicoTitle soporte_tecnico={soporte_tecnico!} />}
      onSave={handleSubmit(onSave, () => {})}
      onCancel={() => navigate(returnUrlSoporteTecnico)}
    >
      <CustomTypoLabel
        text="Informacion principal"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <Grid container item {...gridSizeMdLg6} spacing={2}>
        {[
          {
            label: 'PLAN:',
            color: 'info',
            value: [
              soporte_tecnico?.contrato_data?.plan_internet_ingreso_data?.name,
              soporte_tecnico?.contrato_data?.plan_internet_ingreso_data
                ?.velocidad_descarga_maxima,
              soporte_tecnico?.contrato_data?.plan_internet_ingreso_data?.valor,
            ]
              .filter(Boolean)
              .join('_'),
          },
          {
            label: 'NODO:',
            color: 'success',
            value: soporte_tecnico?.nodo_data?.name,
          },
          {
            label: 'ESTADO:',
            color: 'warning',
            value: soporte_tecnico?.estado_linea,
          },
        ].map(({ label, color, value }) => (
          <Grid
            item
            xs={4}
            key={label}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CustomFormLabel>{label}</CustomFormLabel>
            <ChipModelState
              color={color as ColorChipType}
              label={value || 'N/A'}
            />
          </Grid>
        ))}
      </Grid>

      {items.map(({ tipo, data, title }) => (
        <Grid
          key={tipo}
          mt={9}
          container
          justifyContent="center"
          alignItems="center"
          {...{ xs: 12, sm: 12, md: 1.5, lg: 1.5 }}
        >
          <ShowEquipoMaterialUtilizadosModal
            tipo_utilizado={tipo as TipoUtilizado}
            title={title}
            Arrays={data}
          />
        </Grid>
      ))}
      <Grid
        mt={9}
        container
        justifyContent="center"
        alignItems="center"
        {...{ xs: 12, sm: 12, md: 1.5, lg: 1.5 }}
      >
        <ImgModalComponent
          urls={{
            foto_acta_entrega_ups:
              soporte_tecnico?.orden_trabajo_data?.url_foto_acta_entrega_ups ||
              '',
            foto_etiqueta:
              soporte_tecnico?.orden_trabajo_data?.url_foto_etiqueta || '',
            foto_nap: soporte_tecnico?.orden_trabajo_data?.url_foto_nap || '',
            foto_ont: soporte_tecnico?.orden_trabajo_data?.url_foto_ont || '',
            foto_ont_encontrado_casa:
              soporte_tecnico?.orden_trabajo_data
                ?.url_foto_ont_encontrado_casa || '',
            foto_potencia_nap:
              soporte_tecnico?.orden_trabajo_data?.url_foto_potencia_nap || '',
            foto_potencia_ont:
              soporte_tecnico?.orden_trabajo_data?.url_foto_potencia_ont || '',
            foto_premio:
              soporte_tecnico?.orden_trabajo_data?.url_foto_premio || '',
            foto_test_speed:
              soporte_tecnico?.orden_trabajo_data?.url_foto_test_speed || '',
          }}
        />
      </Grid>
      <Grid
        mt={9}
        container
        justifyContent="center"
        alignItems="center"
        {...{ xs: 12, sm: 12, md: 1.5, lg: 1.5 }}
      >
        <ShowTraceModal
          typeBtn="icon"
          ipItem={soporte_tecnico?.orden_trabajo_data?.ipv4 || ''}
          modalTitle="TRACING"
        />
      </Grid>
      <CustomTextFieldNoForm
        label="Codigo"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.contrato_data?.numero_contrato}
        required={false}
        disabled
      />
      <Grid
        mt={9}
        container
        justifyContent="center"
        alignItems="center"
        {...gridSizeMdLg2}
        sx={{ mt: 4 }}
      >
        <ShowPingModal
          typeBtn="icon"
          ipItem={soporte_tecnico?.orden_trabajo_data?.ipv4 || ''}
          modalTitle="PING"
        />
      </Grid>
      <Grid
        mt={9}
        container
        justifyContent="center"
        alignItems="center"
        {...gridSizeMdLg2}
        sx={{ mt: 4 }}
      >
        <HistorialTickets
          typeBtn="icon"
          cedula={soporte_tecnico?.solicitud_servicio_data?.identificacion!}
          modalTitle="HISTORICO TICKETS"
        />
      </Grid>
      <Grid
        mt={9}
        container
        justifyContent="center"
        alignItems="center"
        {...gridSizeMdLg2}
        sx={{ mt: 4 }}
      >
        <ShowHistorialTicketsYSModal
          cedula={soporte_tecnico?.solicitud_servicio_data?.identificacion!}
          title="HISTORICO TICKETS YIGASUITE"
        />
      </Grid>
      <CustomTextFieldNoForm
        label="IP Servicio"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.orden_trabajo_data?.ipv4}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Fecha Instalacion"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.agendamiento_data?.fecha_instalacion}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="PPPUSER"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.orden_trabajo_data?.pppoe}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="PPP Password"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.orden_trabajo_data?.pppassword}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Contrato"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.contrato_data?.numero_contrato}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Agente Vendedor"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.vendedor_data?.razon_social}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Promocion"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.preventa_data?.promociones?.[0]}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Prioridad"
        size={gridSizeMdLg6}
        value={
          soporte_tecnico?.contrato_data?.plan_internet_ingreso_data?.prioridad
        }
        required={false}
        disabled
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
      <CustomTypoLabel
        text="Informacion adicional"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <CustomTextFieldNoForm
        label="Pais"
        size={gridSizeMdLg6}
        value={dataCoord?.pais_data?.name!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Provincia"
        size={gridSizeMdLg6}
        value={dataCoord?.provincia_data?.name!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Ciudad"
        size={gridSizeMdLg6}
        value={dataCoord?.ciudad_data?.name!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="zona"
        size={gridSizeMdLg6}
        value={dataCoord?.name!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Cedula / RUC"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.solicitud_servicio_data?.identificacion}
        required={false}
        disabled
      />
      <CustomAutocomplete<Sector>
        label="Sector"
        name="sector"
        // options
        options={sectoresPaging?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        //defaultValue={soporte_tecnico?.sector_data?.id!}
        defaultValue={form.getValues().sector}
        isLoadingData={isLoadingSectores || isRefetchingSectores}
        // vaidation
        control={form.control}
        error={errors.sector as any}
        helperText={errors.sector?.message as any}
        size={gridSizeMdLg6}
      />
      <CustomTextFieldNoForm
        label="Nombres"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.solicitud_servicio_data?.razon_social}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Instalador"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.flota_data?.name}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Codigo Pago"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.contrato_data?.identificacion_pago}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Datos GPON"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.nap_data?.name}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Router MAC"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.orden_trabajo_data?.serie_ont}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Router Modelo"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.orden_trabajo_data?.modelo_ont_wifi}
        required={false}
        disabled
      />
      <CustomNumberTextField
        label="Celular"
        name="celular"
        control={form.control}
        defaultValue={soporte_tecnico?.solicitud_servicio_data?.celular}
        error={errors.celular}
        helperText={errors.celular?.message}
        size={gridSizeMdLg6}
        required={false}
        min={0}
        max={20}
      />
      <CustomNumberTextField
        label="Celular adicional"
        name="celular_adicional"
        control={form.control}
        defaultValue={
          soporte_tecnico?.solicitud_servicio_data?.celular_adicional
        }
        error={errors.celular_adicional}
        helperText={errors.celular_adicional?.message}
        size={gridSizeMdLg6}
        required={false}
        min={0}
        max={20}
      />
      <CustomTextField
        label="Email"
        name="email"
        type="email"
        control={form.control}
        defaultValue={soporte_tecnico?.solicitud_servicio_data?.email}
        error={errors.email}
        helperText={errors.email?.message}
        size={gridSizeMdLg6}
        required={false}
        ignoreTransform
      />
      <CustomTextFieldNoForm
        label="Tercera Edad"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.cliente_data?.es_tercera_edad ? 'Sí' : 'No'}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Direccion Helper"
        size={gridSizeMdLg12}
        value={soporte_tecnico?.solicitud_servicio_data?.direccion}
        required={false}
        disabled
      />
      <CustomTextArea
        label="Dirección"
        name="direccion_referencia"
        control={form.control}
        defaultValue={
          soporte_tecnico?.solicitud_servicio_data?.direccion_referencia
        }
        error={errors.direccion_referencia}
        helperText={errors.direccion_referencia?.message}
      />
    </SingleFormBoxScene>
  );
};

export default SaveSoporteTecnico;
