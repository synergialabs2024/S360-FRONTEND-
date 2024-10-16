import { Navigate, useParams } from 'react-router-dom';

import { useCheckPermission } from '@/shared/hooks/auth';
import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveEmpleado } from '../../shared/components';
import { useGetEmpleado } from '@/actions/app';
import { returnUrlEmpleadosPage } from '../tables/EmpleadosPage';

export type UpdateEmpleadoPageProps = {};

const UpdateEmpleadoPage: React.FC<UpdateEmpleadoPageProps> = () => {
  useCheckPermission(PermissionsEnum.nomina_change_empleado);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetEmpleado(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlEmpleadosPage} />;

  return <SaveEmpleado title="Editar Empleado" empleado={data.data} />;
};

export default UpdateEmpleadoPage;
