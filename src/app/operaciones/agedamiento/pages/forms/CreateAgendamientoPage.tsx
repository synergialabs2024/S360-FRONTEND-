import { Navigate, useParams } from 'react-router-dom';

import { useGetPreventa } from '@/actions/app';
import { useLoaders } from '@/shared';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveAgendamiento } from '../../shared/components';
import { returnUrlAgendamientosPage } from '../tables/AgendamientosPage';

export type CreateAgendamientoPageProps = {};

const CreateAgendamientoPage: React.FC<CreateAgendamientoPageProps> = () => {
  useCheckPermissionsArray([
    PermissionsEnum.operaciones_add_agendamiento,
    PermissionsEnum.comercial_view_preventa,
  ]);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPreventa(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlAgendamientosPage} />;

  return <SaveAgendamiento title="Crear Preagenda" preventa={data.data} />;
};

export default CreateAgendamientoPage;
