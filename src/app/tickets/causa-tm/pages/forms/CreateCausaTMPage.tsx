import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCausaTM } from '../../shared/components';

export type CreateCausaTMPageProps = {};

const CreateCausaTMPage: React.FC<CreateCausaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_add_causaticketmasivo);

  return <SaveCausaTM title="Crear Causa para ticket masivo" />;
};

export default CreateCausaTMPage;
