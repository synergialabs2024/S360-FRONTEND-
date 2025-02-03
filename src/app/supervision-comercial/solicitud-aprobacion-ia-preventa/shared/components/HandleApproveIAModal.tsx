import { SolicitudAprobacionIAPreventa } from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { Grid, Typography } from '@mui/material';

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
  const name =
    solicitudAprobacion?.preventa_data?.solicitud_servicio_data?.razon_social;
  const vendedorName = solicitudAprobacion?.vendedor_data?.razon_social;
  const contractNumber =
    solicitudAprobacion?.preventa_data?.contrato_data?.numero_contrato;

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

            <Typography></Typography>
          </Grid>
        }
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default HandleApproveIAModal;
