import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetCausaTM } from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveCausaTM } from '../../shared/components';
import { returnUrlCausaTMPage } from '../tables/CausaTMPage';

export type UpdateCausaTMPageProps = {};

const UpdateCausaTMPage: React.FC<UpdateCausaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_causaticketmasivo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetCausaTM(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlCausaTMPage} />;

  return (
    <SaveCausaTM title="Editar Causa del Ticket Masivo" causaTM={data.data} />
  );
};

export default UpdateCausaTMPage;
