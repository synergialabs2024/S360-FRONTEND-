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
}
export const INTERNET_SERVICE_TYPE_ARRAY_CHOICES = [
  InternetServiceTypeEnumChoice.FIBRA,
  InternetServiceTypeEnumChoice.RADIO,
];

export enum InternetPlanInternetTypeEnumChoice {
  HOGAR = 'HOGAR',
  CORPORATIVO = 'CORPORATIVO',
}
export const INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES = [
  InternetPlanInternetTypeEnumChoice.HOGAR,
  InternetPlanInternetTypeEnumChoice.CORPORATIVO,
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

export enum ReferidoTypeEnumChoice {
  CLIENTE = 'CLIENTE',
  FLOTA = 'FLOTA',
}
export const REFERIDO_TYPE_ARRAY_CHOICES = [
  ReferidoTypeEnumChoice.CLIENTE,
  ReferidoTypeEnumChoice.FLOTA,
];

export const ParentescoTypeEnumChoice = {
  PADRE: 'PADRE',
  MADRE: 'MADRE',
  HERMANO_A: 'HERMANO/A',
  PRIMO_A: 'PRIMO/A',
  TIO_A: 'TIO/A',
  OTRO: 'OTRO',
};
export const PARENTESCO_TYPE_ARRAY_CHOICES = [
  ParentescoTypeEnumChoice.PADRE,
  ParentescoTypeEnumChoice.MADRE,
  ParentescoTypeEnumChoice.HERMANO_A,
  ParentescoTypeEnumChoice.PRIMO_A,
  ParentescoTypeEnumChoice.TIO_A,
  ParentescoTypeEnumChoice.OTRO,
];

export const enum NapStatusEnumChoice {
  OPERATIVO = 'OPERATIVO',
  AFECTACION = 'AFECTACION',
}
export const NAP_STATUS_ARRAY_CHOICES = [
  NapStatusEnumChoice.OPERATIVO,
  NapStatusEnumChoice.AFECTACION,
];

export enum TipoCuentaBancariaEnumChoice {
  CORRIENTE = 'CORRIENTE',
  AHORRO = 'AHORRO',
}
export const TIPO_CUENTA_BANCARIA_ARRAY_CHOICES = [
  TipoCuentaBancariaEnumChoice.CORRIENTE,
  TipoCuentaBancariaEnumChoice.AHORRO,
];

// // // SALES ==============================================
export enum EstadoSolicitudServicioEnumChoice {
  INGRESADO = 'INGRESADO',
  GESTIONANDO = 'GESTIONANDO',
  RECHAZADO = 'RECHAZADO',

  SIN_GESTION = 'SIN_GESTION', // unblock sale approved

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

export enum EstadoPreventaEnumChoice {
  ESPERA = 'ESPERA',
  REALIZADO = 'REALIZADO',
  RECHAZADO = 'RECHAZADO',

  SIN_GESTION = 'SIN_GESTION', // unblock sale approved
}

// -----------------------------------------------

// global states
export enum GeneralModelStatesEnumChoice {
  ESPERA = 'ESPERA',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}
export const GENERAL_MODEL_STATES_ARRAY_CHOICES = [
  GeneralModelStatesEnumChoice.ESPERA,
  GeneralModelStatesEnumChoice.APROBADO,
  GeneralModelStatesEnumChoice.RECHAZADO,
];

// sales models - trazabilidad/unblock sales
export enum SalesModelsEnumChoice {
  SOLICITUD_SERVICIO = 'SOLICITUD_SERVICIO',
  PREVENTA = 'PREVENTA',
  SOLICITUD_DESBLOQUEO_VENTAS = 'SOLICITUD_DESBLOQUEO_VENTAS',
}
export const SALES_MODELS_ARRAY_CHOICES = [
  SalesModelsEnumChoice.SOLICITUD_SERVICIO,
  SalesModelsEnumChoice.PREVENTA,
  SalesModelsEnumChoice.SOLICITUD_DESBLOQUEO_VENTAS,
];

//
export enum SalesStatesEnumChoice {
  SOLICITUD_DESBLOQUEO_ESPERA = 'SOLICITUD_DESBLOQUEO_ESPERA', // CREADA
  SOLICITUD_DESBLOQUEO_APROBADO = 'SOLICITUD_DESBLOQUEO_APROBADO',
  SOLICITUD_DESBLOQUEO_RECHAZADO = 'SOLICITUD_DESBLOQUEO_RECHAZADO',
}

// // UUID
export enum MetodoPagoEnumUUID {
  DEBITO = 'b59daf11-8214-439f-a3ab-11ee7ec38260',
  CREDITO = '9fea3665-bebd-4026-a64b-5cccf7d39de6',
  RECAUDACIONES = '4750cfb2-1f08-402f-b1f3-be11fcfcd8ef',
}
