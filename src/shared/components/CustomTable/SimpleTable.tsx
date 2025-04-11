import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_RowData,
} from 'material-react-table';
import { Box, Typography, useTheme } from '@mui/material';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

export interface SimpleTableProps<T extends MRT_RowData> {
  columns: any;
  data: T[];
  isLoading?: boolean;
  enableGlobalFilter?: boolean;
  centerColumns?: boolean;
  showTotal?: boolean;
  isSubTable?: boolean;
}

function SimpleTable<T extends MRT_RowData>({
  columns,
  data,
  isLoading = false,
  enableGlobalFilter = true,
  centerColumns = false,
  showTotal = true,
  isSubTable = false, // <-- NUEVO
}: SimpleTableProps<T>) {
  const theme = useTheme();

  const table = useMaterialReactTable({
    columns,
    data,

    localization: MRT_Localization_ES,
    enableTopToolbar: true,
    enableGlobalFilter: enableGlobalFilter,
    positionGlobalFilter: 'left',
    enablePagination: true,
    enableFullScreenToggle: false,

    muiTablePaperProps: {
      elevation: 0,
    },

    muiTableHeadCellProps: {
      sx: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: '1.6',
        letterSpacing: '0.0075em',
        padding: '16px',
        textTransform: 'capitalize',
        textAlign: centerColumns ? 'center' : 'left',
      },
    },

    muiTableBodyCellProps: {
      sx: {
        textAlign: centerColumns ? 'center' : 'left',
      },
    },

    muiPaginationProps: {
      rowsPerPageOptions: isSubTable ? [3] : [10, 25, 50, 100],
    },

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: isSubTable ? 3 : 10,
      },
    },

    state: {
      isLoading,
    },
  });

  return (
    <Box>
      {showTotal ? (
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 'bold', color: theme.palette.grey[600] }}
        >
          Total Registros: {data.length}
        </Typography>
      ) : null}
      <MaterialReactTable table={table} />
    </Box>
  );
}

export default SimpleTable;
