import { getEnvs } from '@/shared/utils/get-evns';

export enum IdentificationTypeEnumChoice {
  CEDULA = 'CEDULA',
  RUC = 'RUC',
  PASAPORTE = 'PASAPORTE',
}
export const IDENTIFICATION_TYPE_ARRAY_CHOICES = [
  IdentificationTypeEnumChoice.CEDULA,
  IdentificationTypeEnumChoice.RUC,
  // IdentificationTypeEnumChoice.PASAPORTE,
];
export const IDENTIFICATION_TYPE_ARRAY_CHOICES_OBJ_SOL_SERVICE = [
  {
    label: 'CEDULA',
    value: IdentificationTypeEnumChoice.CEDULA,
  },
  {
    label: 'RUC',
    value: IdentificationTypeEnumChoice.RUC,
  },
];
export const CountryISOCodeEnumChoice = {
  ECUADOR: 'EC',
};

export enum UserRolesEnumChoice {
  GERENCIA = 'GERENCIA', // all business
  ADMINISTRADOR = 'ADMINISTRADOR', // all area
  COORDINADOR = 'COORDINADOR', // all department
  SUPERVISOR = 'SUPERVISOR', // all sales channel
  AGENTE = 'AGENTE', // all created by himself

  TECNICO = 'TECNICO', // flotas - group tecnico
  PLANTA_EXTERNA = 'PLANTA EXTERNA', // flotas - group tecnico
  INVENTARIO = 'INVENTARIO', // flotas - group tecnico
  OPERADOR_ACTIVACIONES = 'OPERADOR ACTIVACIONES', // all orden trabajo
  // no filters (pool ips, netconect):
  OPERADOR_NETWORKING = 'OPERADOR NETWORKING',
  OPERACIONES = 'OPERACIONES',

  BODEGA = 'BODEGA',
  COORDINADOR_LOGISTICA = 'COORDINADOR_LOGISTICA',
  COORDINADOR_VENTAS = 'COORDINADOR_VENTAS',
  AUXILIAR = 'AUXILIAR',
  INVENTARIO_GENERAL = 'INVENTARIO_GENERAL',
  OPERADOR = 'OPERADOR',
  PRODUCTO = 'PRODUCTO',
  SOPORTE_N1 = 'SOPORTE_N1',
  COBRANZA = 'COBRANZA',
  TICKET = 'TICKET',

  SAC = 'SAC',
  JEFATURA_NOC = 'JEFATURA_NOC',
  OPERADOR_NOC = 'OPERADOR_NOC',
  OPERACIONES_RUTA = 'OPERACIONES_RUTA',
  OPERACIONES_ALL = 'OPERACIONES_ALL',
  ADMIN = 'ADMIN',
  INVENTARIO_CLIENTE = 'INVENTARIO_CLIENTE',
  ANALISTA_COBRANZA_P = 'ANALISTA_COBRANZA_P',
  ANALISTA_COBRANZA_2DO = 'ANALISTA_COBRANZA_2DO',
  ANALISTA_COBRANZA_3ER = 'ANALISTA_COBRANZA_3ER',
  GESTOR_COBRANZA = 'GESTOR_COBRANZA',
  GESTOR_COBRANZA_2DO = 'GESTOR_COBRANZA_2DO',
  PRODUCTO_CLIENTE = 'PRODUCTO_CLIENTE',
  CX_SOPORTE = 'CX-SOPORTE',
  CX_SAC = 'CX_SAC',
  LOGISTICA_ZONAS = 'LOGISTICA DE ZONAS',
}
export const USER_ROLES_ARRAY_CHOICES = [
  UserRolesEnumChoice.GERENCIA,
  UserRolesEnumChoice.ADMINISTRADOR,
  UserRolesEnumChoice.COORDINADOR,
  UserRolesEnumChoice.SUPERVISOR,
  UserRolesEnumChoice.AGENTE,

  UserRolesEnumChoice.TECNICO,
  UserRolesEnumChoice.PLANTA_EXTERNA,
  UserRolesEnumChoice.INVENTARIO,
  UserRolesEnumChoice.OPERADOR_ACTIVACIONES,
  UserRolesEnumChoice.OPERADOR_NETWORKING,

  UserRolesEnumChoice.BODEGA,
  UserRolesEnumChoice.COORDINADOR_LOGISTICA,
  UserRolesEnumChoice.COORDINADOR_VENTAS,
  UserRolesEnumChoice.AUXILIAR,
  UserRolesEnumChoice.INVENTARIO_GENERAL,
  UserRolesEnumChoice.OPERADOR,
  UserRolesEnumChoice.PRODUCTO,
  UserRolesEnumChoice.SOPORTE_N1,
  UserRolesEnumChoice.COBRANZA,
  UserRolesEnumChoice.OPERACIONES,
  UserRolesEnumChoice.TICKET,

  UserRolesEnumChoice.SAC,
  UserRolesEnumChoice.JEFATURA_NOC,
  UserRolesEnumChoice.OPERADOR_NOC,
  UserRolesEnumChoice.OPERACIONES_RUTA,
  UserRolesEnumChoice.OPERACIONES_ALL,
  UserRolesEnumChoice.ADMIN,
  UserRolesEnumChoice.INVENTARIO_CLIENTE,
  UserRolesEnumChoice.ANALISTA_COBRANZA_P,
  UserRolesEnumChoice.ANALISTA_COBRANZA_2DO,
  UserRolesEnumChoice.ANALISTA_COBRANZA_3ER,
  UserRolesEnumChoice.GESTOR_COBRANZA,
  UserRolesEnumChoice.GESTOR_COBRANZA_2DO,
  UserRolesEnumChoice.PRODUCTO_CLIENTE,
  UserRolesEnumChoice.CX_SOPORTE,
  UserRolesEnumChoice.CX_SAC,
  UserRolesEnumChoice.LOGISTICA_ZONAS,
];

export enum InternetServiceTypeEnumChoice {
  FIBRA = 'FIBRA',
  RADIO = 'RADIO',
}
export const INTERNET_SERVICE_TYPE_ARRAY_CHOICES = [
  InternetServiceTypeEnumChoice.FIBRA,
  InternetServiceTypeEnumChoice.RADIO,
];
export const INTERNET_SERVICE_TYPE_ARRAY_CHOICES_VENTAHOME = [
  InternetServiceTypeEnumChoice.FIBRA,
];

export enum InternetPlanInternetTypeEnumChoice {
  HOGAR = 'HOGAR',
  CORPORATIVO = 'CORPORATIVO',
  CONVENIOS = 'CONVENIOS',
  PYMES = 'PYMES',
}
export const INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES_ALL = [
  InternetPlanInternetTypeEnumChoice.HOGAR,
  InternetPlanInternetTypeEnumChoice.CORPORATIVO,
  InternetPlanInternetTypeEnumChoice.CONVENIOS,
  InternetPlanInternetTypeEnumChoice.PYMES,
];

export const INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES = [
  InternetPlanInternetTypeEnumChoice.HOGAR,
  InternetPlanInternetTypeEnumChoice.PYMES,
];

/* 
INTERNET_UNIT_VELOCITY = (
    ('Kbps', 'Kbps'),
    ('Mbps', 'Mbps'),
    ('Gbps', 'Gbps'),
)
*/
export enum InternetUnitVelocityEnumChoice {
  KBPS = 'Kbps',
  MBPS = 'Mbps',
  GBPS = 'Gbps',
}
export const INTERNET_UNIT_VELOCITY_ARRAY_CHOICES = [
  InternetUnitVelocityEnumChoice.KBPS,
  InternetUnitVelocityEnumChoice.MBPS,
  InternetUnitVelocityEnumChoice.GBPS,
];
// export enum InternetUnitVelocityEnumChoice {
//   KB = 'KB',
//   MB = 'MB',
//   GB = 'GB',
// }
// export const INTERNET_UNIT_VELOCITY_ARRAY_CHOICES = [
//   InternetUnitVelocityEnumChoice.KB,
//   InternetUnitVelocityEnumChoice.MB,
//   InternetUnitVelocityEnumChoice.GB,
// ];

