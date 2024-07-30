import { Navigate, useParams } from 'react-router-dom';

import { useGetIVA } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveIVA } from '../../shared/components';
import { returnUrlIVAsPage } from '../tables/IVAsPage';

export type UpdateIVAPageProps = {};

const UpdateIVAPage: React.FC<UpdateIVAPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_iva);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetIVA(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlIVAsPage} />;

  return <SaveIVA title="Editar IVA" iva={data.data} />;
};

export default UpdateIVAPage;
