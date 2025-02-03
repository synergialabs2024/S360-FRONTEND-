import { Navigate, useParams } from 'react-router-dom';

import { useGetSolicitudAprobacionIAPreventa } from '@/actions/app/supervision-comercial';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSolicitudAprobacionIAPreventa } from '../../shared/components';
import { returnUrlSolicitudsAprobacionIAPreventaPage } from '../tables/SolicitudsAprobacionIAPreventaMainPage';

export type UpdateSolicitudAprobacionIAPreventaPageProps = {};

const UpdateSolicitudAprobacionIAPreventaPage: React.FC<
  UpdateSolicitudAprobacionIAPreventaPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.comercial_change_solicitudaprobacioniapreventa,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSolicitudAprobacionIAPreventa(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlSolicitudsAprobacionIAPreventaPage} />;

  return (
    <SaveSolicitudAprobacionIAPreventa
      title="Editar SolicitudAprobacionIAPreventa"
      solicitudaprobacioniapreventa={data.data}
    />
  );
};

export default UpdateSolicitudAprobacionIAPreventaPage;
