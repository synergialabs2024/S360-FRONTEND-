import { useMemo, useState, useEffect, useRef } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import * as XLSX from 'xlsx';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import {
  IconArrowsShuffle2,
  IconBrandCodesandbox,
  IconUpload,
} from '@tabler/icons-react';

import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import { ScrollableDialogProps } from '@/shared/components';
import {
  emptyCellOneLevel,
  IngresoMaterialSeries,
  TABLE_CONSTANTS,
  Producto,
} from '@/shared';
import { useUiStore } from '@/store/ui';

export type SeriesProductoModalProps = {
  Arrays: any;
  modalTitle?: string;
  cantidadBoolean: boolean;
  onDataChange?: (data: any[]) => void;
};

const SeriesProductoModal: React.FC<SeriesProductoModalProps> = ({
  Arrays = [],
  modalTitle = 'Serie',
  onDataChange,
  cantidadBoolean,
}) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [dataExcel, setDataExcel] = useState<any[]>([]);
  const [cantidadTF, setCantidadTF] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<any[]>(Arrays.series);

  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  const serieIndividualRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = async (file: File) => {
    setIsGlobalLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet) as {
        [key: string]: string;
      }[];

      const transformedData = jsonData.map(item => {
        const firstKey = Object.keys(item)[0];
        return item[firstKey];
      });

      const limitedData = transformedData.slice(0, Arrays.cantidad);

      setDataExcel(limitedData);
      setIsGlobalLoading(false);
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      setIsGlobalLoading(false);
    }
  };

  const handleButtonClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls, .csv';
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleUploadFile(file);
      }
    };
    input.click();
  };

  const cargarSeries = () => {
    const copiaSeries = [...data];

    if (Arrays.cantidad && Arrays.cantidad > 0) {
      if (data && data.length > 0) {
        for (let i = copiaSeries.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copiaSeries[i], copiaSeries[j]] = [copiaSeries[j], copiaSeries[i]];
        }

        const cantidadReal = Math.min(Arrays.cantidad, copiaSeries.length);
        const primerosDatos = copiaSeries.slice(0, cantidadReal);

        setDataExcel(primerosDatos);
      } else {
        console.log("El array 'data' está vacío o no es válido.");
      }
    } else {
      console.log('La cantidad no es válida o es 0.');
    }
  };

  const handleSeriesChange = () => {
    setIsGlobalLoading(true);
    if (serieIndividualRef.current) {
      const value = serieIndividualRef.current.value;

      if (!value) return setIsGlobalLoading(false);
      if (dataExcel.length >= Arrays.cantidad) return setIsGlobalLoading(false);

      setDataExcel(prevData => [...prevData, value]);
      setIsGlobalLoading(false);
    }
  };

  useEffect(() => {
    if (onDataChange) {
      onDataChange(dataExcel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataExcel]);

  useEffect(() => {
    // Actualizamos cantidadBoolean dependiendo de la longitud de dataExcel
    if (dataExcel.length >= Arrays.cantidad) {
      setCantidadTF(true); // Deshabilita el botón si se alcanzó el límite
    } else {
      setCantidadTF(false); // Habilita el botón si no se ha alcanzado el límite
    }
  }, [dataExcel, Arrays.cantidad]);

  const columns = useMemo<MRT_ColumnDef<Producto>[]>(
    () => [
      {
        accessorKey: 'series',
        header: 'SERIES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'series'),
      },
    ],
    [],
  );

  const ExcelSection = () => (
    <>
      <Box display="flex" gap={2}>
        <Button
          onClick={handleButtonClick}
          startIcon={<IconUpload />}
          disabled={cantidadBoolean}
        >
          CARGAR EXCEL
        </Button>
        <Button
          onClick={cargarSeries}
          startIcon={<IconArrowsShuffle2 />}
          disabled={cantidadBoolean}
        >
          ALEATORIO
        </Button>
        <TextField
          inputRef={serieIndividualRef}
          label="Número de Serie"
          variant="outlined"
        />
        <Button
          onClick={handleSeriesChange}
          disabled={cantidadBoolean || cantidadTF}
        >
          Añadir
        </Button>
      </Box>

      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<IngresoMaterialSeries>
            columns={columns}
            data={
              dataExcel.map(serie => ({
                series: serie,
              })) || []
            }
            isLoading={false}
            enableGlobalFilter={true}
            centerColumns={true}
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

export default SeriesProductoModal;
