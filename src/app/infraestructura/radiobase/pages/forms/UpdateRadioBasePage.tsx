import { Navigate, useParams } from 'react-router-dom';

import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveRadioBase } from '../../shared/components';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useGetRadioBase } from '@/actions/app';
import { returnUrlRadioBasesPage } from '../tables/RadioBasesPage';

export type UpdateRadioBasePageProps = {};

const UpdateRadioBasePage: React.FC<UpdateRadioBasePageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_change_radiobase);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetRadioBase(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlRadioBasesPage} />;

  return <SaveRadioBase title="Editar Radio Base" radiobase={data.data} />;
};

export default UpdateRadioBasePage;
