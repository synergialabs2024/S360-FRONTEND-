import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveMotivoIngreso } from '../../shared/components';

export type CreateMotivoIngresoPageProps = {};

const CreateMotivoIngresoPage: React.FC<CreateMotivoIngresoPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_motivoingreso);

  return <SaveMotivoIngreso title="Crear Motivo Ingreso" />;
};

export default CreateMotivoIngresoPage;
