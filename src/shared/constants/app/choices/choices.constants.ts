export enum IdentificationTypeEnumChoice {
  CEDULA = 'CEDULA',
  RUC = 'RUC',
  PASAPORTE = 'PASAPORTE',
}
export const IDENTIFICATION_TYPE_ARRAY_CHOICES = [
  IdentificationTypeEnumChoice.CEDULA,
  IdentificationTypeEnumChoice.RUC,
  IdentificationTypeEnumChoice.PASAPORTE,
];

export enum UserRolesEnumChoice {
  GERENCIA = 'GERENCIA',
  ADMINISTRADOR = 'ADMINISTRADOR',
  SUPERVISOR = 'SUPERVISOR',
  AGENTE = 'AGENTE',
}
export const USER_ROLES_ARRAY_CHOICES = [
  UserRolesEnumChoice.GERENCIA,
  UserRolesEnumChoice.ADMINISTRADOR,
  UserRolesEnumChoice.SUPERVISOR,
  UserRolesEnumChoice.AGENTE,
];

export enum InternetServiceTypeEnumChoice {
  FIBRA = 'FIBRA',
  RADIO = 'RADIO',
  WIRELESS = 'WIRELESS',
}
export const INTERNET_SERVICE_TYPE_ARRAY_CHOICES = [
  InternetServiceTypeEnumChoice.FIBRA,
  InternetServiceTypeEnumChoice.RADIO,
  InternetServiceTypeEnumChoice.WIRELESS,
];

export enum InternetPlanTypeEnumChoice {
  HOGAR = 'HOGAR',
  CORPORATIVO = 'CORPORATIVO',
}
export const INTERNET_PLAN_TYPE_ARRAY_CHOICES = [
  InternetPlanTypeEnumChoice.HOGAR,
  InternetPlanTypeEnumChoice.CORPORATIVO,
];

export enum InternetUnitVelocityEnumChoice {
  KB = 'KB',
  MB = 'MB',
  GB = 'GB',
}
export const INTERNET_UNIT_VELOCITY_ARRAY_CHOICES = [
  InternetUnitVelocityEnumChoice.KB,
  InternetUnitVelocityEnumChoice.MB,
  InternetUnitVelocityEnumChoice.GB,
];

export enum InternetPermanenceEnumChoice {
  DOCE_FACTURAS = '12 FACTURAS',
  VEINTICUATRO_FACTURAS = '24 FACTURAS',
  TREINTA_Y_SEIS_FACTURAS = '36 FACTURAS',
  CUARENTA_Y_OCHO_FACTURAS = '48 FACTURAS',
  SESENTA_FACTURAS = '60 FACTURAS',
  SETENTA_Y_DOS_FACTURAS = '72 FACTURAS',
  OCHENTA_Y_CUATRO_FACTURAS = '84 FACTURAS',
  NOVENTA_Y_SEIS_FACTURAS = '96 FACTURAS',
}
export const INTERNET_PERMANENCE_ARRAY_CHOICES = [
  InternetPermanenceEnumChoice.DOCE_FACTURAS,
  InternetPermanenceEnumChoice.VEINTICUATRO_FACTURAS,
  InternetPermanenceEnumChoice.TREINTA_Y_SEIS_FACTURAS,
  InternetPermanenceEnumChoice.CUARENTA_Y_OCHO_FACTURAS,
  InternetPermanenceEnumChoice.SESENTA_FACTURAS,
  InternetPermanenceEnumChoice.SETENTA_Y_DOS_FACTURAS,
  InternetPermanenceEnumChoice.OCHENTA_Y_CUATRO_FACTURAS,
  InternetPermanenceEnumChoice.NOVENTA_Y_SEIS_FACTURAS,
];

