import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetVlan } from '@/actions/app';
import { returnUrlVlansPage } from '../tables/VlansPage';
import { SaveVlan } from '../../shared/components';

export type UpdateVlanPageProps = {};

const UpdateVlanPage: React.FC<UpdateVlanPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetVlan(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlVlansPage} />;

  return <SaveVlan title="Editar Vlan" vlan={data.data} />;
};

export default UpdateVlanPage;
