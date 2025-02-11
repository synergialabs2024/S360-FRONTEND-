import { Navigate, useLocation, useParams } from 'react-router';

import { useGetAgendamiento } from '@/actions/app';
import SaveConfirmAgendaOperaciones from '@/app/operaciones/agedamiento/shared/components/SaveConfirmAgendaOperaciones';
import { PermissionsEnum, useLoaders } from '@/shared';
import { CustomTitleRefNumber } from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlSolicitudsRecoordinacionAgendaPage } from '../tables/SolicitudsRecoordinacionAgendaMainPage';

export type HandleRecoordinacionAgendaSuperVentasProps = {};

const HandleRecoordinacionAgendaSuperVentas: React.FC<
  HandleRecoordinacionAgendaSuperVentasProps
> = () => {
  useCheckPermission(PermissionsEnum.operaciones_view_agendamiento);

  const { uuid } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sr = searchParams.get('sr');
  const ventana = searchParams.get('ventana');
  const { data, isLoading, isRefetching } = useGetAgendamiento(uuid!);
  const customLoading = isLoading || isRefetching;
  useLoaders(customLoading);

  if (customLoading) return null;
  if (!data?.data?.id || !sr)
    return <Navigate to={returnUrlSolicitudsRecoordinacionAgendaPage} />;

  return (
    <>
      <SaveConfirmAgendaOperaciones
        title={
          <CustomTitleRefNumber
            initialText="Recoordinar Agendamiento"
            referenceNumber={data?.data?.numero_referencia}
          />
        }
        agendamiento={data.data}
        solicitudRecoordinacion={sr!}
        showRejectedButton={ventana!}
      />
    </>
  );
};

export default HandleRecoordinacionAgendaSuperVentas;
