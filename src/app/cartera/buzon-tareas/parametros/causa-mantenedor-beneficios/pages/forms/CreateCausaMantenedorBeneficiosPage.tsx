import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCausaMantenedorBeneficios from '../../shared/components/SaveCausaMantenedorBeneficios/SaveCausaMantenedorBeneficios';

export type CreateCausaMantenedorBeneficiosPageProps = {};

const CreateCausaMantenedorBeneficiosPage: React.FC<
  CreateCausaMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_causamantenedorbeneficio);

  return (
    <SaveCausaMantenedorBeneficios title="Crear Causa Mantenedor Beneficios" />
  );
};

export default CreateCausaMantenedorBeneficiosPage;
