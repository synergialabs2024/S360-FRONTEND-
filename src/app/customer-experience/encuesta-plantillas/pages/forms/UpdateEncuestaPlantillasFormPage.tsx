import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { returnUrlInstallAsignadasOT } from '@/app/tecnico/install-asignada/pages/tables/InstalacionesAsignadasOTMainPage';
import SaveEncuestaPlantillas from '../../shared/components/SaveEncuestaPlantillas/SaveEncuestaPlantillas';
import { useGetEncuestaPlantilla } from '@/actions/app';

export type UpdateCorreccionDatosTvProps = {};

const UpdateCorreccionDatosTv: React.FC<UpdateCorreccionDatosTvProps> = () => {
  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetEncuestaPlantilla(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlInstallAsignadasOT} />;

  return (
    <SaveEncuestaPlantillas
      title="Editar Plantilla"
      encuestaPlantillas={data.data}
    />
  );
};

export default UpdateCorreccionDatosTv;
