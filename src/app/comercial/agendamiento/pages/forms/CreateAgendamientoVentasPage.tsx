import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useGetPreventa } from '@/actions/app';
import { EstadoPagoEnumChoice, ToastWrapper, useLoaders } from '@/shared';
import { CustomTitleRefNumber } from '@/shared/components';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveAgendamiento } from '../../shared/components';
import { returnUrlAgendamientoVentasPage } from '../tables/AgendamientoVentasMainPage';

export type CreateAgendamientoVentasPageProps = {};

const CreateAgendamientoVentasPage: React.FC<
  CreateAgendamientoVentasPageProps
> = () => {
  useCheckPermissionsArray([
    PermissionsEnum.operaciones_add_agendamiento,
    PermissionsEnum.comercial_view_preventa,
  ]);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetPreventa(uuid!);
  useLoaders(isLoading || isRefetching);

  // check state
  useEffect(() => {
    if (isLoading || isRefetching) return;

    if (
      !!data &&
      data?.data?.requiere_pago_previo &&
      data?.data?.estado_pago !== EstadoPagoEnumChoice.PAGADO
    ) {
      ToastWrapper.error('La preventa requiere pago previo al agendamiento');
    }
  }, [data, isLoading, isRefetching]);

  if (isLoading || isRefetching) return null;
  if (
    !data?.data?.id ||
    (data?.data?.requiere_pago_previo &&
      data?.data?.estado_pago !== EstadoPagoEnumChoice.PAGADO)
  )
    return <Navigate to={returnUrlAgendamientoVentasPage} />;

  return (
    <SaveAgendamiento
      title={
        <CustomTitleRefNumber
          initialText="Crear Agendamiento"
          referenceNumber={data?.data?.numero_referencia}
        />
      }
      preventa={data.data}
    />
  );
};

export default CreateAgendamientoVentasPage;
