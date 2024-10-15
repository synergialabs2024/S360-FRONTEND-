import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetAutorizacionOnu } from '@/actions/app';
import { returnUrlAutorizacionOnusPage } from '../tables/AutorizacionOnusPage';
import { SaveAutorizacionOnus } from '../../shared/components';

export type UpdateAutorizacionOnuPageProps = {};

const UpdateAutorizacionOnuPage: React.FC<
  UpdateAutorizacionOnuPageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAutorizacionOnu(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlAutorizacionOnusPage} />;

  return (
    <SaveAutorizacionOnus
      title="Editar AutorizacionOnu"
      autorizacionOnu={data.data}
    />
  );
};

export default UpdateAutorizacionOnuPage;
