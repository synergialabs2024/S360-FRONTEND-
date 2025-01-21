/* eslint-disable indent */
import { Grid, IconButton, TextField } from '@mui/material';
import { IconBrandCodesandbox } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import {
  emptyCellNested,
  emptyCellOneLevel,
  IngresoMaterial,
  TABLE_CONSTANTS,
  UbicacionProducto,
} from '@/shared';
import { ScrollableDialogProps } from '@/shared/components';
import { UbicacionProductosDisponiblesTableType } from '@/app/inventario/egreso-material/pages/modal/UbicacionProductosDisponiblesModal';

export type ShowTransferenciaSeriesModalProps = {
  Arrays: any;
};

const ShowTransferenciaSeriesModal: React.FC<
  ShowTransferenciaSeriesModalProps
> = ({ Arrays = [] }) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

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
      {
        accessorKey: 'stock_actual',
        header: 'STOCK ACTUAL',
        enableColumnFilter: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'stock_actual'),
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
        accessorKey: 'producto__requiere_series',
        header: 'CONTIENE SERIE',
        Cell: ({ row }) => {
          const requiereSeries = row?.original?.producto_data?.requiere_series;
          return <>{requiereSeries ? 'Con permiso' : 'Sin permiso'}</>;
        },
      },
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
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
                      row.original.serie
                        ? row.original.serie.map((serie: any) => ({
                            series: serie,
                          }))
                        : []
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
                onClick={() => setOpen2(!open2)}
                style={{ cursor: 'pointer' }}
              >
                <IconBrandCodesandbox />
              </IconButton>
              {open2 && (
                <ScrollableDialogProps
                  open={open2}
                  onClose={() => setOpen2(false)}
                  confirmTextBtn="Aceptar"
                  onConfirm={() => setOpen2(false)}
                  title="Series"
                  contentNode={
                    row.original.producto_data?.requiere_series ? (
                      <Section />
                    ) : (
                      <>PRODUCTO NO REQUIERE DE SERIE</>
                    )
                  }
                />
              )}
            </>
          );
        },
      },
    ],
    [open2],
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
