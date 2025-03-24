import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveSolucionMantenedorBeneficios from '../../shared/components/SaveSolucionMantenedorBeneficios/SaveSolucionMantenedorBeneficios';

export type CreateSolucionMantenedorBeneficiosPageProps = {};

const CreateSolucionMantenedorBeneficiosPage: React.FC<
  CreateSolucionMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_solucionmantenedorbeneficio);

  return (
    <SaveSolucionMantenedorBeneficios title="Crear Solucion Mantenedor Beneficios" />
  );
};

export default CreateSolucionMantenedorBeneficiosPage;
