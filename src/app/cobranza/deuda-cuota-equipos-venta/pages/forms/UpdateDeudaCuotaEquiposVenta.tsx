import { Navigate, useParams } from 'react-router';

import {
  useLoaders,
  PermissionsEnum,
  returnUrlDeudaCuotaEquipoVentaPage,
} from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useGetDeudaCuotaEquipoVenta } from '@/actions/app';
import { SaveDeudaCuotaEquipoVenta } from '../../shared/components';

export type UpdateDeudaCuotaEquipoVentaPageProps = {};

const UpdateTarjetaPage: React.FC<
  UpdateDeudaCuotaEquipoVentaPageProps
> = () => {
  useCheckPermission(PermissionsEnum.cobranza_change_deudacuotaequiposventa);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetDeudaCuotaEquipoVenta(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlDeudaCuotaEquipoVentaPage} />;

  return (
    <SaveDeudaCuotaEquipoVenta
      title="Editar Deuda Cuota Equipo Venta"
      deudacuotaequipoventa={data.data}
    />
  );
};

export default UpdateTarjetaPage;
