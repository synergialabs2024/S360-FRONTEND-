import { Navigate, useParams } from 'react-router';
import { useLoaders } from '@/shared';
import { useGetLineaServicio } from '@/actions/app';
import GeneralDataClient from '../../shared/components/form/GeneralDataClient';
import { returnUrlActivacionAsignadas } from '../tables/PendientesActivacionPage';

export type CreatePendientesActivacionPageProps = {};

const CreatePendientesActivacionPage: React.FC<
  CreatePendientesActivacionPageProps
> = () => {
  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetLineaServicio(uuid!);
  useLoaders(isLoading || isRefetching);
  if (isLoading) return null; // no isRefetching commented 'cause opt
  if (!data?.data?.id) return <Navigate to={returnUrlActivacionAsignadas} />;

  return <GeneralDataClient serviceLine={data.data} />;
};

export default CreatePendientesActivacionPage;
