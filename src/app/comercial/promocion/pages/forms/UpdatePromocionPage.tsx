import { Navigate, useParams } from 'react-router-dom';

import { useGetPromocion } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePromocion } from '../../shared/components';
import { returnUrlPromocionsPage } from '../tables/PromocionsPage';

export type UpdatePromocionPageProps = {};

const UpdatePromocionPage: React.FC<UpdatePromocionPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_change_promocion);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPromocion(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPromocionsPage} />;

  return <SavePromocion title="Editar Promoción" promocion={data.data} />;
};

export default UpdatePromocionPage;
