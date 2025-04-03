import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlBeneficioMantenedorBeneficiosPage } from '../tables/BeneficioMantenedorBeneficiosPage';
import { useGetBeneficioMantenedorBeneficio } from '@/actions/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';
import SaveBeneficioMantenedorBeneficios from '../../shared/components/SaveBeneficioMantenedorBeneficios/SaveBeneficioMantenedorBeneficios';

export type UpdateBeneficioMantenedorBeneficiosPageProps = {};

const UpdateBeneficioMantenedorBeneficiosPage: React.FC<
  UpdateBeneficioMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_add_tipomantenedorbeneficios);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetBeneficioMantenedorBeneficio(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlBeneficioMantenedorBeneficiosPage} />;

  return (
    <SaveBeneficioMantenedorBeneficios
      title="Editar Beneficio Mantenedor Beneficios"
      beneficioMantenedorBeneficios={data.data}
    />
  );
};

export default UpdateBeneficioMantenedorBeneficiosPage;
