import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveSubtipoMantenedorBeneficios from '../../shared/components/SaveSubtipoMantenedorBeneficios/SaveSubtipoMantenedorBeneficios';

export type CreateSubtipoMantenedorBeneficiosPageProps = {};

const CreateSubtipoMantenedorBeneficiosPage: React.FC<
  CreateSubtipoMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return (
    <SaveSubtipoMantenedorBeneficios title="Crear Subtipo Mantenedor Beneficios" />
  );
};

export default CreateSubtipoMantenedorBeneficiosPage;
