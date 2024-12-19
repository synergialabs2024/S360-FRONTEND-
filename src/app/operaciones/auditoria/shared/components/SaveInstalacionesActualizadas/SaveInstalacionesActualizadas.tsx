/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CreatePreventaParamsBase, OrdenTrabajoTSQEnum } from '@/actions/app';
import { ToastWrapper, useIsMediaQuery } from '@/shared';
import {
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';

import { OrdenTrabajo, Preventa, SolicitudServicio } from '@/shared/interfaces';
import { getKeysFormErrorsMessage } from '@/shared/utils';
import { useGenericCountdownStore, useUiConfirmModalStore } from '@/store/ui';

import { SingleImageModal } from '@/shared/components/ui';
import { Grid } from '@mui/material';
import { useGenericPATCH } from '@/actions/shared';
import { returnUrlAuditoriaInstallacionesOT } from '../../../pages/tables/AuditoriaInstalacionesMainPage';
import { InstallAsignOTSaveFormData } from '@/app/tecnico/install-asignada/shared/components/SaveOrdenTrabajo/SaveOrdenTrabajo';
import { useEffect, useState } from 'react';
import { AuditoriaInstallRequestUpdOT } from '../form';

export interface SaveInstalacionesActualizadasProps {
  title: String;
  ordenTrabajo?: OrdenTrabajo;
}

export type SaveFormDataPreventa = CreatePreventaParamsBase &
  Partial<SolicitudServicio> &
  Partial<Preventa> & {
    ordenTrabajo: OrdenTrabajo;
  };

const SaveInstalacionesActualizadas: React.FC<
  SaveInstalacionesActualizadasProps
> = ({ title, ordenTrabajo }) => {
  ///* local states ---------------------
  const [openRequestUpdOTModal, setOpenRequestUpdOTModal] = useState(false);

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* hooks ---------------------
  const navigate = useNavigate();

  // otp ------

  const clearAllTimers = useGenericCountdownStore(s => s.clearAll);

  ///* form --------------------------
  const form = useForm<InstallAsignOTSaveFormData>({});

  const { handleSubmit } = form;

  ///* mutations ---------------------
  const approveOtInstall = useGenericPATCH<any, OrdenTrabajo>(
    `/orden-trabajo/instalaciones/audit-uploaded/${ordenTrabajo?.id!}/`,
    OrdenTrabajoTSQEnum.ORDENTRABAJOS,
    {
      customMessageToast:
        'Orden de trabajo de instalación actualizada aprobada con éxito',
      navigate,
      returnUrl: returnUrlAuditoriaInstallacionesOT,
      customOnSuccess() {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  ///* handlers ---------------------
  const onSave = () => {
    setConfirmDialog({
      isOpen: true,
      title:
        '¿Estás seguro de aprobar la actualización de la orden de trabajo?',
      subtitle: 'Una vez aprobada no se podrá modificar',
      onConfirm: () => {
        approveOtInstall.mutate({});
      },
    });
  };

  const isMobile = useIsMediaQuery('sm');

  const titleAndImage = (title: string, imgUrl: string) => {
    return (
      <Grid item xs={isMobile ? 1 : 6} sx={isMobile ? { mb: 2 } : {}}>
        <CustomTypoLabel
          text={title}
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <SingleImageModal
          image={{
            id: 1,
            imgUrl: imgUrl || '',
            title: title,
          }}
          widthPercentage="60%"
        />
      </Grid>
    );
  };

  useEffect(() => {
    console.log(ordenTrabajo);
  });
  return (
    <SingleFormBoxScene
      titleNode={title}
      // action btns
      onCancel={() => {
        navigate(returnUrlAuditoriaInstallacionesOT);
        clearAllTimers();
      }}
      onReject={() => {
        setOpenRequestUpdOTModal(true);
      }}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(`Error en: ${getKeysFormErrorsMessage(errors)}`);
      })}
    >
      <>
        {ordenTrabajo && (
          <>
            <CustomTypoLabel
              text={
                ordenTrabajo.motivo_correccion
                  ? ordenTrabajo.motivo_correccion.toString()
                  : ''
              }
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />

            <CustomTypoLabel
              text={
                ordenTrabajo.observacion_correccion
                  ? ordenTrabajo.observacion_correccion.toString()
                  : ''
              }
            />
          </>
        )}

        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {ordenTrabajo && (
            <>
              {titleAndImage('Foto Ont', ordenTrabajo.url_foto_ont || '')}
              {titleAndImage(
                'Foto Potencia Ont',
                ordenTrabajo.url_foto_potencia_ont || '',
              )}
              {titleAndImage(
                'Foto Ont Encontrada en Casa',
                ordenTrabajo.url_foto_ont_encontrado_casa || '',
              )}
              {titleAndImage(
                'Foto Etiqueta',
                ordenTrabajo.url_foto_etiqueta || '',
              )}
              {titleAndImage('Foto Nap', ordenTrabajo.url_foto_nap || '')}
              {titleAndImage(
                'Foto Potencia Nap',
                ordenTrabajo.url_foto_potencia_nap || '',
              )}
              {titleAndImage('Foto Premio', ordenTrabajo.url_foto_premio || '')}
              {titleAndImage(
                'Foto Test Speed',
                ordenTrabajo.url_foto_test_speed || '',
              )}
              {titleAndImage(
                'Foto Acta Entrega Ups',
                ordenTrabajo.url_foto_acta_entrega_ups || '',
              )}
            </>
          )}
        </Grid>

        {/* ========================= modals ========================= */}
        <AuditoriaInstallRequestUpdOT
          open={openRequestUpdOTModal}
          onClose={() => setOpenRequestUpdOTModal(false)}
          ordenTrabajo={ordenTrabajo!}
        />
      </>
    </SingleFormBoxScene>
  );
};

export default SaveInstalacionesActualizadas;
