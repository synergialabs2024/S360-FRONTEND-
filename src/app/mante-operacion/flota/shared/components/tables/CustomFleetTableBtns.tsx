import { Grid } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TbPasswordUser } from 'react-icons/tb';

import { FlotaTSQEnum } from '@/actions/app';
import { useGenericPATCH } from '@/actions/shared';
import { changePasswordSchema, Flota } from '@/shared';
import {
  CustomPasswordTextField,
  ScrollableDialogProps,
  SingleIconButton,
} from '@/shared/components';
import { useUiConfirmModalStore } from '@/store/ui';
import { yupResolver } from '@hookform/resolvers/yup';

export type CustomFleetTableBtnsProps = { fleet: Flota };

type SaveChangePasswordData = {
  password: string;
  confirm_password: string;
};

const CustomFleetTableBtns: React.FC<CustomFleetTableBtnsProps> = ({
  fleet,
}) => {
  ///* local state ------------
  const [localFleet, setLocalFleet] = useState<Flota | null>(null);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  // const [openRotateUsers, setOpenRotateUsers] = useState(false);

  ///* global state -----------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form ----------------
  const form = useForm<SaveChangePasswordData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });
  const {
    formState: { errors },
  } = form;

  ///* mutations ------------
  const changePasswordMutation = useGenericPATCH<SaveChangePasswordData, Flota>(
    `/flota/change-password/${localFleet?.id}/`,
    FlotaTSQEnum.FLOTAS,
    {
      customMessageToast: `Se ha cambiado la contraseña de la unidad ${localFleet?.name}`,
      customOnSuccess() {
        setOpenChangePassword(false);
        setLocalFleet(null);
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
        changePasswordMutation.mutate({
          password: data.password,
          confirm_password: data.confirm_password,
        });
      },
    });
    setConfirmDialogIsOpen(true);
  };

  return (
    <>
      {/* <SingleIconButton
        startIcon={<FaUserCog />}
        onClick={() => {
          setLocalFleet(fleet);
        }}
        color="inherit"
        label="Rotar Usuarios"
        tooltipPlacement="bottom"
      /> */}

      <SingleIconButton
        startIcon={<TbPasswordUser />}
        onClick={() => {
          setLocalFleet(fleet);
          setOpenChangePassword(true);
        }}
        color="inherit"
        label="Cambiar Contraseña"
        tooltipPlacement="bottom"
      />

      {/* -------------- MODALS -------------- */}
      <>
        <ScrollableDialogProps
          title={`Cambiar Contraseña: ${localFleet?.name || ''}`}
          open={openChangePassword}
          onClose={() => {
            setOpenChangePassword(false);
            setLocalFleet(null);
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

export default CustomFleetTableBtns;
