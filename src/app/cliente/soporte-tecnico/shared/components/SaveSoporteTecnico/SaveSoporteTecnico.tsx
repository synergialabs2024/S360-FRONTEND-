import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

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
} from '@/shared/components';
import {
  ColorChipType,
  LineaServicio,
  ShowPingModal,
  gridSizeMdLg4,
  gridSizeMdLg6,
  gridSizeMdLg12,
  ShowTraceModal,
  PermissionsEnum,
  soporteTecnicoFormSchema,
  ShowEquipoMaterialUtilizadosModal,
  gridSizeMdLg2,
  ShowHistorialTicketsYSModal,
} from '@/shared';
import {
  useUpdateSolicitudServicio,
  CreateSolicitudServicioClienteParamsBase,
} from '@/actions/app';
import { useRubroStore } from '@/store/app/rubros';
import SoporteTecnicoTitle from './SoporteTecnicoTitle';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSoporteTecnico } from '../../../pages/tables/SoporteTecnicoPages';
import HistorialTickets from '@/shared/hooks/app/sac/historial-tickets/modal/HistorialTickets';

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

  const {
    handleSubmit,
    formState: { errors, isValid },
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
    useUpdateSolicitudServicio<CreateSolicitudServicioClienteParamsBase>({
      navigate,
      returnUrl: returnUrlSoporteTecnico,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
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
        label="Coordenadas"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.solicitud_servicio_data?.coordenadas}
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
      <CustomTextFieldNoForm
        label="Tercera Edad"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.cliente_data?.es_tercera_edad ? 'Sí' : 'No'}
        required={false}
        disabled
      />
      <CustomTypoLabel
        text="Informacion adicional"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <CustomTextFieldNoForm
        label="Cedula / RUC"
        size={gridSizeMdLg6}
        value={soporte_tecnico?.solicitud_servicio_data?.identificacion}
        required={false}
        disabled
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
        size={gridSizeMdLg4}
        value={soporte_tecnico?.nap_data?.name}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Router MAC"
        size={gridSizeMdLg4}
        value={soporte_tecnico?.orden_trabajo_data?.serie_ont}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Router Modelo"
        size={gridSizeMdLg4}
        value={soporte_tecnico?.orden_trabajo_data?.modelo_ont_wifi}
        required={false}
        disabled
      />
      <CustomNumberTextField
        label="Telefono"
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
