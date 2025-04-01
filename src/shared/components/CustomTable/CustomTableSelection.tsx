/* eslint-disable indent */
import { MdArrowRightAlt, MdDelete, MdEdit } from 'react-icons/md';
import {
  useMaterialReactTable,
  MRT_RowSelectionState,
  MaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Grid,
  Tooltip,
  useTheme,
  Typography,
  IconButton,
  TooltipProps,
} from '@mui/material';

// server-side filtering by columns - date type
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { IconCheck, IconTablePlus } from '@tabler/icons-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { esES } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';

import { ColorButtonType } from '@/shared/interfaces';
import { CustomSingleButton } from '../CustomButtons';
import { CustomCircularPorgress } from '../Loaders';

export interface CustomTableSelectionProps<T> {
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
  arrowIcon?: boolean;

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
  showCustomButtonsSpaceEnd?: boolean;
  customButtonsSpaceEnd?: (original: T) => React.ReactNode;

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
  editIconTooltipPlacement?: TooltipProps['placement'];

  //Select ids
  onDataIdSelects?: (data: any[]) => void;
  maxRowSelection?: number;
}

function CustomTableSelection<T>({
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
  showCustomButtonsSpaceEnd = false,
  customButtonsSpaceEnd,

  renderTopToolbarCustomActions = undefined,

  // server side filters - colums table
  enableManualFiltering = false,
  onColumnFiltersChange,
  columnFilters,
  columnFilterDisplayMode = enableManualFiltering ? 'subheader' : 'popover',

  editIcon,
  editIconToolTipTitle = 'Editar',
  editIconColor,
  editIconTooltipPlacement = 'bottom',

  arrowIcon = false,

  // Selects
  onDataIdSelects,
  maxRowSelection = Infinity,
}: CustomTableSelectionProps<T>) {
  const theme = useTheme();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [isFetching, setIsFetching] = useState(false);

  const handlePaging = (newPagination: any) => {
    setIsFetching(true);
    onPaging && onPaging(newPagination);
  };

  const handleSelectAllRows = () => {
    if (Object.keys(rowSelection).length === 0) {
      setRowSelection(() => {
        return data.reduce((acc: MRT_RowSelectionState, row: any) => {
          acc[row.id] = true;
          return acc;
        }, {});
      });
    } else {
      setRowSelection({});
    }
  };

  const getButtonLabel = () => {
    return Object.keys(rowSelection).length === 0
      ? 'Seleccionar Todo'
      : 'Deseleccionar Todo';
  };

  const [originalPageSize, setOriginalPageSize] = useState(
    pagination?.pageSize || 10,
  );

  const handleToggleViewAll = () => {
    if (pagination?.pageSize == rowCount) {
      onPaging && onPaging({ pageIndex: 0, pageSize: originalPageSize });
    } else {
      setOriginalPageSize(pagination?.pageSize || 10);
      onPaging && onPaging({ pageIndex: 0, pageSize: rowCount });
    }
  };
  const getButtonAllData = () => {
    return pagination?.pageSize == rowCount ? 'Volver' : 'Ver Todo';
  };

  const handleSendSelected = () => {
    const selectedIds = Object.keys(rowSelection).map(Number); // Convierte cada valor a number
    if (onDataIdSelects) {
      onDataIdSelects(selectedIds);
    }
  };

  const muiTableProps =
    pagination?.pageSize === rowCount
      ? {
          sx: {
            display: 'block',
            maxHeight: '825px',
            overflow: 'auto',
          },
        }
      : undefined;

  useEffect(() => {
    if (data && (data.length > 0 || data.length === 0)) {
      setIsFetching(false);
    }
  }, [data]);

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
    enablePagination: pagination?.pageSize == rowCount ? false : canPaginate,
    ...(pagination && {
      manualPagination: true,
      onPaginationChange: handlePaging,
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

        {canEdit &&
        onEdit &&
        onConditionEdit &&
        onConditionEdit(row.original as T) ? (
          <Tooltip
            title={editIconToolTipTitle}
            placement={editIconTooltipPlacement}
          >
            <IconButton
              onClick={() => {
                onEdit(row.original as T);
              }}
              color={editIconColor}
            >
              {editIcon ? (
                editIcon
              ) : arrowIcon ? (
                <MdArrowRightAlt />
              ) : (
                <MdEdit />
              )}
            </IconButton>
          </Tooltip>
        ) : null}

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

        {showOneCustomButton &&
        oneCustomButton &&
        onConditionCustomButton &&
        onConditionCustomButton(row.original as T)
          ? oneCustomButton(row.original as T)
          : null}

        {showCustomButtonsSpaceEnd &&
          customButtonsSpaceEnd &&
          customButtonsSpaceEnd(row.original as T)}
      </Box>
    ),

    // Total de Registros
    // renderTopToolbarCustomActions: renderTopToolbarCustomActions,

    renderTopToolbarCustomActions: propsData => {
      return renderTopToolbarCustomActions ? (
        renderTopToolbarCustomActions(propsData)
      ) : (
        <>
          <Typography
            variant="subtitle2"
            style={{ fontWeight: 'bold', color: theme.palette.grey[600] }}
          >
            Total Registros: {rowCount}
          </Typography>
          <Grid container spacing={3} justifyContent="flex-end">
            <Grid item>
              <CustomSingleButton
                label="Enviar"
                color="success"
                variant="contained"
                onClick={handleSendSelected}
              />
            </Grid>
          </Grid>
        </>
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
      isFetching,

      // search bar
      showProgressBars: isFetching || isRefetching,
      rowSelection,

      ///* filtering - server side filters
      ...(enableManualFiltering && { columnFilters }),
    },

    muiTableProps,

    enableSelectAll: false,
    enableRowSelection: true,
    getRowId: row => row.id,
    onRowSelectionChange: updater => {
      setRowSelection(prevSelection => {
        const newSelection =
          typeof updater === 'function' ? updater(prevSelection) : updater;
        if (Object.keys(newSelection).length > maxRowSelection) {
          return prevSelection;
        }
        return newSelection;
      });
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
      {isFetching && <CustomCircularPorgress />}

      <Grid container spacing={3}>
        <Grid item xs={8}></Grid>
        <Grid item xs={1.5}>
          <CustomSingleButton
            label={getButtonAllData()}
            color="primary"
            variant="text"
            startIcon={<IconTablePlus />}
            onClick={handleToggleViewAll}
          />
        </Grid>
        <Grid item>
          <CustomSingleButton
            label={getButtonLabel()}
            color="secondary"
            variant="text"
            startIcon={<IconCheck />}
            onClick={handleSelectAllRows}
          />
        </Grid>
      </Grid>
      <MaterialReactTable table={table} />
    </LocalizationProvider>
  );
}

export default CustomTableSelection;
