import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveCorreccion } from '../../shared/components';
import { useGetCorreccionPreventa } from '@/actions/app';
import { useParams } from 'react-router';

export type CorreccionesPreventaPageProps = {};

const CorreccionesPreventaPage: React.FC<
  CorreccionesPreventaPageProps
> = () => {
  const { uuid } = useParams();

  const { data } = useGetCorreccionPreventa(uuid!);

  useCheckPermission(PermissionsEnum.comercial_add_solicitudservicio);

  return <SaveCorreccion title="Corrección de fotos" preventa={data?.data!} />;
};

export default CorreccionesPreventaPage;
