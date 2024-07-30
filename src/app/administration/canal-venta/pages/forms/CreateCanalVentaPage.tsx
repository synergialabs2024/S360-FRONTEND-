import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCanalVenta } from '../../shared/components';

export type CreateCanalVentaPageProps = {};

const CreateCanalVentaPage: React.FC<CreateCanalVentaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_add_canalventa);

  return <SaveCanalVenta title="Crear Canal de Venta" />;
};

export default CreateCanalVentaPage;
