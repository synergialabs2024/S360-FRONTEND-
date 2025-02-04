import { SolicitudAprobacionIAPreventaTSQEnum } from '@/actions/app/supervision-comercial';
import { useGenericPATCH } from '@/actions/shared';
import { SolicitudAprobacionIAPreventa, useIsMediaQuery } from '@/shared';
import {
  CustomCardAlert,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  ScrollableDialogProps,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import { Grid, Typography } from '@mui/material';
import { returnUrlSolicitudsAprobacionIAPreventaPage } from '../../pages/tables/SolicitudsAprobacionIAPreventaMainPage';
import { useNavigate } from 'react-router';
import { SingleImageModal } from '@/shared/components/ui';

export type HandleApproveIAModalProps = {
  solicitudAprobacion: SolicitudAprobacionIAPreventa;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const HandleApproveIAModal: React.FC<HandleApproveIAModalProps> = ({
  open,
  setOpen,
  solicitudAprobacion,
}) => {
  ///* hooks ---------------------
  const navigate = useNavigate();
  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  ///* mutations ------------------------
  const sendApprovePreventa = useGenericPATCH(
    `/solicitud-aprobacion-ia-preventa/approve/${solicitudAprobacion?.id}/`,
    SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
    {
      customMessageToast: 'Se ha realizado la aprobacion manual correctamente',
      enableNavigate: false,
      customOnSuccess: () => {
        setOpen(false);
      },
    },
  );

  const sendRejectPreventa = useGenericPATCH(
    `/solicitud-aprobacion-ia-preventa/reject/${solicitudAprobacion?.id}/`,
    SolicitudAprobacionIAPreventaTSQEnum.SOLICITUDAPROBACIONIAPREVENTAS,
    {
      customMessageToast: 'Se ha rechazado la aprobacion manual correctamente',
      enableNavigate: false,
      customOnSuccess: () => {
        setOpen(false);
      },
    },
  );

  ///* handlers ---------------------
  const onSave = async () => {
    // validate images -----------

    setConfirmDialog({
      isOpen: true,
      title: '¿Esta seguro de aprobar la preventa?',
      onConfirm: async () => {
        setConfirmDialogIsOpen(false);
        // create
        sendApprovePreventa.mutate({
          onSuccess: () => {
            navigate(returnUrlSolicitudsAprobacionIAPreventaPage);
          },
        });
      },
      confirmTextBtn: 'SI, CONTINUAR',
      cancelTextBtn: 'CERRAR',
      onClose: () => {
        setConfirmDialogIsOpen(false);
      },
    });
  };

  const handleOpenRejected = () => {
    setConfirmDialog({
      isOpen: true,
      title: '¿Esta seguro de rechazar la preventa?',
      onConfirm: async () => {
        setConfirmDialogIsOpen(false);
        // create
        sendRejectPreventa.mutate({
          onSuccess: () => {
            setOpen(false);
          },
        });
      },
      confirmTextBtn: 'SI, CONTINUAR',
      cancelTextBtn: 'CERRAR',
      onClose: () => {
        setConfirmDialogIsOpen(false);
      },
    });
  };

  const name =
    solicitudAprobacion?.preventa_data?.solicitud_servicio_data?.razon_social;
  const vendedorName = solicitudAprobacion?.vendedor_data?.razon_social;
  const contractNumber =
    solicitudAprobacion?.preventa_data?.contrato_data?.numero_contrato;

  const isMobile = useIsMediaQuery('sm');

  const titleAndImage = (title: string, imgUrl: string) => {
    return (
      <Grid item xs={isMobile ? 8 : 6} sx={isMobile ? { mb: 2 } : {}} pb={2}>
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
          widthPercentage={isMobile ? '100%' : '60%'}
        />
      </Grid>
    );
  };

  return (
    <>
      <ScrollableDialogProps
        open={open}
        title="Aprobación Manual Match Rostros"
        minWidth="72%"
        contentNode={
          <Grid item container xs={12}>
            <Typography variant="body1" gutterBottom>
              Aprobación manual de la comparación de rostros en la aceptación
              del contrato <b>{contractNumber}</b> del solicitante del servicio{' '}
              <b>{name}</b> por parte del vendedor <b>{vendedorName}</b>.
            </Typography>

            <Grid item xs={12} pt={2}>
              {' '}
              <CustomCardAlert
                sizeType="medium"
                alertSeverity="info"
                alertTitle="OBSERVACIONES"
                alertContentNode={<>{solicitudAprobacion.descripcion}</>}
              />
            </Grid>

            {titleAndImage(
              'Foto Cedula Frontal',
              solicitudAprobacion.preventa_data.url_foto_cedula_frontal || '',
            )}
            {titleAndImage(
              'Foto Aceptacion',
              solicitudAprobacion.preventa_data.url_foto_aceptacion || '',
            )}
          </Grid>
        }
        onClose={() => setOpen(false)}
        onConfirm={onSave}
        //
        additionalBtnLabel={'Rechazar'}
        additionalBtnColor="error"
        additionalBtnVariant="text"
        onAdditionalBtn={handleOpenRejected}
      />
    </>
  );
};

export default HandleApproveIAModal;
