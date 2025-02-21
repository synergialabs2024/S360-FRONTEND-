import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlCriterioMantenedorActivacionesPage } from '../tables/CriterioMantenedorActivacionesPage';
import { useGetCriterioMantenedorActivacion } from '@/actions/app/cartera/buzon-tareas/parametros/criterio-mantenedor-activaciones';
import SaveCriterioMantenedorActivaciones from '../../shared/components/SaveCriterioMantenedorActivaciones/SaveCriterioMantenedorActivaciones';

export type UpdateTipoMantenedorBeneficiosPageProps = {};

const UpdateTipoMantenedorBeneficiosPage: React.FC<
  UpdateTipoMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_asuntoticket);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCriterioMantenedorActivacion(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlCriterioMantenedorActivacionesPage} />;

  return (
    <SaveCriterioMantenedorActivaciones
      title="Editar Criterio Mantenedor Activaciones"
      criterioMantenedorActivacion={data.data}
    />
  );
};

export default UpdateTipoMantenedorBeneficiosPage;
