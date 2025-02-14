import { IconRouteSquare2 } from '@tabler/icons-react';
import { gridSizeMdLg6 } from '@/shared/constants';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useFetchOLTs,
  useFetchAuthOnu,
  CreateAuthOnuParamsBase,
  useCreateAuthONUAuthorized,
} from '@/actions/app';
import {
  CustomTextField,
  CustomTypoLabel,
  SingleIconButton,
  CustomTypoLabelEnum,
  ScrollableDialogProps,
  CustomNumberTextField,
  CustomAutocompleteNoForm,
} from '@/shared/components';
import { ToastWrapper } from '@/shared/wrappers';
import { PermissionsEnum } from '@/shared/interfaces';
import { hasAllPermissions } from '@/shared/utils/auth';

export type ModalAuthorizateOrdenTrabajoProps = {
  authOnu: Record<string, any>;
  titleButton: string;
};

type DataOLT = {
  id: number;
  text: string;
};

type TransformedDataOLT2 = {
  value: string | number;
  label: string;
};

type SaveFormData = CreateAuthOnuParamsBase & {
  vlan?: string;
  line_profile?: string;
  traffic_table?: string;
  srv_profile?: string;
  eth?: number;
  nap?: number;
  slot?: number;
  port_onu?: number;
  user_ppoe?: string;
  pass_ppoe?: string;
  mode?: string;
  description?: string;
};

const ModalAuthorizateOrdenTrabajo: React.FC<
  ModalAuthorizateOrdenTrabajoProps
