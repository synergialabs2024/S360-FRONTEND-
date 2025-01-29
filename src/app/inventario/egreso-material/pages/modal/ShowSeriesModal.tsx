import { useState } from 'react';
import { IconBrandCodesandbox } from '@tabler/icons-react';
import { Grid, IconButton } from '@mui/material';

import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import { IngresoMaterial } from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { useColumnsUbicacionProductosDisponibles } from '../../shared/hooks';
import { useColumnsProductosDisponibles } from '@/app/inventario/ingreso-material/shared/hooks';

export type ShowSeriesModalProps = {
  Arrays: any;
  productoBoolean: boolean;
};

const ShowSeriesModal: React.FC<ShowSeriesModalProps> = ({
  Arrays = [],
  productoBoolean,
}) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* columns
  const { seriesEgresoColumns } = useColumnsUbicacionProductosDisponibles();
  const { seriesIngresoColumns } = useColumnsProductosDisponibles();

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<IngresoMaterial>
            columns={
              productoBoolean ? seriesIngresoColumns : seriesEgresoColumns
            }
            data={Arrays || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
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
        <IconBrandCodesandbox />
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          confirmTextBtn="Aceptar"
          onConfirm={() => setOpen(false)}
          title="Productos"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowSeriesModal;
