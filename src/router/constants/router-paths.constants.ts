export const ROUTER_PATHS = {
  home: '/',

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

    ///* iva
    ivas: 'ivas',
    ivasCrear: 'ivas/crear',
    ivasEditar: 'ivas/editar/:uuid',
    ivasNav: '/parametrizacion/ivas',

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

    ///* parametro sistema
    parametrosSistemas: 'parametros-sistemas',
    parametrosSistemasCrear: 'parametros-sistemas/crear',
    parametrosSistemasEditar: 'parametros-sistemas/editar/:uuid',
    parametrosSistemasNav: '/parametrizacion/parametros-sistemas',

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

    ///* planes
    planes: 'planes',
    planesCrear: 'planes/crear',
    planesEditar: 'planes/editar/:uuid',
    planesNav: '/servicios/planes',
  },

  /////* Comercial ----------------
  comercial: {
    root: 'comercial',

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
  },
};
