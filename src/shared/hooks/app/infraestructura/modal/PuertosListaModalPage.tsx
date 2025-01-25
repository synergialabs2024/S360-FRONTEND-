import { SimpleTable } from '@/app/infraestructura/olt/pages/custom';
import {
  CustomProgressBar,
  CustomSwitchNaps,
  ScrollableDialogProps,
  SingleIconButton,
} from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import { NapPortSecondPrimaryType } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { Box, Grid } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { IoMdEye as VisibilityIcon } from 'react-icons/io';

export type PuertosListaModalPageProps = {
  data?: Record<string, any>;
  modalTitle?: string;
};

const PuertosListaModalPage: React.FC<PuertosListaModalPageProps> = ({
  data = {},
  modalTitle = 'Lista de puertos',
}) => {
  const [open, setOpen] = useState(false);
  const [tempPuertoLists, setTempPuertoLists] = useState<
    NapPortSecondPrimaryType[]
  >([]);

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
            onChangeChecked={() => {}}
          />
        ),
      },
    ],
    [],
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

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          width: '100%',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <CustomProgressBar
            free_count={tempPuertoLists.filter(item => !item.estado).length}
            total_count={tempPuertoLists.length}
          />
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <SingleIconButton
            startIcon={<VisibilityIcon />}
            color={'default' as any}
            label="Ver detalle"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </Box>
      </Box>
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

export default PuertosListaModalPage;
