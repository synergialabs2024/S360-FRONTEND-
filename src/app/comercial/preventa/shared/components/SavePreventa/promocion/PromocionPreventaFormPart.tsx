import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useFetchPromocions } from '@/actions/app';
import { useLoaders } from '@/shared';
import { CustomCardAlert } from '@/shared/components';
import type { SaveFormDataPreventa } from '../SavePreventa';
import PromocionPreventaComponent from './PromocionPreventaComponent';

export type PromocionPreventaFormPartProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
};

const PromocionPreventaFormPart: React.FC<PromocionPreventaFormPartProps> = ({
  form,
}) => {
  ///* form ----------------
  const watchedIs3raEdad = form.watch('es_tercera_edad');
  const watchedInternetPlan = form.watch('plan_internet');
  const watchedPaymentMethod = form.watch('metodo_pago');
  const watchedProvince = form.watch('provincia');
  const watchedCity = form.watch('ciudad');
  const watchedZone = form.watch('zona');
  const watchedSector = form.watch('sector');

  ///* fetch data ----------------
  const {
    data: promocionesPagingRes,
    isLoading: isLoadingPromociones,
    isRefetching: isRefetchingPromociones,
  } = useFetchPromocions({
    enabled:
      !watchedIs3raEdad &&
      !!watchedInternetPlan &&
      !!watchedPaymentMethod &&
      !!watchedProvince &&
      !!watchedCity &&
      !!watchedZone &&
      !!watchedSector,
    params: {
      page_size: 900,
      find_promocion_ventas: true,
      province: watchedProvince!,
      city: watchedCity!,
      zone: watchedZone!,
      sector: watchedSector!,
      plan: watchedInternetPlan!,
      payment_method: watchedPaymentMethod!,
    },
  });

  ///* effects ----------------
  useEffect(() => {
    const firstPromocion = promocionesPagingRes?.data?.items?.at(0);

    if (firstPromocion) {
      form.setValue('promociones', [firstPromocion?.id!]);
    } else {
      form.setValue('promociones', []);
    }
  }, [form, promocionesPagingRes]);

  const isCustomLoading = isLoadingPromociones || isRefetchingPromociones;
  useLoaders(isCustomLoading);

  if (
    !watchedInternetPlan ||
    !watchedPaymentMethod ||
    !watchedProvince ||
    !watchedCity ||
    !watchedZone ||
    !watchedSector
  )
    return (
      <>
        <CustomCardAlert
          sizeType="small"
          alertMessage={
            'Es necesario seleccionar un plan de internet y método de pago para calcular la promoción.'
          }
        />
      </>
    );

  return (
    <>
      {watchedIs3raEdad ? (
        <>
          <CustomCardAlert
            sizeType="small"
            alertMessage={
              'El cliente es de tercera edad, no aplica promociones.'
            }
            alertSeverity="info"
          />
        </>
      ) : (
        <>
          <Grid item container xs={12} spacing={2}>
            {promocionesPagingRes?.data?.items?.length === 0 ? (
              <>
                <CustomCardAlert
                  sizeType="small"
                  alertMessage={'No aplica promoicón para este cliente.'}
                  alertSeverity="info"
                />
              </>
            ) : (
              <>
                <PromocionPreventaComponent
                  promocion={promocionesPagingRes?.data?.items?.at(0)!}
                />
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default PromocionPreventaFormPart;
