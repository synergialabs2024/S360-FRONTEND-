import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { PromocionPreventaComponent } from '@/app/comercial/preventa/shared/components';
import { SelectedEqPromoctionType } from '@/app/comercial/promocion/shared/components/SavePromocion/SavePromocion';
import type { Preventa, Promocion } from '@/shared';
import { CustomCardAlert } from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento';

export type PromocionPreventaViewProps = {
  preventa: Preventa;
  form?: UseFormReturn<SaveFormDataAgendaVentas>;
};

const PromocionPreventaView: React.FC<PromocionPreventaViewProps> = ({
  preventa,
  form,
}) => {
  ///* global state ---------------------
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
    if (!preventa) return;

    const promocion: Promocion =
      (preventa?.promociones_data?.at(0) as Promocion) || ({} as Promocion);
    const includedEquipos = promocion?.opciones_productos_incluye || [];
    const includedDiscounts = promocion?.opciones_productos_descuento || [];

    const watchedSelectedPromoOptions =
      form?.watch('selectedPromoOptions') || [];

    setEquiposPromocion(
      includedEquipos?.map(opt => ({
        ...opt,
        productoOptionItemList: opt?.opciones || [],
        selectedUuidItem: (
          watchedSelectedPromoOptions.find(
            selected => selected.codigo === opt.codigo,
          ) as any
        )?.selected_item_uuid,
      })) as any,
    );

    setPromoDisccounts(includedDiscounts as any);

    const includedPremios = promocion?.opciones_productos_premio || [];
    setPromoPremios(includedPremios as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventa, form]);

  if (preventa?.es_tercera_edad)
    return (
      <CustomCardAlert
        sizeType="small"
        alertMessage={'El cliente es de tercera edad, no aplica promociones.'}
        alertSeverity="info"
      />
    );

  if (preventa?.promociones_data?.length === 0)
    return (
      <CustomCardAlert
        sizeType="small"
        alertMessage={'No aplica promoicón para este cliente.'}
        alertSeverity="info"
      />
    );

  return (
    <PromocionPreventaComponent
      promocion={
        (preventa?.promociones_data?.at(0)! as unknown as Promocion) || {}
      }
      optionSelectDisabled
      form={form as any}
      isOnlyViewPromo
    />
  );
};

export default PromocionPreventaView;
