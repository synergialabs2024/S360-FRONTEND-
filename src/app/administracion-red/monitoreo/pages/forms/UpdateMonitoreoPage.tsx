import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared';
import { useGetMonitoreo } from '@/actions/app';
import { SaveMonitoreo } from '../../shared/components';
import { returnUrlMonitoreosPage } from '../tables/MonitoreosPage';

export type UpdateMonitoreoPageProps = {};

const UpdateMonitoreoPage: React.FC<UpdateMonitoreoPageProps> = () => {
  ///* Pendiente a cambio
  //useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMonitoreo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlMonitoreosPage} />;

  return <SaveMonitoreo title="Editar Monitoreo" monitoreo={data.data} />;
};

export default UpdateMonitoreoPage;
