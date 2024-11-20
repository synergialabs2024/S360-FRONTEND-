import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useGetOrdenTrabajo } from '@/actions/app';
import { EstadoOrdenTrabajoEnumChoice, ToastWrapper } from '@/shared';
import { CustomTitleRefNumber } from '@/shared/components';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveInstalacionPreRechazada } from '../../shared/components';
import { returnUrlInstallPreRechazadasOT } from '../tables/InstalacionesComercialOTMainPage';

export type InstalacionPreRechazadaOTProps = {};

const InstalacionPreRechazadaOT: React.FC<
  InstalacionPreRechazadaOTProps
> = () => {
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
        EstadoOrdenTrabajoEnumChoice.PRE_RECHAZADO
    ) {
      ToastWrapper.error(
        'La instalación asignada no se encuentra en estado pendiente',
      );
    }
  }, [data, isLoading, isRefetching]);

  if (isLoading) return null;
  if (
    !data?.data?.id ||
    data?.data?.estado_orden_trabajo !==
      EstadoOrdenTrabajoEnumChoice.PRE_RECHAZADO
  )
    return <Navigate to={returnUrlInstallPreRechazadasOT} />;

  return (
    <SaveInstalacionPreRechazada
      titleNode={
        <CustomTitleRefNumber
          initialText="Instalación Pre Rechazada"
          referenceNumber={data?.data?.numero_referencia!}
        />
      }
      ordentrabajo={data.data}
    />
  );
};

export default InstalacionPreRechazadaOT;
