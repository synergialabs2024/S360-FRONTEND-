import { Button, Grid } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import {
  emptyCellOneLevel,
  gridSize,
  GridSizeType,
  MODEL_STATE_BOOLEAN,
  SxPropsThemeType,
  TABLE_CONSTANTS,
  useIsMediaQuery,
} from '@/shared';
import { CustomSwitchNaps, ScrollableDialogProps } from '@/shared/components';

export type IpsDetalleModalProps = {
  data?: Record<string, any>;
  modalTitle?: string;
  size?: GridSizeType;
  sxGrid?: SxPropsThemeType;
  onDataChange?: (data: any[]) => void;
};

interface Detail {
  ip: string;
  available: boolean;
}

const IpsDetalleModal: React.FC<IpsDetalleModalProps> = ({
  data = {},
  modalTitle = 'Lista de ips',
  size = gridSize,
  sxGrid,
  onDataChange,
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMediaQuery('sm');

  const [tempIpsDetalles, setTempIpsDetalles] = useState<Detail[]>([]);

  const onChangeAvailable = useCallback(
    (item: Detail) => {
      const updatedItem = {
        ...item,
        available: !item.available,
      };

      const updatedIpsDetalle = tempIpsDetalles.map(listItem =>
        listItem.ip === item.ip ? updatedItem : listItem,
      );
      setTempIpsDetalles(updatedIpsDetalle);
    },
    [tempIpsDetalles],
  );

  useEffect(() => {
    if (data.ips_detalle) {
      const updatedIpsDetalle = (data.ips_detalle as Detail[]).map(
        (item, index) => ({
          ...item,
          id: index + 1,
        }),
      );
      setTempIpsDetalles(updatedIpsDetalle);
    }
  }, [data, data.ips_detalle]);

  const columns = useMemo<MRT_ColumnDef<Detail>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id'),
      },
      {
        accessorKey: 'available',
        header: 'AVALIABLE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitchNaps
            title="Available"
            checked={row.original.available ?? false}
            onChangeChecked={() => {
              onChangeAvailable(row.original);
            }}
          />
        ),
      },
    ],
    [onChangeAvailable],
  );

  const ListaSection = () => (
    <Grid container spacing={2} mt={2} mb={3}>
      <Grid item xs={12}>
        <SimpleTable<Detail>
          columns={columns}
          data={tempIpsDetalles}
          enableGlobalFilter={true}
        />
      </Grid>
    </Grid>
  );

  useEffect(() => {
    if (onDataChange) {
      onDataChange(tempIpsDetalles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempIpsDetalles]);

  return (
    <>
      <Grid item {...size} sx={sxGrid}>
        <Grid sx={{ mt: isMobile ? 0 : 4 }}>
          <Button
            component="span"
            color="primary"
            size="small"
            onClick={() => setOpen(!open)}
            style={{ cursor: 'pointer' }}
          >
            LISTA DE IPS
          </Button>
        </Grid>
      </Grid>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          title={modalTitle}
          contentNode={<ListaSection />}
        />
      )}
    </>
  );
};

export default IpsDetalleModal;
