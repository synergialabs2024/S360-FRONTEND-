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
import { SaveUpdInfoInstallOT } from '../../shared/components/form-upd';
import { returnUrlInstallAsignadasOT } from '../tables/InstalacionesAsignadasOTMainPage';

export type InstallAsigOTUpdInfoPageProps = {};

const InstallAsigOTUpdInfoPage: React.FC<
  InstallAsigOTUpdInfoPageProps
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
        EstadoOrdenTrabajoEnumChoice.ESPERA_CORRECCION ||
        ot?.estado_auditoria !==
          EstadoAuditoriaOTInstallEnumChoice.ESPERA_CORRECCION)
    ) {
      ToastWrapper.error(
        'La instalación pendiente de corrección no se encuentra en estado correcto',
      );
    }
  }, [data, data?.data, isLoading, isRefetching]);

  if (isLoading || isRefetching) return null;
  if (
    !data?.data?.id ||
    data?.data?.estado_orden_trabajo !==
      EstadoOrdenTrabajoEnumChoice.ESPERA_CORRECCION ||
    data?.data?.estado_auditoria !==
      EstadoAuditoriaOTInstallEnumChoice.ESPERA_CORRECCION
  )
    return <Navigate to={returnUrlInstallAsignadasOT} />;

  return (
    <SaveUpdInfoInstallOT
      titleNode={
        <CustomTitleRefNumber
          initialText="Actualización de datos de instalación"
          referenceNumber={data?.data?.numero_referencia!}
        />
      }
      ordenTrabajo={data?.data}
    />
  );
};

export default InstallAsigOTUpdInfoPage;
