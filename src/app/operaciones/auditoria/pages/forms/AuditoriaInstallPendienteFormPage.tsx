import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';

import { useGetOrdenTrabajo } from '@/actions/app';
import {
  EstadoAuditoriaOTInstallEnumChoice,
  EstadoOrdenTrabajoEnumChoice,
  PermissionsEnum,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { CustomTitleRefNumber } from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveAuditoriaInstallPendiente } from '../../shared/components/form';
import { returnUrlAuditoriaInstallacionesOT } from '../tables/AuditoriaInstalacionesMainPage';

export type AuditoriaInstallPendienteFormPageProps = {};

const AuditoriaInstallPendienteFormPage: React.FC<
  AuditoriaInstallPendienteFormPageProps
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
      (ot?.estado_orden_trabajo !==
        EstadoOrdenTrabajoEnumChoice.ESPERA_AUDITORIA ||
        ot?.estado_auditoria !== EstadoAuditoriaOTInstallEnumChoice.PENDIENTE)
    ) {
      ToastWrapper.error(
        'La instalación pendiente de auditoría no se encuentra en estado correcto',
      );
    }
  }, [data, isLoading, isRefetching]);

  if (isLoading) return null;
  if (
    !data?.data?.id ||
    data?.data?.estado_orden_trabajo !==
      EstadoOrdenTrabajoEnumChoice.ESPERA_AUDITORIA ||
    data?.data?.estado_auditoria !==
      EstadoAuditoriaOTInstallEnumChoice.PENDIENTE
  )
    return <Navigate to={returnUrlAuditoriaInstallacionesOT} />;

  return (
    <SaveAuditoriaInstallPendiente
      titleNode={
        <CustomTitleRefNumber
          initialText="Revisión de instalación"
          referenceNumber={data?.data?.numero_referencia!}
        />
      }
      ordentrabajo={data?.data}
    />
  );
};

export default AuditoriaInstallPendienteFormPage;
