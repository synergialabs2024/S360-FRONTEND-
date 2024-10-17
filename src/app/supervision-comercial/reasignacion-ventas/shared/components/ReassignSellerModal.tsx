import { Grid } from '@mui/material';
import React, { useState } from 'react';

import { useUpdateSolicitudServicio } from '@/actions/app';
import { useFetchSystemUsersWithDebounce } from '@/app/supervision-comercial/reasignacion-ventas/shared/hooks/useFetchSystemUsersWithDebounce';
import { gridSizeMdLg6, ToastWrapper } from '@/shared';
import {
  CustomTextFieldNoForm,
  ScrollableDialogProps,
} from '@/shared/components';
import CustomAutocompletSearchNoForm from '@/shared/components/CustomAutocompletes/CustomAutocompletSearchNoForm';
import { SolicitudServicio, SystemUser } from '@/shared/interfaces';

type ReassignSellerModalProps = {
  open: boolean;
  onClose: () => void;
  solicitudServicio: SolicitudServicio;
};

const ReassignSellerModal: React.FC<ReassignSellerModalProps> = ({
  open,
  onClose,
  solicitudServicio,
}) => {
  const [selectedVendedor, setSelectedVendedor] = useState<SystemUser | null>(
    null,
  );

  const { users, isLoadingUsers, onChangeFilterUser } =
    useFetchSystemUsersWithDebounce();

  const updateSolicitudServicioMutation = useUpdateSolicitudServicio({
    customMessageToast: 'Vendedor reasignado correctamente',
    customOnSuccess: () => {
      onClose();
    },
  });

  const handleConfirm = () => {
    if (!selectedVendedor) {
      ToastWrapper.error('Debe seleccionar un nuevo vendedor');
      return;
    }

    updateSolicitudServicioMutation.mutate({
      id: solicitudServicio?.id!,
      data: {
        vendedor: selectedVendedor.id,
      },
    });
  };

  return (
    <ScrollableDialogProps
      open={open}
      onClose={onClose}
      title="Reasignar Vendedor"
      confirmTextBtn="Reasignar"
      onConfirm={handleConfirm}
      contentNode={
        <Grid container spacing={2}>
          <CustomTextFieldNoForm
            label="Vendedor Actual"
            value={solicitudServicio?.vendedor_data?.razon_social || 'N/A'}
            disabled
          />

          <CustomAutocompletSearchNoForm<SystemUser>
            label="Nuevo Vendedor"
            options={
              (users
                .map(u => ({
                  id: u.user?.id || 0,
                  razon_social: u.user?.razon_social || '',
                }))
                .filter(
                  u => u.id !== solicitudServicio?.vendedor_data?.id,
                ) as unknown as SystemUser[]) || []
            }
            valueKey="razon_social"
            actualValueKey="id"
            onChangeInputText={onChangeFilterUser}
            onChangeRawValue={user => {
              setSelectedVendedor(user);
            }}
            isLoadingData={isLoadingUsers}
            size={gridSizeMdLg6}
          />
        </Grid>
      }
    />
  );
};

export default ReassignSellerModal;
