import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { ScrollableDialogProps } from '@/shared/components';
import { Button, Typography, Alert, Stack } from '@mui/material';
import { getTraficoPing } from '@/actions/app';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import {
  TABLE_CONSTANTS,
  TRAFICO_PING_TYPE_ARRAY_CHOICES,
  TraficoPing,
} from '@/shared';
import { SelectArrayStringSimple } from '../Common';

export type ModalDetallePingProps = {
  modalTitle?: string;
  viewMoreText: string;
  listItems?: Record<string, any>;
};

const ModalDetallePing: React.FC<ModalDetallePingProps> = ({
  viewMoreText,
  modalTitle = 'PING',
  listItems = {},
}) => {
  ///* local state -----------------
  const [open, setOpen] = useState(false);
  const [datoTrace, setDatoTrace] = useState<TraficoPing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  ///* form
  const { control, watch } = useForm({
    defaultValues: {
      num_ping: 4,
    },
  });

  const selectedPing = watch('num_ping');

  const callPing = async () => {
    setIsLoading(true);
    setErrorMessage(''); // Reinicia el mensaje de error en cada intento
    try {
      const pingNumber = Number(selectedPing); // Convierte el valor a número
      const response = await getTraficoPing(listItems?.ip_address, pingNumber); // Usa el número convertido
      if (response.status === 200) {
        setDatoTrace(response.console_output);
      }
    } catch (error) {
      setErrorMessage('EL PROTOCOLO ICMP NO FUE EJECUTADO CORRECTAMENTE');
    } finally {
      setIsLoading(false);
    }
  };

  // Columnas
  const columns = useMemo<MRT_ColumnDef<TraficoPing>[]>(
    () => [
      {
        accessorKey: 'Host',
        header: 'Host',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => <>{row?.original?.Host}</>,
      },
      {
        accessorKey: 'Size',
        header: 'Size',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => <>{row?.original?.Size}</>,
      },
      {
        accessorKey: 'TTL',
        header: 'TTL',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => <>{row?.original?.TTL}</>,
      },
      {
        accessorKey: 'Time',
        header: 'Time',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => <>{row?.original?.Time}</>,
      },
    ],
    [],
  );

  return (
    <>
      <Typography>
        <Button
          component="span"
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => {
            callPing();
            setOpen(!open);
          }}
          style={{ cursor: 'pointer' }}
        >
          {viewMoreText}
        </Button>
      </Typography>

      {open && (
        <ScrollableDialogProps
          open={open}
          minWidth="25%"
          onClose={() => {
            setOpen(false);
          }}
          onConfirm={() => {
            callPing();
          }}
          confirmTextBtn="REALIZAR PING"
          title={modalTitle}
          contentNode={
            <>
              <Stack direction={'row'} spacing={2}>
                <Typography
                  style={{
                    fontSize: '14px',
                    paddingTop: '10px',
                  }}
                >
                  <strong># PAQUETES:</strong>
                </Typography>
                <SelectArrayStringSimple
                  options={TRAFICO_PING_TYPE_ARRAY_CHOICES}
                  name="num_ping"
                  control={control}
                />
              </Stack>
              {errorMessage && (
                <Alert severity="error">{errorMessage}</Alert> // Muestra el mensaje de error si existe
              )}
              {!errorMessage && (
                <SimpleTable<TraficoPing>
                  columns={columns}
                  data={datoTrace || []}
                  isLoading={isLoading}
                  enableGlobalFilter={true}
                />
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default ModalDetallePing;
