import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlCausaMantenedorBeneficiosPage } from '../tables/CausaMantenedorBeneficiosPage';
import { useGetCausaMantenedorBeneficio } from '@/actions/app/cartera/buzon-tareas/parametros/causa-mantenedor-beneficios';
import SaveCausaMantenedorBeneficios from '../../shared/components/SaveCausaMantenedorBeneficios/SaveCausaMantenedorBeneficios';

export type UpdateCausaMantenedorBeneficiosPageProps = {};

const UpdateCausaMantenedorBeneficiosPage: React.FC<
  UpdateCausaMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_change_causamantenedorbeneficio);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCausaMantenedorBeneficio(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlCausaMantenedorBeneficiosPage} />;

  return (
    <SaveCausaMantenedorBeneficios
      title="Editar Causa Mantenedor Beneficios"
      causaMantenedorBeneficios={data.data}
    />
  );
};

export default UpdateCausaMantenedorBeneficiosPage;
