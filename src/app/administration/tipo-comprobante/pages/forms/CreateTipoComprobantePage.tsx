import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTipoComprobante } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateTipoComprobantePageProps = {};

const CreateTipoComprobantePage: React.FC<
  CreateTipoComprobantePageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_add_tipocomprobante);

  return <SaveTipoComprobante title="Crear Centro Costo" />;
};

export default CreateTipoComprobantePage;
