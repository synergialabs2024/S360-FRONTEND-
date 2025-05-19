import { IconBrandFeedly } from '@tabler/icons-react';
import { useUiConfirmModalStore } from '@/store/ui';
import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import { ROUTER_PATHS } from '@/router/constants';
import { hasPermission } from '@/shared/utils/auth';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { useColumnsPlanPagoCuota } from '../columns';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';
import { DeudaCuotaEquipoVenta, PermissionsEnum } from '@/shared/interfaces';

export type ShowPPCDeudaCuotaModalProps = {
  Arrays: any;
};

export const returnUrlDeudaCuotaEquipoVentaPage =
  ROUTER_PATHS.cobranza.deudacuotaEquipoVentaNav;

const ShowPPCDeudaCuotaModal: React.FC<ShowPPCDeudaCuotaModalProps> = ({
  Arrays = [],
}) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const navigate = useNavigate();

  const onEdit = (dcev: DeudaCuotaEquipoVenta) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Deuda',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlDeudaCuotaEquipoVentaPage}/editar/${dcev.uuid}`);
      },
    });
  };

  ///* columns
  const { ppcDeudaCuotaShowColumns } = useColumnsPlanPagoCuota();

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<DeudaCuotaEquipoVenta>
            columns={ppcDeudaCuotaShowColumns}
            data={Arrays || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
            // // actions
            enableActionsColumn={hasPermission(
              PermissionsEnum.cobranza_change_deudacuotaequiposventa,
            )}
            actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
            // crud
            canEdit={hasPermission(
              PermissionsEnum.cobranza_change_deudacuotaequiposventa,
            )}
            onEdit={onEdit}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <IconButton
        component="span"
        color="primary"
        size="small"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
      >
        <IconBrandFeedly />
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          title="DEUDA"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowPPCDeudaCuotaModal;
