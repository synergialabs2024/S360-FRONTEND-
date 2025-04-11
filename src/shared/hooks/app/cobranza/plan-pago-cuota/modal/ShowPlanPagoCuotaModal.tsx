import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { IconDeviceMobileDollar } from '@tabler/icons-react';

import { PlanPagoCuotaShow, useColumnsPlanPagoCuota } from '../columns';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';

export type ShowPlanPagoCuotaModalProps = {
  Arrays: any;
};

const ShowPlanPagoCuotaModal: React.FC<ShowPlanPagoCuotaModalProps> = ({
  Arrays = [],
}) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* columns
  const { planpagocuotaShowColumns } = useColumnsPlanPagoCuota();

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<PlanPagoCuotaShow>
            columns={planpagocuotaShowColumns}
            data={Arrays || []}
            isLoading={false}
            centerColumns={true}
            enableGlobalFilter={true}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <IconButton
        component="span"
        color="primary"
        size="small"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
      >
        <IconDeviceMobileDollar />
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          confirmTextBtn="Aceptar"
          onConfirm={() => setOpen(false)}
          title="DETALLES"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ShowPlanPagoCuotaModal;
