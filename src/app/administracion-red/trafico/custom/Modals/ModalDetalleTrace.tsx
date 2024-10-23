import { useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { ScrollableDialogProps } from '@/shared/components';
import { Button, Typography } from '@mui/material';
import { getTraficoTrace } from '@/actions/app';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import { TABLE_CONSTANTS, TraficoTrace } from '@/shared';

export type ModalDetalleTraceProps = {
  modalTitle?: string;
  viewMoreText: string;
  listItems?: Record<string, any>;
};

const ModalDetalleTrace: React.FC<ModalDetalleTraceProps> = ({
  viewMoreText,
  modalTitle = 'TRACEROUTE',
  listItems = {},
}) => {
  ///* local state -----------------
  const [open, setOpen] = useState(false);
  const [datoTrace, setDatoTrace] = useState<TraficoTrace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const callTrace = async () => {
    setIsLoading(true);
    try {
      const response = await getTraficoTrace(listItems?.ip_address);
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

export default ModalDetalleTrace;
