import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useGetCuentaContable } from '@/actions/app';
import { PermissionsEnum } from '@/shared/interfaces';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveCuentaContable } from '../../shared/components';
import { returnUrlCuentaContablePage } from '../tables/CuentaContablePages';

export type UpdateCuentaContablePageProps = {};

const UpdateCuentaContablePage: React.FC<
  UpdateCuentaContablePageProps
> = () => {
  useCheckPermission(PermissionsEnum.contabilidad_change_cuentacontable);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCuentaContable(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCuentaContablePage} />;

  return (
    <SaveCuentaContable
      title="Editar Cuenta Contable"
      cuenta_contable={data.data}
    />
  );
};

export default UpdateCuentaContablePage;
