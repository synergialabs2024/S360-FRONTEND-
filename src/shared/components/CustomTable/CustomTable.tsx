/* eslint-disable indent */
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MdDelete /* MdEdit */ } from 'react-icons/md';

// server-side filtering by columns - date type
import { ColorButtonType } from '@/shared/interfaces';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { esES } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import React from 'react';

export interface CustomTableProps<T> {
  columns: any;
  data: T[] | any;

  isLoading?: boolean;
  isRefetching?: boolean;

  ///* search
  enableGlobalFilter?: boolean;
  onGlobalFilterChange?: (value: any) => void;

  ///* paging
  pagination?: any;
  onPaging?: any;
  rowCount?: number;
  paginationDisplayMode?: 'custom' | 'default' | 'pages' | undefined;
  canPaginate?: boolean;

  ///* actions
  actionsColumnSize?: number;

  // crud
  canDelete?: boolean;
  canEdit?: boolean;
  onDelete?: (original: T) => void;
  onEdit?: (original: T) => void | Promise<void>;
  enableActionsColumn?: boolean;

  onConditionDelete?: (original: T) => boolean;
  onConditionEdit?: (original: T) => boolean;

  //
  enableSorting?: boolean;

  //
  positionActionsColumn?: 'first' | 'last';

  // one custom button
  showOneCustomButton?: boolean;
  oneCustomButton?: (original: T) => React.ReactNode;
  onConditionCustomButton?: (original: T) => boolean;

  // custom buttons space
  showCustomButtonsSpace?: boolean;
  customButtonsSpace?: (original: T) => React.ReactNode;

  renderTopToolbarCustomActions?: (data: any) => React.ReactNode;

  // server side filters - colums table
  enableManualFiltering?: boolean;
  onColumnFiltersChange?: (filters: any) => void;
  columnFilters?: any;
  columnFilterDisplayMode?: 'custom' | 'subheader' | 'popover';

  // to reuse colums actions with cusom buttons
  editIcon?: React.ReactNode;
  editIconToolTipTitle?: string;
  editIconColor?: ColorButtonType;
}

function CustomTable<T>({
  columns,
  data,

  isLoading = false,
  isRefetching = false,

  ///* search
  enableGlobalFilter = true,
  onGlobalFilterChange,

  ///* paging
  canPaginate = true,
  pagination,
  onPaging,
  rowCount = 0,
  paginationDisplayMode = 'default',

  ///* actions
  actionsColumnSize = 90,
  canEdit = true,
  onEdit,
  canDelete = false,
  onDelete,
  enableActionsColumn = true,
  onConditionDelete = canDelete ? () => true : () => false,
  onConditionEdit = canEdit ? () => true : () => false,

  // sorting
  enableSorting = true,

  // position actions column
  positionActionsColumn = 'first',

  // one custom button
  showOneCustomButton = false,
  onConditionCustomButton = showOneCustomButton ? () => true : () => false,
  oneCustomButton,

  // custom buttons space
  showCustomButtonsSpace = false,
  customButtonsSpace,

  renderTopToolbarCustomActions = undefined,

  // server side filters - colums table
  enableManualFiltering = false,
  onColumnFiltersChange,
  columnFilters,
  columnFilterDisplayMode = enableManualFiltering ? 'subheader' : 'popover',

  // editIcon,
  // editIconToolTipTitle = 'Editar',
  // editIconColor,
}: CustomTableProps<T>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  ///* defining table
  const table = useMaterialReactTable({
    columns,
    data,

    muiTableHeadCellProps: {
      sx: {
        fontSize: '1rem', // Same as variant h6
        fontWeight: 600, // Same as variant h6
        lineHeight: '1.6', // Same as variant h6
        letterSpacing: '0.0075em', // Same as variant h6
        padding: '16px',
        textTransform: 'capitalize',
      },
    },

    localization: MRT_Localization_ES,
    enableEditing: enableActionsColumn,
    enableDensityToggle: true,
    enableFullScreenToggle: false,
    // layoutMode: 'grid',
    enableTopToolbar: true,

    ///* search
    enableGlobalFilter: enableGlobalFilter,
    positionGlobalFilter: 'left',

    // manualFiltering: true,
    onGlobalFilterChange: onGlobalFilterChange,
    columnFilterDisplayMode: columnFilterDisplayMode,

    ///* paging
    enablePagination: canPaginate,
    ...(pagination && {
      manualPagination: true,
      onPaginationChange: onPaging,
      rowCount: rowCount,
      muiPaginationProps: {
        rowsPerPageOptions: [10, 25, 50, 100],
        // showRowsPerPage: false,
      },
    }),

    paginationDisplayMode: paginationDisplayMode,

    ///* actions
    enableColumnActions: true,
    positionActionsColumn: positionActionsColumn,
    displayColumnDefOptions: { 'mrt-row-actions': { size: actionsColumnSize } },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '.15rem' }}>
        {/* ======= custom action button ======= */}
        {showCustomButtonsSpace &&
          customButtonsSpace &&
          customButtonsSpace(row.original as T)}

        {showOneCustomButton &&
        oneCustomButton &&
        onConditionCustomButton &&
        onConditionCustomButton(row.original as T)
          ? oneCustomButton(row.original as T)
          : null}

        {canEdit &&
        onEdit &&
        onConditionEdit &&
        onConditionEdit(row.original as T) ? (
          <>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color="primary"
              variant="outlined"
            >
              Acciones
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  onEdit(row.original as T);
                  setAnchorEl(null);
                }}
              >
                Editar
              </MenuItem>
            </Menu>
          </>
        ) : /* 
          <Chip label="Acciones" color="primary" size="small" variant='outlined'/>
           */
        null}

        {canDelete &&
        onConditionDelete &&
        onConditionDelete(row.original as T) ? (
          <Tooltip title="Eliminar">
            <IconButton
              onClick={() => {
                onDelete && onDelete(row.original as T);
              }}
            >
              <MdDelete color="#922D50" />
            </IconButton>
          </Tooltip>
        ) : null}

        {/* {showOneCustomButton &&
          oneCustomButton &&
          onConditionCustomButton &&
          onConditionCustomButton(row.original as T)
            ? oneCustomButton(row.original as T)
            : null} */}
      </Box>
    ),

    // Total de Registros
    // renderTopToolbarCustomActions: renderTopToolbarCustomActions,

    renderTopToolbarCustomActions: propsData => {
      return renderTopToolbarCustomActions ? (
        renderTopToolbarCustomActions(propsData)
      ) : (
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 'bold', color: theme.palette.grey[600] }}
        >
          Total Registros: {rowCount}
        </Typography>
      );
    },

    //
    muiTablePaperProps: {
      elevation: 0,
    },
    enableSorting: enableSorting,

    ///* state
    initialState: {
      showGlobalFilter: false,
    },
    state: {
      expanded: true,
      ...(pagination && { pagination }),
      isLoading,

      // search bar
      showProgressBars: isRefetching,

      ///* filtering - server side filters
      ...(enableManualFiltering && { columnFilters }),
    },

    ///* filtering - server side filters
    ...(enableManualFiltering && {
      manualFiltering: enableManualFiltering, // server-side filtering by columns
      onColumnFiltersChange: onColumnFiltersChange,
    }),
  });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
      adapterLocale="es"
    >
      <MaterialReactTable table={table} />
    </LocalizationProvider>
  );
}

export default CustomTable;
