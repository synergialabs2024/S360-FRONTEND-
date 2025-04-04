import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { Navigate, useParams } from 'react-router';
import { useLoaders } from '@/shared';
import { useGetMantenedorSuspension } from '@/actions/app/cartera/mantenedor-suspension/mantenedor-suspension.actions';
import { returnUrlMantenedorSuspensionPage } from '../tables/MantenedorSuspensionByStatePage';
import SaveMantenedorSuspension from '../../shared/components/SaveMantenedorSuspension/SaveMantenedorSuspension';

export type UpdateMantenedorSuspensionPageProps = {};

const UpdateMantenedorSuspensionPage: React.FC<
  UpdateMantenedorSuspensionPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_change_mantenedoractivacionbase);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMantenedorSuspension(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMantenedorSuspensionPage} />;

  return (
    <SaveMantenedorSuspension
      title="Editar Mantenedor Suspension"
      mantenedorSuspension={data.data}
    />
  );
};

export default UpdateMantenedorSuspensionPage;
