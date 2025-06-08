import { SystemUserTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { changePasswordSchema, SystemUserItem } from '@/shared';
import {
  CustomPasswordTextField,
  ScrollableDialogProps,
  SingleIconButton,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbPasswordUser } from 'react-icons/tb';

export type CustomUserTableBtnsProps = { sui: SystemUserItem };

type SaveChangePasswordData = {
  password: string;
  confirm_password?: string;
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
    resolver: yupResolver(changePasswordSchema) as any,
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });
  const {
    formState: { errors },
  } = form;

  ///* mutations
  const changePasswordMutation = useGenericPATCH<
    SaveChangePasswordData,
    SystemUserItem
  >(`/usuario/${localUserItems?.user.id}/`, SystemUserTSQEnum.SYSTEMUSERS, {
    customMessageToast: `Se ha cambiado la contraseña del usuario ${localUserItems?.user.razon_social}`,
    customOnSuccess() {
      setOpenChangePassword(false);
      setLocalUserItems(null);
      setConfirmDialogIsOpen(false);
      form.reset();
    },
  });

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
            password: data.password,
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
                name="password"
                defaultValue={form.getValues().password}
                control={form.control}
                errors={errors?.password}
                helperText={errors?.password?.message}
              />
              <CustomPasswordTextField
                label="Confirmar Nueva Contraseña"
                name="confirm_password"
                defaultValue={form.getValues().confirm_password}
                control={form.control}
                errors={errors?.confirm_password}
                helperText={errors?.confirm_password?.message}
              />
            </Grid>
          }
        />
      </>
    </>
  );
};

export default CustomUserTableBtns;
