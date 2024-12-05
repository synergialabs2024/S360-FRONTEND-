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
import { SaveOrdenTrabajo } from '../../shared/components';
import { returnUrlInstallAsignadasOT } from '../tables/InstalacionesAsignadasOTMainPage';

export type InstalacionAsignadaOTProps = {};

const InstalacionAsignadaOT: React.FC<InstalacionAsignadaOTProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_change_ordentrabajo);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetOrdenTrabajo(uuid!);
  useLoaders(isLoading || isRefetching);

  ///* effects ----------------
  useEffect(() => {
    if (isLoading || isRefetching) return;

    if (
      !!data &&
      data?.data?.estado_orden_trabajo !==
        EstadoOrdenTrabajoEnumChoice.PENDIENTE
    ) {
      ToastWrapper.error(
        'La instalación asignada no se encuentra en estado pendiente',
      );
    }
    if (
      !!data &&
      data?.data?.estado_activacion !== EstadoActivacionEnumChoice.GESTIONADA
    ) {
      ToastWrapper.error(
        'La instalación asignada aún no ha sido gestionada por activaciones, no podrás guardar cambios',
      );
    }
  }, [data, isLoading, isRefetching]);

  if (isLoading) return null;
  if (
    !data?.data?.id ||
    data?.data?.estado_orden_trabajo !== EstadoOrdenTrabajoEnumChoice.PENDIENTE
  )
    return <Navigate to={returnUrlInstallAsignadasOT} />;

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