export enum SystemParameterTypeEnumChoice {
  TEXTO = 'TEXTO',
  NUMERICO = 'NUMERICO',
  FECHA = 'FECHA',
  HORA = 'HORA',
  BOOLEANO = 'BOOLEANO',
  JSON = 'JSON',
  ARRAY = 'ARRAY',
  MODELO = 'MODELO',
}
export const SYSTEM_PARAMETER_TYPE_ARRAY_CHOICES = [
  SystemParameterTypeEnumChoice.TEXTO,
  SystemParameterTypeEnumChoice.NUMERICO,
  SystemParameterTypeEnumChoice.FECHA,
  SystemParameterTypeEnumChoice.HORA,
  SystemParameterTypeEnumChoice.BOOLEANO,
  SystemParameterTypeEnumChoice.JSON,
  SystemParameterTypeEnumChoice.ARRAY,
  SystemParameterTypeEnumChoice.MODELO,
];

export enum EmployeeTypeEnumChoice {
  EVENTUAL = 'EVENTUAL',
  PASANTE = 'PASANTE',
  ADMINISTRATIVO = 'ADMINISTRATIVO',
  COMERCIAL = 'COMERCIAL',
  VENDEDOR = 'VENDEDOR',
  TECNICO = 'TECNICO',
  OPERARIO = 'OPERARIO',
  LOGISTICO = 'LOGISTICO',
  OTRO = 'OTRO',
}
export const EMPLOYEE_TYPE_ARRAY_CHOICES = [
  EmployeeTypeEnumChoice.EVENTUAL,
  EmployeeTypeEnumChoice.PASANTE,
  EmployeeTypeEnumChoice.ADMINISTRATIVO,
  EmployeeTypeEnumChoice.COMERCIAL,
  EmployeeTypeEnumChoice.VENDEDOR,
  EmployeeTypeEnumChoice.TECNICO,
  EmployeeTypeEnumChoice.OPERARIO,
  EmployeeTypeEnumChoice.LOGISTICO,
  EmployeeTypeEnumChoice.OTRO,
];

export enum SystemParameterBooleanTypeEnumChoice {
  VERDADERO = 'VERDADERO',
  FALSO = 'FALSO',
}
export const SYSTEM_PARAMETER_BOOLEAN_TYPE_ARRAY_CHOICES = [
  SystemParameterBooleanTypeEnumChoice.VERDADERO,
  SystemParameterBooleanTypeEnumChoice.FALSO,
];

export enum DiscountTypeEnumChoice {
  PORCENTAJE = 'PORCENTAJE',
  VALOR = 'VALOR',
}
export const DISCOUNT_TYPE_ARRAY_CHOICES = [
  DiscountTypeEnumChoice.PORCENTAJE,
  DiscountTypeEnumChoice.VALOR,
];

export enum RecurrenceEnumChoice {
  UNICO = 'UNICO',
  DIARIO = 'DIARIO',
  SEMANAL = 'SEMANAL',
  MENSUAL = 'MENSUAL',
  TRIMESTRAL = 'TRIMESTRAL',
  SEMESTRAL = 'SEMESTRAL',
  ANUAL = 'ANUAL',
}
export const RECURRENCE_ARRAY_CHOICES = [
  RecurrenceEnumChoice.UNICO,
  RecurrenceEnumChoice.DIARIO,
  RecurrenceEnumChoice.SEMANAL,
  RecurrenceEnumChoice.MENSUAL,
  RecurrenceEnumChoice.TRIMESTRAL,
  RecurrenceEnumChoice.SEMESTRAL,
  RecurrenceEnumChoice.ANUAL,
];

// // // SALES ================================
export enum EstadoSolicitudServicioEnumChoice {
  INGRESADO = 'INGRESADO',
  GESTIONANDO = 'GESTIONANDO',
  RECHAZADO = 'RECHAZADO',

  ESPERA_DESBLOQUEO = 'ESPERA_DESBLOQUEO',
  DESBLOQUEADO = 'DESBLOQUEADO',
}
export const ESTADO_SOLICITUD_SERVICIO_ARRAY_CHOICES = [
  EstadoSolicitudServicioEnumChoice.INGRESADO,
  EstadoSolicitudServicioEnumChoice.GESTIONANDO,
  EstadoSolicitudServicioEnumChoice.RECHAZADO,

  EstadoSolicitudServicioEnumChoice.ESPERA_DESBLOQUEO,
  EstadoSolicitudServicioEnumChoice.DESBLOQUEADO,
];
