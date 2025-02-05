import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';

import { Producto } from '@/shared/interfaces';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import { ScrollableDialogProps } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { emptyCellOneLevel } from '@/shared/utils';
import { useUiStore } from '@/store/ui';
import {
  IconArrowsShuffle2,
  IconBrandCodesandbox,
  IconTrash,
} from '@tabler/icons-react';
import { MaterialSeries } from '@/shared/hooks/app/inventario/modals/SeriesProductoModal';

export type SeriesSolicitudTranferenciaModalProps = {
  Arrays: any;
  modalTitle?: string;
  cantidadBoolean: boolean;
  onDataChange?: (data: any[]) => void;
  tipoSerie?: boolean;
};

const SeriesSolicitudTranferenciaModal: React.FC<
  SeriesSolicitudTranferenciaModalProps
> = ({
  Arrays = [],
  modalTitle = 'Serie',
  onDataChange,
  cantidadBoolean,
  tipoSerie = true,
}) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [cantidadTF, setCantidadTF] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [dataSeries, setDataSeries] = useState<any[]>([]);

  useEffect(() => {
    if (tipoSerie) {
      setData(Array.isArray(Arrays?.series) ? [...Arrays.series] : []);
      setDataSeries(Array.isArray(Arrays?.series) ? [...Arrays.series] : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoSerie]);

  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  const serieIndividualRef = useRef<HTMLInputElement>(null);

  const cargarSeries = () => {
    setIsGlobalLoading(true);

    console.log([...dataSeries]);

    if (Arrays.cantidad && Arrays.cantidad > 0) {
      const shuffledData = [...dataSeries];

      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      }

      const cantidadReal = Math.min(Arrays.cantidad, shuffledData.length);
      const primerosDatos = shuffledData.slice(0, cantidadReal);

      setData(primerosDatos);
    }

    setIsGlobalLoading(false);
  };

  const handleSeriesChange = () => {
    setIsGlobalLoading(true);
    if (serieIndividualRef.current) {
      const value = serieIndividualRef.current.value;

      if (!value) return setIsGlobalLoading(false);
      if (data.length >= Arrays.cantidad) return setIsGlobalLoading(false);

      console.log(value);
      setData(prevData => [...prevData, value]);
    }
    setIsGlobalLoading(false);
  };

  const handleDeleteRow = (index: number) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };

  const handleDeleteAll = () => {
    setData([]);
  };

  useEffect(() => {
    if (onDataChange) {
      onDataChange(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data.length >= Arrays.cantidad) {
      setCantidadTF(true);
    } else {
      setCantidadTF(false);
    }
  }, [data, Arrays.cantidad]);

  const columns = useMemo<MRT_ColumnDef<Producto>[]>(
    () => [
      {
        accessorKey: 'series',
        header: 'SERIES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'series'),
      },
      {
        id: 'acciones', // Columna para acciones
        header: 'Acciones',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => (
          <IconButton color="error" onClick={() => handleDeleteRow(row.index)}>
            <IconTrash />
          </IconButton>
        ),
      },
    ],
    [],
  );

  const ExcelSection = () => (
    <>
      <Box display="flex" gap={2} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Button
              onClick={cargarSeries}
              startIcon={<IconArrowsShuffle2 />}
              disabled={cantidadBoolean}
            >
              ALEATORIO
            </Button>
          </Grid>
          <Grid container item xs={5}>
            <Grid sx={{ mt: -1 }}>
              <TextField
                inputRef={serieIndividualRef}
                label="Número de Serie"
                variant="outlined"
              />
            </Grid>
            <Grid sx={{ mt: -0.5, ml: 1 }}>
              <Button
                onClick={handleSeriesChange}
                disabled={cantidadBoolean || cantidadTF}
              >
                Añadir
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<MaterialSeries>
            columns={columns}
            data={
              data.map(serie => ({
                series: serie,
              })) || []
            }
            isLoading={false}
            enableGlobalFilter={true}
            centerColumns={true}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleDeleteAll}
            color="error"
            variant="contained"
            startIcon={<IconTrash />}
          >
            Eliminar Todo
          </Button>
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
          cancelTextBtn="Guardar cambios"
          title={modalTitle}
          contentNode={
            Arrays?.requiere_series ? (
              <ExcelSection />
            ) : (
              <>PRODUCTO NO REQUIERE DE SERIE</>
            )
          }
        />
      )}
    </>
  );
};

export default SeriesSolicitudTranferenciaModal;
