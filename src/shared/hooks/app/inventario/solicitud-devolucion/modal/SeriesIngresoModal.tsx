import { IconBrandCodesandbox, IconTrash } from '@tabler/icons-react';
import { Button, Grid, IconButton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { emptyCellOneLevel } from '@/shared/utils';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { IngresosDisponiblesTableType } from '../columns';
import { ScrollableDialogProps } from '@/shared/components';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import { MaterialSeries } from '@/shared/hooks/app/inventario/modals/SeriesProductoModal';

export type SeriesIngresoModalProps = {
  Arrays: any;
  modalTitle?: string;
  cantidadBoolean: boolean;
  onDataChange?: (data: any[]) => void;
  tipoSerie?: boolean;
};

const SeriesIngresoModal: React.FC<SeriesIngresoModalProps> = ({
  Arrays = [],
  modalTitle = 'Serie',
  onDataChange,
  tipoSerie = true,
}) => {
  //* State local
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (tipoSerie) {
      setData(Arrays.series);
    } else {
      setData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoSerie]);

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

  const columns = useMemo<MRT_ColumnDef<IngresosDisponiblesTableType>[]>(
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

  useEffect(() => {
    if (onDataChange) {
      onDataChange(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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

export default SeriesIngresoModal;
