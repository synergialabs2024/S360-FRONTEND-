import { IconBrandOpenSource } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  TABLE_CONSTANTS,
  TRAFICO_PING_TYPE_ARRAY_CHOICES,
} from '@/shared/constants';
import { getTraficoPing } from '@/actions/app';
import { TraficoPing } from '@/shared/interfaces';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';
import { SelectArrayStringSimple } from '@/app/administracion-red/trafico/custom';

export type ShowPingModalProps = {
  modalTitle?: string;
  viewMoreText?: string;
  typeBtn: 'button' | 'icon';
  ipItem: string;
};

const ShowPingModal: React.FC<ShowPingModalProps> = ({
  viewMoreText = 'PING',
  modalTitle = 'PING',
  ipItem,
  typeBtn,
}) => {
  ///* local state -----------------
  const [open, setOpen] = useState(false);
  const [datoTrace, setDatoTrace] = useState<TraficoPing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  ///* form
  const { control, watch } = useForm({
    defaultValues: {
      num_ping: 4,
    },
  });

  const selectedPing = watch('num_ping');

  const callPing = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const pingNumber = Number(selectedPing);
      const response = await getTraficoPing(ipItem, pingNumber);
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
        {typeBtn == 'button' ? (
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
        ) : (
          <Tooltip title={'PING'} arrow placement="top">
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => {
                callPing();
                setOpen(!open);
              }}
              style={{ cursor: 'pointer' }}
            >
              <IconBrandOpenSource />
            </IconButton>
          </Tooltip>
        )}
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
                <Alert sx={{ m: 5 }} severity="error">
                  {errorMessage}
                </Alert>
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

export default ShowPingModal;
