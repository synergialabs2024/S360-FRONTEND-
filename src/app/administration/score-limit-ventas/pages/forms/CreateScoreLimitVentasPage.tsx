import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveScoreLimitVentas } from '../../shared/components';

export type CreateScoreLimitVentasPageProps = {};

const CreateScoreLimitVentasPage: React.FC<
  CreateScoreLimitVentasPageProps
> = () => {
  useCheckPermission(PermissionsEnum.comercial_add_scorelimitventas);

  return <SaveScoreLimitVentas title="Crear Score Límite de Ventas" />;
};

export default CreateScoreLimitVentasPage;
