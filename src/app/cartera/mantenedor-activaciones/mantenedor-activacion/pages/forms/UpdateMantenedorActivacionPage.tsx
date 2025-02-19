import { ROUTER_PATHS } from '@/router/constants';
import SaveMantenedorActivacionesBase from '../../shared/components/SaveMantenedorActivacion/SaveMantenedorActivacion';
import { Navigate, useParams } from 'react-router';
import { useLoaders } from '@/shared';
import { useGetMantenedorActivacion } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion.actions';

export type UpdateMantenedorActivacionPageProps = {};
export const returnUrlMantenedorActivacionesPage =
  ROUTER_PATHS.cartera.mantenedorActivacionesNav;

const UpdateMantenedorActivacionPage: React.FC<
  UpdateMantenedorActivacionPageProps
> = () => {
  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMantenedorActivacion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMantenedorActivacionesPage} />;

  return (
    <SaveMantenedorActivacionesBase
      title="Editar Mantenedor activacion"
      mantenedorActivacion={data.data}
    />
  );
};

export default UpdateMantenedorActivacionPage;
