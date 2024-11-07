import { Navigate, useParams } from 'react-router-dom';

import { useGetAgendamiento } from '@/actions/app';
import { PermissionsEnum, useLoaders } from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlAgendamientoOperacionesPage } from '../tables/AgendamientosMainPage';

// // // YA NO VA ESTE PROCESO XQ NO HAY PYL
export type ConfirmAgendaOperacionesPageProps = {};

const ConfirmAgendaOperacionesPage: React.FC<
  ConfirmAgendaOperacionesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.operaciones_view_agendamiento);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetAgendamiento(uuid!);
  const customLoading = isLoading || isRefetching;
  useLoaders(customLoading);

  if (customLoading) return null;
  if (!data?.data?.id)
    return <Navigate to={returnUrlAgendamientoOperacionesPage} />;

  return (
    <>
      {/* <SaveConfirmAgendaOperaciones
        title={
          <CustomTitleRefNumber
            initialText="Gestionar Agendamiento"
            referenceNumber={data?.data?.numero_referencia}
          />
        }
        agendamiento={data.data}
      /> */}
      sss
    </>
  );
};

export default ConfirmAgendaOperacionesPage;
