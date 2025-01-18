import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCambioPropietario from '../../shared/components/SaveCambioPropietario/SaveCambioPropietario';

export type CambioPropietarioPagoPageProps = {};

const CambioPropietarioPagoPage: React.FC<
  CambioPropietarioPagoPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_factura);

  return <SaveCambioPropietario title="Cambio Propietario" />;
};

export default CambioPropietarioPagoPage;
