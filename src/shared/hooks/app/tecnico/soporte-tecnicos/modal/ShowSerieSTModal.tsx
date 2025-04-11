import { IconBrandCodesandbox } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'material-react-table';
import { Grid, IconButton } from '@mui/material';
import { useMemo, useState } from 'react';

import { emptyCellOneLevel } from '@/shared/utils';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';

export type ShowSerieSTModalProps = {
  Arrays: any;
};

const ShowSerieSTModal: React.FC<ShowSerieSTModalProps> = ({ Arrays = [] }) => {
  //* State local
  const [open, setOpen] = useState(false);

  const columns = useMemo<MRT_ColumnDef<{ series: string }>[]>(
    () => [
      {
        header: 'NUMERO SERIE',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'series'),
      },
    ],
    [],
  );

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<{ series: string }>
            columns={columns}
            data={
              Arrays.map((serie: any) => ({
                series: serie,
              })) || []
            }
            isLoading={false}
            centerColumns={true}
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
          cancelTextBtn="Cerrar"
          title="Series"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowSerieSTModal;
