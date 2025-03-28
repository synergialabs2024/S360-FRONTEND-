import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlTipoMantenedorBeneficiosPage } from '../tables/TipoMantenedorBeneficiosPage';
import { useGetTipoMantenedorBeneficio } from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { SaveTipoMantenedorBeneficios } from '../../shared/components';

export type UpdateTipoMantenedorBeneficiosPageProps = {};

const UpdateTipoMantenedorBeneficiosPage: React.FC<
  UpdateTipoMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cartera_change_tipomantenedorbeneficios);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTipoMantenedorBeneficio(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlTipoMantenedorBeneficiosPage} />;

  return (
    <SaveTipoMantenedorBeneficios
      title="Editar Tipo Mantenedor Beneficios"
      tipoMantenedorBeneficios={data.data}
    />
  );
};

export default UpdateTipoMantenedorBeneficiosPage;
