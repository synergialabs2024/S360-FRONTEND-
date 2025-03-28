import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { returnUrlSolucionMantenedorBeneficiosPage } from '../tables/SolucionMantenedorBeneficiosPage';
import { useGetSolucionMantenedorBeneficio } from '@/actions/app/cartera/buzon-tareas/parametros/solucion-mantenedor-beneficios';
import SaveSolucionMantenedorBeneficios from '../../shared/components/SaveSolucionMantenedorBeneficios/SaveSolucionMantenedorBeneficios';

export type UpdateSolucionMantenedorBeneficiosPageProps = {};

const UpdateSolucionMantenedorBeneficiosPage: React.FC<
  UpdateSolucionMantenedorBeneficiosPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.cartera_change_solucionmantenedorbeneficio,
  );

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSolucionMantenedorBeneficio(
    uuid!,
  );
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlSolucionMantenedorBeneficiosPage} />;

  return (
    <SaveSolucionMantenedorBeneficios
      title="Editar Solucion Mantenedor Beneficios"
      solucionMantenedorBeneficios={data.data}
    />
  );
};

export default UpdateSolucionMantenedorBeneficiosPage;
