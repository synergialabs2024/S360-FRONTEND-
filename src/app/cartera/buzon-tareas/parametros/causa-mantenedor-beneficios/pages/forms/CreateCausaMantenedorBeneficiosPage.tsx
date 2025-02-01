import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveCausaMantenedorBeneficios from '../../shared/components/SaveCausaMantenedorBeneficios/SaveCausaMantenedorBeneficios';

export type CreateCausaMantenedorBeneficiosPageProps = {};

const CreateCausaMantenedorBeneficiosPage: React.FC<
  CreateCausaMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ubicacion);

  return (
    <SaveCausaMantenedorBeneficios title="Crear Causa Mantenedor Beneficios" />
  );
};

export default CreateCausaMantenedorBeneficiosPage;
