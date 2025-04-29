import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import {
  IconBrandCodesandbox,
  IconArrowsShuffle2,
  IconUpload,
  IconTrash,
} from '@tabler/icons-react';
import * as XLSX from 'xlsx';

import { useUiStore } from '@/store/ui';
import {
  ScrollableDialogProps,
  SelectArrayWrite,
  SimpleTable,
} from '@/shared/components';
import { emptyCellOneLevel, Producto, TABLE_CONSTANTS } from '@/shared';
import { useForm } from 'react-hook-form';

export type SeriesProductoModalProps = {
  Arrays: any;
  modalTitle?: string;
  cantidadBoolean: boolean;
  onDataChange?: (data: any[]) => void;
  tipoSerie?: boolean;
  isIngreso?: boolean;
};

export interface MaterialSeries {
  series: string;
}

interface FormValues {
  sn: string;
}

const SeriesProductoModal: React.FC<SeriesProductoModalProps> = ({
  Arrays = [],
  modalTitle = 'Serie',
  onDataChange,
  cantidadBoolean,
  tipoSerie = true,
  isIngreso = false,
}) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [dataExcel, setDataExcel] = useState<string[]>([]);
  const [dataTotal, setDataTotal] = useState<any[]>([]);
  const [cantidadTF, setCantidadTF] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const form = useForm<FormValues>({
    defaultValues: {
      sn: '',
    },
  });
  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    if (tipoSerie) {
      setData(Arrays?.ubicaciones_producto);
    } else {
      setData([]);
    }
  }, [Arrays.ubicaciones_producto, tipoSerie, Arrays]);

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
    const copiaSeries = data.find(i => i.ubicacion == Arrays.ubicacion).series;

    if (Arrays.cantidad && Arrays.cantidad > 0) {
      if (data && data.length > 0) {
        for (let i = copiaSeries.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copiaSeries[i], copiaSeries[j]] = [copiaSeries[j], copiaSeries[i]];
        }

        const cantidadReal = Math.min(Arrays.cantidad, copiaSeries.length);
        const primerosDatos = copiaSeries.slice(0, cantidadReal);
        setDataExcel(primerosDatos);
      }
    }
  };

  useEffect(() => {
    const ubicacionEncontrada =
      Arrays.ubicacion === ''
        ? []
        : (data.find(i => i.ubicacion === Arrays.ubicacion) ?? []);
    if (ubicacionEncontrada) {
      const copiaSeries = ubicacionEncontrada.series;
      setDataTotal(copiaSeries);
    } else {
      setDataTotal([]);
    }
  }, [data, Arrays.ubicacion]);

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

  const handleDeleteRow = (index: number) => {
    setDataExcel(prevData => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1); // Elimina la fila específica
      return updatedData;
    });
  };

  const handleDeleteAll = () => {
    setDataExcel([]); // Elimina todas las filas
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
        {isIngreso ? (
          <>
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
          </>
        ) : (
          <SelectArrayWrite
            label=""
            name="sn"
            control={form.control}
            error={errors.sn}
            helperText={errors.sn?.message}
            defaultValue={form.getValues('sn')}
            options={dataTotal}
            required={false}
            onChangeValue={row => {
              if (row !== null) {
                setDataExcel(prev =>
                  Array.from(new Set([...prev, String(row)])),
                );
              }
            }}
            disabled={cantidadBoolean || cantidadTF}
          />
        )}
        <Button
          onClick={handleButtonClick}
          startIcon={<IconUpload />}
          disabled={cantidadBoolean}
        >
          CARGAR EXCEL
        </Button>
        {!isIngreso ? (
          <Button
            onClick={cargarSeries}
            startIcon={<IconArrowsShuffle2 />}
            disabled={cantidadBoolean}
          >
            ALEATORIO
          </Button>
        ) : null}
      </Box>

      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<MaterialSeries>
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
        disabled={isIngreso == false ? !Arrays.ubicacion : false}
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

export default SeriesProductoModal;
