import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveArea } from './../../shared/components';

export type CreateAreaPageProps = {};

const CreateAreaPage: React.FC<CreateAreaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_area);

  return <SaveArea title="Crear Area" />;
};

export default CreateAreaPage;
