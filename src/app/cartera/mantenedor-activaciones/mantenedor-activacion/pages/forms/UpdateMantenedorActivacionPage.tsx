import { ROUTER_PATHS } from '@/router/constants';
import { Navigate, useParams } from 'react-router';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useGetMantenedorActivacion } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion.actions';
import { useCheckPermission } from '@/shared/hooks/auth';
import SaveMantenedorActivacion from '../../shared/components/SaveMantenedorActivacion/SaveMantenedorActivacion';

export type UpdateMantenedorActivacionPageProps = {};
export const returnUrlMantenedorActivacionesPage =
  ROUTER_PATHS.cartera.mantenedorActivacionesNav;

const UpdateMantenedorActivacionPage: React.FC<
  UpdateMantenedorActivacionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_change_mantenedoractivacion);
  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMantenedorActivacion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMantenedorActivacionesPage} />;

  return (
    <SaveMantenedorActivacion
      title="Editar Mantenedor activacion"
      mantenedorActivacion={data.data}
    />
  );
};

export default UpdateMantenedorActivacionPage;
