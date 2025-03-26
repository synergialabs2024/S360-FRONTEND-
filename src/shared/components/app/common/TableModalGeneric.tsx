import { MRT_ColumnDef } from 'material-react-table';
import { IconHistory } from '@tabler/icons-react';
import { Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { useMemo } from 'react';

import { ScrollableDialogProps } from '@/shared/components';
import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';

export type TableModalGenericProps = {
  Arrays: any;
  Title?: string;
  icon?: React.ReactNode;
};

const getDynamicColumns = (data: any): MRT_ColumnDef<any>[] => {
  if (!data || typeof data !== 'object') return [];

  if (Array.isArray(data)) {
    // Si los datos son un array de valores simples, no los tratamos como un objeto
    return [
      {
        accessorKey: 'value',
        header: 'Datos',
        size: 150,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => row.original.value || '-', // Muestra el valor directamente
      },
    ];
  }

  // Si los datos son un objeto, los tratamos como un objeto con claves
  return Object.keys(data).map(key => ({
    accessorKey: key,
    header: key.toUpperCase().replace(/_/g, ' '),
    size: 150,
    enableColumnFilter: true,
    enableSorting: true,
    Cell: ({ row }) => {
      const value = row.original[key];
      if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
      }
      return value || '-';
    },
  }));
};

const TableModalGeneric: React.FC<TableModalGenericProps> = ({
  Arrays,
  icon = <IconHistory />,
  Title = 'Cambios',
}) => {
  const [open, setOpen] = useState(false);

  const dynamicColumns = useMemo(() => {
    if (
      Array.isArray(Arrays) &&
      Arrays.length > 0 &&
      typeof Arrays[0] !== 'object'
    ) {
      return [
        {
          accessorKey: 'value',
          header: 'Datos',
          size: 150,
          enableColumnFilter: true,
          enableSorting: true,
          Cell: ({ row }) => row.original.value || '-', // Muestra el valor directamente
        },
      ];
    } else {
      const sampleData = Array.isArray(Arrays) ? Arrays[0] : Arrays;
      return getDynamicColumns(sampleData);
    }
  }, [Arrays]);

  const tableData =
    Array.isArray(Arrays) && Arrays.length > 0 && typeof Arrays[0] !== 'object'
      ? Arrays.map(value => ({ value })) // Si es un array de valores simples, mapea a un objeto con "value"
      : Arrays;

  const Section = () => (
    <Grid container spacing={2} mt={2} mb={3}>
      <Grid item xs={12}>
        <SimpleTable
          columns={dynamicColumns}
          data={tableData}
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
        {icon}
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title={Title}
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default TableModalGeneric;
