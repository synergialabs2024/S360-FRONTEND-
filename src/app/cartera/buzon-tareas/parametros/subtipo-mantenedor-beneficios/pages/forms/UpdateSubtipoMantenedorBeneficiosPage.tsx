import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetAsunto } from '@/actions/app/tickets/parametros/asunto/asunto.actions';
import { SaveAsunto } from '@/app/tickets/parametros/asunto/shared/components';
import { returnUrlTipoMantenedorBeneficiosPage } from '../../../tipo-mantenedor-beneficios/pages/tables/TipoMantenedorBeneficiosPage';

export type UpdateSubtipoMantenedorBeneficiosPageProps = {};

const UpdateSubtipoMantenedorBeneficiosPage: React.FC<
  UpdateSubtipoMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.cartera_change_subtipomantenedorbeneficios,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAsunto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlTipoMantenedorBeneficiosPage} />;

  return (
    <SaveAsunto
      title="Editar Subtipo Mantenedor Beneficios"
      asunto={data.data}
    />
  );
};

export default UpdateSubtipoMantenedorBeneficiosPage;
