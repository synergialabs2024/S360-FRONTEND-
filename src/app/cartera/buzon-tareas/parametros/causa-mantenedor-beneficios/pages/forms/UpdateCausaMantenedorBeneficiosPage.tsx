import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetAsunto } from '@/actions/app/tickets/parametros/asunto/asunto.actions';
import { returnUrlCausaMantenedorBeneficiosPage } from '../tables/CausaMantenedorBeneficiosPage';
import { SaveAsunto } from '@/app/tickets/parametros/asunto/shared/components';

export type UpdateCausaMantenedorBeneficiosPageProps = {};

const UpdateCausaMantenedorBeneficiosPage: React.FC<
  UpdateCausaMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_asuntoticket);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAsunto(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlCausaMantenedorBeneficiosPage} />;

  return (
    <SaveAsunto title="Editar Causa Mantenedor Beneficios" asunto={data.data} />
  );
};

export default UpdateCausaMantenedorBeneficiosPage;
