// // SLUG ========================
export enum SystemParamsSlugsEnum {
  RADIO_CAJAS_NAP_M = 'radio_cajas_nap_metros',
  EDAD_MINIMA_VENTA = 'edad_minima_venta',

  // preventa
  TIEMPO_VIDA_OTP_MINUTOS = 'tiempo_vida_otp_minutos',
  TIEMPO_ESPERA_PAGO_HORAS = 'plazo_pago_horas',

  SCORE_BURO_PAGA_PREVIO_AGENDA = 'score_buro_paga_previo_agenda',
  SCORE_BURO_LIBRE_CUOTAS_EQUIPO_VENTA = 'score_buro_libre_cuotas_equipo_venta',
  DESCUENTO_3RA_EDAD_PORCENTAJE = 'descuento_3ra_edad_porcentaje',
  SLUG_HORAS_CORECCION_IMAGES_PREVENTA_KERAS_ACEPTACION = 'horas_correccion_images_preventa_keras_aceptacion',

  // planificador
  HORA_INICIO_INSTALACIONES = 'hora_inicio_instalaciones',
  HORA_FIN_INSTALACIONES = 'hora_fin_instalaciones',

  // general params -------------
  MANTENIMIENTO_PROGRAMADO = 'mantenimiento_programado',
}

export const defaultSystemParamsValues = {
  // planificador
  HORA_INICIO_INSTALACIONES: '08:00:00',
  HORA_FIN_INSTALACIONES: '18:00:00',
};
