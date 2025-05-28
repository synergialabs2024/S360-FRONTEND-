import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveParametroSistemaFacturacion from '../../shared/components/SaveParametroSistemaFacturacion/SaveParametroSistemaFacturacion';

export type CreateParametroSistemaPageProps = {};

const CreateParametroSistemaFacturacionPage: React.FC<
  CreateParametroSistemaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_add_parametrosistema);

  return <SaveParametroSistemaFacturacion />;
};

export default CreateParametroSistemaFacturacionPage;
