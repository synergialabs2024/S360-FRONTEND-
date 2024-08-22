import { Box, Card, Grid, Typography } from '@mui/material';
import {
  MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
} from 'material-react-table';

import type { MRT_TableOptions } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

import { gridSize } from '@/shared/constants';
import { DensityTableType, GridSizeType } from '@/shared/interfaces';

interface CustomMinimalTableProps<T extends MRT_RowData>
  extends MRT_TableOptions<T> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  enablePagination?: boolean;
  density?: DensityTableType;
  rowNumber?: boolean;
  enableTopToolbar?: boolean;
  gridSizeTable?: GridSizeType;
}

const CustomMinimalTable = <T extends MRT_RowData>({
  columns,
  data,
  enablePagination = false,
  density = 'compact',
  rowNumber = false,
  enableTopToolbar = false,

  gridSizeTable = gridSize,
}: CustomMinimalTableProps<T>) => {
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
    <Grid item container justifyContent="center" p={2} {...gridSizeTable}>
      <Card
        sx={{
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          <MaterialReactTable table={table} />
          {/* <MRT_Table table={table} /> */}
        </Box>
      </Card>
    </Grid>
  );
};

export default CustomMinimalTable;
