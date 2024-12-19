import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlAuditoriaInstallacionesOT } from '../tables/AuditoriaInstalacionesMainPage';
import { SaveInstalacionesActualizadas } from '../../shared/components/SaveInstalacionesActualizadas';
import { useGetOrdenTrabajo } from '@/actions/app';

export type AuditoriaInstallActualizadasPageProps = {};

const AuditoriaInstallActualizadasPage: React.FC<
  AuditoriaInstallActualizadasPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_asuntoticket);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOrdenTrabajo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlAuditoriaInstallacionesOT} />;

  return (
    <SaveInstalacionesActualizadas
      title="Documentos corregidos"
      ordenTrabajo={data.data}
    />
  );
};

export default AuditoriaInstallActualizadasPage;
