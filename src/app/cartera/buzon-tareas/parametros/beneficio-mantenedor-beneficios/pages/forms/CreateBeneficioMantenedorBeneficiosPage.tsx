import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveBeneficioMantenedorBeneficios from '../../shared/components/SaveBeneficioMantenedorBeneficios/SaveBeneficioMantenedorBeneficios';

export type CreateBeneficioMantenedorBeneficiosPageProps = {};

const CreateBeneficioMantenedorBeneficiosPage: React.FC<
  CreateBeneficioMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return (
    <SaveBeneficioMantenedorBeneficios title="Crear Beneficio Mantenedor Beneficios" />
  );
};

export default CreateBeneficioMantenedorBeneficiosPage;
