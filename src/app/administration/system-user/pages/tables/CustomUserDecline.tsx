import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { SingleIconButton, ScrollableDialogProps } from '@/shared/components';
import { SystemUserTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { SystemUserItem } from '@/shared';
import { IconUserCancel } from '@tabler/icons-react';

export type CustomUserDeclineProps = { sui: SystemUserItem };

const CustomUserDecline: React.FC<CustomUserDeclineProps> = ({ sui }) => {
  ///* local state ------------
  const [localUserItems, setLocalUserItems] = useState<SystemUserItem | null>(
    null,
  );
  const [openChangeDecline, setOpenChangeDecline] = useState(false);

  ///* global state -----------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
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
        setConfirmDialogIsOpen(false);
      },
    },
  );

  const onSaveDecline = () => {
    setConfirmDialog({
      isOpen: true,
      title: '¿Está seguro que deseas inhabilitar este usuario?',
      subtitle: 'Al inhabilitarlo, no podra iniciar sesión este usuario.',
      onConfirm: () => {
        if (localUserItems?.user) {
          changeDeclineMutation.mutate({});
          setConfirmDialogIsOpen(false);
        }
      },
    });

    setConfirmDialogIsOpen(false);
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
      />

      {/* -------------- MODALS -------------- */}
      <>
        <ScrollableDialogProps
          title={`Inhabilitar: ${localUserItems?.user.razon_social || ''}`}
          open={openChangeDecline}
          onClose={() => {
            setOpenChangeDecline(false);
            setLocalUserItems(null);
            setConfirmDialogIsOpen(false);
          }}
          onConfirm={onSaveDecline}
          contentNode={
            <Box py={3} ml={5} mt={2}>
              <Typography variant="body1" color="text.secondary">
                Una vez inhabilitado, este usuario no solo no podrá iniciar
                sesión, no podra habilitarse nuevamente
              </Typography>
            </Box>
          }
        />
      </>
    </>
  );
};

export default CustomUserDecline;
