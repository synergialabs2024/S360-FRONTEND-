export const ROUTER_PATHS = {
  home: '/',
  notFound: '/404',

  /////* Planificacion ----------------
  planificacion: {
    root: 'planificacion',

    ///* borrador de proyecto
    borradorProyecto: 'borrador-proyecto',
    borradorProyectoCrear: 'borrador-proyecto/crear',
    borradorProyectoEditar: 'borrador-proyecto/editar/:uuid',
    borradorProyectoNav: '/planificacion/borrador-proyecto',

    ///* definicion alcance del proyecto
    alcanceProyecto: 'alcance-proyecto',
    alcanceProyectoCrear: 'alcance-proyecto/crear',
    alcanceProyectoEditar: 'alcance-proyecto/editar/:uuid',
    alcanceProyectoNav: '/planificacion/alcance-proyecto',

    ///* analisis de recursos
    analisisRecurso: 'analisis-recursos',
    analisisRecursoCrear: 'analisis-recursos/crear',
    analisisRecursoEditar: 'analisis-recursos/editar/:uuid',
    analisisRecursoNav: '/planificacion/analisis-recursos',
  },
  /////* Administración ----------------
  administracion: {
    root: 'parametrizacion',

    ///* tipo regimen
    tiposRegimen: 'tipos-regimen',
    tiposRegimenCrear: 'tipos-regimen/crear',
    tiposRegimenEditar: 'tipos-regimen/editar/:uuid',
    tiposRegimenNav: '/parametrizacion/tipos-regimen',

    ///* area
    areas: 'areas',
    areasCrear: 'areas/crear',
    areasEditar: 'areas/editar/:uuid',
    areasNav: '/parametrizacion/areas',

    ///* departamentos
    departamentos: 'departamentos',
    departamentosCrear: 'departamentos/crear',
    departamentosEditar: 'departamentos/editar/:uuid',
    departamentosNav: '/parametrizacion/departamentos',

    ///* canales de venta
    canalesVenta: 'canales-venta',
    canalesVentaCrear: 'canales-venta/crear',
    canalesVentaEditar: 'canales-venta/editar/:uuid',
    canalesVentaNav: '/parametrizacion/canales-venta',

    ///* empresas
    empresas: 'empresas',
    empresasCrear: 'empresas/crear',
    empresasEditar: 'empresas/editar/:uuid',
    empresasNav: '/parametrizacion/empresas',

    ///* entidad financiera
    entidadesFinanciera: 'entidades-financiera',
    entidadesFinancieraCrear: 'entidades-financiera/crear',
    entidadesFinancieraEditar: 'entidades-financiera/editar/:uuid',
    entidadesFinancieraNav: '/parametrizacion/entidades-financiera',

    ///* iva
    ivas: 'ivas',
    ivasCrear: 'ivas/crear',
    ivasEditar: 'ivas/editar/:uuid',
    ivasNav: '/parametrizacion/ivas',

    ///* metodo pago
    metodospago: 'metodospago',
    metodospagoCrear: 'metodospago/crear',
    metodospagoEditar: 'metodospago/editar/:uuid',
    metodospagoNav: '/parametrizacion/metodospago',

    ///* paises
    pais: 'paises',
    paisCrear: 'paises/crear',
    paisEditar: 'paises/editar/:uuid',
    paisNav: '/parametrizacion/paises',

    ///* provincias
    provincias: 'provincias',
    provinciasCrear: 'provincias/crear',
    provinciasEditar: 'provincias/editar/:uuid',
    provinciasNav: '/parametrizacion/provincias',

    ///* ciudades
    ciudades: 'ciudades',
    ciudadesCrear: 'ciudades/crear',
    ciudadesEditar: 'ciudades/editar/:uuid',
    ciudadesNav: '/parametrizacion/ciudades',

    ///* zonas
    zonas: 'zonas',
    zonasCrear: 'zonas/crear',
    zonasEditar: 'zonas/editar/:uuid',
    zonasNav: '/parametrizacion/zonas',

    ///* sectores
    sectores: 'sectores',
    sectoresCrear: 'sectores/crear',
    sectoresEditar: 'sectores/editar/:uuid',
    sectoresNav: '/parametrizacion/sectores',

    ///* centro costos
    centrocostos: 'centro-costos',
    centrocostosCrear: 'centro-costos/crear',
    centrocostosEditar: 'centro-costos/editar/:uuid',
    centrocostosNav: '/parametrizacion/centro-costos',

    ///* parametro sistema
    parametrosSistemas: 'parametros-sistemas',
    parametrosSistemasCrear: 'parametros-sistemas/crear',
    parametrosSistemasEditar: 'parametros-sistemas/editar/:uuid',
    parametrosSistemasNav: '/parametrizacion/parametros-sistemas',

    ///* codigos otp
    codigosOtp: 'codigos-otp',
    codigosOtpNav: '/parametrizacion/codigos-otp',

    // // =================================
    ///* usuarios
    usuarios: 'usuarios',
    usuariosCrear: 'usuarios/crear',
    usuariosEditar: 'usuarios/editar/:uuid',
    usuariosNav: '/parametrizacion/usuarios',

    ///* grupos
    grupos: 'grupos',
    gruposCrear: 'grupos/crear',
    gruposEditar: 'grupos/editar/:uuid',
    gruposNav: '/parametrizacion/grupos',

    ///* trazabilidad venta
    trazabilidadesVenta: 'trazabilidades-venta',
    trazabilidadesVentaNav: '/parametrizacion/trazabilidades-venta',
  },

  // // =================================
  nomina: {
    root: 'nomina',

    ///* cargo
    cargos: 'cargos',
    cargosCrear: 'cargos/crear',
    cargosEditar: 'cargos/editar/:uuid',
    cargosNav: '/nomina/cargos',

    ///* empleados
    empleados: 'empleados',
    empleadosCrear: 'empleados/crear',
    empleadosEditar: 'empleados/editar/:uuid',
    empleadosNav: '/nomina/empleados',
  },

  // // =================================
  servicios: {
    root: 'servicios',

    ///* planes internet
    planesinternet: 'planesinternet',
    planesinternetCrear: 'planesinternet/crear',
    planesinternetEditar: 'planesinternet/editar/:uuid',
    planesinternetNav: '/servicios/planesinternet',
  },

  clientes: {
    root: 'clientes',

    ///* planes internet
    servicios: 'servicios',
    serviciosEditar: 'servicios/editar/:uuid',
    serviciosNav: '/clientes/servicios',
  },

  /////* Cobranza ----------------
  cobranza: {
    root: 'cobranza',

    ///* tarjetas
    tarjetas: 'tarjetas',
    tarjetasCrear: 'tarjetas/crear',
    tarjetasEditar: 'tarjetas/editar/:uuid',
    tarjetasNav: '/cobranza/tarjetas',
  },

  /////* Comercial ----------------
  comercial: {
    root: 'comercial',

    ///* codigos otp
    codigosOtp: 'codigos-otp',
    codigosOtpNav: '/comercial/codigos-otp',

    ///* promociones
    promociones: 'promociones',
    promocionesCrear: 'promociones/crear',
    promocionesEditar: 'promociones/editar/:uuid',
    promocionesNav: '/comercial/promociones',

    ///* solicitud de servicio
    solicitudServicio: 'solicitud-servicio',
    solicitudServicioCrear: 'solicitud-servicio/crear',
    solicitudServicioEditar: 'solicitud-servicio/editar/:uuid',
    solicitudServicioNav: '/comercial/solicitud-servicio',
    solicitudServicioCrearNav: '/comercial/solicitud-servicio/crear',

    ///* preventa
    preventas: 'preventas',
    preventasCrear: 'preventas/crear/:uuid', // open solicitud_servicio
    preventasNav: '/comercial/preventas',

    ///* agendamientos
    agendamientos: 'agendamientos',
    createAgendamiento: 'agendamientos/crear/:uuid',
    agendamientosNav: '/comercial/agendamientos',
  },

  /////* Operaciones ----------------
  operaciones: {
    root: 'operaciones',

    ///* agendamiento
    agendamientos: 'agendamientos',
    agendamientosPending: 'agendamientos/pendientes/:uuid',
    agendamientosNav: '/operaciones/agendamientos',
  },

  /////* Infraestructura ----------------
  infraestructura: {
    root: 'infraestructura',

    ///* nodos
    nodos: 'nodos',
    nodosCrear: 'nodos/crear',
    nodosEditar: 'nodos/editar/:uuid',
    nodosNav: '/infraestructura/nodos',

    ///* olt
    olts: 'olts',
    oltsCrear: 'olts/crear',
    oltsEditar: 'olts/editar/:uuid',
    oltsNav: '/infraestructura/olts',

    ///* nap
    naps: 'naps',
    napsCrear: 'naps/crear',
    napsEditar: 'naps/editar/:uuid',
    napsNav: '/infraestructura/naps',

    ///* radiobase
    radiobases: 'radiobases',
    radiobasesCrear: 'radiobases/crear',
    radiobasesEditar: 'radiobases/editar/:uuid',
    radiobasesNav: '/infraestructura/radiobases',

    ///* ruta
    rutas: 'rutas',
    rutasCrear: 'rutas/crear',
    rutasEditar: 'rutas/editar/:uuid',
    rutasNav: '/infraestructura/rutas',
  },

  /////* Mantenimiento y Operación ----------------
  mantenimientoOperacion: {
    root: 'mantenimiento-operacion',

    ///* flotas
    flotas: 'flotas',
    flotasCrear: 'flotas/crear',
    flotasEditar: 'flotas/editar/:uuid',
    flotasNav: '/mantenimiento-operacion/flotas',

    ///* planificadores
    planificadores: 'planificadores',
    planificadorFlota: 'planificadores/flota/:uuid',
    planificadoresNav: '/mantenimiento-operacion/planificadores',
  },

  /////* Supervision Comercial ----------------
  supervisionComercial: {
    root: 'supervision-comercial',

    ///* solicitud desbloqueo ventas - administración area/supervisor ventas
    solicitudDesbloqueoVentas: 'solicitud-desbloqueo-ventas',
    solicitudDesbloqueoVentasNav:
      '/supervision-comercial/solicitud-desbloqueo-ventas',

    ///* desbloqueo preventa
    solicitudDesbloqueoPreventa: 'solicitud-desbloqueo-preventa',
    solicitudDesbloqueoPreventaNav:
      '/supervision-comercial/solicitud-desbloqueo-preventa',

    ///* codigos otp
    codigosOtp: 'codigos-otp',
    codigosOtpNav: '/supervision-comercial/codigos-otp',

    ///* consulta buro
    consultasBuro: 'consultas-buro',
    consultasBuroNav: '/supervision-comercial/consultas-buro',
  },

  /////* Administración de Red ----------------
  administracionRed: {
    root: 'administracion-red',

    ///* routers
    routers: 'routers',
    routersCrear: 'routers/crear',
    routersEditar: 'routers/editar/:uuid',
    routersNav: '/administracion-red/routers',
  },
  // // INVENTARIO =================================
  inventario: {
    root: 'inventario',

    ///* bodega
    bodegas: 'bodegas',
    bodegasCrear: 'bodegas/crear',
    bodegasEditar: 'bodegas/editar/:uuid',
    bodegasNav: '/inventario/bodegas',

    ///* producto
    productos: 'productos',
    productosCrear: 'productos/crear',
    productosEditar: 'productos/editar/:uuid',
    productosNav: '/inventario/productos',
  },
  // // LOGISTICA =================================
  logistica: {
    root: 'logistica',

    ///* tipoinstalaciones
    tipoinstalaciones: 'tipoinstalaciones',
    tipoinstalacionesCrear: 'tipoinstalaciones/crear',
    tipoinstalacionesEditar: 'tipoinstalaciones/editar/:uuid',
    tipoinstalacionesNav: '/logistica/tipoinstalaciones',
  },
};
