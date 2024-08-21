import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetNodo } from '@/actions/app/infraestructura';
import { returnUrlNodosPage } from '../tables/NodosPage';
import { SaveNodo } from '../../shared/components';

export type UpdateNodoPageProps = {};

const UpdateNodoPage: React.FC<UpdateNodoPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_nodo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetNodo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlNodosPage} />;

  return <SaveNodo title="Editar Nodo" nodo={data.data} />;
};

export default UpdateNodoPage;
