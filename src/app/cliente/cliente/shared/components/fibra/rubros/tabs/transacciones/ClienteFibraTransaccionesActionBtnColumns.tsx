import { Transaccion } from '@/shared';
import { PDFIconButton } from '@/shared/components';

export type ClienteFibraTransaccionesActionBtnColumnsProps = {
  transaccion: Transaccion;
};

const ClienteFibraTransaccionesActionBtnColumns: React.FC<
  ClienteFibraTransaccionesActionBtnColumnsProps
> = ({ transaccion }) => {
  const facturaUrl = transaccion?.rubro_data?.factura_data?.url_pdf;
  if (!facturaUrl) return '-';

  return (
    <>
      <PDFIconButton url={facturaUrl} />
    </>
  );
};

export default ClienteFibraTransaccionesActionBtnColumns;
