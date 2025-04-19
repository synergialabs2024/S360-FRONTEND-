import { Grid } from '@mui/material';
import { MdEditDocument } from 'react-icons/md';
import { TbCancel } from 'react-icons/tb';

import { RubroTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { EstadoRubroEnumChoice, Rubro } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';

export type CustomRubroActionsBtnProps = {
  rubro: Rubro;
};

const CustomRubroActionsBtn: React.FC<CustomRubroActionsBtnProps> = ({
  rubro,
}) => {
  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ----------------
  const anularRubro = useGenericPATCH<any, any>(
    `/rubro/servicio/anular/${rubro?.id}/`,
    RubroTSQEnum.RUBROS,
    {
      customMessageToast: 'Rubro anulado correctamente',
      customOnSuccess: () => {
        setConfirmDialogIsOpen(false);
      },
    },
  );

  return (
    <>
      <Grid container item xs={12}>
        <>
          {rubro?.estado_rubro === EstadoRubroEnumChoice.NO_PAGADO ? (
            <>
              <Grid item>
                <SingleIconButton
                  label="Editar"
                  startIcon={<MdEditDocument />}
                  color="inherit"
                  onClick={() => {}}
                />
              </Grid>
              <Grid item>
                <SingleIconButton
                  label="Anular"
                  startIcon={<TbCancel />}
                  color="inherit"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Anular Rubro',
                      subtitle: `¿Está seguro que desea anular el rubro ${rubro?.numero_referencia}? Esta acción es irreversible.`,
                      onConfirm: () => {
                        anularRubro.mutate({});
                      },
                    });
                  }}
                />
              </Grid>
            </>
          ) : null}
        </>
      </Grid>
    </>
  );
};

export default CustomRubroActionsBtn;
