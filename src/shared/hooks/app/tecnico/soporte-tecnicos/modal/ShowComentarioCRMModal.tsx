import { IconMessageFilled } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'material-react-table';
import { Grid, IconButton } from '@mui/material';
import { useMemo, useState } from 'react';

import {
  SimpleTable,
  ScrollableDialogProps,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { emptyCellOneLevel } from '@/shared/utils';
import { ComentarioCRM } from '@/shared/interfaces';
import { TABLE_CONSTANTS } from '@/shared/constants';

export type ShowComentarioCRMModalProps = {
  Arrays: ComentarioCRM[];
};

const ShowComentarioCRMModal: React.FC<ShowComentarioCRMModalProps> = ({
  Arrays,
}) => {
  //* State local
  const [open, setOpen] = useState<boolean>(false);

  const columns = useMemo<MRT_ColumnDef<ComentarioCRM>[]>(
    () => [
      {
        accessorKey: 'accion',
        header: 'ACCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'accion'),
      },
      {
        accessorKey: 'departamento',
        header: 'DEPARTAMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'departamento'),
      },
      {
        accessorKey: 'usuario',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usuario'),
      },
      {
        accessorKey: 'comentario',
        header: 'COMENTARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.comentario
            ? row.original.comentario
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Comentario de ${row?.original?.usuario}`}
            />
          );
        },
      },
    ],
    [],
  );

  const Section = () => (
    <Grid container spacing={2} mt={2} mb={3}>
      <Grid item xs={12}>
        <SimpleTable<ComentarioCRM>
          columns={columns}
          data={Arrays || []}
          isLoading={false}
          centerColumns={true}
          enableGlobalFilter={true}
        />
      </Grid>
    </Grid>
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
        <IconMessageFilled />
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title="Comentarios"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowComentarioCRMModal;
