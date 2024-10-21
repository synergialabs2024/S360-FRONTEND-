import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveGrupoIPv4 } from '../../shared/components';

export type CreateGrupoIPv4PageProps = {};

const CreateGrupoIPv4Page: React.FC<CreateGrupoIPv4PageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_grupoipv4);

  return <SaveGrupoIPv4 title="Crear Pool de IPv4" />;
};

export default CreateGrupoIPv4Page;
