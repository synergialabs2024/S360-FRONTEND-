import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveIVA } from '../../shared/components';

export type CreateIVAPageProps = {};

const CreateIVAPage: React.FC<CreateIVAPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_iva);

  return <SaveIVA title="Crear IVA" />;
};

export default CreateIVAPage;
