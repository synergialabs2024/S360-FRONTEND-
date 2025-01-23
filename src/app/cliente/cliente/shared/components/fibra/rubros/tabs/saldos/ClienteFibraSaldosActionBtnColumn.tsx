import { Grid } from '@mui/material';
import { IoMdTrash } from 'react-icons/io';

import { SaldoTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { EstadoSaldoEnumChoice, Saldo } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';

export type ClienteFibraSaldosActionBtnColumnProps = {
  saldo: Saldo;
};

const ClienteFibraSaldosActionBtnColumn: React.FC<
  ClienteFibraSaldosActionBtnColumnProps
> = ({ saldo }) => {
  const saldoState: EstadoSaldoEnumChoice = saldo?.estado_saldo;

  ///* global state -------------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations -------------------------
  const softDelSaldo = useGenericPATCH<any, Saldo>(
    `/saldo/soft-delete/${saldo.id}/`,
    SaldoTSQEnum.SALDOS,
    {
      customMessageToast: 'Saldo invalidado con éxito',
      customOnSuccess: () => {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  return (
    <>
      <Grid item container xs={12} spacing={1}>
        <Grid item>
          {saldoState === EstadoSaldoEnumChoice.NO_APLICADO && (
            <SingleIconButton
              label="Eliminar"
              startIcon={<IoMdTrash />}
              color="error"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Eliminar Saldo',
                  subtitle: '¿Está seguro que desea invalidar este saldo?',
                  onConfirm: () => {
                    softDelSaldo.mutate({});
                  },
                });
              }}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ClienteFibraSaldosActionBtnColumn;
