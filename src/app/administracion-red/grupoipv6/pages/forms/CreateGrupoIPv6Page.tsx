import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveGrupoIPv6 } from '../../shared/components';

export type CreateGrupoIPv6PageProps = {};

const CreateGrupoIPv6Page: React.FC<CreateGrupoIPv6PageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_grupoipv6);

  return <SaveGrupoIPv6 title="Crear Pool de IPv6" />;
};

export default CreateGrupoIPv6Page;
