export const ALL_MONTHS_STRING: string[] = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE',
];

export enum EquifaxEdentificationType {
  CEDULA = 'C',
  RUC = 'R',
  E = 'E',
}

export type FacturasCuotasObjArray = {
  label: string;
  value: number;
};
export const FACTURAS_CUOTAS_ARRAY_OBJECT = [
  {
    label: '1ra Factura',
    value: 1,
  },
  {
    label: '2da Factura',
    value: 2,
  },
  {
    label: '3ra Factura',
    value: 3,
  },
  {
    label: '4ta Factura',
    value: 4,
  },
  {
    label: '5ta Factura',
    value: 5,
  },
  {
    label: '6ta Factura',
    value: 6,
  },
  {
    label: '7ma Factura',
    value: 7,
  },
  {
    label: '8va Factura',
    value: 8,
  },
  {
    label: '9na Factura',
    value: 9,
  },
  {
    label: '10ma Factura',
    value: 10,
  },
  {
    label: '11va Factura',
    value: 11,
  },
  {
    label: '12va Factura',
    value: 12,
  },
];

export const DIAS_PAGO_OBJ_01_TO_28 = [
  {
    label: '01',
    value: 1,
  },
  {
    label: '02',
    value: 2,
  },
  {
    label: '03',
    value: 3,
  },
  {
    label: '04',
    value: 4,
  },
  {
    label: '05',
    value: 5,
  },
  {
    label: '06',
    value: 6,
  },
  {
    label: '07',
    value: 7,
  },
  {
    label: '08',
    value: 8,
  },
  {
    label: '09',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '11',
    value: 11,
  },
  {
    label: '12',
    value: 12,
  },
  {
    label: '13',
    value: 13,
  },
  {
    label: '14',
    value: 14,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '16',
    value: 16,
  },
  {
    label: '17',
    value: 17,
  },
  {
    label: '18',
    value: 18,
  },
  {
    label: '19',
    value: 19,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '21',
    value: 21,
  },
  {
    label: '22',
    value: 22,
  },
  {
    label: '23',
    value: 23,
  },
  {
    label: '24',
    value: 24,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '26',
    value: 26,
  },
  {
    label: '27',
    value: 27,
  },
  {
    label: '28',
    value: 28,
  },
];

export type DiasAntesCreacionFacturaType = {
  label: string;
  value: string;
};

export const DIAS_1_TO_25_OBJ = [
  {
    label: '1 día antes',
    value: '1',
  },
  {
    label: '2 días antes',
    value: '2',
  },
  {
    label: '3 días antes',
    value: '3',
  },
  {
    label: '4 días antes',
    value: '4',
  },
  {
    label: '5 días antes',
    value: '5',
  },
  {
    label: '6 días antes',
    value: '6',
  },
  {
    label: '7 días antes',
    value: '7',
  },
  {
    label: '8 días antes',
    value: '8',
  },
  {
    label: '9 días antes',
    value: '9',
  },
  {
    label: '10 días antes',
    value: '10',
  },
  {
    label: '11 días antes',
    value: '11',
  },
  {
    label: '12 días antes',
    value: '12',
  },
  {
    label: '13 días antes',
    value: '13',
  },
  {
    label: '14 días antes',
    value: '14',
  },
  {
    label: '15 días antes',
    value: '15',
  },
  {
    label: '16 días antes',
    value: '16',
  },
  {
    label: '17 días antes',
    value: '17',
  },
  {
    label: '18 días antes',
    value: '18',
  },
  {
    label: '19 días antes',
    value: '19',
  },
  {
    label: '20 días antes',
    value: '20',
  },
  {
    label: '21 días antes',
    value: '21',
  },
  {
    label: '22 días antes',
    value: '22',
  },
  {
    label: '23 días antes',
    value: '23',
  },
  {
    label: '24 días antes',
    value: '24',
  },
  {
    label: '25 días antes',
    value: '25',
  },
];

export const CREAR_FACTURA_DIAS_ANTES_ARRAY_OBJ = [
  {
    label: 'DESACTIVADO',
    value: '0',
  },

  ...DIAS_1_TO_25_OBJ,
];

export const DIAS_GRACIA_ARRAY_OBJ = [
  {
    label: '0 Días',
    value: '0',
  },
  ...DIAS_1_TO_25_OBJ,
];

export type DiasRecordatorioPagoType = {
  label: string;
  value: string;
};
export const DIAS_RECORDATORIO_PAGO_ARRAY_OBJ = [
  {
    label: 'DESACTIVADO',
    value: '0',
  },
  ...DIAS_1_TO_25_OBJ,
];
