import { SavePromesaPago } from '../../shared/components';
import { Navigate, useParams } from 'react-router';
import { useLoaders } from '@/shared';
import { returnUrlPromesaPagoPage } from '../tables/PromesaPagoByStatePage';
import { useGetPromesaPago } from '@/actions/app/cartera/promesa-pago/promesa-pago.actions';

export type CreatePromesaPagoPageProps = {};

const CreatePromesaPagoPage: React.FC<CreatePromesaPagoPageProps> = () => {
  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPromesaPago(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlPromesaPagoPage} />;

  return (
    <SavePromesaPago title="Editar Promesa de Pago" promesaPago={data.data} />
  );
};

export default CreatePromesaPagoPage;
