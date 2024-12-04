import { Navigate, useParams } from 'react-router-dom';

import { useGetConfiguracionPlantilla } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveConfiguracionPlantilla } from '../../shared/components';
import { returnUrlConfiguracionsPlantillaPage } from '../tables/ConfiguracionsPlantillaPage';

export type UpdateConfiguracionPlantillaPageProps = {};

const UpdateConfiguracionPlantillaPage: React.FC<
  UpdateConfiguracionPlantillaPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.administration_change_configplantillacliente,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetConfiguracionPlantilla(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlConfiguracionsPlantillaPage} />;

  return (
    <SaveConfiguracionPlantilla
      title="Editar Configuración de Plantilla"
      configuracionplantilla={data.data}
    />
  );
};

export default UpdateConfiguracionPlantillaPage;
