import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTrafico } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateTraficoPageProps = {};

const CreateTraficoPage: React.FC<CreateTraficoPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_add_pais);

  return <SaveTrafico title="Crear Trafico" />;
};

export default CreateTraficoPage;
