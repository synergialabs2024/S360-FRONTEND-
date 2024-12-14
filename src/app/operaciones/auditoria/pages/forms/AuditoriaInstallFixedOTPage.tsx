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
import SaveAuditoriaFixedDataOt from '../../shared/components/form/SaveAuditoriaFixedDataOt';
import { returnUrlAuditoriaInstallacionesOT } from '../tables/AuditoriaInstalacionesMainPage';

export type AuditoriaInstallFixedOTPageProps = {};

const AuditoriaInstallFixedOTPage: React.FC<
  AuditoriaInstallFixedOTPageProps
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
        EstadoOrdenTrabajoEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION ||
        ot?.estado_auditoria !==
          EstadoAuditoriaOTInstallEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION)
    ) {
      ToastWrapper.error(
        'La instalación pendiente de auditoría no se encuentra en estado correcto',
      );
    }
  }, [data, isLoading, isRefetching]);

  if (isLoading || isRefetching) return null;
  if (
    !data?.data?.id ||
    data?.data?.estado_orden_trabajo !==
      EstadoOrdenTrabajoEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION ||
    data?.data?.estado_auditoria !==
      EstadoAuditoriaOTInstallEnumChoice.ACTUALIZADOS_TECNICO_ESPERA_REVISION
  )
    return <Navigate to={returnUrlAuditoriaInstallacionesOT} />;

  return (
    <SaveAuditoriaFixedDataOt
      titleNode={
        <CustomTitleRefNumber
          initialText="Revisión de instalación actualizada"
          referenceNumber={data?.data?.numero_referencia!}
        />
      }
      ot={data?.data}
    />
  );
};

export default AuditoriaInstallFixedOTPage;
