import { useFetchConfiguracionEmpresas } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveConfEmpresa } from '../../shared';
import { Navigate } from 'react-router';
import { returnUrlConfiguracionsEmpresaPage } from '../tables/ConfiguracionEmpresaPage';

export type UpdateConfiguracionEmpresaPageProps = {};

const UpdateConfiguracionEmpresaPage: React.FC<
  UpdateConfiguracionEmpresaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.multicpy_change_company);

  const {
    data: EmpresaPagingRes,
    isLoading,
    isRefetching,
  } = useFetchConfiguracionEmpresas({
    enabled: true,
  });
  if (isLoading || isRefetching) return null;
  if (!EmpresaPagingRes?.data)
    return <Navigate to={returnUrlConfiguracionsEmpresaPage} />;

  return (
    <SaveConfEmpresa
      title="Editar mi Empresa"
      conf_empresa={EmpresaPagingRes.data}
    />
  );
};

export default UpdateConfiguracionEmpresaPage;
