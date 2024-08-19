import { Navigate, useParams } from 'react-router-dom';

import { useGetSolicitudServicio } from '@/actions/app';
import { useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePreventa } from '../../shared/components';
import { returnUrlPreventasPage } from '../tables/PreventasMainPage';

// // Preventa open Solicitud Servicio
export type CreatePreventaPageProps = {};

const CreatePreventaPage: React.FC<CreatePreventaPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_add_preventa);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSolicitudServicio(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPreventasPage} />;

  return <SavePreventa title="Crear Preventa" solicitudServicio={data.data} />;
};

export default CreatePreventaPage;
