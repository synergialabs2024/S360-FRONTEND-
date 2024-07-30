import { Navigate, useParams } from 'react-router-dom';

import { useGetProvincia } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlProvinciasPage } from '../tables/ProvinciasPage';
import { SaveProvincia } from './../../shared/components';

export type UpdateProvinciaPageProps = {};

const UpdateProvinciaPage: React.FC<UpdateProvinciaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_provincia);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetProvincia(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlProvinciasPage} />;

  return <SaveProvincia title="Editar Provincia" provincia={data.data} />;
};

export default UpdateProvinciaPage;
