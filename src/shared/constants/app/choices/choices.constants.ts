import { getEnvs } from '@/shared/utils/get-evns';

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
  GERENCIA = 'GERENCIA', // all business
  ADMINISTRADOR = 'ADMINISTRADOR', // all area
  COORDINADOR = 'COORDINADOR', // all department
  SUPERVISOR = 'SUPERVISOR', // all sales channel
  AGENTE = 'AGENTE', // all created by himself
}
export const USER_ROLES_ARRAY_CHOICES = [
  UserRolesEnumChoice.GERENCIA,
  UserRolesEnumChoice.ADMINISTRADOR,
  UserRolesEnumChoice.COORDINADOR,
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
  ADMINISTRATIVO = 'ADMINISTRATIVO',
  SUPERVISOR = 'SUPERVISOR',
  VENDEDOR = 'VENDEDOR',
  COMERCIAL = 'COMERCIAL',
  TECNICO = 'TECNICO',
  OPERARIO = 'OPERARIO',
  LOGISTICO = 'LOGISTICO',
  EVENTUAL = 'EVENTUAL',
  PASANTE = 'PASANTE',
  OTRO = 'OTRO',
}
export const EMPLOYEE_TYPE_ARRAY_CHOICES = [
  EmployeeTypeEnumChoice.ADMINISTRATIVO,
  EmployeeTypeEnumChoice.SUPERVISOR,
  EmployeeTypeEnumChoice.VENDEDOR,
  EmployeeTypeEnumChoice.COMERCIAL,
  EmployeeTypeEnumChoice.TECNICO,
  EmployeeTypeEnumChoice.OPERARIO,
  EmployeeTypeEnumChoice.LOGISTICO,
  EmployeeTypeEnumChoice.EVENTUAL,
  EmployeeTypeEnumChoice.PASANTE,
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

export enum OtpStatesEnumChoice {
  PENDIENTE = 'PENDIENTE',
  VERIFICADO = 'VERIFICADO',
  EXPIRADO = 'EXPIRADO',
  ESPERA_APROBACION = 'ESPERA_APROBACION',
}

export enum ClasificacionPlanesScoreBuroEnumChoice {
  BASICO = 'BASICO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
}
export const CLASIFICACION_PLANES_SCORE_BURO_ARRAY_CHOICES = [
  ClasificacionPlanesScoreBuroEnumChoice.BASICO,
  ClasificacionPlanesScoreBuroEnumChoice.MEDIO,
  ClasificacionPlanesScoreBuroEnumChoice.ALTO,
];
export enum EstadoPagoEnumChoice {
  PENDIENTE = 'PENDIENTE',
  PAGADO = 'PAGADO',
  REVERSADO = 'REVERSADO',
}

// // // SALES ==============================================
export enum EstadoSolicitudServicioEnumChoice {
  INGRESADO = 'INGRESADO',
  GESTIONANDO = 'GESTIONANDO',
  RECHAZADO = 'RECHAZADO',

  SIN_GESTION = 'SIN_GESTION', // unblock sale approved

  ESPERA_DESBLOQUEO = 'ESPERA_DESBLOQUEO',
  DESBLOQUEADO = 'DESBLOQUEADO',
  EN_PROCESO = 'EN_PROCESO', // hide ss while preventa is in progress
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
export enum SalesStatesActionsEnumChoice {
  // // SOLICITUD_SERVICIO ==============================
  // OTP
  OTP_CREADO = 'OTP_CREADO',
  OTP_VERIFICADO = 'OTP_VERIFICADO',

  // Solicitud desbloqueo
  SOLICITUD_DESBLOQUEO_ESPERA = 'SOLICITUD_DESBLOQUEO_ESPERA', // CREADA
  SOLICITUD_DESBLOQUEO_APROBADO = 'SOLICITUD_DESBLOQUEO_APROBADO',
  SOLICITUD_DESBLOQUEO_RECHAZADO = 'SOLICITUD_DESBLOQUEO_RECHAZADO',

  // // PREVENTA =======================================
  PREVENTA_REASIGNACION_ESPERA = 'PREVENTA__REASIGNACION_ESPERA', // CREADA

  SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_ESPERA = 'SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_ESPERA',
  SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_APROBADO = 'SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_APROBADO',
  SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_RECHAZADO = 'SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_RECHAZADO',
}

export enum SolicitudDesbloqueoTypeEnumChoice {
  FOTO_PLANILLA_PREVENTA = 'FOTO_PLANILLA_PREVENTA',
}

// // UUID
export enum MetodoPagoEnumUUID {
  DEBITO = 'b59daf11-8214-439f-a3ab-11ee7ec38260',
  CREDITO = '9fea3665-bebd-4026-a64b-5cccf7d39de6',
  RECAUDACIONES = '4750cfb2-1f08-402f-b1f3-be11fcfcd8ef',
}

// // Bucket ==============================================
const { VITE_MINIO_BUCKET_NAME } = getEnvs();

export enum BucketTypeEnumChoice {
  BUCKET_BASE = VITE_MINIO_BUCKET_NAME,

  // preventa
  IMAGES_IDENTIFICACION = 'images/identificacion',
  IMAGES_VIVIENDA = 'images/vivienda',
  IMAGES_PLANILLA_SERVICIOS = 'images/planilla-servicios',
  IMAGES_ACEPTACION_CONTRATO = 'images/acaptacion-contrato',
  IMAGES_COMPROBANTES_NO_PLANILLA = 'images/comprobantes/no-planilla',
}

export enum BucketKeyNameEnumChoice {
  CEDULA_FRONTAL = 'cedula_frontal',
  CEDULA_POSTERIOR = 'cedula_posterior',
  VIVIENDA = 'vivienda',
  PLANILLA_SERVICIOS = 'planilla_servicios',
  ACEPTACION_CONTRATO = 'aceptacion_contrato',
  COMPROBANTES_NO_PLANILLA = 'comprobantes_no_planilla',
}

// // Agendamiento ==========================================
export enum EstadoAgendamientoEnumChoice {
  ESPERA = 'ESPERA', // abre soporte tecnico para llamar
  APROBADO = 'APROBADO', // x pyl?

  RECHAZADO = 'RECHAZADO',
  FINALIZADO = 'FINALIZADO',

  PENDIENTE_PAGO = 'PENDIENTE_PAGO',
  PAUSADO = 'PAUSADO',

  CANCELADO = 'CANCELADO',
}

export enum SlotAgendamientoEstadosEnumChoice {
  AGENDADO = 'AGENDADO',
  EN_RUTA = 'EN_RUTA',
  INICIO_INSTALACION = 'INICIO_INSTALACION',
  INSTALADO = 'INSTALADO',
  MANTENIMIENTO = 'MANTENIMIENTO',
}

// examples remove ------------------
export enum UserOtherRolesEnumChoice {
  DESARROLLO_SOFTWARE = 'DESARROLLO DE SOFTWARE',
  DISENO_PRODUCTO = 'DISEÑO DE PRODUCTO',
  MARKETING_DIGITAL = 'MARKETING DIGITAL',
  ATENCION_CLIENTE = 'ATENCIÓN AL CLIENTE',
  RRHH = 'RRHH',
  FINANZAS = 'FINANZAS',
  OPERACIONES = 'OPERACIONES',
  LEGAL = 'LEGAL',
  GESTIÓN_PRODUCTO = 'GESTIÓN DE PRODUCTO',
}

export const USER_OTHER_ROLES_ARRAY_CHOICES = [
  UserOtherRolesEnumChoice.DESARROLLO_SOFTWARE,
  UserOtherRolesEnumChoice.DISENO_PRODUCTO,
  UserOtherRolesEnumChoice.MARKETING_DIGITAL,
  UserOtherRolesEnumChoice.ATENCION_CLIENTE,
  UserOtherRolesEnumChoice.RRHH,
  UserOtherRolesEnumChoice.FINANZAS,
  UserOtherRolesEnumChoice.OPERACIONES,
  UserOtherRolesEnumChoice.LEGAL,
  UserOtherRolesEnumChoice.GESTIÓN_PRODUCTO,
];

export enum EstadoValidacionAceptacionEnumChoice {
  FOTOS_NO_COINCIDEN = 'FOTOS_NO_COINCIDEN', // 0
  FOTO_FRONTAL_INVALIDA = 'FOTO_FRONTAL_sINVALIDA', // 1
  FOTO_POSTERIOR_INVALIDA = 'FOTO_POSTERIOR_INVALIDA', // 2

  VALIDADO = 'VALIDADO', // 3 ok a la 1ra
  CORREGIDO = 'CORREGIDO', // corrige ante eventualidad
}
