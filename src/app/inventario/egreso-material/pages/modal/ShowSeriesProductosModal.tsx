import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import {
  emptyCellOneLevel,
  TABLE_CONSTANTS,
  UbicacionProducto,
} from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { Grid, IconButton } from '@mui/material';
import { IconBrandCodesandbox } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';

export type ShowSeriesProductosModalProps = {
  Arrays: any;
  serieBoolean: boolean;
};

const ShowSeriesProductosModal: React.FC<ShowSeriesProductosModalProps> = ({
  Arrays = [],
  serieBoolean,
}) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [serieR, setSerieR] = useState(false);

  useEffect(() => {
    if (serieBoolean === true) {
      setData(Arrays.series);
      setSerieR(Arrays?.requiere_series);
    } else {
      setData(Arrays.serie);
      setSerieR(Arrays?.producto_data?.requiere_series);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serieBoolean]);

  const columns = useMemo<MRT_ColumnDef<UbicacionProducto>[]>(
    () => [
      {
        header: 'NUMERO SERIE',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'series'),
      },
    ],
    [],
  );

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<{ series: string }>
            columns={columns}
            data={
              data.map((serie: any) => ({
                series: serie,
              })) || []
            }
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
          title="Series"
          contentNode={
            serieR ? <Section /> : <>PRODUCTO NO REQUIERE DE SERIE</>
          }
        />
      )}
    </>
  );
};

export default ShowSeriesProductosModal;
