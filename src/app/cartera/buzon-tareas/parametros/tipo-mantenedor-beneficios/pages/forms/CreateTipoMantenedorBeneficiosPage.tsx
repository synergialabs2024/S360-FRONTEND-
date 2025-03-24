import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveTipoMantenedorBeneficios } from '../../shared/components/SaveTipoMantenedorBeneficios';

export type CreateTipoMantenedorBeneficiosPageProps = {};

const CreateTipoMantenedorBeneficiosPage: React.FC<
  CreateTipoMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_tipomantenedorbeneficios);

  return (
    <SaveTipoMantenedorBeneficios title="Crear Tipo Mantenedor Beneficios" />
  );
};

export default CreateTipoMantenedorBeneficiosPage;
