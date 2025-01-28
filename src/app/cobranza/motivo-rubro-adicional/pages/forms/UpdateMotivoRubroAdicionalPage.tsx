import { Navigate, useParams } from 'react-router-dom';

import { useGetMotivoRubroAdicional } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { SaveMotivoRubroAdicional } from '../../shared/components';
import { returnUrlMotivosRubroAdicionalPage } from '../tables/MotivosRubroAdicionalPage';

export type UpdateMotivoRubroAdicionalPageProps = {};

const UpdateMotivoRubroAdicionalPage: React.FC<
  UpdateMotivoRubroAdicionalPageProps
> = () => {
  // useCheckPermission(PermissionsEnum.cobranza_change_motivo_rubro_adicional);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetMotivoRubroAdicional(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlMotivosRubroAdicionalPage} />;

  return (
    <SaveMotivoRubroAdicional
      title="Editar MotivoRubroAdicional"
      motivorubroadicional={data.data}
    />
  );
};

export default UpdateMotivoRubroAdicionalPage;
