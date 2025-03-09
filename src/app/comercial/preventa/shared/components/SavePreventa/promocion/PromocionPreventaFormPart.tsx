/* eslint-disable indent */
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useFetchPromocions } from '@/actions/app';
import { SelectedEqPromoctionType } from '@/app/comercial/promocion/shared/components/SavePromocion/SavePromocion';
import { useLoaders } from '@/shared';
import { CustomCardAlert } from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import type { SaveFormDataPreventa } from '../SavePreventa';
import PromocionPreventaComponent from './PromocionPreventaComponent';

export type PromocionPreventaFormPartProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
};

const PromocionPreventaFormPart: React.FC<PromocionPreventaFormPartProps> = ({
  form,
}) => {
  ///* local state ----------------
  const [isMounted, setIsMounted] = useState(false);

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

  const { setItems: setEquiposPromocion } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.equiposPromocion,
    );
  const { setItems: setPromoDisccounts } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.descuentosPromocion,
    );
  const { setItems: setPromoPremios } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.premiosPromocion,
    );

  ///* effects ----------------
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const isCustomLoading = isLoadingPromociones || isRefetchingPromociones;
  useLoaders(isCustomLoading);

  useEffect(() => {
    if (!isMounted || isCustomLoading) return;
    const firstPromocion = promocionesPagingRes?.data?.items?.at(0);

    if (firstPromocion) {
      form.setValue('promociones', [firstPromocion?.id!]);
      const includedProducts = firstPromocion?.opciones_productos_incluye || [];
      const includedDiscounts =
        firstPromocion?.opciones_productos_descuento || [];
      const includedPremios = firstPromocion?.opciones_productos_premio || [];

      // to handle prev selectedPromoOptions if exists (safe pev selected when unmout stepper)
      const watchedSelectedPromoOptions =
        form?.watch('selectedPromoOptions') || [];

      setEquiposPromocion(
        includedProducts?.map(op => ({
          ...op,
          productoOptionItemList: op?.opciones || [],
          selectedUuidItem:
            watchedSelectedPromoOptions.find(opt => opt.codigo === op.codigo)
              ?.selectedUuidItem || undefined,

          promocionUuid: firstPromocion?.uuid,
        })) as any,
      );
      setPromoDisccounts(includedDiscounts as any);

      // verificar selectedPromoItems si ya hay y dejo solo esos, sino includedPremios
      const selectedPromoPremios = form?.watch('selectedPromoPremios') || [];

      const finalPremios = selectedPromoPremios.length
        ? includedPremios.filter(p =>
            selectedPromoPremios.find(sp => sp.codigo === p.codigo),
          )
        : includedPremios;
      setPromoPremios(finalPremios as any);
    } else {
      form.setValue('promociones', []);
      setEquiposPromocion([]);
      setPromoDisccounts([]);
      setPromoPremios([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, promocionesPagingRes, isMounted, isCustomLoading]);

  if (watchedIs3raEdad)
    return (
      <>
        <CustomCardAlert
          sizeType="small"
          alertMessage={'El cliente es de tercera edad, no aplica promociones.'}
          alertSeverity="info"
        />
      </>
    );

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
                  form={form}
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
