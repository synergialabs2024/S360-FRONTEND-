import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveVentaConvenio } from '../../shared/SaveVentaConvenio';

export type CreateVentaConvenioPageProps = {};

const CreateVentaConvenioPage: React.FC<CreateVentaConvenioPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_add_solicitudservicio);

  return <SaveVentaConvenio title="Crear Venta Convenio" />;
};

export default CreateVentaConvenioPage;
