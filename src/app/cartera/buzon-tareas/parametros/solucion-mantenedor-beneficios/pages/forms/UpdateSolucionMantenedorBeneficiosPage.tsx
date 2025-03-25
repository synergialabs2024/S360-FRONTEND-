import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetAsunto } from '@/actions/app/tickets/parametros/asunto/asunto.actions';
import { SaveAsunto } from '@/app/tickets/parametros/asunto/shared/components';
import { returnUrlSolucionMantenedorBeneficiosPage } from '../tables/SolucionMantenedorBeneficiosPage';

export type UpdateSolucionMantenedorBeneficiosPageProps = {};

const UpdateSolucionMantenedorBeneficiosPage: React.FC<
  UpdateSolucionMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.cartera_change_solucionmantenedorbeneficio,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAsunto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlSolucionMantenedorBeneficiosPage} />;

  return (
    <SaveAsunto
      title="Editar Solucion Mantenedor Beneficios"
      asunto={data.data}
    />
  );
};

export default UpdateSolucionMantenedorBeneficiosPage;
