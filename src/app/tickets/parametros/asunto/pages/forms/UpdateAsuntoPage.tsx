import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlAsuntosPage } from '../tables/AsuntosPage';
import { SaveAsunto } from '../../shared/components/SaveAsunto';
import { useGetAsunto } from '@/actions/app/tickets/parametros/asunto/asunto.actions';

export type UpdateAsuntoPageProps = {};

const UpdateAsuntoPage: React.FC<UpdateAsuntoPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_tickettecnico);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAsunto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlAsuntosPage} />;

  return <SaveAsunto title="Editar Ubicación" asunto={data.data} />;
};

export default UpdateAsuntoPage;