> = ({ authOnu, titleButton }) => {
  hasAllPermissions([PermissionsEnum.infraestructura_view_olt]);

  // State management
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [nameBtn, setNameBtn] = useState<string | undefined>('');
  const [dataBeing, setDataBeing] = useState<boolean>(false);
  const [optionsState, setOptionsState] = useState({
    vlans: null as string | null,
    lineProfiles: null as string | null,
    srvProfiles: null as string | null,
    trafficTables: null as string | null,
  });

  // Fetch data
  const { data: AuthOnusPagingRes } = useFetchAuthOnu({
    enabled: !!authOnu.serie_ont,
    params: { page_size: 900, sn: authOnu.serie_ont },
  });

  const { data: OltsPagingRes } = useFetchOLTs({
    enabled: !!authOnu.olt,
    params: { page_size: 900, id: authOnu.olt },
  });

  // Form management
  const form = useForm<SaveFormData>({
    defaultValues: {
      eth: 4,
      nap: authOnu.preventa_data.nap,
    },
  });
  const {
    formState: { errors },
    handleSubmit,
  } = form;

  useEffect(() => {
    if (
      AuthOnusPagingRes?.data?.items?.length &&
      OltsPagingRes?.data?.items?.length
    ) {
      setDataBeing(true);
      setNameBtn('Enviar');
    } else {
      setNameBtn('Reintentar');
      setDataBeing(false);
    }
  }, [AuthOnusPagingRes, OltsPagingRes]);

  // Data transformation functions
  const transformData = (
    rawData: unknown,
    isStringId = false,
  ): TransformedDataOLT2[] => {
    return Array.isArray(rawData) &&
      rawData.every(
        item =>
          typeof item === 'object' &&
          item !== null &&
          'id' in item &&
          'text' in item &&
          (isStringId
            ? typeof item.id === 'string'
            : typeof item.id === 'number') &&
          typeof item.text === 'string',
      )
      ? (rawData as DataOLT[]).map(item => ({
        value: item.id,
        label: item.text.trim(),
      }))
      : [];
  };

  // Transform OLT data
  const vlans = transformData(OltsPagingRes?.data?.items[0]?.vlans ?? []);
  const lineProfiles = transformData(
    OltsPagingRes?.data?.items[0]?.line_profiles ?? [],
    true,
  );
  const srvProfiles = transformData(
    OltsPagingRes?.data?.items[0]?.srv_profiles ?? [],
    true,
  );
  const trafficTables = transformData(
    OltsPagingRes?.data?.items[0]?.traffic_tables ?? [],
    true,
  );

  // Reusable autocomplete component
  const renderAutocomplete = (
    label: string,
    options: TransformedDataOLT2[],
    value: string | null,
    onChange: (v: string) => void,
  ) => (
    <CustomAutocompleteNoForm<TransformedDataOLT2>
      label={label}
      value={value}
      actualValueKey="value"
      onChange={v => onChange(v as string)}
      options={options}
      getOptionLabel={o => o.label}
      loading={false}
      error={false}
      disableClearable
      size={gridSizeMdLg6}
    />
  );

  const createAuthOnuAutorizacionMutation = useCreateAuthONUAuthorized({
    enableNavigate: true,
    enableErrorNavigate: true,
  });

  const onSave = (data: SaveFormData) => {
    if (dataBeing) {
      data.ont_model = AuthOnusPagingRes?.data?.items[0].ont_model;
      data.vlan = optionsState.vlans || '';
      data.line_profile = optionsState.lineProfiles || '';
      data.traffic_table = optionsState.trafficTables || '';
      data.srv_profile = optionsState.srvProfiles || '';
      data.port_pon = AuthOnusPagingRes?.data?.items[0].port_pon;

      createAuthOnuAutorizacionMutation.mutate(
        { data: data },
        {
          onSuccess: () => {
            ToastWrapper.success('Se actualizo correctamente la ONU');
            setOpenModal(false);
          },
          onError: error => {
            setOpenModal(false);
            ToastWrapper.error(`Error al actualizar la ONU. ${error}`);
          },
        },
      );
    } else {
      setOpenModal(false);
    }
  };

  // alets: not found
  useEffect(() => {
    if (
      AuthOnusPagingRes &&
      AuthOnusPagingRes.data?.items?.length &&
      openModal
    ) {
      return;
    }
    if (!AuthOnusPagingRes?.data?.items?.length && openModal) {
      ToastWrapper.error('No se encontraron Autenticaciones en la ONU');
    }
  }, [AuthOnusPagingRes, openModal]);

  return (
    <>
      <Grid container item xs={12} spacing={4}>
        {!authOnu.luz_verde && (
          <Grid item xs={2}>
            <SingleIconButton
              startIcon={<IconRouteSquare2 />}
              label="Authorizate"
              color="inherit"
              onClick={() => setOpenModal(true)}
            />
          </Grid>
        )}
      </Grid>
      <ScrollableDialogProps
        title={`${titleButton}: ${authOnu.serie_ont}`}
        open={openModal}
        minWidth="50%"
        onClose={() => setOpenModal(false)}
        cancelTextBtn="Cerrar"
        confirmTextBtn={nameBtn}
        onConfirm={handleSubmit(onSave)}
        contentNode={
          <Grid container spacing={3}>
            <Grid item container spacing={3} sx={{ mb: 3 }}>
              {dataBeing ? (
                <>
                  <CustomTextField
                    label="TIPO"
                    name="mode"
                    control={form.control}
                    defaultValue={
                      AuthOnusPagingRes?.data?.items[0]?.olt_name || ''
                    }
                    error={errors.mode}
                    helperText={errors.mode?.message}
                    required={false}
                    disabled
                  />
                  <CustomNumberTextField
                    label="BOARD"
                    name="slot"
                    control={form.control}
                    defaultValue={
                      AuthOnusPagingRes?.data?.items[0]?.olt_slot || ''
                    }
                    error={errors.slot}
                    helperText={errors.slot?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />
                  <CustomNumberTextField
                    label="PORT"
                    name="port_onu"
                    control={form.control}
                    defaultValue={
                      AuthOnusPagingRes?.data?.items[0]?.olt_port || ''
                    }
                    error={errors.port_onu}
                    helperText={errors.port_onu?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />
                  <CustomNumberTextField
                    label="SERIAL NUMBER"
                    name="sn"
                    control={form.control}
                    defaultValue={AuthOnusPagingRes?.data?.items[0]?.sn || ''}
                    error={errors.sn}
                    helperText={errors.sn?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />
                  <CustomTextField
                    label="ALIAS/CAJA"
                    name="description"
                    control={form.control}
                    defaultValue={authOnu?.nap_data?.name || ''}
                    error={errors.description}
                    helperText={errors.description?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />
                  <CustomTextField
                    label="USERPPOE"
                    name="user_ppoe"
                    control={form.control}
                    defaultValue={authOnu?.pppoe || ''}
                    error={errors.user_ppoe}
                    helperText={errors.user_ppoe?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />
                  <CustomTextField
                    label="PASSPPOE"
                    name="pass_ppoe"
                    control={form.control}
                    defaultValue={authOnu?.pppassword || ''}
                    error={errors.pass_ppoe}
                    helperText={errors.pass_ppoe?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />
                  <CustomTextField
                    label="NOMBRE CLIENTE"
                    name="nombre_cliente"
                    control={form.control}
                    defaultValue={
                      authOnu?.solicitud_servicio_data?.razon_social || ''
                    }
                    error={errors.nombre_cliente}
                    helperText={errors.nombre_cliente?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />
                  <CustomTextField
                    label="CEDULA CLIENTE"
                    name="cedula_cliente"
                    control={form.control}
                    defaultValue={
                      authOnu?.solicitud_servicio_data?.identificacion || ''
                    }
                    error={errors.cedula_cliente}
                    helperText={errors.cedula_cliente?.message}
                    size={gridSizeMdLg6}
                    required={false}
                    disabled
                  />

                  {/* =============== Autocompletes =============== */}
                  <CustomTypoLabel
                    text="SELECCION"
                    pt={CustomTypoLabelEnum.ptMiddlePosition}
                  />
                  {renderAutocomplete('VLANS', vlans, optionsState.vlans, v =>
                    setOptionsState(prev => ({ ...prev, vlans: v })),
                  )}
                  {renderAutocomplete(
                    'LINE PROFILES',
                    lineProfiles,
                    optionsState.lineProfiles,
                    v =>
                      setOptionsState(prev => ({ ...prev, lineProfiles: v })),
                  )}
                  {renderAutocomplete(
                    'SRV PROFILES',
                    srvProfiles,
                    optionsState.srvProfiles,
                    v => setOptionsState(prev => ({ ...prev, srvProfiles: v })),
                  )}
                  {renderAutocomplete(
                    'TRAFFIC TABLES',
                    trafficTables,
                    optionsState.trafficTables,
                    v =>
                      setOptionsState(prev => ({ ...prev, trafficTables: v })),
                  )}
                </>
              ) : (
                <Typography
                  variant="h4"
                  component="span"
                  sx={{
                    mt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  No se pudo acceder a la ONU, pruebe con reintentar.
                </Typography>
              )}
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default ModalAuthorizateOrdenTrabajo;
