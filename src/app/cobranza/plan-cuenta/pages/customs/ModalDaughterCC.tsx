import { CuentaContable, useColumnsCuentaContable } from '@/shared';
import { ScrollableDialogProps, SimpleTable } from '@/shared/components';
import { Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';

export type ModalDaughterCCProps = {
  Arrays: any;
};

const ModalDaughterCC: React.FC<ModalDaughterCCProps> = ({ Arrays = [] }) => {
  //* State local
  const [open, setOpen] = useState(false);

  ///* columns
  const { plancuentahijaColumns } = useColumnsCuentaContable();

  const Section = () => (
    <>
      <Grid container spacing={2} mt={2} mb={3}>
        <Grid item xs={12}>
          <SimpleTable<CuentaContable>
            columns={plancuentahijaColumns}
            data={Arrays.cuentas_hijas_data || []}
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
        <MdArrowRightAlt />
      </IconButton>
      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title="CUENTAS CONTABLES HIJAS"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ModalDaughterCC;
