import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetAsunto } from '@/actions/app/tickets/parametros/asunto/asunto.actions';
import { SaveAsunto } from '@/app/tickets/parametros/asunto/shared/components';
import { returnUrlBeneficioMantenedorBeneficiosPage } from '../tables/BeneficioMantenedorBeneficiosPage';

export type UpdateBeneficioMantenedorBeneficiosPageProps = {};

const UpdateBeneficioMantenedorBeneficiosPage: React.FC<
  UpdateBeneficioMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_asuntoticket);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAsunto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlBeneficioMantenedorBeneficiosPage} />;

  return (
    <SaveAsunto title="Editar Tipo Mantenedor Beneficios" asunto={data.data} />
  );
};

export default UpdateBeneficioMantenedorBeneficiosPage;
