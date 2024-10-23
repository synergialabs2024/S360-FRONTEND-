import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_RowData,
} from 'material-react-table';
import { Box, Typography, useTheme } from '@mui/material';

export interface SimpleTableProps<T extends MRT_RowData> {
  columns: any;
  data: T[];
  isLoading?: boolean;
  enableGlobalFilter?: boolean;
}

function SimpleTable<T extends MRT_RowData>({
  columns,
  data,
  isLoading = false,
  enableGlobalFilter = true,
}: SimpleTableProps<T>) {
  const theme = useTheme();

  const table = useMaterialReactTable({
    columns,
    data,
    enableGlobalFilter,
    enablePagination: true,
    muiTableHeadCellProps: {
      sx: {
        fontSize: '1rem',
        fontWeight: 600,
        padding: '16px',
        textTransform: 'capitalize',
      },
    },
    muiTablePaperProps: {
      elevation: 0,
    },
    state: {
      isLoading,
    },
  });

  return (
    <Box>
      <Typography
        variant="subtitle2"
        style={{ fontWeight: 'bold', color: theme.palette.grey[600] }}
      >
        Total Registros: {data.length}
      </Typography>
      <MaterialReactTable table={table} />
    </Box>
  );
}

export default SimpleTable;
