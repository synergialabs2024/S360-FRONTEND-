import { IconBrandCodesandbox } from '@tabler/icons-react';
import { Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

import { useFetchProductos } from '@/actions/app';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';
import { Producto, useColumnsProductosDisponibles } from '@/shared';

export type ShowSeriesModalProps = {
  Arrays: any;
};

const ShowSeriesModal: React.FC<ShowSeriesModalProps> = ({ Arrays = [] }) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [dataProducto, setDataProducto] = useState<Producto[]>([]);

  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  useEffect(() => {
    if (!productosPaging?.data?.items) return;

    const allDetalles = [];
    for (const prod of Arrays.productos) {
      const detalles = productosPaging.data.items.find(
        item => item.id === prod.producto,
      );

      if (detalles) {
        const combinedDetails = {
          ...detalles,
          cantidad: prod.cantidad,
          series: prod.series,
        };

        allDetalles.push(combinedDetails);
      }
    }

    setDataProducto(allDetalles);
  }, [Arrays, productosPaging]);

  ///* columns
  const { seriesIngresoColumns } = useColumnsProductosDisponibles();

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<Producto>
            columns={seriesIngresoColumns}
            data={dataProducto || []}
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
          cancelTextBtn="Cerrar"
          title="Productos"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowSeriesModal;
