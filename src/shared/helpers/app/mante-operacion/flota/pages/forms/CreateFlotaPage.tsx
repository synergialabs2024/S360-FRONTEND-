import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveFlota } from '../../shared/components';

export type CreateFlotaPageProps = {};

const CreateFlotaPage: React.FC<CreateFlotaPageProps> = () => {
  useCheckPermission(PermissionsEnum.mantenimientoope_add_flota);

  return <SaveFlota title="Crear Flota" />;
};

export default CreateFlotaPage;
