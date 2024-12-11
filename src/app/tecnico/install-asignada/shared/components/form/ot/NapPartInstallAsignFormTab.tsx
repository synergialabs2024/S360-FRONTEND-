import { Grid } from '@mui/material';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { LocationZonePolygonFormPart } from '@/app/operaciones/agedamiento/shared/components/form';
import {
  gridSize,
  gridSizeMdLg3,
  gridSizeMdLg6,
  Nap,
  OrdenTrabajo,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SelectArrayString,
} from '@/shared/components';
import { useMapStore } from '@/store/app';
import { InstallAsignOTSaveFormData } from '../../SaveOrdenTrabajo/SaveOrdenTrabajo';
import RequestChangePortInstallAsignModal from './RequestChangePortInstallAsignModal';

export type NapPartInstallAsignFormTabProps = {
  form: UseFormReturn<InstallAsignOTSaveFormData>;
  ordenTrabajo: OrdenTrabajo;
  onlyView?: boolean;
};

const NapPartInstallAsignFormTab: React.FC<NapPartInstallAsignFormTabProps> = ({
  form,
  ordenTrabajo,
  onlyView = false, // auditoria
}) => {
  ///* form ---------------------
  const { errors } = form.formState;
  const watchedRawNap = form.watch('rawNap');

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
              if (onlyView) return;

              form.reset({
                ...form.getValues(),
                coordenadas: coords,
                nap: '' as any,
                distancia_nap: '' as any,
                puerto_nap: '' as any,
              });
            }}
            disabledInputCoords={onlyView}
            canDragMarker={!onlyView}
            disabledAddressInput={onlyView}
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
                form.setValue('rawNap', undefined);
                return;
              }
              form.setValue('distancia_nap', nap?.distance as any);
              form.setValue('puerto_nap', '' as any);
              form.setValue('rawNap', nap);
            }}
            disabled={onlyView}
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
            <SelectArrayString
              label="Puerto NAP"
              name="puerto_nap"
              control={form.control}
              defaultValue={
                form.getValues('puerto_nap')?.toString() || undefined
              }
              options={
                watchedRawNap?.puertos_list
                  ?.map(p => ({
                    puerto: p.puerto.toString(),
                    estado: p.estado,
                  }))
                  ?.filter(p => {
                    const selectedPort =
                      ordenTrabajo?.preventa_data?.puerto_nap?.toString() ||
                      '0';
                    const currPort = p?.puerto;
                    const selectedNap = ordenTrabajo?.nap_data?.id;

                    if (
                      selectedPort === currPort &&
                      selectedNap == watchedRawNap?.id
                    ) {
                      return true;
                    }

                    return !p.estado;
                  })
                  ?.map(p => p.puerto) || []
              }
              gridSize={gridSize}
              clearable={true}
              error={errors.puerto_nap}
              helperText={errors.puerto_nap?.message}
              disabled={onlyView}
            />

            {/* <SingleIconButton
              label="Solicitar cambio puerto"
              onClick={() => {
                if (
                  !!watchedTipoActualizacionPuerto &&
                  !watchedUsuarioActualizacionPuerto
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
            /> */}
          </Grid>
        </>
      </>

      {/* ================ modals - AHORA EL TECNICO MISMO LO CAMBIA ================ */}
      <RequestChangePortInstallAsignModal
        open={openChangePortDialog}
        onClose={() => setOpenChangePortDialog(false)}
        ordenTrabajo={ordenTrabajo!}
        customOnSuccess={ot => {
          form.setValue(
            'tipo_actualizacion_puerto',
            ot?.tipo_actualizacion_puerto,
          );
          form.setValue(
            'observacion_cambio_puerto',
            ot?.observacion_cambio_puerto,
          );
          form.setValue(
            'fecha_actualizacion_puerto',
            ot?.fecha_actualizacion_puerto,
          );
          form.setValue(
            'usuario_actualizacion_puerto',
            ot?.usuario_actualizacion_puerto,
          );
        }}
      />
    </>
  );
};

export default NapPartInstallAsignFormTab;
