import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetGestionOnu } from '@/actions/app';
import { returnUrlGestionOnusPage } from '../tables/GestionOnusPage';
import { SaveGestionOnus } from '../../shared/components';

export type UpdateGestionOnuPageProps = {};

const UpdateGestionOnuPage: React.FC<UpdateGestionOnuPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetGestionOnu(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlGestionOnusPage} />;

  return (
    <SaveGestionOnus title="Editar Gestion de Onu" gestionOnu={data.data} />
  );
};

export default UpdateGestionOnuPage;
