import {
  Box,
  Tooltip,
  useTheme,
  IconButton,
  Typography,
  TooltipProps,
} from '@mui/material';
import {
  MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { ColorButtonType } from '@/shared/interfaces';
import { MdArrowRightAlt, MdEdit } from 'react-icons/md';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

export interface SimpleTableProps<T extends MRT_RowData> {
  columns: any;
  data: T[];
  isLoading?: boolean;
  enableGlobalFilter?: boolean;
  centerColumns?: boolean;
  showTotal?: boolean;
  isSubTable?: boolean;

  //crud
  onEdit?: (original: T) => void | Promise<void>;
  arrowIcon?: boolean;

  onConditionEdit?: (original: T) => boolean;

  //
  positionActionsColumn?: 'first' | 'last';

  // one custom button
  showOneCustomButton?: boolean;
  oneCustomButton?: (original: T) => React.ReactNode;
  onConditionCustomButton?: (original: T) => boolean;

  enableActionsColumn?: boolean;
  ///* actions
  actionsColumnSize?: number;
  // crud
  canEdit?: boolean;

  // custom buttons space
  showCustomButtonsSpace?: boolean;
  customButtonsSpace?: (original: T) => React.ReactNode;
  showCustomButtonsSpaceEnd?: boolean;
  customButtonsSpaceEnd?: (original: T) => React.ReactNode;

  // to reuse colums actions with cusom buttons
  editIcon?: React.ReactNode;
  editIconToolTipTitle?: string;
  editIconColor?: ColorButtonType;
  editIconTooltipPlacement?: TooltipProps['placement'];
}

function SimpleTable<T extends MRT_RowData>({
  columns,
  data,
  isLoading = false,
  enableGlobalFilter = true,
  centerColumns = false,
  showTotal = true,
  isSubTable = false,
  enableActionsColumn = false,

  //crud
  onEdit,
  arrowIcon = false,

  // position actions column
  positionActionsColumn = 'first',

  // one custom button
  showOneCustomButton = false,
  onConditionCustomButton = showOneCustomButton ? () => true : () => false,
  oneCustomButton,

  ///* actions
  actionsColumnSize = 90,
  canEdit = true,
  onConditionEdit = canEdit ? () => true : () => false,

  // custom buttons space
  showCustomButtonsSpace = false,
  customButtonsSpace,
  showCustomButtonsSpaceEnd = false,
  customButtonsSpaceEnd,

  editIcon,
  editIconToolTipTitle = 'Editar',
  editIconColor,
  editIconTooltipPlacement = 'bottom',
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

    enableEditing: enableActionsColumn,
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
