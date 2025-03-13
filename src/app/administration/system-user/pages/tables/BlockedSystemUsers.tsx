import { useState } from 'react';
import { IoIosUnlock } from 'react-icons/io';

import { SystemUserTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useUiConfirmModalStore } from '@/store/ui';
import CommonSystemUsersPage from './CommonSystemUsersPage';

export const returnUrlSystemBlockedSystemUsers =
  ROUTER_PATHS.administracion.usuariosNav;

export type BlockedSystemUsersProps = {};

const BlockedSystemUsers: React.FC<BlockedSystemUsersProps> = () => {
  useCheckPermission(PermissionsEnum.users_view_user);

  ///* local state
  const [selectedUUID, setSelectedUUID] = useState<number | null>(null);

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const ublockUserMutation = useGenericPATCH<any, any>(
    `/usuario/unblock/${selectedUUID}/`,
    SystemUserTSQEnum.SYSTEMUSERS,
    {
      customMessageToast: 'Usuario desbloqueado con éxito',
      customOnSuccess: () => {
        setSelectedUUID(null);
        setConfirmDialogIsOpen(false);
      },
    },
  );

  return (
    <CommonSystemUsersPage
      title="Usuarios Bloqueados"
      custoEditIcon={<IoIosUnlock />}
      customEditIconToolTipTitle="Desbloquear"
      customParams={{
        is_blocked: true,
      }}
      customOnEdit={systemUserItem => {
        setConfirmDialog({
          isOpen: true,
          title: 'Desbloquear Usuario',
          subtitle:
            '¿Está seguro que desea desbloquear el usuario? Con esta acción el usuario podrá ingresar al sistema nuevamente.',
          onConfirm: () => {
            setSelectedUUID(systemUserItem?.user?.id!);

            ublockUserMutation.mutate({
              intentos_fallidos: 0,
            });
          },
        });
      }}
    />
  );
};

export default BlockedSystemUsers;
