import { PermissionsEnum } from '@/shared';
import SaveCambioDomicilio from '../../shared/components/SaveCambioDomicilio/SaveCambioDomicilio';
import { useCheckPermission } from '@/shared/hooks/auth';

export type CreateCambioDomicilioPageProps = {};

const CreateCambioDomicilioPage: React.FC<
  CreateCambioDomicilioPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_cambiodomicilio);

  return <SaveCambioDomicilio title="Cambio de Domicilio" />;
};

export default CreateCambioDomicilioPage;
