import { Navigate, useParams } from 'react-router-dom';

import { useGetScoreLimitVentas } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveScoreLimitVentas } from '../../shared/components';
import { returnUrlScoresLimitVentasPage } from '../tables/ScoresLimitVentasPage';

export type UpdateScoreLimitVentasPageProps = {};

const UpdateScoreLimitVentasPage: React.FC<
  UpdateScoreLimitVentasPageProps
> = () => {
  useCheckPermission(PermissionsEnum.comercial_change_scorelimitventas);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetScoreLimitVentas(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlScoresLimitVentasPage} />;

  return (
    <SaveScoreLimitVentas
      title="Editar Score Límite de Ventas"
      scorelimitventas={data.data}
    />
  );
};

export default UpdateScoreLimitVentasPage;
