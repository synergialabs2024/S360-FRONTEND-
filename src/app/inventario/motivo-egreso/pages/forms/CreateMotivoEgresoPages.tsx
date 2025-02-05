import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveMotivoEgreso } from '../../shared/components';

export type CreateMotivoEgresoPageProps = {};

const CreateMotivoEgresoPage: React.FC<CreateMotivoEgresoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_motivoegreso);

  return <SaveMotivoEgreso title="Crear Motivo Egreso" />;
};

export default CreateMotivoEgresoPage;
