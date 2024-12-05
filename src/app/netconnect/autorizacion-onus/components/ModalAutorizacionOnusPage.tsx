import { CreateAuthOnuParamsBase } from '@/actions/app';
import { authOnuFormSchema, AutorizacionOnu, gridSizeMdLg6 } from '@/shared';
import {
  CustomNumberTextField,
  CustomTextField,
  ScrollableDialogProps,
} from '@/shared/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export type ModalAutorizacionOnusProps = {
  authOnu: AutorizacionOnu;
  titleButton: string;
};

type SaveFormData = CreateAuthOnuParamsBase & {};

const ModalAutorizacionOnusPage: React.FC<ModalAutorizacionOnusProps> = ({
  authOnu,
  titleButton,
}) => {
  ///* local state ------------------------
  const [openModal, setOpenModal] = useState<boolean>(false);

  ///* form -------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(authOnuFormSchema) as any,
    defaultValues: {
      sn: '',
    },
  });
  const {
    reset,
    formState: { errors },
  } = form;

  ///* effects
  useEffect(() => {
    if (!authOnu?.id) return;
    reset(authOnu);
  }, [authOnu, reset]);

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
        contentNode={
          <Grid container spacing={3}>
            <Grid item container spacing={3} sx={{ mb: 3 }}>
              <CustomTextField
                label="TIPO"
                name="olt_name"
                control={form.control}
                defaultValue={form.getValues().olt_name}
                error={errors.olt_name}
                helperText={errors.olt_name?.message}
              />
              <CustomNumberTextField
                label="BOARD"
                name="olt_slot"
                control={form.control}
                defaultValue={form.getValues().olt_slot}
                error={errors.olt_slot}
                helperText={errors.olt_slot?.message}
                size={gridSizeMdLg6}
                disabled
              />
              <CustomNumberTextField
                label="PORT"
                name="olt_port"
                control={form.control}
                defaultValue={form.getValues().olt_port}
                error={errors.olt_port}
                helperText={errors.olt_port?.message}
                size={gridSizeMdLg6}
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
                disabled
              />
              <CustomTextField
                label="ALIAS/CAJA"
                name="alias_caja"
                control={form.control}
                defaultValue={form.getValues().alias_caja}
                error={errors.alias_caja}
                helperText={errors.alias_caja?.message}
                size={gridSizeMdLg6}
              />
              <CustomTextField
                label="USERPPOE"
                name="userppoe"
                control={form.control}
                defaultValue={form.getValues().userppoe}
                error={errors.userppoe}
                helperText={errors.userppoe?.message}
                size={gridSizeMdLg6}
              />
              <CustomTextField
                label="PASSPPOE"
                name="passppoe"
                control={form.control}
                defaultValue={form.getValues().passppoe}
                error={errors.passppoe}
                helperText={errors.passppoe?.message}
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
                label="VLANS"
                name="vlans"
                control={form.control}
                defaultValue={form.getValues().vlans}
                error={errors.vlans}
                helperText={errors.vlans?.message}
              />
              <CustomTextField
                label="LINE PROFILE"
                name="line_profile"
                control={form.control}
                defaultValue={form.getValues().line_profile}
                error={errors.line_profile}
                helperText={errors.line_profile?.message}
              />
              <CustomTextField
                label="PERFIL PLAN"
                name="perfil_plan"
                control={form.control}
                defaultValue={form.getValues().perfil_plan}
                error={errors.perfil_plan}
                helperText={errors.perfil_plan?.message}
              />
            </Grid>
          </Grid>
        }
        confirmTextBtn="Si, continuar"
        //onConfirm={form.handleSubmit(onSave)}
      />
    </>
  );
};

export default ModalAutorizacionOnusPage;
