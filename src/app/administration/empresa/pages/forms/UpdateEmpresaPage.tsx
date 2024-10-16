import { Navigate, useParams } from 'react-router-dom';

import { useGetEmpresa } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveEmpresa } from '../../shared/components';
import { returnUrlEmpresasPage } from '../tables/EmpresasPage';

export type UpdateEmpresaPageProps = {};

const UpdateEmpresaPage: React.FC<UpdateEmpresaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_empresa);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetEmpresa(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlEmpresasPage} />;

  return <SaveEmpresa title="Editar Empresa" empresa={data.data} />;
};

export default UpdateEmpresaPage;
