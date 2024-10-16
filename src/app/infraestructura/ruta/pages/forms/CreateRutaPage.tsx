import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveRuta } from '../../shared/components';
import { PermissionsEnum } from '@/shared';

export type CreateRutaPageProps = {};

const CreateRutaPage: React.FC<CreateRutaPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_add_ruta);

  return <SaveRuta title="Crear Ruta" />;
};

export default CreateRutaPage;
