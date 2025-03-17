import { MRT_ColumnDef } from 'material-react-table';
import { IconHistory } from '@tabler/icons-react';
import { Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useMemo } from 'react';

import { ScrollableDialogProps } from '@/shared/components';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';

export type AdditionalDataModalProps = {
  Arrays?: any;
};

const getDynamicColumns = (data: any): MRT_ColumnDef<any>[] => {
  if (!data || typeof data !== 'object') return [];

  return Object.keys(data).map(key => ({
    accessorKey: key,
    header: key.toUpperCase().replace(/_/g, ' '),
    size: 150,
    enableColumnFilter: true,
    enableSorting: true,
    Cell: ({ row }) => row.original[key] || '-',
  }));
};

const AdditionalDataModal: React.FC<AdditionalDataModalProps> = ({
  Arrays = [],
}) => {
  const [open, setOpen] = useState(false);

  const dynamicColumns = useMemo(() => {
    const sampleData = Array.isArray(Arrays) ? Arrays[0] : Arrays;
    return getDynamicColumns(sampleData);
  }, [Arrays]);

  const Section = () => (
    <Grid container spacing={2} mt={2} mb={3}>
      <Grid item xs={12}>
        <SimpleTable
          columns={dynamicColumns}
          data={Array.isArray(Arrays) ? Arrays : [Arrays]}
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
        <IconHistory />
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title="Cambios"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default AdditionalDataModal;
