import { Grid } from '@mui/material';
import { useState } from 'react';

import {
  ScrollableDialogProps,
  SimpleTable,
  SingleIconButton,
} from '@/shared/components';
import { Rubro, Transaccion, useColumnsTransaccionesCliente } from '@/shared';
import { IconEye } from '@tabler/icons-react';

export type ClienteFibraTransaccionesActionBtnColumnsProps = {
  transaccion: Transaccion;
};

const ClienteFibraTransaccionesActionBtnColumns: React.FC<
  ClienteFibraTransaccionesActionBtnColumnsProps
> = ({ transaccion }) => {
  //* State local
  const [open, setOpen] = useState(false);
  const { transaccionrubroColumns } = useColumnsTransaccionesCliente();

  const Section = () => (
    <Grid container spacing={2} mt={2} mb={3}>
      <Grid item xs={12}>
        <SimpleTable<Rubro>
          columns={transaccionrubroColumns}
          data={(transaccion?.rubros_data ?? []) as Rubro[]}
          isLoading={false}
          centerColumns={true}
          enableGlobalFilter={true}
        />
      </Grid>
    </Grid>
  );

  return (
    <>
      <SingleIconButton
        label="Ver"
        startIcon={<IconEye />}
        color="inherit"
        onClick={() => {
          setOpen(!open);
        }}
      />
      {open && (
        <ScrollableDialogProps
          open={open}
          minWidth="60%"
          onClose={() => setOpen(false)}
          cancelTextBtn="Cerrar"
          title="Rubros de la transacción"
          contentNode={<Section />}
        />
      )}
    </>
  );
};

export default ClienteFibraTransaccionesActionBtnColumns;
