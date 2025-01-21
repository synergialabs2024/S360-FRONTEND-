import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import { IngresoMaterial } from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { Grid, IconButton } from '@mui/material';
import { IconBrandCodesandbox } from '@tabler/icons-react';
import { useState } from 'react';
import { useColumnsSolicitudMaterialProductos } from '../../shared/hooks/useColumnsSolicitudMaterialProductos';

export type ShowSeriesModalProps = {
  Arrays: any;
};

const ShowSolicitudMaterialModal: React.FC<ShowSeriesModalProps> = ({
  Arrays = [],
}) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* columns
  const { seriesIngresoColumns } = useColumnsSolicitudMaterialProductos();

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<IngresoMaterial>
            columns={seriesIngresoColumns}
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

export default ShowSolicitudMaterialModal;
