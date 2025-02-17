import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  CustomNumberTextField,
  ScrollableDialogProps,
  CustomAutocompleteNoForm,
} from '@/shared/components';
import { hasAllPermissions } from '@/shared/utils/auth';
import {
  CreateAuthOnuParamsBase,
  useCreateAuthONUAuthorized,
  useFetchOLTs,
} from '@/actions/app';
import {
  authOnuFormSchema,
  AutorizacionOnu,
  gridSizeMdLg6,
  PermissionsEnum,
  ToastWrapper,
} from '@/shared';

export type ModalAutorizacionOnusProps = {
  authOnu: AutorizacionOnu;
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

const ModalAutorizacionOnusPage: React.FC<ModalAutorizacionOnusProps> = ({
  authOnu,
  titleButton,
}) => {
  hasAllPermissions([PermissionsEnum.infraestructura_view_olt]);

  ///* local state ------------------------
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idOLT, setIdOLT] = useState<number>();
  const [optionsState, setOptionsState] = useState({
    vlans: null as string | null,
    lineProfiles: null as string | null,
    srvProfiles: null as string | null,
    trafficTables: null as string | null,
  });

  ///* form -------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(authOnuFormSchema) as any,
    defaultValues: {
      eth: 4,
    },
  });
  const {
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = form;

  ///* effects
  useEffect(() => {
    if (!authOnu?.id) return;
    setIdOLT(Number(authOnu.olt_id));
    reset(authOnu);
  }, [authOnu, reset]);

  const { data: OltsPagingRes } = useFetchOLTs({
    enabled: true,
    params: { page_size: 900, id: idOLT },
  });

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

  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    data.ont_model = authOnu?.ont_model;
    data.vlan = optionsState.vlans || '';
    data.line_profile = optionsState.lineProfiles || '';
    data.traffic_table = optionsState.trafficTables || '';
    data.srv_profile = optionsState.srvProfiles || '';
    data.port_pon = authOnu?.port_pon;
    //createAuthOnuAutorizacionMutation.mutate(data);

    const dato = {
      eth: data.eth,
      nap: data.nap,
      mode: data.mode,
      slot: data.slot,
      port_onu: data.port_onu,
      sn: data.sn,
      description: data.description,
      user_ppoe: data.user_ppoe,
      pass_ppoe: data.pass_ppoe,
      nombre_cliente: data.nombre_cliente,
      cedula_cliente: data.cedula_cliente,
      ont_model: data.ont_model,
      vlan: data.vlan,
      line_profile: data.line_profile,
      traffic_table: data.traffic_table,
      srv_profile: data.srv_profile,
      port_pon: data.port_pon,
    };

    createAuthOnuAutorizacionMutation.mutate(
      { data: dato },
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
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {titleButton}
      </Button>
      {/* ================ ms =============odal=== */}
      <ScrollableDialogProps
        title={titleButton + ': SN ' + authOnu?.sn}
        open={openModal}
        minWidth="75%"
        onClose={() => setOpenModal(false)}
        cancelTextBtn="Cerrar"
        confirmTextBtn="Si, continuar"
        onConfirm={handleSubmit(onSave)}
        contentNode={
          <Grid container spacing={3}>
            <Grid item container spacing={3} sx={{ mb: 3 }}>
              <CustomTextField
                label="TIPO"
                name="mode"
                control={form.control}
                defaultValue={form.getValues().olt_name}
                error={errors.mode}
                helperText={errors.mode?.message}
                required={false}
                disabled
              />
              <CustomNumberTextField
                label="BOARD"
                name="slot"
                control={form.control}
                defaultValue={form.getValues().olt_slot}
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
                defaultValue={form.getValues().olt_port}
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
                defaultValue={form.getValues().sn}
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
                defaultValue={form.getValues().description}
                error={errors.description}
                helperText={errors.description?.message}
                size={gridSizeMdLg6}
              />
              <CustomTextField
                label="USERPPOE"
                name="user_ppoe"
                control={form.control}
                defaultValue={form.getValues().user_ppoe}
                error={errors.user_ppoe}
                helperText={errors.user_ppoe?.message}
                size={gridSizeMdLg6}
              />
              <CustomTextField
                label="PASSPPOE"
                name="pass_ppoe"
                control={form.control}
                defaultValue={form.getValues().pass_ppoe}
                error={errors.pass_ppoe}
                helperText={errors.pass_ppoe?.message}
                size={gridSizeMdLg6}
              />
              <CustomTextField
                label="NOMBRE CLIENTE"
                name="nombre_cliente"
                control={form.control}
                defaultValue={form.getValues().nombre_cliente}
                error={errors.nombre_cliente}
                helperText={errors.nombre_cliente?.message}
                size={gridSizeMdLg6}
              />
              <CustomTextField
                label="CEDULA CLIENTE"
                name="cedula_cliente"
                control={form.control}
                defaultValue={form.getValues().cedula_cliente}
                error={errors.cedula_cliente}
                helperText={errors.cedula_cliente?.message}
                size={gridSizeMdLg6}
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
                v => setOptionsState(prev => ({ ...prev, lineProfiles: v })),
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
                v => setOptionsState(prev => ({ ...prev, trafficTables: v })),
              )}
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default ModalAutorizacionOnusPage;
