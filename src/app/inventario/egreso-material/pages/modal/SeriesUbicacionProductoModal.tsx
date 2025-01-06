import { useMemo, useState, useEffect } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import * as XLSX from 'xlsx';
import { IoMdTrash } from 'react-icons/io';
import { Button, Grid, IconButton } from '@mui/material';
import { IconBrandCodesandbox, IconUpload } from '@tabler/icons-react';

import {
  EgresoMaterialSeries,
  emptyCellOneLevel,
  TABLE_CONSTANTS,
  UbicacionProducto,
} from '@/shared';
import { ScrollableDialogProps, SingleIconButton } from '@/shared/components';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';

export type SeriesUbicacionProductoModalProps = {
  dataArray: string[];
  requiereSerie?: boolean;
  modalTitle?: string;
  viewMoreText?: string;
  onDataChange?: (data: any[]) => void; // Callback para enviar los datos
};

const SeriesUbicacionProductoModal: React.FC<
  SeriesUbicacionProductoModalProps
> = ({
  dataArray = [],
  modalTitle = 'Serie',
  onDataChange,
  requiereSerie = false,
}) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [dataExcel, setDataExcel] = useState<any[]>([]);

  ///* Effects
  useEffect(() => {
    const transformedArray = dataArray.map(item => ({ series: item }));
    setDataExcel(transformedArray);
  }, [dataArray]);

  useEffect(() => {
    if (onDataChange && dataExcel.length > 0) {
      const transformedData = dataExcel.map(item => item.series);
      onDataChange(transformedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataExcel]);

  const handleUploadFile = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setDataExcel(jsonData);
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eliminarSerie = (index: number) => {
    // Eliminamos la serie del estado
    const newData = dataExcel.filter((_, idx) => idx !== index);
    setDataExcel(newData);
  };

  const columns = useMemo<MRT_ColumnDef<UbicacionProducto>[]>(
    () => [
      {
        accessorKey: 'series',
        header: 'SERIES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'series'),
      },
      {
        accessorKey: 'remove',
        header: 'ACCIONES',
        Cell: ({ row }) => (
          <SingleIconButton
            label="Remover"
            startIcon={<IoMdTrash />}
            color="error"
            tooltipPlacement="right-end"
            onClick={() => eliminarSerie(row.index)}
            justifyContent="center"
          />
        ),
      },
    ],
    [eliminarSerie],
  );

  const ExcelSection = () => (
    <>
      <Button onClick={handleButtonClick} startIcon={<IconUpload />}>
        CARGAR EXCEL
      </Button>

      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<EgresoMaterialSeries>
            columns={columns}
            data={dataExcel || []}
            isLoading={false}
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
          title={modalTitle}
          contentNode={
            requiereSerie ? (
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

export default SeriesUbicacionProductoModal;
