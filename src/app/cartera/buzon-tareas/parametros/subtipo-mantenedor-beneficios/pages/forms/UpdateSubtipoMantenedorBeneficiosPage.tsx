import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetSubtipoMantenedorBeneficio } from '@/actions/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { returnUrlSubtipoMantenedorBeneficiosPage } from '../tables/SubtipoMantenedorBeneficiosPage';
import SaveSubtipoMantenedorBeneficios from '../../shared/components/SaveSubtipoMantenedorBeneficios/SaveSubtipoMantenedorBeneficios';

export type UpdateSubtipoMantenedorBeneficiosPageProps = {};

const UpdateSubtipoMantenedorBeneficiosPage: React.FC<
  UpdateSubtipoMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.cartera_change_subtipomantenedorbeneficios,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSubtipoMantenedorBeneficio(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlSubtipoMantenedorBeneficiosPage} />;

  return (
    <SaveSubtipoMantenedorBeneficios
      title="Editar Subtipo Mantenedor Beneficios"
      subtipoMantenedorBeneficios={data.data}
    />
  );
};

export default UpdateSubtipoMantenedorBeneficiosPage;
