import { Navigate, useParams } from 'react-router-dom';

import { useGetCanalVenta } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCanalVenta } from '../../shared/components';
import { returnUrlCanalesVentaPage } from '../tables/CanalesVentaPage';

export type UpdateCanalVentaPageProps = {};

const UpdateCanalVentaPage: React.FC<UpdateCanalVentaPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_change_canalventa);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCanalVenta(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCanalesVentaPage} />;

  return (
    <SaveCanalVenta title="Editar Canal de Venta" canalventa={data.data} />
  );
};

export default UpdateCanalVentaPage;
