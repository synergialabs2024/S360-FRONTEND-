import { yupResolver } from '@hookform/resolvers/yup';
import { TbPasswordUser } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { useState } from 'react';

import {
  SingleIconButton,
  ScrollableDialogProps,
  CustomPasswordTextField,
} from '@/shared/components';
import { SystemUserTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { useUiConfirmModalStore } from '@/store/ui';
import { changePasswordUserSchema, SystemUserItem } from '@/shared';

export type CustomUserTableBtnsProps = { sui: SystemUserItem };

type SaveChangePasswordData = {
  new_password: string;
  confirm_new_password?: string;
};

const CustomUserTableBtns: React.FC<CustomUserTableBtnsProps> = ({ sui }) => {
  ///* local state ------------
  const [localUserItems, setLocalUserItems] = useState<SystemUserItem | null>(
    null,
  );
  const [openChangePassword, setOpenChangePassword] = useState(false);

  ///* global state -----------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form ----------------
  const form = useForm<SaveChangePasswordData>({
    resolver: yupResolver(changePasswordUserSchema) as any,
    defaultValues: {
      new_password: '',
      confirm_new_password: '',
    },
  });
  const {
    formState: { errors },
  } = form;

  ///* mutations
  const changePasswordMutation = useGenericPATCH<
    SaveChangePasswordData,
    SystemUserItem
  >(
    `/usuario/change-password/${localUserItems?.user.id}/`,
    SystemUserTSQEnum.SYSTEMUSERS,
    {
      customMessageToast: `Se ha cambiado la contraseña del usuario ${localUserItems?.user.razon_social}`,
      customOnSuccess() {
        setOpenChangePassword(false);
        setLocalUserItems(null);
        setConfirmDialogIsOpen(false);
        form.reset();
      },
    },
  );

  ///* handlers ------------
  const onSave = (data: SaveChangePasswordData) => {
    setConfirmDialog({
      isOpen: true,
      title: '¿Está seguro de cambiar la contraseña?',
      subtitle:
        'Si cambia la contraseña, se cerrará la sesión de este usuario.',
      onConfirm: () => {
        if (localUserItems?.user) {
          changePasswordMutation.mutate({
            new_password: data.new_password,
            confirm_new_password: data.confirm_new_password,
          });
        }
      },
    });

    setConfirmDialogIsOpen(true);
  };

  return (
    <>
      <SingleIconButton
        startIcon={<TbPasswordUser />}
        onClick={() => {
          setLocalUserItems(sui);
          setOpenChangePassword(true);
        }}
        color="inherit"
        label="Cambiar Contraseña"
        tooltipPlacement="bottom"
        disabled={!sui.user.state}
      />

      {/* -------------- MODALS -------------- */}
      <>
        <ScrollableDialogProps
          title={`Cambiar Contraseña: ${localUserItems?.user.razon_social || ''}`}
          open={openChangePassword}
          onClose={() => {
            setOpenChangePassword(false);
            setLocalUserItems(null);
            form.reset();
            setConfirmDialogIsOpen(false);
          }}
          onConfirm={form.handleSubmit(onSave)}
          contentNode={
            <Grid item container spacing={3} py={3}>
              <CustomPasswordTextField
                label="Nueva Contraseña"
                name="new_password"
                defaultValue={form.getValues().new_password}
                control={form.control}
                errors={errors?.new_password}
                helperText={errors?.new_password?.message}
              />
              <CustomPasswordTextField
                label="Confirmar Nueva Contraseña"
                name="confirm_new_password"
                defaultValue={form.getValues().confirm_new_password}
                control={form.control}
                errors={errors?.confirm_new_password}
                helperText={errors?.confirm_new_password?.message}
              />
            </Grid>
          }
        />
      </>
    </>
  );
};

export default CustomUserTableBtns;
