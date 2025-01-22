import { Grid } from '@mui/material';

import { Transaccion } from '@/shared';
import { PDFIconButton } from '@/shared/components';

export type ClienteFibraTransaccionesActionBtnColumnsProps = {
  transaccion: Transaccion;
};

const ClienteFibraTransaccionesActionBtnColumns: React.FC<
  ClienteFibraTransaccionesActionBtnColumnsProps
> = ({ transaccion }) => {
  const factura = transaccion?.rubro_data?.factura_data;
  const facturaUrl = factura?.url_pdf;
  const xmlUrl = factura?.url_xml;

  return (
    <>
      <Grid item container xs={12} spacing={1}>
        <Grid item>
          {facturaUrl ? <PDFIconButton url={facturaUrl} /> : '-'}
        </Grid>

        <Grid item>{xmlUrl ? <PDFIconButton url={xmlUrl} isXml /> : '-'}</Grid>
      </Grid>
    </>
  );
};

export default ClienteFibraTransaccionesActionBtnColumns;