export enum IpUsesTypeEnumChoice {
  ESTATICO = 'ESTATICO',
  DINAMICO = 'DINAMICO',
}
export const IP_USES_TYPE_ARRAY_CHOICES = [
  IpUsesTypeEnumChoice.ESTATICO,
  IpUsesTypeEnumChoice.DINAMICO,
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

  SUPERVISOR_SERVICIO_CLIENTE = 'SUPERVISOR DE SERVICIO AL CLIENTE',
  ASESOR_SERVICIO_CLIENTE = 'ASESOR DE SERVICIO AL CLIENTE',
  ASESOR_RETENCION_FIDELIZACION = 'ASESOR DE RETENCION Y FIDELIZACION',
  SUPERVISORA_SOPORTE_TÉCNICO_N1 = 'SUPERVISORA SOPORTE TÉCNICO N1',
  SOPORTE_NIVEL_1 = 'SOPORTE NIVEL 1',
  ANALISTA_INVESTIGACIÓN_DESARROLLO_PRODUCTO = 'ANALISTA DE INVESTIGACIÓN Y DESARROLLO DE PRODUCTO',
  JEFE_PRODUCTO = 'JEFE DE PRODUCTO',
  GESTOR_COBRANZAS = 'GESTOR DE COBRANZAS',
  ANALISTA_COBRANZAS = 'ANALISTA DE COBRANZAS',
  AUXILIAR_BODEGA = 'AUXILIAR DE BODEGA',
  BODEGUERO = 'BODEGUERO',
  COORDINADOR_INVENTARIOS = 'COORDINADOR DE INVENTARIOS',
  JEFE_INVENTARIOS_ACTIVOS_FIJOS = 'JEFE DE INVENTARIOS Y ACTIVOS FIJOS',
  JEFE_COBRANZAS = 'JEFE DE COBRANZAS',
  ANALISTA_ADMINISTRATIVO_FINANCIERO = 'ANALISTA ADMINISTRATIVO FINANCIERO',
  COORDINADOR_FINANCIERO = 'COORDINADOR FINANCIERO',
  ESPECIALISTA_PROCESOS = 'ESPECIALISTA DE PROCESOS',
  CAPACITACIONES = 'CAPACITACIONES',
  ANALISTA_INFRAESTRUCTURA = 'ANALISTA DE INFRAESTRUCTURA',
  JEFE_INFRAESTRUCTURA = 'JEFE DE INFRAESTRUCTURA',
  JEFATURA_NETWORKING = 'JEFATURA DE NETWORKING',
  INGENIERO_NETWORKING_N2 = 'INGENIERO DE NETWORKING N2',
  COORDINADOR_OPERACIONES = 'COORDINADOR DE OPERACIONES',
  COORDINADOR_RUTAS = 'COORDINADOR DE RUTAS',
  COORDINADOR_SERVICIO_TECNICO = 'COORDINADOR DE SERVICIO TECNICO',
  COORDINADOR_INSTALACIONES = 'COORDINADOR DE INSTALACIONES',
  JEFE_OPERACIONES = 'JEFE DE OPERACIONES',
  GERENTE_ESTRATEGIA_COMERCIAL_FIDELIZACION = 'GERENTE DE ESTRATEGIA COMERCIAL Y FIDELIZACIÓN',
  GERENTE_VENTAS = 'GERENTE DE VENTAS',
  EJECUTIVO_NUEVOS_NEGOCIOS = 'EJECUTIVO DE NUEVOS NEGOCIOS',
  VENDEDOR_DIGITAL = 'VENDEDOR DIGITAL',
  SUPERVISOR_VENTAS_DIGITALES = 'SUPERVISOR DE VENTAS DIGITALES',
  OPERADOR_NOC = 'OPERADOR NOC',
  JEFE_NOC = 'JEFE NOC',

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

  EmployeeTypeEnumChoice.SUPERVISOR_SERVICIO_CLIENTE,
  EmployeeTypeEnumChoice.ASESOR_SERVICIO_CLIENTE,
  EmployeeTypeEnumChoice.ASESOR_RETENCION_FIDELIZACION,
  EmployeeTypeEnumChoice.SUPERVISORA_SOPORTE_TÉCNICO_N1,
  EmployeeTypeEnumChoice.SOPORTE_NIVEL_1,
  EmployeeTypeEnumChoice.ANALISTA_INVESTIGACIÓN_DESARROLLO_PRODUCTO,
  EmployeeTypeEnumChoice.JEFE_PRODUCTO,
  EmployeeTypeEnumChoice.GESTOR_COBRANZAS,
  EmployeeTypeEnumChoice.ANALISTA_COBRANZAS,
  EmployeeTypeEnumChoice.AUXILIAR_BODEGA,
  EmployeeTypeEnumChoice.BODEGUERO,
  EmployeeTypeEnumChoice.COORDINADOR_INVENTARIOS,
  EmployeeTypeEnumChoice.JEFE_INVENTARIOS_ACTIVOS_FIJOS,
  EmployeeTypeEnumChoice.JEFE_COBRANZAS,
  EmployeeTypeEnumChoice.ANALISTA_ADMINISTRATIVO_FINANCIERO,
  EmployeeTypeEnumChoice.COORDINADOR_FINANCIERO,
  EmployeeTypeEnumChoice.ESPECIALISTA_PROCESOS,
  EmployeeTypeEnumChoice.CAPACITACIONES,
  EmployeeTypeEnumChoice.ANALISTA_INFRAESTRUCTURA,
  EmployeeTypeEnumChoice.JEFE_INFRAESTRUCTURA,
  EmployeeTypeEnumChoice.JEFATURA_NETWORKING,
  EmployeeTypeEnumChoice.INGENIERO_NETWORKING_N2,
  EmployeeTypeEnumChoice.COORDINADOR_OPERACIONES,
  EmployeeTypeEnumChoice.COORDINADOR_RUTAS,
  EmployeeTypeEnumChoice.COORDINADOR_SERVICIO_TECNICO,
  EmployeeTypeEnumChoice.COORDINADOR_INSTALACIONES,
  EmployeeTypeEnumChoice.JEFE_OPERACIONES,
  EmployeeTypeEnumChoice.GERENTE_ESTRATEGIA_COMERCIAL_FIDELIZACION,
  EmployeeTypeEnumChoice.GERENTE_VENTAS,
  EmployeeTypeEnumChoice.EJECUTIVO_NUEVOS_NEGOCIOS,
  EmployeeTypeEnumChoice.VENDEDOR_DIGITAL,
  EmployeeTypeEnumChoice.SUPERVISOR_VENTAS_DIGITALES,
  EmployeeTypeEnumChoice.OPERADOR_NOC,
  EmployeeTypeEnumChoice.JEFE_NOC,

  EmployeeTypeEnumChoice.EVENTUAL,
  EmployeeTypeEnumChoice.PASANTE,
  EmployeeTypeEnumChoice.OTRO,
];

