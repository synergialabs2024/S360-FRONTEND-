import { Navigate, useParams } from 'react-router-dom';

import { useGetSolicitudServicio } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSolicitudServicio } from '../../shared/components';
import { returnUrlSolicitudsServicioPage } from '../tables/SolicitudesServicioMainPage';

export type UpdateSolicitudServicioPageProps = {};

const UpdateSolicitudServicioPage: React.FC<
  UpdateSolicitudServicioPageProps
> = () => {
  useCheckPermission(PermissionsEnum.comercial_change_solicitudservicio);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSolicitudServicio(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlSolicitudsServicioPage} />;

  return (
    <SaveSolicitudServicio
      title="Editar SolicitudServicio"
      solicitudservicio={data.data}
    />
  );
};

export default UpdateSolicitudServicioPage;
