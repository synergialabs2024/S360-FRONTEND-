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
];

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

export enum EstadoPreventaEnumChoice {
  ESPERA = 'ESPERA',
  FINALIZADO = 'FINALIZADO',
  RECHAZADO = 'RECHAZADO',
  FALLIDO = 'CANCELADO', // cancela el vendedor x cliente

  SIN_GESTION = 'SIN_GESTION', // unblock sale approved
}

export enum EstadoCorreccionPreventaEnumChoice {
  EXPIRADO = 'EXPIRADO',
  CORREGIDO = 'CORREGIDO',
  FOTO_CEDULA_NO_ROSTRO = 'FOTO_CEDULA_NO_ROSTRO',
  FOTO_ACEPTACION_NO_ROSTRO = 'FOTO_ACEPTACION_NO_ROSTRO',
  ROSTROS_NO_COINCIDEN = 'ROSTROS_NO_COINCIDEN',
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
}
export const TIPO_PRODUCTO_ARRAY_CHOICES = [
  TipoProductoEnumChoice.PRODUCTO,
  TipoProductoEnumChoice.FIBRA,
  TipoProductoEnumChoice.UTP,
  TipoProductoEnumChoice.ONT,
];

export enum CodigoModeloProductoEnumChoice {
  ONT_WIFI_5 = 'ONT_WIFI_5',
  ONT_WIFI_6 = 'ONT_WIFI_6',
  FIBRA_GRANEL = 'FIBRA_GRANEL',
  FIBRA_PRECONECTORIZADA = 'FIBRA_PRECONECTORIZADA',
}
export const CODIGO_MODELO_PRODUCTO_ARRAY_CHOICES = [
  CodigoModeloProductoEnumChoice.ONT_WIFI_5,
  CodigoModeloProductoEnumChoice.ONT_WIFI_6,
  CodigoModeloProductoEnumChoice.FIBRA_GRANEL,
  CodigoModeloProductoEnumChoice.FIBRA_PRECONECTORIZADA,
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

export enum CodigoProductosEnumChoice {
  WIFIMESH = 'WIFIMESH',
  MINI_UPS = 'MINI UPS',
}

export enum RecepcionMaterialEnumChoice {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO',
}
export const RECEPCION_MATERIAL_ARRAY_CHOICES = [
  RecepcionMaterialEnumChoice.PENDIENTE,
  RecepcionMaterialEnumChoice.APROBADO,
  RecepcionMaterialEnumChoice.RECHAZADO,
  RecepcionMaterialEnumChoice.CANCELADO,
  RecepcionMaterialEnumChoice.FINALIZADO,
];

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
export enum EstadoRubroEnumChoice {
  NO_PAGADO = 'NO_PAGADO',
  PAGADO = 'PAGADO',
  PAGO_INCOMPLETO = 'PAGO_INCOMPLETO',
  VENCIDO = 'VENCIDO',
  ANULADO = 'ANULADO',
}
export const ESTADO_RUBRO_ARRAY_CHOICES = [
  EstadoRubroEnumChoice.NO_PAGADO,
  EstadoRubroEnumChoice.PAGADO,
  EstadoRubroEnumChoice.PAGO_INCOMPLETO,
  EstadoRubroEnumChoice.VENCIDO,
  EstadoRubroEnumChoice.ANULADO,
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
