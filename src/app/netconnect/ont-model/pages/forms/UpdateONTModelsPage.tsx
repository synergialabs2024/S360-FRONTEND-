import { Navigate, useParams } from 'react-router-dom';

import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetONTModel } from '@/actions/app';
import { returnUrlONTModelsPage } from '../tables/ONTModelsPage';
import { SaveONTModels } from '../../shared/components';

export type UpdateONTModelPageProps = {};

const UpdateONTModelPage: React.FC<UpdateONTModelPageProps> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_change_pais);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetONTModel(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlONTModelsPage} />;

  return <SaveONTModels title="Editar Modelo de ONT" ontModel={data.data} />;
};

export default UpdateONTModelPage;
