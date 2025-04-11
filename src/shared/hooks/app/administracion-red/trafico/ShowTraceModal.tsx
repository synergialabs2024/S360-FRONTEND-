import { getTraficoTrace } from '@/actions/app';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { TraficoTrace } from '@/shared/interfaces';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import { IconRadar } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';

export type ShowTraceModalProps = {
  modalTitle?: string;
  viewMoreText?: string;
  typeBtn: 'button' | 'icon';
  ipItem: string;
};

const ShowTraceModal: React.FC<ShowTraceModalProps> = ({
  viewMoreText = 'TRACING',
  modalTitle = 'TRACING',
  ipItem,
  typeBtn,
}) => {
  ///* local state -----------------
  const [open, setOpen] = useState(false);
  const [datoTrace, setDatoTrace] = useState<TraficoTrace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const callTrace = async () => {
    setIsLoading(true);
    try {
      const response = await getTraficoTrace(ipItem);
      console.log(response);
      if (response.status === 200) {
        setDatoTrace(response.console_output);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Columnas
  const columns = useMemo<MRT_ColumnDef<TraficoTrace>[]>(
    () => [
      {
        accessorKey: 'Address',
        header: 'Address',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => <>{row?.original?.Address}</>,
      },
      {
        accessorKey: 'Loss',
        header: 'Loss',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => <>{row?.original?.Loss}</>,
      },
      {
        accessorKey: 'Last',
        header: 'Last',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => <>{row?.original?.Last}</>,
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
              callTrace();
              setOpen(!open);
            }}
            style={{ cursor: 'pointer' }}
          >
            {viewMoreText}
          </Button>
        ) : (
          <Tooltip title={'TRACING'} arrow placement="top">
            <IconButton
              component="span"
              color="primary"
              size="small"
              onClick={() => {
                callTrace();
                setOpen(!open);
              }}
              style={{ cursor: 'pointer' }}
            >
              <IconRadar />
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
          title={modalTitle}
          contentNode={
            <SimpleTable<TraficoTrace>
              columns={columns}
              data={datoTrace || []}
              isLoading={isLoading}
              enableGlobalFilter={true}
            />
          }
        />
      )}
    </>
  );
};

export default ShowTraceModal;
