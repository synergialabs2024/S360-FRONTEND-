import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveCalendarioFacturacion } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateCalendarioFacturacionPageProps = {};

const CreateCalendarioFacturacionPage: React.FC<
  CreateCalendarioFacturacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_add_calendariofacturacion);

  return <SaveCalendarioFacturacion title="Crear Calendario Facturación" />;
};

export default CreateCalendarioFacturacionPage;
