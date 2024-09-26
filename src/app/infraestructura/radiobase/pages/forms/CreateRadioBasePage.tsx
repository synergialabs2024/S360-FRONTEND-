import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveRadioBase } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateRadioBasePageProps = {};

const CreateRadioBasePage: React.FC<CreateRadioBasePageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_radiobase);

  return <SaveRadioBase title="Crear Radio Base" />;
};

export default CreateRadioBasePage;
