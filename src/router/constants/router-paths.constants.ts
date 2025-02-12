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

    ///* motivos rechazo
    motivosRechazo: 'motivos-rechazo',
    motivosRechazoCrear: 'motivos-rechazo/crear',
    motivosRechazoEditar: 'motivos-rechazo/editar/:uuid',
    motivosRechazoNav: '/parametrizacion/motivos-rechazo',

    ///* motivos actualizacion
    motivosActualizacion: 'motivos-actualizacion',
    motivosActualizacionCrear: 'motivos-actualizacion/crear',
    motivosActualizacionEditar: 'motivos-actualizacion/editar/:uuid',
    motivosActualizacionNav: '/parametrizacion/motivos-actualizacion',

    ///* configuracion plantilla
    configuracionPlantillas: 'configuracion-plantillas',
    configuracionPlantillasCrear: 'configuracion-plantillas/crear',
    configuracionPlantillasEditar: 'configuracion-plantillas/editar/:uuid',
    configuracionPlantillasNav: '/parametrizacion/configuracion-plantillas',

    ///* score limit ventas
    scoreLimitVentas: 'score-limit-ventas',
    scoreLimitVentasCrear: 'score-limit-ventas/crear',
    scoreLimitVentasEditar: 'score-limit-ventas/editar/:uuid',
    scoreLimitVentasNav: '/parametrizacion/score-limit-ventas',

    ///* score monthly usage ventas
    scoreMonthlyUsageVentas: 'score-uso-mensual-ventas',
    scoreMonthlyUsageVentasCrear: 'score-uso-mensual-ventas/crear',
    scoreMonthlyUsageVentasEditar: 'score-uso-mensual-ventas/editar/:uuid',
    scoreMonthlyUsageVentasNav: '/parametrizacion/score-uso-mensual-ventas',

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

    ///* centro costos
    tipocomprobantes: 'tipo-comprobantes',
    tipocomprobantesCrear: 'tipo-comprobantes/crear',
    tipocomprobantesEditar: 'tipo-comprobantes/editar/:uuid',
    tipocomprobantesNav: '/parametrizacion/tipo-comprobantes',

    ///* calendario facturacion
    calendariofacturaciones: 'calendario-facturaciones',
    calendariofacturacionesCrear: 'calendario-facturaciones/crear',
    calendariofacturacionesEditar: 'calendario-facturaciones/editar/:uuid',
    calendariofacturacionesNav: '/parametrizacion/calendario-facturaciones',
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

  /////* Cliente ----------------
  clientes: {
    root: 'clientes',

    ///* planes internet
    servicios: 'servicios',
    serviciosEditar: 'servicios/editar/:uuid',
    serviciosNav: '/clientes/servicios',

    ///* clientes
    clientesFibra: 'fibra-optica',
    clientesFibraVer: 'fibra-optica/:uuid',
    clientesFibraNav: '/clientes/fibra-optica',

    //* Soporte Tecnico
    soporteTecnico: 'soporte-tecnico',
    soporteTecnicoNav: '/clientes/soporte-tecnico',
  },
  /////* Cartera ----------------
  cartera: {
    root: 'cartera',
    ///* cambio domicilio
    cambiodomicilio: 'cambiodomicilio',
    cambiodomicilioCrear: 'cambiodomicilio/crear',
    cambiodomicilioEditar: 'cambiodomicilio/editar/:uuid',
    cambiodomicilioNav: '/cartera/cambiodomicilio',

    ///* venta convenio
    ventaconvenio: 'ventaconvenio',
    ventaconvenioCrear: 'ventaconvenio/crear',
    ventaconvenioEditar: 'ventaconvenio/editar/:uuid',
    ventaconvenioNav: '/cartera/ventaconvenio',

    ///* cambio de plan
    cambioplan: 'cambioplan',
    cambioplanCrear: 'cambioplan/crear',
    cambioplanEditar: 'cambioplan/editar/:uuid',
    cambioplanNav: '/cartera/cambioplan',

    ///* promesa de pago
    promesapago: 'promesapago',
    promesapagoCrear: 'promesapago/crear',
    promesapagoEditar: 'promesapago/editar/:uuid',
    promesapagoNav: '/cartera/promesapago',

    ///* cambio propietario
    cambiopropietario: 'cambiopropietario',
    cambiopropietarioCrear: 'cambiopropietario/crear',
    cambiopropietarioEditar: 'cambiopropietario/editar/:uuid',
    cambiopropietarioNav: '/cartera/cambiopropietario',

    ///* buzon de tareas
    buzontareas: 'buzontareas',
    buzontareasCrear: 'buzontareas/crear',
    buzontareasEditar: 'buzontareas/editar/:uuid',
    buzontareasNav: '/cartera/buzontareas',

    ///* parametros mantenedor de tareas
    // Tipo
    parametrosTipoMantenedorBeneficios: 'parametros/tipo-mantenedor-beneficios',
    parametrosTipoMantenedorBeneficiosCrear:
      'parametros/tipo-mantenedor-beneficios/crear',
    parametrosTipoMantenedorBeneficiosEditar:
      'parametros/tipo-mantenedor-beneficios/editar/:uuid',
    parametrosTipoMantenedorBeneficiosNav:
      '/cartera/parametros/tipo-mantenedor-beneficios',

    // Subtipo

    parametrosSubtipoMantenedorBeneficios:
      'parametros/subtipo-mantenedor-beneficios',
    parametrosSubtipoMantenedorBeneficiosCrear:
      'parametros/subtipo-mantenedor-beneficios/crear',
    parametrosSubtipoMantenedorBeneficiosEditar:
      'parametros/subtipo-mantenedor-beneficios/editar/:uuid',
    parametrosSubtipoMantenedorBeneficiosNav:
      '/cartera/parametros/subtipo-mantenedor-beneficios',

    // Beneficio
    parametrosBeneficioMantenedorBeneficios:
      'parametros/beneficio-mantenedor-beneficios',
    parametrosBeneficioMantenedorBeneficiosCrear:
      'parametros/beneficio-mantenedor-beneficios/crear',
    parametrosBeneficioMantenedorBeneficiosEditar:
      'parametros/beneficio-mantenedor-beneficios/editar/:uuid',
    parametrosBeneficioMantenedorBeneficiosNav:
      '/cartera/parametros/beneficio-mantenedor-beneficios',

    // Causa
    parametrosCausaMantenedorBeneficios:
      'parametros/causa-mantenedor-beneficios',
    parametrosCausaMantenedorBeneficiosCrear:
      'parametros/causa-mantenedor-beneficios/crear',
    parametrosCausaMantenedorBeneficiosEditar:
      'parametros/causa-mantenedor-beneficios/editar/:uuid',
    parametrosCausaMantenedorBeneficiosNav:
      '/cartera/parametros/causa-mantenedor-beneficios',

    // Solucion

    parametrosSolucionMantenedorBeneficios:
      'parametros/solucion-mantenedor-beneficios',
    parametrosSolucionMantenedorBeneficiosCrear:
      'parametros/solucion-mantenedor-beneficios/crear',
    parametrosSolucionMantenedorBeneficiosEditar:
      'parametros/solucion-mantenedor-beneficios/editar/:uuid',
    parametrosSolucionMantenedorBeneficiosNav:
      '/cartera/parametros/solucion-mantenedor-beneficios',

    ///* promesas de pago
    promesaspago: 'promesaspago',
    promesaspagoCrear: 'promesaspago/crear',
    promesaspagoEditar: 'promesaspago/editar/:uuid',
    promesaspagoNav: '/cartera/promesaspago',

    ///* promesas de pago
    mantenedorActivaciones: 'mantenedorActivaciones',
    mantenedorActivacionesCrear: 'mantenedorActivaciones/crear',
    mantenedorActivacionesEditar: 'mantenedorActivaciones/editar/:uuid',
    mantenedorActivacionesNav: '/cartera/mantenedorActivaciones',

    ///* transacciones
    transacciones: 'transacciones',
    transaccionesNav: '/cartera/transacciones',

    ///* saldos
    saldos: 'saldos',
    saldosNav: '/cartera/saldos',

    ///* promesas de pago
    alquileres: 'alquileres',
    alquileresCrear: 'alquileres/crear',
    alquileresEditar: 'alquileres/editar/:uuid',
    alquileresNav: '/cartera/alquileres',
  },
  /////* Cobranza ----------------
  cobranza: {
    root: 'cobranza',

    ///* tarjetas
    tarjetas: 'tarjetas',
    tarjetasCrear: 'tarjetas/crear',
    tarjetasEditar: 'tarjetas/editar/:uuid',
    tarjetasNav: '/cobranza/tarjetas',

    ///* rubros
    rubros: 'rubros',
    rubrosCrear: 'rubros/crear',
    rubrosEditar: 'rubros/editar/:uuid',
    rubrosNav: '/cartera/rubros',

    ///* facturas
    facturas: 'facturas',
    facturasCrear: 'facturas/crear',
    facturasEditar: 'facturas/editar/:uuid',
    facturasNav: '/cobranza/facturas',

    ///* motivo rubro adicional (rubro libre)
    motivoRubroAdicional: 'motivo-rubro-adicional',
    motivoRubroAdicionalCrear: 'motivo-rubro-adicional/crear',
    motivoRubroAdicionalEditar: 'motivo-rubro-adicional/editar/:uuid',
    motivoRubroAdicionalNav: '/cobranza/motivo-rubro-adicional',

    ///* cambio propietario
    planpagocuotas: 'plan_pago_cuota',
    planpagocuotasCrear: 'plan_pago_cuota/crear',
    planpagocuotasEditar: 'plan_pago_cuota/editar/:uuid',
    planpagocuotasNav: '/cobranza/plan_pago_cuota',
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

    ///* televentas
    televentas: 'televentas',
    televentasCrear: 'televentas/crear/:uuid', // open solicitud_servicio
    televentasNav: '/comercial/televentas',

    ///* correccion preventa
    correccionPreventas: 'correcciones-preventas',
    // correccionPreventasCrear: 'preventas/crear/:uuid', // open solicitud_servicio
    CorreccionPreventasNav: '/comercial/correcciones-preventas',

    ///* agendamientos
    agendamientos: 'agendamientos',
    createAgendamiento: 'agendamientos/crear/:uuid',
    preventasCorrecciones: 'agendamientos/correcciones/:uuid',
    agendamientosNav: '/comercial/agendamientos',

    ///* instalaciones
    instalaciones: 'instalaciones',
    instalacionesNav: '/comercial/instalaciones',
    instalacionesPreRechazadas: 'instalaciones',
    instalacionPreRechazadaOT: 'instalaciones/:uuid',
  },

  /////* Operaciones ----------------
  operaciones: {
    root: 'operaciones',

    ///* agendamiento
    agendamientos: 'agendamientos',
    agendamientosPending: 'agendamientos/pendientes/:uuid',
    agendamientosNav: '/operaciones/agendamientos',

    ///* activaciones
    activaciones: 'activaciones',
    activacionesInstalacion: 'activaciones/instalacion/:uuid',
    activacionesInstalacionGestionada:
      'activaciones/instalacion/actualizacion-serie-onu/:uuid',
    activacionesNav: '/operaciones/activaciones',

    ///* auditoria
    auditoriaInstalaciones: 'auditoria/instalaciones',
    auditoriaInstalacion: 'auditoria/instalaciones/:uuid',
    auditoriaNav: '/operaciones/auditoria/instalaciones',
    auditOtInstallFixedData: 'auditoria/instalaciones-actualizadas/datos/:uuid',
    auditOtInstallFixedPhotos:
      'auditoria/instalaciones-actualizadas/fotos/:uuid',

    ///* tickets visita
    ticketsVisita: 'tickets-visita/recoordinacion',
    ticketsVisitaRecoordinacion: 'tickets-visita/recoordinacion/:uuid',
    ticketsVisitaNav: '/operaciones/tickets-visita/recoordinacion',

    aprobacionTicketsVisita: 'tickets-visita/aprobacion',
    aprobacionTicketsVisitaRecoordinacion: 'tickets-visita/aprobacion/:uuid',
    aprobacionicketsVisitaNav: '/operaciones/tickets-visita/aprobacion',
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
    oltsConfigurar: 'olts/configurar/:uuid',
    oltsCrear: 'olts/crear',
    oltsEditar: 'olts/editar/:uuid',
    oltsNav: '/infraestructura/olts',

    ///* nap primaria
    primarynaps: 'primary-naps',
    primarynapsCrear: 'primary-naps/crear',
    primarynapsEditar: 'primary-naps/editar/:uuid',
    primarynapsNav: '/infraestructura/primary-naps',

    ///* nap secundaria
    secondarynaps: 'secondary-naps',
    secondarynapsCrear: 'secondary-naps/crear',
    secondarynapsEditar: 'secondary-naps/editar/:uuid',
    secondarynapsNav: '/infraestructura/secondary-naps',

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

  /////* Tecnico ----------------
  tecnico: {
    root: 'tecnico',

    ///* instalaciones asignadasta
    instalacionesAsignadas: 'instalaciones-asignadas',
    instalacionAsignadaOT: 'instalaciones-asignadas/:uuid',
    instalacionesAsignadasNav: '/tecnico/instalaciones-asignadas',

    instalPendingUpdDatos: 'correccion-datos/:uuid',
    instalacionesCorreccionFotos: 'coreccion-fotos/:uuid',
    instalacionesOrdenTrabajo: '/tecnico/orden-trabajo',
    instalacionesSolicitudMateriales: '/tecnico/solicitud-materiales',

    //
    ticketsAsignados: 'tickets',
    ticketsAsignadosOV: 'tickets/:uuid',
    ticketsNav: '/tecnico/tickets',

    //

    auditTvFixedData: 'auditoria/instalaciones-actualizadas/datos/:uuid',
    auditTvFixedPhotos: 'auditoria/instalaciones-actualizadas/fotos/:uuid',

    ///* upload
    // parametrosAsuntos: 'orden-visita',
    // parametrosAsuntosEditar: '/tecnico/tickets/orden-visita:uuid',
    // parametrosAsuntosNav: '/tecnico/tickets/orden-visita',
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

    ///* reasignacion de ventas (sol servicio)
    reasignacionVentas: 'reasignacion-ventas',
    reasignacionVentasNav: '/supervision-comercial/reasignacion-ventas',

    ///* solicitud recoordinacion agenda
    solicitudRecoordinacionAgenda: 'solicitud-recoordinacion-agenda',
    solicitudRecoordinacionAgendaHandle:
      'solicitud-recoordinacion-agenda/:uuid',
    solicitudRecoordinacionAgendaNav:
      '/supervision-comercial/solicitud-recoordinacion-agenda',

    ///* solicitud aprobacion ia preventa
    solicitudAprobacionIAPreventa: 'solicitud-aprobacion-ia-preventa',
    solicitudAprobacionIAPreventaHandle:
      'solicitud-aprobacion-ia-preventa/:uuid',
    solicitudAprobacionIAPreventaNav:
      '/supervision-comercial/solicitud-aprobacion-ia-preventa',
  },

  /////* Administración de Red ----------------
  administracionRed: {
    root: 'administracion-red',

    ///* routers
    routers: 'routers',
    routersCrear: 'routers/crear',
    routersEditar: 'routers/editar/:uuid',
    routersNav: '/administracion-red/routers',

    ///* monitoreos
    monitoreos: 'monitoreos',
    monitoreosCrear: 'monitoreos/crear',
    monitoreosEditar: 'monitoreos/editar/:uuid',
    monitoreosNav: '/administracion-red/monitoreos',

    ///* radius
    radius: 'radius',
    radiusNav: '/administracion-red/radius',

    ///* Autenticacion de Clientes
    autenticacionClientes: 'autenticacionClientes',
    autenticacionClientesNav: '/administracion-red/autenticacionClientes',

    ///* Trafico
    traficos: 'traficos',
    traficosNav: '/administracion-red/traficos',

    ///* Brass
    brass: 'brass',
    brassCrear: 'brass/crear',
    brassEditar: 'brass/editar/:uuid',
    brassNav: '/administracion-red/brass',

    ///* Grupo IPv4
    gruposIPv4: 'redes-ipv4',
    gruposIPv4Crear: 'redes-ipv4/crear',
    gruposIPv4Editar: 'redes-ipv4/editar/:uuid',
    gruposIPv4Nav: '/administracion-red/redes-ipv4',

    ///* Grupo IPv6
    gruposIPv6: 'redes-ipv6',
    gruposIPv6Crear: 'redes-ipv6/crear',
    gruposIPv6Editar: 'redes-ipv6/editar/:uuid',
    gruposIPv6Nav: '/administracion-red/redes-ipv6',
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

    ///* categoria producto
    categoriaProductos: 'categoria-productos',
    categoriaProductoCrear: 'categoria-productos/crear',
    categoriaProductoEditar: 'categoria-productos/editar/:uuid',
    categoriaProductoNav: '/inventario/categoria-productos',

    ///* ubicacion
    ubicaciones: 'ubicaciones',
    ubicacionesCrear: 'ubicaciones/crear',
    ubicacionesEditar: 'ubicaciones/editar/:uuid',
    ubicacionesNav: '/inventario/ubicaciones',

    ///* solicitud devolucion
    solicitudDevolucion: 'solicitud-devolucion',
    solicitudDevolucionCrear: 'solicitud-devolucion/crear',
    solicitudDevolucionEditar: 'solicitud-devolucion/editar/:uuid',
    solicitudDevolucionNav: '/inventario/solicitud-devolucion',

    ///* solicitud material
    solicitudMaterial: 'solicitud-material',
    solicitudMaterialCrear: 'solicitud-material/crear',
    solicitudMaterialEditar: 'solicitud-material/editar/:uuid',
    solicitudMaterialNav: '/inventario/solicitud-material',

    ///* Ingreso Material
    ingresoMateriales: 'ingreso-materiales',
    ingresoMaterialesCrear: 'ingreso-materiales/crear',
    ingresoMaterialesEditar: 'ingreso-materiales/editar/:uuid',
    ingresoMaterialesNav: '/inventario/ingreso-materiales',

    ///* Egreso Material
    egresoMateriales: 'egreso-materiales',
    egresoMaterialesCrear: 'egreso-materiales/crear',
    egresoMaterialesEditar: 'egreso-materiales/editar/:uuid',
    egresoMaterialesNav: '/inventario/egreso-materiales',

    ///* Movimiento Material
    movimientoMateriales: 'movimiento-materiales',
    movimientoMaterialesCrear: 'movimiento-materiales/crear',
    movimientoMaterialesEditar: 'movimiento-materiales/editar/:uuid',
    movimientoMaterialesNav: '/inventario/movimiento-materiales',

    ///* Transferencia Material
    transferenciaMateriales: 'transferencia-materiales',
    transferenciaMaterialesCrear: 'transferencia-materiales/crear',
    transferenciaMaterialesEditar: 'transferencia-materiales/editar/:uuid',
    transferenciaMaterialesNav: '/inventario/transferencia-materiales',

    ///* Recepcion Material
    RecepcionMateriales: 'recepcion-materiales',
    RecepcionMaterialesCrear: 'recepcion-materiales/crear',
    RecepcionMaterialesEditar: 'recepcion-materiales/editar/:uuid',
    RecepcionMaterialesNav: '/inventario/recepcion-materiales',

    ///* Recepcion Material
    modeloInventarios: 'modelo-inventarios',
    modeloInventariosCrear: 'modelo-inventarios/crear',
    modeloInventariosEditar: 'modelo-inventarios/editar/:uuid',
    modeloInventariosNav: '/inventario/modelo-inventarios',

    ///* solicitud material
    solicitudTransferenciaMaterial: 'solicitud-transferencia-material',
    solicitudTransferenciaMaterialCrear:
      'solicitud-transferencia-material/crear',
    solicitudTransferenciaMaterialEditar:
      'solicitud-transferencia-material/editar/:uuid',
    solicitudTransferenciaMaterialNav:
      '/inventario/solicitud-transferencia-material',

    ///* Recepcion solicitud material
    recepcionSolicitudTransferenciaMateriales:
      'recepcion-solicitud-transferencia-material',
    recepcionSolicitudTransferenciaMaterialesCrear:
      'recepcion-solicitud-transferencia-material/crear',
    recepcionSolicitudTransferenciaMaterialesEditar:
      'recepcion-solicitud-transferencia-material/editar/:uuid',
    recepcionSolicitudTransferenciaMaterialesNav:
      '/inventario/recepcion-solicitud-transferencia-material',

    ///* Motivo Egreso
    motivoEgresos: 'motivo-egreso',
    motivoEgresosCrear: 'motivo-egreso/crear',
    motivoEgresosEditar: 'motivo-egreso/editar/:uuid',
    motivoEgresosNav: '/inventario/motivo-egreso',

    ///* Motivo Ingreso
    motivoIngresos: 'motivo-ingreso',
    motivoIngresosCrear: 'motivo-ingreso/crear',
    motivoIngresosEditar: 'motivo-ingreso/editar/:uuid',
    motivoIngresosNav: '/inventario/motivo-ingreso',

    ///* Motivo Transferencia
    motivoTransferencias: 'motivo-transferencia',
    motivoTransferenciasCrear: 'motivo-transferencia/crear',
    motivoTransferenciasEditar: 'motivo-transferencia/editar/:uuid',
    motivoTransferenciasNav: '/inventario/motivo-transferencia',

    ///* Reporte Stock
    reporteStocks: 'reporte-stock',
    reporteStocksNav: '/inventario/reporte-stock',
  },
  // // LOGISTICA =================================
  logistica: {
    root: 'logistica',

    ///* tipoinstalaciones
    tipoinstalaciones: 'tipo-instalaciones',
    tipoinstalacionesCrear: 'tipo-instalaciones/crear',
    tipoinstalacionesEditar: 'tipo-instalaciones/editar/:uuid',
    tipoinstalacionesNav: '/logistica/tipo-instalaciones',
  },
  /////* NetConnect ----------------
  netconnect: {
    root: 'netconnect',

    ///* Autorizacion de ONUs
    autorizacionOnus: 'autorizacion-onus',
    autorizacionOnusNav: '/netconnect/autorizacion-onus',

    ///* Gestion de ONUs
    gestionOnus: 'gestion-onus',
    gestionOnusNav: '/netconnect/gestion-onus',

    ///* vlans
    vlans: 'vlans',
    vlansCrear: 'vlans/crear',
    vlansEditar: 'vlans/editar/:uuid',
    vlansNav: '/netconnect/vlans',

    ///* vlans
    onusConfiguradas: 'onus-configuradas',
    onusConfiguradasNav: '/netconnect/onus-configuradas',

    ///* Auditoria de consumos
    auditoriaConsumos: 'auditoria-consumos',
    auditoriaConsumosNav: '/netconnect/auditoria-consumos',

    ///* ONT Model
    ontModels: 'ont-models',
    ontModelsCrear: 'ont-models/crear',
    ontModelsEditar: 'ontModels/editar/:uuid',
    ontModelsNav: '/netconnect/ont-models',
  },

  /////* Tickets ----------------
  tickets: {
    root: 'tickets',

    ticketsCrear: 'crear',
    ticketsNav: '/tickets',

    ///* parametros
    parametrosAsuntos: 'parametros/asuntos',
    parametrosAsuntosCrear: 'parametros/asuntos/crear',
    parametrosAsuntosEditar: 'parametros/asuntos/editar/:uuid',
    parametrosAsuntosNav: '/tickets/parametros/asuntos',

    parametrosOrigenes: 'parametros/origenes',
    parametrosOrigenesCrear: 'parametros/origenes/crear',
    parametrosOrigenesEditar: 'parametros/origenes/editar/:uuid',
    parametrosOrigenesNav: '/tickets/parametros/origenes',
  },

  /////* Buzon Tareas ----------------
  buzonTareas: {
    root: 'buzon-tareas',

    ticketsNav: '/buzon-tareas',

    ///* parametros
    buzonTareasAsignadas: 'tareas-asignadas',
    buzonTareasAsignada: 'tareas-asignadas/:uuid',
    buzonTareasAsignadasNav: '/buzon-tareas/tareas-asignadas',
  },
};
