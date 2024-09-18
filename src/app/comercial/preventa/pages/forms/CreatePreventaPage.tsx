import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useGetSolicitudServicio } from '@/actions/app';
import {
  EstadoSolicitudServicioEnumChoice,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { CustomTitleRefNumber } from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SavePreventa } from '../../shared/components';
import { returnUrlPreventasPage } from '../tables/PreventasMainPage';

// // Preventa open Solicitud Servicio
export type CreatePreventaPageProps = {};

const CreatePreventaPage: React.FC<CreatePreventaPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_add_preventa);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSolicitudServicio(
    uuid!,
    false,
  );
  useLoaders(isLoading || isRefetching);

  ///* effects ----------------
  // check state
  useEffect(() => {
    if (isLoading || isRefetching) return;

    if (
      !!data &&
      data?.data?.estado_solicitud !==
        EstadoSolicitudServicioEnumChoice.INGRESADO
    ) {
      ToastWrapper.error(
        'La solicitud de servicio no se encuentra en estado ingresado',
      );
    }
  }, [data, isLoading, isRefetching]);

  if (isLoading) return null; // no isRefetching commented 'cause opt
  if (!data?.data?.id) return <Navigate to={returnUrlPreventasPage} />;

  return (
    <SavePreventa
      title={
        <CustomTitleRefNumber
          initialText="Crear Preventa"
          referenceNumber={data?.data?.numero_referencia}
        />
      }
      solicitudServicio={data.data}
    />
  );
};

export default CreatePreventaPage;
