// export const NAPS_PORTS_QUANTITY_ARRAY = ['8', '12', '16', '24', '32', '48'];

export const NAPS_PORTS_QUANTITY_ARRAY = [8, 12, 16, 24, 32, 48];

export const FACTURAS_CUOTAS_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

import {
  InvetarioCodesEnum,
  valueTipoRecuerrenciaAlquilerEnumChoice,
} from './choices.constants';

export type GenericAutocompleteNoFormType = {
  label: string;
  value: string | number;
};

export const CATEGORIA_PRODUCTOS_PROMOCION: GenericAutocompleteNoFormType[] = [
  {
    label: 'EQUIPOS',
    value: InvetarioCodesEnum.EQUIPOS,
  },
  {
    label: 'DIGITAL',
    value: InvetarioCodesEnum.DIGITAL,
  },
];

export const TIPO_PAGO_PROMOCION_ALQUILER_ARRAY: GenericAutocompleteNoFormType[] =
  [
    {
      label: 'MENSUAL',
      value: valueTipoRecuerrenciaAlquilerEnumChoice.MENSUAL,
    },
    {
      label: 'CUOTAS',
      value: valueTipoRecuerrenciaAlquilerEnumChoice.CUOTAS,
    },
  ];
