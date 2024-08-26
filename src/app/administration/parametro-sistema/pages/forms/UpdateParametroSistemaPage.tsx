import { Navigate, useParams } from 'react-router-dom';

import { useGetParametroSistema } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlParamestrosSistemasPage } from '../tables/ParametrosSistemasPage';
import { SaveParametroSistema } from '../../shared/components';

export type UpdateParametroSistemaPageProps = {};

const UpdateParametroSistemaPage: React.FC<
  UpdateParametroSistemaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.administration_change_parametrosistema);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetParametroSistema(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlParamestrosSistemasPage} />;

  return (
    <SaveParametroSistema
      title="Editar Parámetro del Sistema"
      parametro_sistema={data.data}
    />
  );
};

export default UpdateParametroSistemaPage;
