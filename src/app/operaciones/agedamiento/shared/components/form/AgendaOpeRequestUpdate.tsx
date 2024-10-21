import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  AgendamientoTSQEnum,
  RequestUpdateAgendamientoOpe,
} from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { Agendamiento, updAgendamientoOpSchema } from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';

export type AgendaOpeRequestUpdateProps = {
  open: boolean;
  onClose: () => void;
  agendamiento: Agendamiento;
};

type SaveFormData = RequestUpdateAgendamientoOpe & {};

const AgendaOpeRequestUpdate: React.FC<AgendaOpeRequestUpdateProps> = ({
  onClose,
  open,
  agendamiento,
}) => {
  ///* form ------------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(updAgendamientoOpSchema) as any,
  });

  ///* fetch data ------------------------

  ///* mutations ------------------------
  const requestUpdData = useGenericPATCH<
    RequestUpdateAgendamientoOpe,
    Agendamiento
  >(`/agendamiento/${agendamiento?.id!}/`, AgendamientoTSQEnum.AGENDAMIENTOS, {
    customMessageToast: 'Solictud de actualización enviada con éxito',
    customOnSuccess: () => {
      handleClose();
    },
  });

  ///* handlers ------------------------
  const onSave = (data: SaveFormData) => {
    requestUpdData.mutate(data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <ScrollableDialogProps
        title={'Solicitar actualización'}
        open={open}
        onClose={handleClose}
        cancelTextBtn="Cerrar"
        contentNode={
          <Grid item container spacing={3} xs={12}>
            sss
          </Grid>
        }
        onConfirm={form.handleSubmit(onSave)}
      />
    </>
  );
};

export default AgendaOpeRequestUpdate;
