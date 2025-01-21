import { Navigate, useParams } from 'react-router-dom';

import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { useGetTicket } from '@/actions/app/tickets';
import { returnUrlInstallAsignadasOT } from '@/app/tecnico/install-asignada/pages/tables/InstalacionesAsignadasOTMainPage';
import SaveCorreccionDatosTv from './SaveCorreccionDatosTv';
import { CustomTitleRefNumber } from '@/shared/components';

export type UpdateCorreccionDatosTvProps = {};

const UpdateCorreccionDatosTv: React.FC<UpdateCorreccionDatosTvProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_origenticket);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetTicket(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlInstallAsignadasOT} />;

  return (
    <SaveCorreccionDatosTv
      titleNode={
        <CustomTitleRefNumber
          initialText="Editar Informacion"
          referenceNumber={data?.data.uuid!}
        />
      }
      ticket={data.data}
    />
  );
};

export default UpdateCorreccionDatosTv;
