import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import SaveMantenedorActivacionesBase from '../../shared/components/SaveMantenedorActivacionesBase/SaveMantenedorActivacionesBase';
import { Navigate, useParams } from 'react-router';
import { useGetMantenedorActivacionBase } from '@/actions/app/cartera/mantenedor-activacion/mantenedor-activacion-base.actions';
import { useLoaders } from '@/shared';
import { returnUrlMantenedorActivacionesBasePage } from '../tables/MantenedorActivacionesBaseByStatePage';

export type UpdateMantenedorActivacionesBasePageProps = {};

const UpdateMantenedorActivacionesBasePage: React.FC<
  UpdateMantenedorActivacionesBasePageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_add_factura);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMantenedorActivacionBase(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMantenedorActivacionesBasePage} />;

  return (
    <SaveMantenedorActivacionesBase
      title="Editar Mantenedor Activaciones Base"
      mantenedorActivacionBase={data.data}
    />
  );
};

export default UpdateMantenedorActivacionesBasePage;
