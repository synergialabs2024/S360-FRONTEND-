// // SLUG ========================
export enum SystemParamsSlugsEnum {
  RADIO_CAJAS_NAP_M = 'radio_cajas_nap_metros',
  TIEMPO_VIDA_OTP_MINUTOS = 'tiempo_vida_otp_minutos',
  EDAD_MINIMA_VENTA = 'edad_minima_venta',
  TIEMPO_ESPERA_PAGO_HORAS = 'plazo_pago_horas',
  SCORE_BURO_PAGA_PREVIO_AGENDA = 'score_buro_paga_previo_agenda',

  // planificador
  HORA_INICIO_INSTALACIONES = 'hora_inicio_instalaciones',
  HORA_FIN_INSTALACIONES = 'hora_fin_instalaciones',
}

export const defaultSystemParamsValues = {
  // planificador
  HORA_INICIO_INSTALACIONES: '08:00:00',
  HORA_FIN_INSTALACIONES: '18:00:00',
};
