import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveTarjeta } from '../../shared/components';

export type CreateTarjetaPageProps = {};

const CreateTarjetaPage: React.FC<CreateTarjetaPageProps> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_tarjeta);

  return <SaveTarjeta title="Crear Tarjeta" />;
};

export default CreateTarjetaPage;
