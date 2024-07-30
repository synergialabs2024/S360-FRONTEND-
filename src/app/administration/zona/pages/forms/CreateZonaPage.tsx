import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveZona } from '../../shared/components';

export type CreateZonaPageProps = {};

const CreateZonaPage: React.FC<CreateZonaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_zona);

  return <SaveZona title="Crear Zona" />;
};

export default CreateZonaPage;
