import { Box, Card, Typography } from '@mui/material';
import {
  MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from 'material-react-table';

import { type MRT_TableOptions } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

interface CustomBasicTableProps<T extends MRT_RowData>
  extends MRT_TableOptions<T> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  enablePagination?: boolean;
  density?: 'comfortable' | 'compact' | 'spacious';
  rowNumber?: boolean;
  enableTopToolbar?: boolean;
}

const CustomBasicTable = <T extends MRT_RowData>({
  columns,
  data,
  enablePagination = false,
  density = 'comfortable',
  rowNumber = false,
  enableTopToolbar = false,
}: CustomBasicTableProps<T>) => {
  const table = useMaterialReactTable({
    columns,
    data,

    localization: MRT_Localization_ES,

    enableRowNumbers: rowNumber,
    enableRowVirtualization: rowNumber,

    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: enablePagination,
    enableSorting: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableHiding: false,

    // muiTableBodyRowProps: { hover: false },

    enableTopToolbar,
    renderTopToolbarCustomActions: () => (
      <Typography
        variant="body2"
        style={{ fontWeight: 'bold', color: '#6b737f' }}
      >
        Total Items: {data?.length}
      </Typography>
    ),

    state: {
      expanded: true,
      density: density,
    },
    muiTablePaperProps: {
      elevation: 0,
    },
    muiPaginationProps: {
      showRowsPerPage: false,
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    muiTableHeadCellProps: {
      align: 'center',
    },
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return (
    <Card>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <MaterialReactTable table={table} />
        {/* <MRT_Table table={table} /> */}
      </Box>
    </Card>
  );
};

export default CustomBasicTable;
