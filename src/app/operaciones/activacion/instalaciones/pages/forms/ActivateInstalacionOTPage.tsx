import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useGetOrdenTrabajo } from '@/actions/app';
import {
  EstadoActivacionEnumChoice,
  EstadoOrdenTrabajoEnumChoice,
  ToastWrapper,
} from '@/shared';
import { CustomTitleRefNumber } from '@/shared/components';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveActivacionInstallPendienteOT } from '../../shared/components';
import { returnUrlActivacionesInstallacionesOT } from '../tables/ActivacionesInstalacionesMainPage';

export type ActivateInstalacionOTPageProps = {};

const ActivateInstalacionOTPage: React.FC<
  ActivateInstalacionOTPageProps
> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_ordentrabajo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOrdenTrabajo(uuid!);
  useLoaders(isLoading || isRefetching);

  ///* effects ----------------
  useEffect(() => {
    if (isLoading || isRefetching) return;
    const ot = data?.data;

    if (
      !!data &&
      (ot?.estado_orden_trabajo !== EstadoOrdenTrabajoEnumChoice.PENDIENTE ||
        ot?.estado_activacion !== EstadoActivacionEnumChoice.PENDIENTE)
    ) {
      ToastWrapper.error(
        'La instalación pendiente de activación no se encuentra en estado pendiente',
      );
    }
  }, [data, isLoading, isRefetching]);

  if (isLoading) return null;
  if (
    !data?.data?.id ||
    data?.data?.estado_orden_trabajo !==
      EstadoOrdenTrabajoEnumChoice.PENDIENTE ||
    data?.data?.estado_activacion !== EstadoActivacionEnumChoice.PENDIENTE
  )
    return <Navigate to={returnUrlActivacionesInstallacionesOT} />;

  return (
    <SaveActivacionInstallPendienteOT
      titleNode={
        <CustomTitleRefNumber
          initialText="Activar instalación"
          referenceNumber={data?.data?.numero_referencia!}
        />
      }
      ordentrabajo={data.data}
    />
  );
};

export default ActivateInstalacionOTPage;