export enum MotivoRechazoModuloEnumChoice {
  SOLICITUD_SERVICIO = 'SOLICITUD DE SERVICIO',
  PREVENTA = 'PREVENTA',
  TECNICO = 'TECNICO',
  VISITAS = 'VISITAS',
  GENERICO = 'GENERICO',
  TICKET_TECNICO = 'TICKET TECNICO',
}
export const MOTIVO_RECHAZO_MODULO_ARRAY_CHOICES = [
  MotivoRechazoModuloEnumChoice.SOLICITUD_SERVICIO,
  MotivoRechazoModuloEnumChoice.PREVENTA,
  MotivoRechazoModuloEnumChoice.TECNICO,
  MotivoRechazoModuloEnumChoice.VISITAS,
  MotivoRechazoModuloEnumChoice.GENERICO,
  MotivoRechazoModuloEnumChoice.TICKET_TECNICO,
];
export enum MotivoActualizacionModuloEnumChoice {
  SOLICITUD_SERVICIO = 'SOLICITUD DE SERVICIO',
  PREVENTA = 'PREVENTA',
  AGENDAMIENTO = 'AGENDAMIENTO',
  GENERICO = 'GENERICO',
}
export const MOTIVO_ACTUALIZACION_MODULO_ARRAY_CHOICES = [
  MotivoActualizacionModuloEnumChoice.SOLICITUD_SERVICIO,
  MotivoActualizacionModuloEnumChoice.PREVENTA,
  MotivoActualizacionModuloEnumChoice.AGENDAMIENTO,
  MotivoActualizacionModuloEnumChoice.GENERICO,
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

export enum ScoreBuroEnumChoice {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}
export const SCORE_BURO_ARRAY_CHOICES = [
  ScoreBuroEnumChoice.A,
  ScoreBuroEnumChoice.B,
  ScoreBuroEnumChoice.C,
  ScoreBuroEnumChoice.D,
  ScoreBuroEnumChoice.E,
];

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
  CANCELADO = 'CANCELADO', // cancela el vendedor x cliente

  SIN_GESTION = 'SIN_GESTION', // unblock sale approved
  FINALIZADO = 'FINALIZADO',

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
export enum EstadosContribuyenteEnumRUC {
  SUSPENDIDO = 'SUSPENDIDO',
  ACTIVO = 'ACTIVO',
}

export enum EstadoPreventaEnumChoice {
  ESPERA = 'ESPERA',
  FINALIZADO = 'FINALIZADO',
  RECHAZADO = 'RECHAZADO',
  FALLIDO = 'CANCELADO', // cancela el vendedor x cliente

  SIN_GESTION = 'SIN_GESTION', // unblock sale approved
}

export enum EstadoSolicitudAprobacionIAEnumChoice {
  ESPERA = 'ESPERA',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}

export enum EstadoSolicitudMaterialEnumChoice {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO',
  SIN_GESTION = 'SIN_GESTION',
}

export enum EstadoCorreccionPreventaEnumChoice {
  CORREGIDO = 'CORREGIDO',
  FOTO_CEDULA_NO_ROSTRO = 'FOTO_CEDULA_NO_ROSTRO',
  FOTO_ACEPTACION_NO_ROSTRO = 'FOTO_ACEPTACION_NO_ROSTRO',
  ROSTROS_NO_COINCIDEN = 'ROSTROS_NO_COINCIDEN',
  PENDIENTE_APROBACION_MANUAL = 'PENDIENTE APROBACION MANUAL',
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
  // crea solicitud desbloqueo
  SOLICITUD_DESBLOQUEO_ESPERA = 'SOLICITUD_DESBLOQUEO_ESPERA', // CREADA
  SOLICITUD_DESBLOQUEO_APROBADO = 'SOLICITUD_DESBLOQUEO_APROBADO',
  SOLICITUD_DESBLOQUEO_RECHAZADO = 'SOLICITUD_DESBLOQUEO_RECHAZADO',

  // OTP
  OTP_CREADO = 'OTP_CREADO',
  OTP_VERIFICADO = 'OTP_VERIFICADO',

  // SOL Servicio
  SOLICITUD_SERVICIO__INGRESADO = 'SOLICITUD_SERVICIO__INGRESADO',
  SOLICITUD_SERVICIO__RECHAZADO = 'SOLICITUD_SERVICIO__RECHAZADO',
  SOLICITUD_SERVICIO__CANCELADO = 'SOLICITUD_SERVICIO__CANCELADO',
  SOLICITUD_SERVICIO__FINALIZADO = 'SOLICITUD_SERVICIO__FINALIZADO',

  // OTP
  OTP_SOLICITUD_LIBERACION_CREADO = 'OTP_SOLICITUD_LIBERACION_CREADO',
  OTP_SOLICITUD_LIBERACION_VERIFICADO = 'OTP_SOLICITUD_LIBERACION_VERIFICADO',

  // // PREVENTA =======================================
  PREVENTA__CREADO = 'PREVENTA__CREADO',
  PREVENTA__CANCELADO = 'PREVENTA__CANCELADO',
  PREVENTA__CONTRATO_ACEPTADO = 'PREVENTA__CONTRATO_ACEPTADO',
  PREVENTA__FINALIZADO = 'PREVENTA__FINALIZADO',
  PREVENTA__SIN_GESTION = 'PREVENTA__SIN_GESTION',

  //PREVENTA__RECHAZADO = 'PREVENTA__RECHAZADO',

  // sol desbloqueo preventa
  PREVENTA_SOLICITUD_DESBLOQUEO_ESPERA = 'PREVENTA__SOLICITUD_DESBLOQUEO_ESPERA', // CREADA
  PREVENTA_SOLICITUD_DESBLOQUEO_APROBADO = 'PREVENTA__SOLICITUD_DESBLOQUEO_APROBADO',
  PREVENTA_SOLICITUD_DESBLOQUEO_RECHAZADO = 'PREVENTA__SOLICITUD_DESBLOQUEO_RECHAZADO',

  // CORRECCIONES
  PREVENTA__ACEPTACION_IMAGES_CORREGIDO = 'PREVENTA__ACEPTACION_IMAGES_CORREGIDO',

  // // AGENDAMIENTO =======================================
  AGENDAMIENTO__CREADO = 'AGENDAMIENTO__CREADO',
  AGENDAMIENTO__ACTUALIZACION_PENDIENTE = 'AGENDAMIENTO__ACTUALIZACION_PENDIENTE',
  AGENDAMIENTO__ACTUALIZADO_VENDERDOR = 'AGENDAMIENTO__ACTUALIZADO_VENDERDOR',
  AGENDAMIENTO__ACTUALIZADO_APROBADO = 'AGENDAMIENTO__ACTUALIZADO_APROBADO',
  AGENDAMIENTO__ACTUALIZADO_RECHAZADO = 'AGENDAMIENTO__ACTUALIZADO_RECHAZADO',
  AGENDAMIENTO__CANCELADO = 'AGENDAMIENTO__CANCELADO',
  AGENDAMIENTO__FINALIZADO = 'AGENDAMIENTO__FINALIZADO',

  AGENDAMIENTO__RECOORDINADO_ESPERA = 'AGENDAMIENTO__RECOORDINADO_ESPERA',
  AGENDAMIENTO__RECOORDINADO_APROBADO = 'AGENDAMIENTO__RECOORDINADO_APROBADO',
  AGENDAMIENTO__RECOORDINADO_RECHAZADO = 'AGENDAMIENTO__RECOORDINADO_RECHAZADO',

  // //   ORDEN TRABAJO =======================================
  ORDEN_TRABAJO__INSTALACION_CREADO = 'ORDEN_TRABAJO__INSTALACION_CREADO',
  ORDEN_TRABAJO__INSTALACION_ACTIVADA = 'ORDEN_TRABAJO__INSTALACION_ACTIVADA',
  ORDEN_TRABAJO__INSTALACION_SUBIDA = 'ORDEN_TRABAJO__INSTALACION_SUBIDA',
  ORDEN_TRABAJO__INSTALACION_PRE_RECHAZADO = 'ORDEN_TRABAJO__INSTALACION_PRE_RECHAZADO',
  ORDEN_TRABAJO__INSTALACION__SOLICITUD_RECOORDINACION_CREADA = 'ORDEN_TRABAJO__INSTALACION__SOLICITUD_RECOORDINACION_CREADA',

  ORDEN_TRABAJO__INSTALACION__SOLICITA_ACTUALIZACION_OT = 'ORDEN_TRABAJO__INSTALACION__SOLICITA_ACTUALIZACION_OT',
  ORDEN_TRABAJO__INSTALACION__ACTUALIZA_OT = 'ORDEN_TRABAJO__INSTALACION__ACTUALIZA_OT',
  ORDEN_TRABAJO__INSTALACION__APROBACION_ACTUALIZACION_OT = 'ORDEN_TRABAJO__INSTALACION__APROBACION_ACTUALIZACION_OT',
  ORDEN_TRABAJO__INSTALACION__RECHAZO_ACTUALIZACION_OT = 'ORDEN_TRABAJO__INSTALACION__RECHAZO_ACTUALIZACION_OT',

  // // OTROS =======================================
  //SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_ESPERA = 'SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_ESPERA',
  //SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_APROBADO = 'SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_APROBADO',
  //SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_RECHAZADO = 'SOLICITUD_DESBLOQUEO__FOTO_PLANILLA_RECHAZADO',
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
export enum InventarioEnumUUID {
  CATEGORIA_PRODUCTO_VENTAS = 'a52776bb-873f-45d9-af56-feddcc87f819',
  CATEGORIA_PRODUCTO_EQUIPOS = '6ced3805-393c-419c-bd77-f785bf1ec4ac',
  CATEGORIA_PRODUCTO_MATERIALES = '36af6681-eb5d-4a05-ada4-0f3cc3c568cb',
}
export enum enumAdministracionParamsUUID {
  MOTIVO_UPD__NO_CONTESTA = 'c3bf752f-d1ee-4023-91b3-55ec4f56980b',
}
export enum InvetarioCodesEnum {
  DIGITAL = 'DIGITAL',
  MATERIALES = 'MATERIALES',
  EQUIPOS = 'EQUIPOS',
  PREMIO = 'PREMIO',
}
export const CATEGORIA_TYPE_ARRAY_CHOICES = [
  InvetarioCodesEnum.DIGITAL,
  InvetarioCodesEnum.MATERIALES,
  InvetarioCodesEnum.EQUIPOS,
  InvetarioCodesEnum.PREMIO,
];

// // Bucket ==============================================
const { VITE_MINIO_BUCKET_NAME } = getEnvs();

export enum BucketTypeEnumChoice {
  BUCKET_BASE = VITE_MINIO_BUCKET_NAME,

  // preventa
  IMAGES_IDENTIFICACION = 'images/identificacion',
  IMAGES_VIVIENDA = 'images/vivienda',
  IMAGES_PLANILLA_SERVICIOS = 'images/planilla-servicios',
  IMAGES_ACEPTACION_CONTRATO = 'images/aceptacioncontrato',
  IMAGES_ACEPTACION_CONTRATO_CORRECCIONES = 'images/aceptacioncontrato/correcciones',
  IMAGES_COMPROBANTES_NO_PLANILLA = 'images/comprobantes/no-planilla',
  IMAGES_ONT_MODEL = 'images/ont-model',
  IMAGES_DOCUMENTO_BANCARIOS = 'images/documentos-bancarios',

  IMAGES_ORDENTRABAJO_INSTALACION = 'images/orden-trabajo/instalaciones',
  IMAGES_TICKETS_VISITAS = 'images/tickets-visitas',

  // ticket masivo
  IMAGES_EMAIL_TM = 'images/email',

  // Cuenta Contable
  FILES_CUENTA_CONTABLE = 'files/cuenta_contable',
  FILES_PARAMETRO_SISTEMA_FACTURACION = 'files/parametro_sistema_facturacion',
}

export enum BucketKeyNameEnumChoice {
  CEDULA_FRONTAL = 'cedula_frontal',
  CEDULA_POSTERIOR = 'cedula_posterior',
  VIVIENDA = 'vivienda',
  PLANILLA_SERVICIOS = 'planilla_servicios',
  ACEPTACION_CONTRATO = 'aceptacion_contrato',
  ACEPTACION_CONTRATO_CORRECCIONES = 'aceptacion_contrato_correcciones',
  CEDULA_FRONTAL_CORRECCIONES = 'cedula_frontal_correcciones',
  COMPROBANTES_NO_PLANILLA = 'comprobantes_no_planilla',
  ONT_MODEL = 'ont_model_image',

  DOCUMENTO_CUENTA_BANCARIA = 'documento_cuenta_bancaria',

  INSTALL_ASIGNADA_OT = 'install_asignada_ot',
}

// // Agendamiento ==========================================
export enum EstadoAgendamientoEnumChoice {
  ESPERA = 'ESPERA', // abre soporte tecnico para llamar

  APROBADO = 'APROBADO', // x pyl? - ahora es de una, agenda y crea la OT sin PyL
  ACTUALIZACION_PENDIENTE = 'ACTUALIZACION PENDIENTE', // x pyl
  FINALIZADO = 'FINALIZADO', // x pyl

  // recoordinacion ------
  ESPERA_RECOORDINACION = 'ESPERA RECOORDINACION', // se reagenda (OT ya creada)
  RECOORDINADO = 'RECOORDINADO', // se reagenda

  RECHAZADO = 'RECHAZADO',

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
  NO_OPERATIVO = 'NO_OPERATIVO',

  DESBLOQUEADO = 'DESBLOQUEADO', // desbloquean slot previamente bloqueado
}
export const SLOT_AGENDAMIENTO_ESTADOS_ARRAY_CHOICES = [
  SlotAgendamientoEstadosEnumChoice.NO_OPERATIVO,
  SlotAgendamientoEstadosEnumChoice.MANTENIMIENTO,
  SlotAgendamientoEstadosEnumChoice.DESBLOQUEADO,

  SlotAgendamientoEstadosEnumChoice.EN_RUTA,
  SlotAgendamientoEstadosEnumChoice.INICIO_INSTALACION,
  SlotAgendamientoEstadosEnumChoice.INSTALADO,
  SlotAgendamientoEstadosEnumChoice.AGENDADO,
];

export enum EstadoLlamadaEnumChoice {
  REALIZADA = 'REALIZADA',
  NO_REALIZADA = 'NO REALIZADA',
  NO_CONTESTA = 'NO CONTESTA',
}
export const ESTADO_LLAMADA_ARRAY_CHOICES = [
  EstadoLlamadaEnumChoice.REALIZADA,
  EstadoLlamadaEnumChoice.NO_REALIZADA,
  EstadoLlamadaEnumChoice.NO_CONTESTA,
];

///* INVENTARIO ==========================================
export enum TipoProductoEnumChoice {
  PRODUCTO = 'PRODUCTO',
  FIBRA = 'FIBRA',
  UTP = 'UTP',
  ONT = 'ONT',
  DIGITAL = 'DIGITAL',
}
export const TIPO_PRODUCTO_ARRAY_CHOICES = [
  TipoProductoEnumChoice.PRODUCTO,
  TipoProductoEnumChoice.FIBRA,
  TipoProductoEnumChoice.UTP,
  TipoProductoEnumChoice.ONT,
  TipoProductoEnumChoice.DIGITAL,
];

export enum CodigoModeloProductoEnumChoice {
  ONT_WIFI_5 = 'ONT_WIFI_5',
  ONT_WIFI_6 = 'ONT_WIFI_6',
  ONT_WIFI_5_REP = 'ONT_WIFI_5_REP',
  ONT_WIFI_6_REP = 'ONT_WIFI_6_REP',
  FIBRA_GRANEL = 'FIBRA_GRANEL',
  FIBRA_PRECONECTORIZADA = 'FIBRA_PRECONECTORIZADA',
  DIGITAL = 'DIGITAL',
}
export const CODIGO_MODELO_PRODUCTO_ARRAY_CHOICES = [
  CodigoModeloProductoEnumChoice.ONT_WIFI_5,
  CodigoModeloProductoEnumChoice.ONT_WIFI_6,
  CodigoModeloProductoEnumChoice.FIBRA_GRANEL,
  CodigoModeloProductoEnumChoice.FIBRA_PRECONECTORIZADA,
  CodigoModeloProductoEnumChoice.DIGITAL,
];
export type CodigoModeloProductoEnumChoiceType = {
  label: string;
  value: CodigoModeloProductoEnumChoice;
};
export const CODIGO_MODELO_PRODUCTO_ARRAY_OBJ_ONT = [
  {
    label: 'ONT WIFI 5',
    value: CodigoModeloProductoEnumChoice.ONT_WIFI_5,
  },
  {
    label: 'ONT WIFI 6',
    value: CodigoModeloProductoEnumChoice.ONT_WIFI_6,
  },
  {
    label: 'ONT WIFI 5 REP',
    value: CodigoModeloProductoEnumChoice.ONT_WIFI_5_REP,
  },
  {
    label: 'ONT WIFI 6 REP',
    value: CodigoModeloProductoEnumChoice.ONT_WIFI_6_REP,
  },
];
export const CODIGO_MODELO_PRODUCTO_ARRAY_OBJ_FIBRA = [
  {
    label: 'FIBRA GRANEL',
    value: CodigoModeloProductoEnumChoice.FIBRA_GRANEL,
  },
  {
    label: 'FIBRA PRECONECTIZADA',
    value: CodigoModeloProductoEnumChoice.FIBRA_PRECONECTORIZADA,
  },
];

export type CodigoCategoriaProductoEnumChoiceType = {
  label: string;
  value: InventarioEnumUUID;
};
export const CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO = [
  {
    label: 'EQUIPOS',
    value: InventarioEnumUUID.CATEGORIA_PRODUCTO_EQUIPOS,
  },
  {
    label: 'MATERIALES',
    value: InventarioEnumUUID.CATEGORIA_PRODUCTO_MATERIALES,
  },
];

export type CodigoTipoProductoEnumChoiceType = {
  id: number;
  nombre: string;
};
export const TIPO_PRODUCTO_ARRAY_OBJ_INVENTARIO = [
  {
    value: 1,
    nombre: 'INGRESO',
  },
  {
    value: 2,
    nombre: 'EGRESO',
  },
  {
    value: 3,
    nombre: 'TRANSFERENCIA',
  },
];

export enum CodigoProductosEnumChoice {
  WIFIMESH = 'WIFIMESH',
  MINI_UPS = 'MINI UPS',
}

export enum InventarioEnumChoice {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO',
}

///* ORDEN TRABAJO ==========================================
export enum EstadoOrdenTrabajoEnumChoice {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',

  ESPERA_AUDITORIA = 'ESPERA AUDITORIA', // after upload ot
  ESPERA_CORRECCION = 'ESPERA CORRECCION', // auditoria solicita correccion a tecnico
  ACTUALIZADOS_TECNICO_ESPERA_REVISION = 'ACTUALIZADOS_TECNICO_ESPERA_REVISION',

  FINALIZADO = 'FINALIZADO',

  CANCELADO = 'CANCELADO',

  PRE_RECHAZADO = 'PRE_RECHAZADO',
  RECHAZADO = 'RECHAZADO',
}
export enum TipoOrdenTrabajoEnumChoice {
  INSTALACION = 'INSTALACION',
  VISITA_TECNICA = 'VISITA TECNICA',
  TRASLADO = 'TRASLADO',
  RETIRO = 'RETIRO',
}
export enum EstadoActivacionEnumChoice {
  PENDIENTE = 'PENDIENTE',
  GESTIONADA = 'GESTIONADA',
  RECHAZADO = 'RECHAZADO',
  PENDIENTE_CAMBIO_PUERTO = 'PENDIENTE_CAMBIO_PUERTO',
}

export enum EstadoAuditoriaOTInstallEnumChoice {
  PENDIENTE = 'PENDIENTE', // after upload ot

  ESPERA_CORRECCION = 'ESPERA CORRECCION', // auditoria solicita correccion a tecnico
  ACTUALIZADOS_TECNICO_ESPERA_REVISION = 'ACTUALIZADOS_TECNICO_ESPERA_REVISION',

  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}
export enum MotivoCorreccionOTAuditoriaEnumChoice {
  INFORMACION_INCORRECTA = 'INFORMACION INCORRECTA',
  FOTOS_INCORRECTAS = 'FOTOS INCORRECTAS',
}
export const MOTIVO_CORRECCION_OT_AUDITORIA_ARRAY_CHOICES = [
  MotivoCorreccionOTAuditoriaEnumChoice.INFORMACION_INCORRECTA,
  MotivoCorreccionOTAuditoriaEnumChoice.FOTOS_INCORRECTAS,
];

// start examples remove ------------------
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

// end examples remove ------------------

export enum EstadoValidacionAceptacionEnumChoice {
  FOTOS_NO_COINCIDEN = 'FOTOS_NO_COINCIDEN', // 0
  FOTO_FRONTAL_INVALIDA = 'FOTO_FRONTAL_sINVALIDA', // 1
  FOTO_POSTERIOR_INVALIDA = 'FOTO_POSTERIOR_INVALIDA', // 2

  VALIDADO = 'VALIDADO', // 3 ok a la 1ra
  CORREGIDO = 'CORREGIDO', // corrige ante eventualidad
}

export enum RouterEnumChoice {
  MIKROTIK = 'MIKROTIK',
}
export const ROUTER_ARRAY_CHOICES = [RouterEnumChoice.MIKROTIK];

export enum OltTypeEnumChoice {
  UNO = '1',
  DOS = '2',
  TRES = '3',
}
export const OLT_TYPE_ARRAY_CHOICES = [
  OltTypeEnumChoice.UNO,
  OltTypeEnumChoice.DOS,
  OltTypeEnumChoice.TRES,
];

export enum RutaTypeEnumChoice {
  OPERATIVO = 'OPERATIVO',
  AFECTACION = 'AFECTACION',
}
export const RUTA_TYPE_ARRAY_CHOICES = [
  RutaTypeEnumChoice.OPERATIVO,
  RutaTypeEnumChoice.AFECTACION,
];

export enum TraficoTypeEnumChoice {
  G_DIARIO = 'GRÁFICO DIARIO',
  G_MENSUAL = 'GRÁFICO MENSUAL',
}
export const TRAFICO_TYPE_ARRAY_CHOICES = [
  TraficoTypeEnumChoice.G_DIARIO,
  TraficoTypeEnumChoice.G_MENSUAL,
];

export enum MesesTypeEnumChoice {
  ENERO = 'Enero',
  FEBRERO = 'Febrero',
  MARZO = 'Marzo',
  ABRIL = 'Abril',
  MAYO = 'Mayo',
  JUNIO = 'Junio',
  JULIO = 'Julio',
  AGOSTO = 'Agosto',
  SEPTIEMBRE = 'Septiembre',
  OCTUBRE = 'Octubre',
  NOVIEMBRE = 'Noviembre',
  DICIEMBRE = 'Diciembre',
}
export const MESES_TYPE_ARRAY_CHOICES = [
  MesesTypeEnumChoice.ENERO,
  MesesTypeEnumChoice.FEBRERO,
  MesesTypeEnumChoice.MARZO,
  MesesTypeEnumChoice.ABRIL,
  MesesTypeEnumChoice.MAYO,
  MesesTypeEnumChoice.JUNIO,
  MesesTypeEnumChoice.JULIO,
  MesesTypeEnumChoice.AGOSTO,
  MesesTypeEnumChoice.SEPTIEMBRE,
  MesesTypeEnumChoice.OCTUBRE,
  MesesTypeEnumChoice.NOVIEMBRE,
  MesesTypeEnumChoice.DICIEMBRE,
];

export const mesesMap: { [key in MesesTypeEnumChoice]: number } = {
  [MesesTypeEnumChoice.ENERO]: 1,
  [MesesTypeEnumChoice.FEBRERO]: 2,
  [MesesTypeEnumChoice.MARZO]: 3,
  [MesesTypeEnumChoice.ABRIL]: 4,
  [MesesTypeEnumChoice.MAYO]: 5,
  [MesesTypeEnumChoice.JUNIO]: 6,
  [MesesTypeEnumChoice.JULIO]: 7,
  [MesesTypeEnumChoice.AGOSTO]: 8,
  [MesesTypeEnumChoice.SEPTIEMBRE]: 9,
  [MesesTypeEnumChoice.OCTUBRE]: 10,
  [MesesTypeEnumChoice.NOVIEMBRE]: 11,
  [MesesTypeEnumChoice.DICIEMBRE]: 12,
};

export enum TraficoPingTypeEnumChoice {
  DOS = '2',
  CUATRO = '4',
  OCHO = '8',
  DIEZCISEIS = '16',
}
export const TRAFICO_PING_TYPE_ARRAY_CHOICES = [
  TraficoPingTypeEnumChoice.DOS,
  TraficoPingTypeEnumChoice.CUATRO,
  TraficoPingTypeEnumChoice.OCHO,
  TraficoPingTypeEnumChoice.DIEZCISEIS,
];

export enum TipoActualizacionActivacionesEnumChoice {
  PUERTO = 'PUERTO',
  NAP_Y_PUERTO = 'NAP Y PUERTO',
}
export const TIPO_ACTUALIZACION_ACTIVACIONES_ARRAY_CHOICES = [
  TipoActualizacionActivacionesEnumChoice.PUERTO,
  TipoActualizacionActivacionesEnumChoice.NAP_Y_PUERTO,
];

export enum ONTModelPonTypeEnumChoice {
  GPON = 'GPON',
  MKPG = 'MKPG',
  MONU = 'MONU',
  TPLG = 'TPLG',
  XPON = 'XPON',
  D011 = 'D011',
}

export const ONT_MODEL_PON_TYPE_ARRAY_CHOICES = [
  ONTModelPonTypeEnumChoice.GPON,
  ONTModelPonTypeEnumChoice.MKPG,
  ONTModelPonTypeEnumChoice.MONU,
  ONTModelPonTypeEnumChoice.TPLG,
  ONTModelPonTypeEnumChoice.XPON,
  ONTModelPonTypeEnumChoice.D011,
];

export enum ONTModelEthernetPortsEnumChoice {
  routing = 'routing',
  bridging = 'bridging',
}

export const ONT_MODEL_ETHERNET_PORTS_ARRAY_CHOICES = [
  ONTModelEthernetPortsEnumChoice.routing,
  ONTModelEthernetPortsEnumChoice.bridging,
];

export enum ONTModel_Ethernet_Wifi_Void_EnumChoice {
  CERO = '0',
  UNO = '1',
  DOS = '2',
  TRES = '3',
  CUATRO = '4',
  CINCO = '5',
  SEIS = '6',
  SIETE = '7',
  OCHO = '8',
  NUEVE = '9',
  DIEZ = '10',
}
export const ONT_MODEL_ETHERNET_WIFI_VOID_ARRAY_CHOICES = [
  ONTModel_Ethernet_Wifi_Void_EnumChoice.CERO,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.UNO,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.DOS,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.TRES,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.CUATRO,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.CINCO,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.SEIS,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.SIETE,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.OCHO,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.NUEVE,
  ONTModel_Ethernet_Wifi_Void_EnumChoice.DIEZ,
];

// // // AUDITORIA CONSUMOS ==============================================
export enum AuditoriaConsumoEnumChoice {
  SUSPENSION_CONSUMO = 'CLIENTES SUSPENDIDOS CON CONSUMO',
  ACTIVOS_ALTO_CONSUMO = 'CLIENTES ACTIVOS ALTO CONSUMO',
  ACTIVOS_MOROSO = 'CLIENTES ACTIVOS EN MOROSO',
  SUSPENSION_CONSUMO_MK = 'CLIENTES SUSPENDIDOS CON CONSUMO EN MK',
}
export const AUDITORIA_CONSUMOS_ARRAY_CHOICES = [
  AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO,
  AuditoriaConsumoEnumChoice.ACTIVOS_ALTO_CONSUMO,
  AuditoriaConsumoEnumChoice.ACTIVOS_MOROSO,
  AuditoriaConsumoEnumChoice.SUSPENSION_CONSUMO_MK,
];

// // // CLIENTE ==============================================
// Linea de servicio --------------
export enum LineaServicioEnumChoice {
  ACTIVO = 'ACTIVO',
  SUSPENDIDO = 'SUSPENDIDO',
  RETIRADO = 'RETIRADO',
  RETENCION = 'RETENCION',
  NO_INSTALADO = 'NO_INSTALADO', // inicia proceso y aun no instalado
}
export const LINEA_SERVICIO_ARRAY_CHOICES = [
  LineaServicioEnumChoice.ACTIVO,
  LineaServicioEnumChoice.SUSPENDIDO,
  LineaServicioEnumChoice.RETIRADO,
  LineaServicioEnumChoice.RETENCION,
  LineaServicioEnumChoice.NO_INSTALADO,
];
export const LINEA_SERVICIO_ARRAY_CHOICES_CLIENTE = [
  LineaServicioEnumChoice.ACTIVO,
  LineaServicioEnumChoice.SUSPENDIDO,
  // LineaServicioEnumChoice.RETIRADO,
  // LineaServicioEnumChoice.RETENCION,
  LineaServicioEnumChoice.NO_INSTALADO,
];

// rubros --------------
export enum TipoRubroEnumChoice {
  SERVICIO = 'SERVICIO',
  PRODUCTOS = 'PRODUCTOS',
  LIBRE = 'LIBRE',
}
export const TIPO_RUBRO_ARRAY_CHOICES = [
  TipoRubroEnumChoice.SERVICIO,
  TipoRubroEnumChoice.PRODUCTOS,
  TipoRubroEnumChoice.LIBRE,
];
export const TIPOS_RUBRO_FILTERS = [
  { label: 'SERVICIO', value: TipoRubroEnumChoice.SERVICIO },
  { label: 'PRODUCTOS', value: TipoRubroEnumChoice.PRODUCTOS },
  { label: 'LIBRE', value: TipoRubroEnumChoice.LIBRE },
];
export enum EstadoRubroEnumChoice {
  NO_PAGADO = 'NO_PAGADO',
  PAGADO = 'PAGADO',
  PAGO_INCOMPLETO = 'PAGO_INCOMPLETO',
  REVERSADO = 'REVERSADO',
  VENCIDO = 'VENCIDO',
  ANULADO = 'ANULADO',
}
export const ESTADO_RUBRO_ARRAY_CHOICES = [
  EstadoRubroEnumChoice.NO_PAGADO,
  EstadoRubroEnumChoice.PAGADO,
  EstadoRubroEnumChoice.PAGO_INCOMPLETO,
  EstadoRubroEnumChoice.VENCIDO,
  EstadoRubroEnumChoice.REVERSADO,
  EstadoRubroEnumChoice.ANULADO,
];
export const ESTADOS_RUBRO_FILTERS = [
  { label: 'NO PAGADO', value: EstadoRubroEnumChoice.NO_PAGADO },
  { label: 'PAGADO', value: EstadoRubroEnumChoice.PAGADO },
  { label: 'ANULADO', value: EstadoRubroEnumChoice.ANULADO },
];

export enum EstadoSaldoEnumChoice {
  NO_APLICADO = 'NO APLICADO', // solo creado y libre para aplicar
  APLICADO = 'APLICADO', // afecto a un rubro (service & libre)
  PAGADO = 'PAGADO', // se hizo un pago a ese rubro
  FACTURADO = 'FACTURADO',
}
export const ESTADO_SALDO_ARRAY_CHOICES = [
  EstadoSaldoEnumChoice.NO_APLICADO,
  EstadoSaldoEnumChoice.APLICADO,
  EstadoSaldoEnumChoice.PAGADO,
  EstadoSaldoEnumChoice.FACTURADO,
];

// // Configuracion de plantilla --------------
export enum RecordatorioPagoTiposEnumChoice {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  NO_NOTIFICAR = 'NO NOTIFICAR',
}
export const RECORDATORIO_PAGO_TIPOS_ARRAY_CHOICES = [
  RecordatorioPagoTiposEnumChoice.EMAIL,
  RecordatorioPagoTiposEnumChoice.SMS,
  RecordatorioPagoTiposEnumChoice.NO_NOTIFICAR,
];
export enum TipoPlantillaConfigClienteEnumChoice {
  GENERAL = 'GENERAL',
  PERSONALIZADO = 'PERSONALIZADO',
}
export const TIPO_PLANTILLA_CONFIG_CLINETE_ARRAY_CHOICES = [
  TipoPlantillaConfigClienteEnumChoice.GENERAL,
  TipoPlantillaConfigClienteEnumChoice.PERSONALIZADO,
];

export enum CalendarioFacturaTypeEnumChoice {
  UNO = '1',
  DOS = '2',
  TRES = '3',
  CUATRO = '4',
  CINCO = '5',
  SEIS = '6',
  SIETE = '7',
  OCHO = '8',
  NUEVE = '9',
  DIEZ = '10',
  ONCE = '11',
  DOCE = '12',
  TRECE = '13',
  CATORCE = '14',
  QUINCE = '15',
  DIECISEIS = '16',
  DIECISIETE = '17',
  DIECIOCHO = '18',
  DIECINUEVE = '19',
  VEINTE = '20',
  VEINTIUNO = '21',
  VEINTIDOS = '22',
  VEINTITRES = '23',
  VEINTICUATRO = '24',
  VEINTICINCO = '25',
  VEINTISEIS = '26',
  VEINTISIETE = '27',
  VEINTIOCHO = '28',
}

export const CALENDARIO_FACTURA_TYPE_ARRAY_CHOICES = [
  CalendarioFacturaTypeEnumChoice.UNO,
  CalendarioFacturaTypeEnumChoice.DOS,
  CalendarioFacturaTypeEnumChoice.TRES,
  CalendarioFacturaTypeEnumChoice.CUATRO,
  CalendarioFacturaTypeEnumChoice.CINCO,
  CalendarioFacturaTypeEnumChoice.SEIS,
  CalendarioFacturaTypeEnumChoice.SIETE,
  CalendarioFacturaTypeEnumChoice.OCHO,
  CalendarioFacturaTypeEnumChoice.NUEVE,
  CalendarioFacturaTypeEnumChoice.DIEZ,
  CalendarioFacturaTypeEnumChoice.ONCE,
  CalendarioFacturaTypeEnumChoice.DOCE,
  CalendarioFacturaTypeEnumChoice.TRECE,
  CalendarioFacturaTypeEnumChoice.CATORCE,
  CalendarioFacturaTypeEnumChoice.QUINCE,
  CalendarioFacturaTypeEnumChoice.DIECISEIS,
  CalendarioFacturaTypeEnumChoice.DIECISIETE,
  CalendarioFacturaTypeEnumChoice.DIECIOCHO,
  CalendarioFacturaTypeEnumChoice.DIECINUEVE,
  CalendarioFacturaTypeEnumChoice.VEINTE,
  CalendarioFacturaTypeEnumChoice.VEINTIUNO,
  CalendarioFacturaTypeEnumChoice.VEINTIDOS,
  CalendarioFacturaTypeEnumChoice.VEINTITRES,
  CalendarioFacturaTypeEnumChoice.VEINTICUATRO,
  CalendarioFacturaTypeEnumChoice.VEINTICINCO,
  CalendarioFacturaTypeEnumChoice.VEINTISEIS,
  CalendarioFacturaTypeEnumChoice.VEINTISIETE,
  CalendarioFacturaTypeEnumChoice.VEINTIOCHO,
];

export enum EstadoDevolucionEnumChoice {
  PENDIENTE = 'PENDIENTE',
  FINALIZADO = 'FINALIZADO',
  RECHAZADO = 'RECHAZADO',
}

// Tickets
export enum EstadoTicketEnumChoice {
  ESPERA = 'ESPERA',
  REALIZADO = 'REALIZADO',
  CERRADO = 'CERRADO',
  PENDIENTE_RECOORDINACION = 'PENDIENTE RECOORDINACION',
}

export enum EstadoTicketTecnicoEnumChoice {
  ESPERA = 'ESPERA',
  REALIZADO = 'REALIZADO',
  CERRADO = 'CERRADO',
  PENDIENTE_RECOORDINACION = 'PENDIENTE RECOORDINACION',
  PENDIENTE_CORRECCION_AUDITORIA = 'PENDIENTE CORRECCION AUDITORIA',
  ESPERA_CORREGIDOS_AUDITORIA = 'ESPERA CORREGIDOS AUDITORIA',
}

export enum TurnosTicketEnumChoice {
  MATUTINO = 'MATUTINO',
  VESPERTINO = 'VESPERTINO',
}
export const TURNOS_TICKETS_ARRAY_CHOICES = [
  TurnosTicketEnumChoice.MATUTINO,
  TurnosTicketEnumChoice.VESPERTINO,
];

export enum BucketTicketEnumChoice {
  BUCKET_BASE = VITE_MINIO_BUCKET_NAME,
  IMAGES_TICKETS_VISITAS = 'images/tickets-visitas',
}

export enum BucketKeyTicketEnumChoice {
  FOTO_VIVIENDA = 'foto_vivienda',
  FOTO_OPCIONAL = 'foto_opcional',

  FOTO_ANTES_SOLUCION = 'foto_antes_solucion',
  FOTO_DESPUES_SOLUCION = 'foto_despues_solucion',
  FOTO_TEST_VELOCIDAD = 'foto_test_velocidad',
  FOTO_POTENCIA_ANTES_SOLUCION = 'foto_potencia_antes_solucion',
  FOTO_POTENCIA_DESPUES_SOLUCION = 'foto_potencia_despues_solucion',
  FOTO_PROBLEMA_ENCONTRADO = 'foto_problema_encontrado',
  FOTO_SOLUCION = 'foto_solucion',

  FOTO_ENTREGA_MESH = 'foto_entrega_mesh',
  FOTO_ENTREGA_UPS = 'foto_entrega_ups',
}

export enum cambioOnuSacEnumChoice {
  PENDIENTE = 'PENDIENTE',
  REALIZADO = 'REALIZADO',
}

// Cartera
export enum estadoDeudaTypeEnumChoice {
  ACTIVO = 'ACTIVO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO ',
}
export const ESTADO_DEUDA_TYPE_ARRAY_CHOICES = [
  estadoDeudaTypeEnumChoice.ACTIVO,
  estadoDeudaTypeEnumChoice.COMPLETADO,
  estadoDeudaTypeEnumChoice.CANCELADO,
];

export enum valueTipoRecuerrenciaAlquilerEnumChoice {
  UN_SOLO_PAGO = 'UN SOLO PAGO',
  MENSUAL = 'MENSUAL',
  CUOTAS = 'CUOTAS',
}

export type TipoRecurrenciaAlquilerEnumChoiceType = {
  label: string;
  value: number;
};
export const TIPO_RECURRENCIA_ALQUILER_ARRAY_OBJ_ONT = [
  {
    label: 'Mensualmente',
    value: 0,
  },
  {
    label: 'Un solo pago',
    value: 1,
  },
  {
    label: 'Pago en 2 cuotas',
    value: 2,
  },
  {
    label: 'Pago en 3 cuotas',
    value: 3,
  },
  {
    label: 'Pago en 4 cuotas',
    value: 4,
  },
  {
    label: 'Pago en 5 cuotas',
    value: 5,
  },
  {
    label: 'Pago en 6 cuotas',
    value: 6,
  },
  {
    label: 'Pago en 7 cuotas',
    value: 7,
  },
  {
    label: 'Pago en 8 cuotas',
    value: 8,
  },
  {
    label: 'Pago en 9 cuotas',
    value: 9,
  },
  {
    label: 'Pago en 10 cuotas',
    value: 10,
  },
  {
    label: 'Pago en 11 cuotas',
    value: 11,
  },
  {
    label: 'Pago en 12 cuotas',
    value: 12,
  },
  {
    label: 'Pago en 13 cuotas',
    value: 13,
  },
  {
    label: 'Pago en 14 cuotas',
    value: 14,
  },
  {
    label: 'Pago en 15 cuotas',
    value: 15,
  },
  {
    label: 'Pago en 16 cuotas',
    value: 16,
  },
  {
    label: 'Pago en 17 cuotas',
    value: 17,
  },
  {
    label: 'Pago en 18 cuotas',
    value: 18,
  },
  {
    label: 'Pago en 19 cuotas',
    value: 19,
  },
  {
    label: 'Pago en 20 cuotas',
    value: 20,
  },
  {
    label: 'Pago en 21 cuotas',
    value: 21,
  },
  {
    label: 'Pago en 22 cuotas',
    value: 22,
  },
  {
    label: 'Pago en 23 cuotas',
    value: 23,
  },
  {
    label: 'Pago en 24 cuotas',
    value: 24,
  },
];

export enum EstadoAlquilerEnumChoice {
  ACTIVO = 'ACTIVO',
  PAGADO = 'PAGADO',
  CANCELADO = 'CANCELADO',
}

export enum YesNoEnumChoice {
  SI = 'SI',
  NO = 'NO',
}

export const YES_NO_ARRAY_CHOICES = [YesNoEnumChoice.SI, YesNoEnumChoice.NO];

export enum canalReferenciaMantenedoresEnumChoice {
  RRSS = 'RRSS',
  WEB = 'WEB',
  VEINTICUATROENLINEAWEB = '24ENLINEAWEB',
  VEINTICUATROENLINEAAPP = '24ENLINEAAPP',
  CHATBOT = 'CHATBOT',
  CALLCENTER = 'CALLCENTER',
  CENTRO_DE_EXPERIENCIA = 'CENTRO DE EXPERIENCIA',
  OTRO = 'OTRO',
}

export const CANAL_REFERENCIA_MANTENEDORES_ARRAY_CHOICES = [
  canalReferenciaMantenedoresEnumChoice.RRSS,
  canalReferenciaMantenedoresEnumChoice.WEB,
  canalReferenciaMantenedoresEnumChoice.VEINTICUATROENLINEAWEB,
  canalReferenciaMantenedoresEnumChoice.VEINTICUATROENLINEAAPP,
  canalReferenciaMantenedoresEnumChoice.CHATBOT,
  canalReferenciaMantenedoresEnumChoice.CALLCENTER,
  canalReferenciaMantenedoresEnumChoice.CENTRO_DE_EXPERIENCIA,
  canalReferenciaMantenedoresEnumChoice.OTRO,
];

export enum EstadoTareaEnumChoice {
  EN_BORRADOR = 'EN BORRADOR',
  ASIGNADO = 'ASIGNADO',
  GESTIONADO = 'GESTIONADO',
  RECHAZADO = 'RECHAZADO',
  SEPARADO = 'SEPARADO',
}

export enum motivoBaseMantenedorActivacionBaseEnumChoice {
  PROMESA_DE_PAGO = 'PROMESA DE PAGO',
  PROMESA_DE_PAGO_APP = 'PROMESA DE PAGO - APP',
  VALIDACION_DE_PAGO = 'VALIDACION DE PAGO',
  PROMESA_DE_PAGO_CASOS_ESPECIALES = 'PROMESA DE PAGO (CASOS ESPECIALES)',
  REVISIONES_NOC = 'REVISIONES NOC',
  INCONVENIENTES_CON_SISTEMA = 'INCONVENIENTES CON SISTEMA',
  AL_DIA = 'AL DIA',
  RECONEXION_31_60 = 'RECONEXION 31 - 60',
  RECONEXION_61_90 = 'RECONEXION 61 - 90',
  RECONEXION_GENERAL = 'RECONEXION GENERAL',
  FINALIZACION_91_DIAS = 'FINALIZACION +91 DIAS',
  SUSPENSION_TEMPORAL_1_MES = 'SUSPENSION TEMPORAL 1 MES',
  SUSPENSION_TEMPORAL_2_MESES = 'SUSPENSION TEMPORAL 2 MESES',
  SUSPENSION_TEMPORAL_3_MESES = 'SUSPENSION TEMPORAL 3 MESES',
  SUSPENSION_RUBRO_VENCIDO = 'SUSPENSION RUBRO VENCIDO',
}

export const MOTIVO_BASE_MANTENEDOR_ACTIVACION_BASE_ARRAY_CHOICES = [
  motivoBaseMantenedorActivacionBaseEnumChoice.PROMESA_DE_PAGO,
  motivoBaseMantenedorActivacionBaseEnumChoice.PROMESA_DE_PAGO_APP,
  motivoBaseMantenedorActivacionBaseEnumChoice.VALIDACION_DE_PAGO,
  motivoBaseMantenedorActivacionBaseEnumChoice.PROMESA_DE_PAGO_CASOS_ESPECIALES,
  motivoBaseMantenedorActivacionBaseEnumChoice.REVISIONES_NOC,
  motivoBaseMantenedorActivacionBaseEnumChoice.INCONVENIENTES_CON_SISTEMA,
  motivoBaseMantenedorActivacionBaseEnumChoice.AL_DIA,
  motivoBaseMantenedorActivacionBaseEnumChoice.RECONEXION_31_60,
  motivoBaseMantenedorActivacionBaseEnumChoice.RECONEXION_61_90,
  motivoBaseMantenedorActivacionBaseEnumChoice.RECONEXION_GENERAL,
  motivoBaseMantenedorActivacionBaseEnumChoice.FINALIZACION_91_DIAS,
  motivoBaseMantenedorActivacionBaseEnumChoice.SUSPENSION_TEMPORAL_1_MES,
  motivoBaseMantenedorActivacionBaseEnumChoice.SUSPENSION_TEMPORAL_2_MESES,
  motivoBaseMantenedorActivacionBaseEnumChoice.SUSPENSION_TEMPORAL_3_MESES,
];

export enum tipoRubroAdicionalMantenedorEnumChoice {
  GENERAL = 'GENERAL',
  MANTENEDOR_ACTIVACIONES = 'MANTENEDOR ACTIVACIONES',
  MANTENEDOR_RECONEXIONES = 'MANTENEDOR RECONEXIONES',
  MANTENEDOR_SUSPENSIONES = 'MANTENEDOR SUSPENSIONES',
}

export const TIPO_RUBRO_ADICIONAL_MANTENEDOR_ARRAY_CHOICES = [
  tipoRubroAdicionalMantenedorEnumChoice.GENERAL,
  tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_ACTIVACIONES,
  tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_RECONEXIONES,
  tipoRubroAdicionalMantenedorEnumChoice.MANTENEDOR_SUSPENSIONES,
];

export enum CriterioMantenedorSuspensionEnumChoice {
  SUSPENSION_TEMPORAL_1_MES = 'SUSPENSION TEMPORAL 1 MES',
  SUSPENSION_TEMPORAL_2_MESES = 'SUSPENSION TEMPORAL 2 MESES',
  SUSPENSION_TEMPORAL_3_MESES = 'SUSPENSION TEMPORAL 3 MESES',
  FINALIZACION = 'FINALIZACION 91+ DIAS',
  VENCIDO = 'VENCIDO',
}

export const CRITERIO_MANTENEDOR_SUSPENSION_ARRAY_CHOICES = [
  CriterioMantenedorSuspensionEnumChoice.SUSPENSION_TEMPORAL_1_MES,
  CriterioMantenedorSuspensionEnumChoice.SUSPENSION_TEMPORAL_2_MESES,
  CriterioMantenedorSuspensionEnumChoice.SUSPENSION_TEMPORAL_3_MESES,
  CriterioMantenedorSuspensionEnumChoice.FINALIZACION,
  CriterioMantenedorSuspensionEnumChoice.VENCIDO,
];

export enum modeAuthorizateTypeEnumChoice {
  ROUTING = 'routing',
  BRIDGING = 'bridging',
}
export const MODE_AUTHORIZATE_TYPE_ARRAY_CHOICES = [
  modeAuthorizateTypeEnumChoice.ROUTING,
  modeAuthorizateTypeEnumChoice.BRIDGING,
];

export type fileCuentaContableEnumChoiceType = {
  label: string;
  value: string;
};
export const FILE_CUENTA_CONTABLE_ARRAY_OBJ_ONT = [
  {
    label: '1.1.1.1',
    value: '1',
  },
  {
    label: '101010',
    value: '2',
  },
];

//* TICKET MASIVO
export enum tipoCausaTicketMasivoEnumChoice {
  PRIMARIA = 'PRIMARIA',
  SECUNDARIA = 'SECUNDARIA',
}

export const TIPO_CAUSA_TICKET_MASIVO_ARRAY_CHOICES = [
  tipoCausaTicketMasivoEnumChoice.PRIMARIA,
  tipoCausaTicketMasivoEnumChoice.SECUNDARIA,
];

export enum tipoTicketAsuntoEnumChoice {
  VISITA_TECNICA = 'VISITA TECNICA',
  CROSS_SELLING = 'CROSS SELLING',
  CAMBIO_DOMICILIO = 'CAMBIO DOMICILIO',
}

export const TIPO_TICKET_ASUNTO_ARRAY_CHOICES = [
  tipoTicketAsuntoEnumChoice.VISITA_TECNICA,
  tipoTicketAsuntoEnumChoice.CROSS_SELLING,
  tipoTicketAsuntoEnumChoice.CAMBIO_DOMICILIO,
];

export enum ImageEventoMensajeriaTMNameEnumChoice {
  MENSAJE_IMG = 'email_tm',
}

export enum PrioridadTMEnumChoice {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAJA = 'BAJA',
}

export const PRIORIDAD_TICKET_MASIVO_ARRAY_CHOICES = [
  PrioridadTMEnumChoice.ALTA,
  PrioridadTMEnumChoice.MEDIA,
  PrioridadTMEnumChoice.BAJA,
];

export enum TipoTicketMasivoNocEnumChoice {
  INCIDENCIA = 'INCIDENCIA',
  EVENTO = 'EVENTO',
}

export const TIPO_TICKET_TICKET_MASIVO_NOC_ARRAY_CHOICES = [
  TipoTicketMasivoNocEnumChoice.INCIDENCIA,
  TipoTicketMasivoNocEnumChoice.EVENTO,
];

export enum LeedTeleventa_Origen_TMEnumChoice {
  TOTEM = 'TOTEM',
  ENLINEAWEB = '24ENLINEAWEB',
  ENLINEAAPP = '24ENLINEAAPP',
  CHATBOT = 'CHATBOT',
}

export const LEED_TELEVENTA_ORIGEN_ARRAY_CHOICES = [
  LeedTeleventa_Origen_TMEnumChoice.TOTEM,
  LeedTeleventa_Origen_TMEnumChoice.ENLINEAWEB,
  LeedTeleventa_Origen_TMEnumChoice.ENLINEAAPP,
  LeedTeleventa_Origen_TMEnumChoice.CHATBOT,
];

export enum LeedTeleventa_Estado_TMEnumChoice {
  ESPERA = 'ESPERA',
  SEPARADO = 'SEPARADO',
  REGISTRA_SOLICITUD_SERVICIO = 'REGISTRA SOLICITUD SERVICIO',
  SIN_GESTION = 'SIN GESTION',
  RECHAZADO = 'RECHAZADO',
}

export const LEED_TELEVENTA_ESTADO_ARRAY_CHOICES = [
  LeedTeleventa_Estado_TMEnumChoice.ESPERA,
  LeedTeleventa_Estado_TMEnumChoice.SEPARADO,
  LeedTeleventa_Estado_TMEnumChoice.REGISTRA_SOLICITUD_SERVICIO,
  LeedTeleventa_Estado_TMEnumChoice.SIN_GESTION,
  LeedTeleventa_Estado_TMEnumChoice.RECHAZADO,
];

export enum EstadoCambioDomicilioEnumChoice {
  ESPERA = 'ESPERA',
  FINALIZADO = 'FINALIZADO',
  SIN_FACTIBILIDAD = 'SIN FACTIBILIDAD',
  CANCELADO = 'CANCELADO',
}

export const ESTADO_CAMBIO_DOMICILIO_ARRAY_CHOICES = [
  EstadoCambioDomicilioEnumChoice.ESPERA,
  EstadoCambioDomicilioEnumChoice.FINALIZADO,
  EstadoCambioDomicilioEnumChoice.SIN_FACTIBILIDAD,
  EstadoCambioDomicilioEnumChoice.CANCELADO,
];

export enum EncuestaPlantillaTypeEnumChoice {
  BOOLEAN = 'BOOLEAN',
  SELECCION_UNICA = 'SELECCION UNICA',
  SELECCION_MULTIPLE = 'SELECCION MULTIPLE',
  RESPUESTA_ESCRITA = 'RESPUESTA ESCRITA',
  SELECCION_RANKING = 'SELECCION RANKING',
  SELECCION_POR_ATRIBUTO = 'SELECCION POR ATRIBUTO',
  SELECCION_MUY_PROBABLE_NADA_PROBABLE = 'SELECCION MUY PROBABLE',
  SELECCION_NIVEL_SATISFACCION = 'SELECCION NIVEL SATISFACCION',
}
export const ENCUESTA_PLANTILLA_TYPE_ARRAY_CHOICES = [
  EncuestaPlantillaTypeEnumChoice.BOOLEAN,
  EncuestaPlantillaTypeEnumChoice.SELECCION_UNICA,
  EncuestaPlantillaTypeEnumChoice.SELECCION_MULTIPLE,
  EncuestaPlantillaTypeEnumChoice.RESPUESTA_ESCRITA,
  EncuestaPlantillaTypeEnumChoice.SELECCION_RANKING,
  EncuestaPlantillaTypeEnumChoice.SELECCION_POR_ATRIBUTO,
  EncuestaPlantillaTypeEnumChoice.SELECCION_MUY_PROBABLE_NADA_PROBABLE,
  EncuestaPlantillaTypeEnumChoice.SELECCION_NIVEL_SATISFACCION,
];

// // FLOTA --------------------------
export enum TipoFlotaEnumChoice {
  INTERNA = 'INTERNA',
  EXTERNA = 'EXTERNA',
}
export const TIPO_FLOTA_ARRAY_CHOICES = [
  TipoFlotaEnumChoice.INTERNA,
  TipoFlotaEnumChoice.EXTERNA,
];
export enum TipoGestionFlotaPlanificadorEnumChoice {
  INSTALACION = 'INSTALACION',
  VISITA_TECNICA = 'VISITA TECNICA',
  INSTALACION_Y_VISITA_TECNICA = 'INSTALACION Y VISITA TECNICA',
}
export const TIPO_GESTION_FLOTA_PLANIFICADOR_ARRAY_CHOICES = [
  TipoGestionFlotaPlanificadorEnumChoice.INSTALACION,
  TipoGestionFlotaPlanificadorEnumChoice.VISITA_TECNICA,
  TipoGestionFlotaPlanificadorEnumChoice.INSTALACION_Y_VISITA_TECNICA,
];

export enum TipoVinculacionFlotaEnumChoice {
  INTERNO = 'INTERNO',
  EXTERNO = 'EXTERNO',
}
export const TIPO_VINCULACION_FLOTA_ARRAY_CHOICES = [
  TipoVinculacionFlotaEnumChoice.INTERNO,
  TipoVinculacionFlotaEnumChoice.EXTERNO,
];

export enum TarjetaCodeTMEnumChoice {
  visa = 'visa',
  mastercard = 'mastercard',
  american_express = 'american-express',
  diners_club = 'diners-club',
  discover = 'discover',
  jcb = 'jcb',
  unionpay = 'unionpay',
  maestro = 'maestro',
  mir = 'mir',
  elo = 'elo',
  hiper = 'hiper',
  hipercard = 'hipercard',
}

export const TARJETA_CODE_ARRAY_CHOICES = [
  TarjetaCodeTMEnumChoice.visa,
  TarjetaCodeTMEnumChoice.mastercard,
  TarjetaCodeTMEnumChoice.american_express,
  TarjetaCodeTMEnumChoice.diners_club,
  TarjetaCodeTMEnumChoice.discover,
  TarjetaCodeTMEnumChoice.jcb,
  TarjetaCodeTMEnumChoice.unionpay,
  TarjetaCodeTMEnumChoice.maestro,
  TarjetaCodeTMEnumChoice.mir,
  TarjetaCodeTMEnumChoice.elo,
  TarjetaCodeTMEnumChoice.hiper,
  TarjetaCodeTMEnumChoice.hipercard,
];

export enum TrazabilidadModeloNameTMEnumChoice {
  SOLICITUD_SERVICIO = 'SOLICITUD_SERVICIO',
  PREVENTA = 'PREVENTA',
  AGENDAMIENTO = 'AGENDAMIENTO',
  ORDEN_TRABAJO = 'ORDEN TRABAJO',
  TICKET_TECNICO = 'TICKET TECNICO',
  SOLICITUD_SERVICIO_CONVENIO = 'SOLICITUD_SERVICIO_CONVENIO',
  TELEVENTA = 'TELEVENTA',
  CLIENTE_PENDIENTE_DEVOLUCION = 'CLIENTE_PENDIENTE_DEVOLUCION',
  SOLICITUD_DESBLOQUEO_VENTAS = 'SOLICITUD_DESBLOQUEO_VENTAS',
  SOLICITUD_APROBACION_IA_PREVENTA = 'SOLICITUD APROBACION IA PREVENTA',
}

export const TRAZABILIDAD_MODELO_NAME_ARRAY_CHOICES = [
  TrazabilidadModeloNameTMEnumChoice.SOLICITUD_SERVICIO,
  TrazabilidadModeloNameTMEnumChoice.PREVENTA,
  TrazabilidadModeloNameTMEnumChoice.AGENDAMIENTO,
  TrazabilidadModeloNameTMEnumChoice.ORDEN_TRABAJO,
  TrazabilidadModeloNameTMEnumChoice.TICKET_TECNICO,
  TrazabilidadModeloNameTMEnumChoice.SOLICITUD_SERVICIO_CONVENIO,
  TrazabilidadModeloNameTMEnumChoice.TELEVENTA,
  TrazabilidadModeloNameTMEnumChoice.CLIENTE_PENDIENTE_DEVOLUCION,
  TrazabilidadModeloNameTMEnumChoice.SOLICITUD_DESBLOQUEO_VENTAS,
  TrazabilidadModeloNameTMEnumChoice.SOLICITUD_APROBACION_IA_PREVENTA,
];

export enum DeudaCuotaEquipoVentaEstadoEnumChoice {
  ACTIVO = 'ACTIVO',
  APLICADO = 'APLICADO',
  CANCELADO = 'CANCELADO',
}

export const DEUDA_CUOTA_EQUIPO_VENTA_ESTADO_ARRAY_CHOICES = [
  DeudaCuotaEquipoVentaEstadoEnumChoice.ACTIVO,
  DeudaCuotaEquipoVentaEstadoEnumChoice.APLICADO,
  DeudaCuotaEquipoVentaEstadoEnumChoice.CANCELADO,
];

export enum PromesaPagoEstadoPromesaEnumChoice {
  PENDIENTE = 'PENDIENTE',
  CUMPLIDA = 'CUMPLIDA',
  INCUMPLIDA = 'INCUMPLIDA',
  INACTIVA = 'INACTIVA',
}

export const PROMESA_PAGO_ESTADO_PROMESA_ARRAY_CHOICES = [
  PromesaPagoEstadoPromesaEnumChoice.PENDIENTE,
  PromesaPagoEstadoPromesaEnumChoice.CUMPLIDA,
  PromesaPagoEstadoPromesaEnumChoice.INCUMPLIDA,
  PromesaPagoEstadoPromesaEnumChoice.INACTIVA,
];

export enum PromesaPagoEstadoLineaRegistrarEnumChoice {
  ACTIVO = 'ACTIVO',
  SUSPENDIDO = 'SUSPENDIDO',
  RETIRADO = 'RETIRADO',
  RETENCION = 'RETENCION',
  CANCELADO = 'CANCELADO',
  NO_INSTALADO = 'NO_INSTALADO',
}

export const PROMESA_PAGO_ESTADO_LINEA_REGISTRAR_ARRAY_CHOICES = [
  PromesaPagoEstadoLineaRegistrarEnumChoice.ACTIVO,
  PromesaPagoEstadoLineaRegistrarEnumChoice.SUSPENDIDO,
  PromesaPagoEstadoLineaRegistrarEnumChoice.RETIRADO,
  PromesaPagoEstadoLineaRegistrarEnumChoice.RETENCION,
  PromesaPagoEstadoLineaRegistrarEnumChoice.CANCELADO,
  PromesaPagoEstadoLineaRegistrarEnumChoice.NO_INSTALADO,
];

export enum ZonaSemaforoTMEnumChoice {
  VERDE = 'VERDE',
  AMARILLO = 'AMARILLO',
  ROJO = 'ROJO',
}

export const ZONA_SEMAFORO_ARRAY_CHOICES = [
  ZonaSemaforoTMEnumChoice.VERDE,
  ZonaSemaforoTMEnumChoice.AMARILLO,
  ZonaSemaforoTMEnumChoice.ROJO,
];
