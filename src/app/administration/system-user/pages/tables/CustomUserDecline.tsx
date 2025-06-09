import { IconUserCancel } from '@tabler/icons-react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { SystemUserItem } from '@/shared';
import { SystemUserTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { SingleIconButton, ScrollableDialogProps } from '@/shared/components';

export type CustomUserDeclineProps = { sui: SystemUserItem };

const CustomUserDecline: React.FC<CustomUserDeclineProps> = ({ sui }) => {
  ///* local state ------------
  const [localUserItems, setLocalUserItems] = useState<SystemUserItem | null>(
    null,
  );
  const [openChangeDecline, setOpenChangeDecline] = useState(false);

  ///* global state -----------
  const setConfirmDialog2 = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen2 = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeDeclineMutation = useGenericPATCH(
    `/usuario/deactivate/${localUserItems?.user.id}/`,
    SystemUserTSQEnum.SYSTEMUSERS,
    {
      customMessageToast: `Se ha inhabilitado el usuario ${localUserItems?.user.razon_social}`,
      customOnSuccess() {
        setOpenChangeDecline(false);
        setLocalUserItems(null);
        setConfirmDialogIsOpen2(false); // ✅ cerrar el modal aquí
      },
    },
  );

  const onSaveDecline = () => {
    setConfirmDialog2({
      isOpen: true,
      title: '¿Está seguro que deseas inhabilitar este usuario?',
      subtitle: 'Al inhabilitarlo, no podrá iniciar sesión este usuario.',
      onConfirm: () => {
        if (localUserItems?.user) {
          changeDeclineMutation.mutate({});
        }
      },
    });

    setConfirmDialogIsOpen2(true);
  };

  return (
    <>
      <SingleIconButton
        startIcon={<IconUserCancel />}
        onClick={() => {
          setLocalUserItems(sui);
          setOpenChangeDecline(true);
        }}
        color="inherit"
        label="Inhabilitar usuario"
        tooltipPlacement="bottom"
        disabled={!sui.user.state}
      />

      {/* -------------- MODALS -------------- */}
      <ScrollableDialogProps
        title={`Inhabilitar: ${localUserItems?.user.razon_social || ''}`}
        open={openChangeDecline}
        onClose={() => {
          setOpenChangeDecline(false);
          setLocalUserItems(null);
          setConfirmDialogIsOpen2(false);
        }}
        onConfirm={onSaveDecline}
        contentNode={
          <Box py={3} ml={5} mt={2}>
            <Typography variant="body1" color="text.secondary">
              Una vez inhabilitado, este usuario no solo no podrá iniciar
              sesión, no podrá habilitarse nuevamente.
            </Typography>
          </Box>
        }
      />
    </>
  );
};

export default CustomUserDecline;
