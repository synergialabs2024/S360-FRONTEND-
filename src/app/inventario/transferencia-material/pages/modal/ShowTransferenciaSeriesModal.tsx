/* eslint-disable indent */
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import {
  emptyCellNested,
  formatQuantityCell,
  IngresoMaterial,
  TABLE_CONSTANTS,
} from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { Grid, IconButton, TextField } from '@mui/material';
import { IconBrandCodesandbox } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { UbicacionProductosDisponiblesTableType } from '@/app/inventario/egreso-material/pages/modal/UbicacionProductosDisponiblesModal';
import ShowSeriesProductosModal from '@/app/inventario/egreso-material/pages/modal/ShowSeriesProductosModal';

export type ShowTransferenciaSeriesModalProps = {
  Arrays: any;
  showCurrentStockColumn?: boolean;
};

type MRTUbicacionProductoTableType = {
  row: MRT_Row<UbicacionProductosDisponiblesTableType>;
};

const ShowTransferenciaSeriesModal: React.FC<
  ShowTransferenciaSeriesModalProps
> = ({ Arrays = [], showCurrentStockColumn = true }) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* columns
  const seriesTransferenciaColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'categoria_data__name',
        header: 'CATEGORIA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['categoria_data', 'nombre']),
      },
      {
        accessorKey: 'codigo',
        header: 'CÓDIGO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'codigo']),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) =>
          emptyCellNested(row, ['producto_data', 'descripcion']),
      },
      ...(showCurrentStockColumn
        ? [
            {
              accessorKey: 'stock_actual',
              header: 'STOCK ACTUAL',
              enableColumnFilter: false,
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                formatQuantityCell(row, 'stock_actual'),
            },
          ]
        : []),
      {
        accessorKey: 'producto__requiere_series',
        header: 'CONTIENE SERIE',
        Cell: ({ row }) => {
          const requiereSeries = row?.original?.producto_data?.requiere_series;
          return <>{requiereSeries ? 'Con permiso' : 'Sin permiso'}</>;
        },
      },
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (
            <TextField
              disabled={true}
              variant="outlined"
              value={row.original.cantidad || ''}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
          return (
            <ShowSeriesProductosModal
              Arrays={row.original}
              serieBoolean={true}
            />
          );
        },
      },
    ],
    [showCurrentStockColumn],
  );

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<IngresoMaterial>
            columns={seriesTransferenciaColumns}
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

export default ShowTransferenciaSeriesModal;
