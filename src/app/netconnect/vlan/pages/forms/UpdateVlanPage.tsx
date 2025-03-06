import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared';
import { useGetVlan } from '@/actions/app';
import { SaveVlan } from '../../shared/components';
import { returnUrlVlansPage } from '../tables/VlansPage';

export type UpdateVlanPageProps = {};

const UpdateVlanPage: React.FC<UpdateVlanPageProps> = () => {
  ///* Pendiente a cambio
  //useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetVlan(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlVlansPage} />;

  return <SaveVlan title="Editar Vlan" vlan={data.data} />;
};

export default UpdateVlanPage;
