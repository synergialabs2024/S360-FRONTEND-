import { Navigate, useParams } from 'react-router-dom';

import { useGetOrdenTrabajo } from '@/actions/app';
import { CustomTitleRefNumber } from '@/shared/components';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveOrdenTrabajo } from '../../shared/components';
import { returnUrlInstallAsignadasOT } from '../tables/InstalacionesAsignadasOTMainPage';

export type InstalacionAsignadaOTProps = {};

const InstalacionAsignadaOT: React.FC<InstalacionAsignadaOTProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_ordentrabajo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOrdenTrabajo(uuid!);
  useLoaders(isLoading || isRefetching);

  if (isLoading || isRefetching) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlInstallAsignadasOT} />;

  return (
    <SaveOrdenTrabajo
      titleNode={
        <CustomTitleRefNumber
          initialText="Instalación Asignada"
          referenceNumber={data?.data?.numero_referencia!}
        />
      }
      ordentrabajo={data.data}
    />
  );
};

export default InstalacionAsignadaOT;
