import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTipoComprobante } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateTipoComprobantePageProps = {};

const CreateTipoComprobantePage: React.FC<
  CreateTipoComprobantePageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveTipoComprobante title="Crear Centro Costo" />;
};

export default CreateTipoComprobantePage;
