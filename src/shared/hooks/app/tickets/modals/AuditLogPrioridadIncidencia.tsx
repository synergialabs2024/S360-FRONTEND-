import { IconHistory } from '@tabler/icons-react';
import { Grid, IconButton } from '@mui/material';
import { useState } from 'react';

import { ScrollableDialogProps } from '@/shared/components';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import { useColumnsPrioridadIncidenciaTM } from '../prioridad-incidencia-tm';

export type AuditLogPrioridadIncidenciaProps = {
  Arrays: any;
};

const AuditLogPrioridadIncidencia: React.FC<
  AuditLogPrioridadIncidenciaProps
> = ({ Arrays = [] }) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* columns
  const { prioridadincidenciaHistorialColumns } =
    useColumnsPrioridadIncidenciaTM();

  const Section = () => (
    <Grid container spacing={2} mt={2} mb={3}>
      <Grid item xs={12}>
        <SimpleTable<{}>
          columns={prioridadincidenciaHistorialColumns || []}
          data={Arrays || []}
          isLoading={false}
          centerColumns={true}
          enableGlobalFilter={true}
        />
      </Grid>
    </Grid>
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
        <IconHistory />
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title="Prioridad Incidencia"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default AuditLogPrioridadIncidencia;
