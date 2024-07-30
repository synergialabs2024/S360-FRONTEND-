import { Box, Card } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

export type TableWithoutActionsProps<T> = {
  columns: any;
  data: T[] | any;

  isLoading?: boolean;
  isRefetching?: boolean;

  ///* search
  enableGlobalFilter?: boolean;
  onGlobalFilterChange?: (value: any) => void;

  ///* paging
  pagination: any;
  onPaging: any;
  rowCount?: number;
  paginationDisplayMode?: 'custom' | 'default' | 'pages' | undefined;

  density?: 'comfortable' | 'compact' | 'spacious';
  enableFullScreenToggle?: boolean;
};

function TableWithoutActions<T>({
  columns,
  data,

  isLoading = false,
  isRefetching = false,

  ///* search
  enableGlobalFilter = true,
  onGlobalFilterChange,

  ///* paging
  pagination,
  onPaging,
  rowCount = 0,
  paginationDisplayMode = 'default',

  density = 'comfortable',
  enableFullScreenToggle = false,
}: TableWithoutActionsProps<T>) {
  const table = useMaterialReactTable({
    columns,
    data,

    localization: MRT_Localization_ES,

    ///* search
    enableGlobalFilter: enableGlobalFilter,
    positionGlobalFilter: 'left',
    // manualFiltering: true,
    onGlobalFilterChange: onGlobalFilterChange,
    columnFilterDisplayMode: 'popover',
    enableDensityToggle: false, // 'cause density is passed as prop
    enableFullScreenToggle: enableFullScreenToggle,

    ///* paging
    manualPagination: true,
    onPaginationChange: onPaging,
    rowCount: rowCount,
    muiPaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100],
    },
    paginationDisplayMode: paginationDisplayMode,

    ///* state
    initialState: {
      showGlobalFilter: false,
    },

    state: {
      pagination,
      isLoading,

      // search bar
      showProgressBars: isRefetching,

      // other
      density,
    },
  });

  return (
    <Card>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <MaterialReactTable table={table} />
      </Box>
    </Card>
  );
}

export default TableWithoutActions;
