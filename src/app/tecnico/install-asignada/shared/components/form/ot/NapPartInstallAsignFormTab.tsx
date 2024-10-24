import { Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { MdChangeCircle } from 'react-icons/md';

import { LocationZonePolygonFormPart } from '@/app/operaciones/agedamiento/shared/components/form';
import {
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg3,
  gridSizeMdLg6,
  Nap,
  OrdenTrabajo,
  ToastWrapper,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleIconButton,
} from '@/shared/components';
import { useMapStore } from '@/store/app';
import { useState } from 'react';
import { InstallAsignOTSaveFormData } from '../../SaveOrdenTrabajo/SaveOrdenTrabajo';
import RequestChangePortInstallAsignModal from './RequestChangePortInstallAsignModal';

export type NapPartInstallAsignFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
};

const NapPartInstallAsignFormTab: React.FC<NapPartInstallAsignFormTabProps> = ({
  form,
  ordenTrabajo,
}) => {
  const { errors } = form.formState;

  ///* local state ---------------------
  const [openChangePortDialog, setOpenChangePortDialog] =
    useState<boolean>(false);

  ///* global state ---------------------
  const napsByCoords = useMapStore(s => s.napsByCoords);
  const isLoadingNaps = useMapStore(s => s.isLoadingNaps);

  return (
    <>
      <CustomTypoLabel
        text="Ubicación y NAP"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <>
        {/* =================== Ubicación =================== */}
        <>
          <LocationZonePolygonFormPart
            form={form}
            initialCoords={ordenTrabajo?.solicitud_servicio_data?.coordenadas}
            isEdit={true}
            ptLabel="0px"
            showSectionTitle={false}
            onChangeCoordsInput={coords => {
              form.reset({
                ...form.getValues(),
                coordenadas: coords,
                nap: '' as any,
                distancia_nap: '' as any,
                puerto_nap: '' as any,
              });
            }}
          />
        </>

        {/* ---------- NAP ---------- */}
        <>
          <CustomAutocomplete<Nap>
            label="NAP"
            name="nap"
            // options
            options={napsByCoords || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().nap}
            isLoadingData={isLoadingNaps}
            // vaidation
            control={form.control}
            error={errors.nap}
            helperText={errors.nap?.message}
            size={gridSizeMdLg6}
            onChangeRawValue={nap => {
              if (!nap) {
                form.setValue('distancia_nap', '' as any);
                form.setValue('puerto_nap', '' as any);
                return;
              }
              form.setValue('distancia_nap', nap?.distance as any);
              form.setValue('puerto_nap', '' as any);
            }}
            // disabled
          />
          {/* <CustomTextFieldNoForm
            label="NAP"
            value={ordenTrabajo?.agendamiento_data?.nap_data?.name}
            disabled
          /> */}

          <CustomTextField
            label="Distancia NAP"
            name="distancia_nap"
            control={form.control}
            defaultValue={form.getValues().distancia_nap as any}
            error={errors.distancia_nap}
            helperText={errors.distancia_nap?.message}
            size={gridSizeMdLg3}
            disabled
            endAdornmentInput="m"
          />

          <Grid item container {...gridSizeMdLg3}>
            <CustomTextField
              label="Puerto"
              name="puerto_nap"
              control={form.control}
              defaultValue={(form.getValues().puerto_nap as any) || ''}
              error={errors.puerto_nap}
              helperText={errors.puerto_nap?.message}
              size={gridSizeMdLg11}
              disabled
            />
            <SingleIconButton
              label="Solicitar cambio puerto"
              onClick={() => {
                if (
                  !!ordenTrabajo?.tipo_actualizacion_puerto &&
                  !ordenTrabajo?.usuario_actualizacion_puerto
                ) {
                  return ToastWrapper.warning(
                    'El cambio de puerto solicitado aún no ha sido atendido',
                  );
                }

                setOpenChangePortDialog(true);
              }}
              startIcon={<MdChangeCircle />}
              size={gridSizeMdLg1}
              color="info"
              tooltipPlacement="right"
            />
          </Grid>
        </>
      </>

      {/* ================ modals ================ */}
      <RequestChangePortInstallAsignModal
        open={openChangePortDialog}
        onClose={() => setOpenChangePortDialog(false)}
        ordenTrabajo={ordenTrabajo!}
      />
    </>
  );
};

export default NapPartInstallAsignFormTab;
