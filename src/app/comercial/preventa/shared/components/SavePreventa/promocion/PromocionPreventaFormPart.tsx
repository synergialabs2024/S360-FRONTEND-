import { Grid } from '@mui/material';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MdUnfoldMore } from 'react-icons/md';

import { useFetchPromocions } from '@/actions/app';
import { gridSizeMdLg1, gridSizeMdLg11, useLoaders } from '@/shared';
import {
  CustomCardAlert,
  CustomTextFieldNoForm,
  SingleIconButton,
} from '@/shared/components';
import type { SaveFormDataPreventa } from '../SavePreventa';
import PromocionPreventaComponent from './PromocionPreventaComponent';

export type PromocionPreventaFormPartProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
};

const PromocionPreventaFormPart: React.FC<PromocionPreventaFormPartProps> = ({
  form,
}) => {
  ///* local state ----------------
  const [isVissible, setIsVissible] = useState(false);

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

  const isCustomLoading = isLoadingPromociones || isRefetchingPromociones;
  useLoaders(isCustomLoading);

  return (
    <>
      {!watchedIs3raEdad ? (
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
            <Grid
              item
              container
              xs={12}
              spacing={2}
              alignItems="end"
              justifyContent="center"
              pb={4}
            >
              <CustomTextFieldNoForm
                label="Promoción aplicada"
                value={promocionesPagingRes?.data?.items?.at(0)?.name || 'N/A'}
                disabled
                size={gridSizeMdLg11}
              />

              <SingleIconButton
                startIcon={<MdUnfoldMore />}
                onClick={() => {
                  setIsVissible(!isVissible);
                }}
                label={
                  isVissible ? 'Ocultar detalles' : 'Ver detalles de promoción'
                }
                size={gridSizeMdLg1}
              />
            </Grid>

            {/* --------- table --------- */}
            <Grid item xs={12}>
              {isVissible && (
                <>
                  <PromocionPreventaComponent
                    promocion={promocionesPagingRes?.data?.items?.at(0)! || {}}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default PromocionPreventaFormPart;
