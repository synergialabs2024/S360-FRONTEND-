import { Button, Grid } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import {
  emptyCellOneLevel,
  gridSize,
  GridSizeType,
  MODEL_STATE_BOOLEAN,
  NapPortSecondPrimaryType,
  SxPropsThemeType,
  TABLE_CONSTANTS,
  useIsMediaQuery,
} from '@/shared';
import { CustomSwitchNaps, ScrollableDialogProps } from '@/shared/components';

export type PuertosListaModalProps = {
  data?: Record<string, any>;
  modalTitle?: string;
  size?: GridSizeType;
  sxGrid?: SxPropsThemeType;
  onDataChange?: (data: any[]) => void;
};

const PuertosListaModal: React.FC<PuertosListaModalProps> = ({
  data = {},
  modalTitle = 'Lista de puertos',
  size = gridSize,
  sxGrid,
  onDataChange,
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMediaQuery('sm');

  const [tempPuertoLists, setTempPuertoLists] = useState<
    NapPortSecondPrimaryType[]
  >([]);

  const onChangeEstado = useCallback(
    (item: NapPortSecondPrimaryType) => {
      const updatedItem = {
        ...item,
        estado: !item.estado,
      };

      const updatedPuertoList = tempPuertoLists.map(listItem =>
        listItem.id === item.id ? updatedItem : listItem,
      );
      setTempPuertoLists(updatedPuertoList);
    },
    [tempPuertoLists],
  );

  useEffect(() => {
    if (data.puertos_list) {
      const updatedPuertoList = (
        data.puertos_list as NapPortSecondPrimaryType[]
      ).map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setTempPuertoLists(updatedPuertoList);
    }
  }, [data, data.puertos_list]);

  const columns = useMemo<MRT_ColumnDef<NapPortSecondPrimaryType>[]>(
    () => [
      {
        accessorKey: 'puerto',
        header: 'puerto',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'puerto'),
      },
      {
        accessorKey: 'estado',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitchNaps
            title="Estado"
            checked={row.original.estado ?? false}
            onChangeChecked={() => {
              onChangeEstado(row.original);
            }}
          />
        ),
      },
    ],
    [onChangeEstado],
  );

  const ListaSection = () => (
    <Grid container spacing={2} mt={2} mb={3}>
      <Grid item xs={12}>
        <SimpleTable<NapPortSecondPrimaryType>
          columns={columns}
          data={tempPuertoLists}
          enableGlobalFilter={true}
        />
      </Grid>
    </Grid>
  );

  useEffect(() => {
    if (onDataChange) {
      onDataChange(tempPuertoLists);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempPuertoLists]);

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
            LISTA DE PUERTOS
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

export default PuertosListaModal;
