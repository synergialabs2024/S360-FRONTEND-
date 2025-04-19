import { Grid } from '@mui/material';
import { useState } from 'react';
import { MdEditDocument } from 'react-icons/md';
import { TbCancel } from 'react-icons/tb';

import { RubroTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { EstadoRubroEnumChoice, Rubro } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { useRubroStore } from '@/store/app/rubros';
import { useUiConfirmModalStore } from '@/store/ui';
import { ClienteFibraEditServiceRubroModal } from '../servicio';

export type CustomRubroActionsBtnProps = {
  rubro: Rubro;
};

const CustomRubroActionsBtn: React.FC<CustomRubroActionsBtnProps> = ({
  rubro,
}) => {
  ///* local state ----------------
  const [isOpenServiceRubroModal, setIsOpenServiceRubroModal] =
    useState<boolean>(false);

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );
  const setActiveRubro = useRubroStore(s => s.setActiveRubro);

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
                  onClick={() => {
                    setActiveRubro(rubro);
                    setIsOpenServiceRubroModal(true);
                  }}
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

      <>
        <ClienteFibraEditServiceRubroModal
          open={isOpenServiceRubroModal}
          onClose={() => setIsOpenServiceRubroModal(false)}
        />
      </>
    </>
  );
};

export default CustomRubroActionsBtn;
