export enum PermissionsEnum {
  // // // // VIEW ---------------------------
  admin_view_logentry = 'admin.view_logentry',
  administration_view_area = 'administration.view_area',
  administration_view_canalventa = 'administration.view_canalventa',
  administration_view_centrocosto = 'administration.view_centrocosto',
  administration_view_ciudad = 'administration.view_ciudad',
  administration_view_codigootp = 'administration.view_codigootp',
  administration_view_configplantillacliente = 'administration.view_configplantillacliente',
  administration_view_departamento = 'administration.view_departamento',
  administration_view_entidadfinanciera = 'administration.view_entidadfinanciera',
  administration_view_empresa = 'administration.view_empresa',
  administration_view_iva = 'administration.view_iva',
  administration_view_metodopago = 'administration.view_metodopago',
  administration_view_pais = 'administration.view_pais',
  administration_view_parametrosistema = 'administration.view_parametrosistema',
  administration_view_provincia = 'administration.view_provincia',
  administration_view_sector = 'administration.view_sector',
  administration_view_tipocomprobante = 'administration.view_tipocomprobante',
  administration_view_zona = 'administration.view_zona',
  auth_view_group = 'auth.view_group',
  auth_view_permission = 'auth.view_permission',
  authtoken_view_token = 'authtoken.view_token',
  authtoken_view_tokenproxy = 'authtoken.view_tokenproxy',
  billing_view_category = 'billing.view_category',
  billing_view_contract = 'billing.view_contract',
  billing_view_credit_note_admin = 'billing.view_credit_note_admin',
  billing_view_credit_note_customer = 'billing.view_credit_note_customer',
  billing_view_customer = 'billing.view_customer',
  billing_view_invoice_admin = 'billing.view_invoice_admin',
  billing_view_invoice_customer = 'billing.view_invoice_customer',
  billing_view_invoice_payment = 'billing.view_invoice_payment',
  billing_view_product = 'billing.view_product',
  billing_view_receipt = 'billing.view_receipt',
  billing_view_receipt_errors = 'billing.view_receipt_errors',
  clientes_view_adendumcontrato = 'clientes.view_adendumcontrato',
  clientes_view_cliente = 'clientes.view_cliente',
  clientes_view_contrato = 'clientes.view_contrato',
  clientes_view_lineaservicio = 'clientes.view_lineaservicio',
  clientes_view_servicioadicional = 'clientes.view_servicioadicional',
  cobranza_view_rubro = 'cobranza.view_rubro',
  cobranza_view_saldo = 'cobranza.view_saldo',
  cobranza_view_tarjeta = 'cobranza.view_tarjeta',
  cobranza_view_transaccion = 'cobranza.view_transaccion',
  comercial_view_consultaburo = 'comercial.view_consultaburo',
  comercial_view_notificacionusuario = 'comercial.view_notificacionusuario',
  comercial_view_notificacionventa = 'comercial.view_notificacionventa',
  comercial_view_preventa = 'comercial.view_preventa',
  comercial_view_promocion = 'comercial.view_promocion',
  comercial_view_solicituddesbloqueoventas = 'comercial.view_solicituddesbloqueoventas',
  comercial_view_solicitudservicio = 'comercial.view_solicitudservicio',
  comercial_view_trazabilidadventa = 'comercial.view_trazabilidadventa',
  contenttypes_view_contenttype = 'contenttypes.view_contenttype',
  homepage_view_comment = 'homepage.view_comment',
  homepage_view_frequent_question = 'homepage.view_frequent_question',
  homepage_view_publicity = 'homepage.view_publicity',
  homepage_view_service = 'homepage.view_service',
  homepage_view_social_network = 'homepage.view_social_network',
  homepage_view_testimonial = 'homepage.view_testimonial',
  homepage_view_video_tutorial = 'homepage.view_video_tutorial',
  infraestructura_view_grupoipv4 = 'infraestructura.view_grupoipv4',
  infraestructura_view_grupoipv6 = 'infraestructura.view_grupoipv6',
  infraestructura_view_nap = 'infraestructura.view_nap',
  infraestructura_view_nodo = 'infraestructura.view_nodo',
  infraestructura_view_olt = 'infraestructura.view_olt',
  infraestructura_view_radiobase = 'infraestructura.view_radiobase',
  infraestructura_view_router = 'infraestructura.view_router',
  infraestructura_view_ruta = 'infraestructura.view_ruta',
  inventario_view_bodega = 'inventario.view_bodega',
  inventario_view_catalogoproducto = 'inventario.view_catalogoproducto',
  inventario_view_categoriaproducto = 'inventario.view_categoriaproducto',
  inventario_view_egresomaterial = 'inventario.view_egresomaterial',
  inventario_view_ingresomaterial = 'inventario.view_ingresomaterial',
  inventario_view_movimientomaterial = 'inventario.view_movimientomaterial',
  inventario_view_producto = 'inventario.view_producto',
  inventario_view_solicitudcompra = 'inventario.view_solicitudcompra',
  inventario_view_solicitudmaterial = 'inventario.view_solicitudmaterial',
  inventario_view_transferenciamaterial = 'inventario.view_transferenciamaterial',
  inventario_view_ubicacion = 'inventario.view_ubicacion',
  inventario_view_ubicacionproducto = 'inventario.view_ubicacionproducto',
  mantenimientoope_view_flota = 'mantenimientoope.view_flota',
  mantenimientoope_view_planificador = 'mantenimientoope.view_planificador',
  mantenimientoope_view_tipoinstalacion = 'mantenimientoope.view_tipoinstalacion',
  multicpy_view_company = 'multicpy.view_company',
  multicpy_view_domain = 'multicpy.view_domain',
  multicpy_view_plan = 'multicpy.view_plan',
  multicpy_view_scheme = 'multicpy.view_scheme',
  nomina_view_cargo = 'nomina.view_cargo',
  nomina_view_empleado = 'nomina.view_empleado',
  operaciones_view_agendamiento = 'operaciones.view_agendamiento',
  security_view_dashboard = 'security.view_dashboard',
  security_view_module = 'security.view_module',
  security_view_module_type = 'security.view_module_type',
  security_view_user_access = 'security.view_user_access',
  servicios_view_planinternet = 'servicios.view_planinternet',
  servicios_view_servicio = 'servicios.view_servicio',
  sessions_view_session = 'sessions.view_session',
  user_view_user = 'user.view_user',
  users_view_customgroup = 'users.view_customgroup',
  users_view_profile = 'users.view_profile',
  users_view_user = 'users.view_usuario',

  // // // // ADD ---------------------------
  admin_add_logentry = 'admin.add_logentry',
  administration_add_area = 'administration.add_area',
  administration_add_canalventa = 'administration.add_canalventa',
  administration_add_centrocosto = 'administration.add_centrocosto',
  administration_add_ciudad = 'administration.add_ciudad',
  administration_add_codigootp = 'administration.add_codigootp',
  administration_add_configplantillacliente = 'administration.add_configplantillacliente',
  administration_add_departamento = 'administration.add_departamento',
  administration_add_entidadfinanciera = 'administration.add_entidadfinanciera',
  administration_add_empresa = 'administration.add_empresa',
  administration_add_iva = 'administration.add_iva',
  administration_add_metodopago = 'administration.add_metodopago',
  administration_add_pais = 'administration.add_pais',
  administration_add_parametrosistema = 'administration.add_parametrosistema',
  administration_add_provincia = 'administration.add_provincia',
  administration_add_sector = 'administration.add_sector',
  administration_add_tipocomprobante = 'administration.add_tipocomprobante',
  administration_add_zona = 'administration.add_zona',
  auth_add_group = 'auth.add_group',
  auth_add_permission = 'auth.add_permission',
  authtoken_add_token = 'authtoken.add_token',
  authtoken_add_tokenproxy = 'authtoken.add_tokenproxy',
  billing_add_category = 'billing.add_category',
  billing_add_contract = 'billing.add_contract',
  billing_add_credit_note_admin = 'billing.add_credit_note_admin',
  billing_add_customer = 'billing.add_customer',
  billing_add_invoice_admin = 'billing.add_invoice_admin',
  billing_add_invoice_payment = 'billing.add_invoice_payment',
  billing_add_product = 'billing.add_product',
  billing_add_receipt = 'billing.add_receipt',
  clientes_add_adendumcontrato = 'clientes.add_adendumcontrato',
  clientes_add_cliente = 'clientes.add_cliente',
  clientes_add_contrato = 'clientes.add_contrato',
  clientes_add_lineaservicio = 'clientes.add_lineaservicio',
  clientes_add_servicioadicional = 'clientes.add_servicioadicional',
  cobranza_add_rubro = 'cobranza.add_rubro',
  cobranza_add_saldo = 'cobranza.add_saldo',
  cobranza_add_tarjeta = 'cobranza.add_tarjeta',
  cobranza_add_transaccion = 'cobranza.add_transaccion',
  comercial_add_consultaburo = 'comercial.add_consultaburo',
  comercial_add_notificacionusuario = 'comercial.add_notificacionusuario',
  comercial_add_notificacionventa = 'comercial.add_notificacionventa',
  comercial_add_preventa = 'comercial.add_preventa',
  comercial_add_promocion = 'comercial.add_promocion',
  comercial_add_solicituddesbloqueoventas = 'comercial.add_solicituddesbloqueoventas',
  comercial_add_solicitudservicio = 'comercial.add_solicitudservicio',
  comercial_add_trazabilidadventa = 'comercial.add_trazabilidadventa',
  contenttypes_add_contenttype = 'contenttypes.add_contenttype',
  homepage_add_frequent_question = 'homepage.add_frequent_question',
  homepage_add_publicity = 'homepage.add_publicity',
  homepage_add_service = 'homepage.add_service',
  homepage_add_social_network = 'homepage.add_social_network',
  homepage_add_testimonial = 'homepage.add_testimonial',
  homepage_add_video_tutorial = 'homepage.add_video_tutorial',
  infraestructura_add_grupoipv4 = 'infraestructura.add_grupoipv4',
  infraestructura_add_grupoipv6 = 'infraestructura.add_grupoipv6',
  infraestructura_add_nap = 'infraestructura.add_nap',
  infraestructura_add_nodo = 'infraestructura.add_nodo',
  infraestructura_add_olt = 'infraestructura.add_olt',
  infraestructura_add_radiobase = 'infraestructura.add_radiobase',
  infraestructura_add_router = 'infraestructura.add_router',
  infraestructura_add_ruta = 'infraestructura.add_ruta',
  inventario_add_bodega = 'inventario.add_bodega',
  inventario_add_catalogoproducto = 'inventario.add_catalogoproducto',
  inventario_add_categoriaproducto = 'inventario.add_categoriaproducto',
  inventario_add_egresomaterial = 'inventario.add_egresomaterial',
  inventario_add_ingresomaterial = 'inventario.add_ingresomaterial',
  inventario_add_movimientomaterial = 'inventario.add_movimientomaterial',
  inventario_add_producto = 'inventario.add_producto',
  inventario_add_solicitudcompra = 'inventario.add_solicitudcompra',
  inventario_add_solicitudmaterial = 'inventario.add_solicitudmaterial',
  inventario_add_transferenciamaterial = 'inventario.add_transferenciamaterial',
  inventario_add_ubicacion = 'inventario.add_ubicacion',
  inventario_add_ubicacionproducto = 'inventario.add_ubicacionproducto',
  mantenimientoope_add_flota = 'mantenimientoope.add_flota',
  mantenimientoope_add_planificador = 'mantenimientoope.add_planificador',
  mantenimientoope_add_tipoinstalacion = 'mantenimientoope.add_tipoinstalacion',
  multicpy_add_company = 'multicpy.add_company',
  multicpy_add_domain = 'multicpy.add_domain',
  multicpy_add_plan = 'multicpy.add_plan',
  multicpy_add_scheme = 'multicpy.add_scheme',
  nomina_add_cargo = 'nomina.add_cargo',
  nomina_add_empleado = 'nomina.add_empleado',
  operaciones_add_agendamiento = 'operaciones.add_agendamiento',
  security_add_module = 'security.add_module',
  security_add_module_type = 'security.add_module_type',
  servicios_add_planinternet = 'servicios.add_planinternet',
  servicios_add_servicio = 'servicios.add_servicio',
  sessions_add_session = 'sessions.add_session',
  user_add_user = 'user.add_user',
  users_add_customgroup = 'users.add_customgroup',
  users_add_profile = 'users.add_profile',
  users_add_user = 'users.add_usuario',

  // // // // CHANGE ---------------------------
  admin_change_logentry = 'admin.change_logentry',
  administration_change_area = 'administration.change_area',
  administration_change_canalventa = 'administration.change_canalventa',
  administration_change_centrocosto = 'administration.change_centrocosto',
  administration_change_ciudad = 'administration.change_ciudad',
  administration_change_codigootp = 'administration.change_codigootp',
  administration_change_configplantillacliente = 'administration.change_configplantillacliente',
  administration_change_departamento = 'administration.change_departamento',
  administration_change_entidadfinanciera = 'administration.change_entidadfinanciera',
  administration_change_empresa = 'administration.change_empresa',
  administration_change_iva = 'administration.change_iva',
  administration_change_metodopago = 'administration.change_metodopago',
  administration_change_pais = 'administration.change_pais',
  administration_change_parametrosistema = 'administration.change_parametrosistema',
  administration_change_provincia = 'administration.change_provincia',
  administration_change_sector = 'administration.change_sector',
  administration_change_tipocomprobante = 'administration.change_tipocomprobante',
  administration_change_zona = 'administration.change_zona',
  auth_change_group = 'auth.change_group',
  auth_change_permission = 'auth.change_permission',
  authtoken_change_token = 'authtoken.change_token',
  authtoken_change_tokenproxy = 'authtoken.change_tokenproxy',
  billing_change_category = 'billing.change_category',
  billing_change_contract = 'billing.change_contract',
  billing_change_customer = 'billing.change_customer',
  billing_change_invoice_admin = 'billing.change_invoice_admin',
  billing_change_product = 'billing.change_product',
  billing_change_receipt = 'billing.change_receipt',
  clientes_change_adendumcontrato = 'clientes.change_adendumcontrato',
  clientes_change_cliente = 'clientes.change_cliente',
  clientes_change_contrato = 'clientes.change_contrato',
  clientes_change_lineaservicio = 'clientes.change_lineaservicio',
  clientes_change_servicioadicional = 'clientes.change_servicioadicional',
  cobranza_change_rubro = 'cobranza.change_rubro',
  cobranza_change_saldo = 'cobranza.change_saldo',
  cobranza_change_tarjeta = 'cobranza.change_tarjeta',
  cobranza_change_transaccion = 'cobranza.change_transaccion',
  comercial_change_consultaburo = 'comercial.change_consultaburo',
  comercial_change_notificacionusuario = 'comercial.change_notificacionusuario',
  comercial_change_notificacionventa = 'comercial.change_notificacionventa',
  comercial_change_preventa = 'comercial.change_preventa',
  comercial_change_promocion = 'comercial.change_promocion',
  comercial_change_solicituddesbloqueoventas = 'comercial.change_solicituddesbloqueoventas',
  comercial_change_solicitudservicio = 'comercial.change_solicitudservicio',
  comercial_change_trazabilidadventa = 'comercial.change_trazabilidadventa',
  contenttypes_change_contenttype = 'contenttypes.change_contenttype',
  homepage_change_frequent_question = 'homepage.change_frequent_question',
  homepage_change_publicity = 'homepage.change_publicity',
  homepage_change_service = 'homepage.change_service',
  homepage_change_social_network = 'homepage.change_social_network',
  homepage_change_testimonial = 'homepage.change_testimonial',
  homepage_change_video_tutorial = 'homepage.change_video_tutorial',
  homepage_change_webpage = 'homepage.change_webpage',
  infraestructura_change_grupoipv4 = 'infraestructura.change_grupoipv4',
  infraestructura_change_grupoipv6 = 'infraestructura.change_grupoipv6',
  infraestructura_change_nap = 'infraestructura.change_nap',
  infraestructura_change_nodo = 'infraestructura.change_nodo',
  infraestructura_change_olt = 'infraestructura.change_olt',
  infraestructura_change_radiobase = 'infraestructura.change_radiobase',
  infraestructura_change_router = 'infraestructura.change_router',
  infraestructura_change_ruta = 'infraestructura.change_ruta',
  inventario_change_bodega = 'inventario.change_bodega',
  inventario_change_catalogoproducto = 'inventario.change_catalogoproducto',
  inventario_change_categoriaproducto = 'inventario.change_categoriaproducto',
  inventario_change_egresomaterial = 'inventario.change_egresomaterial',
  inventario_change_ingresomaterial = 'inventario.change_ingresomaterial',
  inventario_change_movimientomaterial = 'inventario.change_movimientomaterial',
  inventario_change_producto = 'inventario.change_producto',
  inventario_change_solicitudcompra = 'inventario.change_solicitudcompra',
  inventario_change_solicitudmaterial = 'inventario.change_solicitudmaterial',
  inventario_change_transferenciamaterial = 'inventario.change_transferenciamaterial',
  inventario_change_ubicacion = 'inventario.change_ubicacion',
  inventario_change_ubicacionproducto = 'inventario.change_ubicacionproducto',
  mantenimientoope_change_flota = 'mantenimientoope.change_flota',
  mantenimientoope_change_planificador = 'mantenimientoope.change_planificador',
  mantenimientoope_change_tipoinstalacion = 'mantenimientoope.change_tipoinstalacion',
  multicpy_change_company = 'multicpy.change_company',
  multicpy_change_domain = 'multicpy.change_domain',
  multicpy_change_plan = 'multicpy.change_plan',
  multicpy_change_scheme = 'multicpy.change_scheme',
  nomina_change_cargo = 'nomina.change_cargo',
  nomina_change_empleado = 'nomina.change_empleado',
  operaciones_change_agendamiento = 'operaciones.change_agendamiento',
  security_change_module = 'security.change_module',
  security_change_module_type = 'security.change_module_type',
  servicios_change_planinternet = 'servicios.change_planinternet',
  servicios_change_servicio = 'servicios.change_servicio',
  sessions_change_session = 'sessions.change_session',
  user_change_user = 'user.change_user',
  users_change_customgroup = 'users.change_customgroup',
  users_change_profile = 'users.change_profile',
  users_change_user = 'users.change_usuario',

  // // // // DELETE ---------------------------
  admin_delete_logentry = 'admin.delete_logentry',
  administration_delete_area = 'administration.delete_area',
  administration_delete_canalventa = 'administration.delete_canalventa',
  administration_delete_centrocosto = 'administration.delete_centrocosto',
  administration_delete_ciudad = 'administration.delete_ciudad',
  administration_delete_codigootp = 'administration.delete_codigootp',
  administration_delete_configplantillacliente = 'administration.delete_configplantillacliente',
  administration_delete_departamento = 'administration.delete_departamento',
  administration_delete_entidadfinanciera = 'administration.delete_entidadfinanciera',
  administration_delete_empresa = 'administration.delete_empresa',
  administration_delete_iva = 'administration.delete_iva',
  administration_delete_metodopago = 'administration.delete_metodopago',
  administration_delete_pais = 'administration.delete_pais',
  administration_delete_parametrosistema = 'administration.delete_parametrosistema',
  administration_delete_provincia = 'administration.delete_provincia',
  administration_delete_sector = 'administration.delete_sector',
  administration_delete_tipocomprobante = 'administration.delete_tipocomprobante',
  administration_delete_zona = 'administration.delete_zona',
  auth_delete_group = 'auth.delete_group',
  auth_delete_permission = 'auth.delete_permission',
  authtoken_delete_token = 'authtoken.delete_token',
  authtoken_delete_tokenproxy = 'authtoken.delete_tokenproxy',
  billing_delete_category = 'billing.delete_category',
  billing_delete_contract = 'billing.delete_contract',
  billing_delete_credit_note_admin = 'billing.delete_credit_note_admin',
  billing_delete_customer = 'billing.delete_customer',
  billing_delete_invoice_admin = 'billing.delete_invoice_admin',
  billing_delete_invoice_payment = 'billing.delete_invoice_payment',
  billing_delete_product = 'billing.delete_product',
  billing_delete_receipt = 'billing.delete_receipt',
  billing_delete_receipt_errors = 'billing.delete_receipt_errors',
  clientes_delete_adendumcontrato = 'clientes.delete_adendumcontrato',
  clientes_delete_cliente = 'clientes.delete_cliente',
  clientes_delete_contrato = 'clientes.delete_contrato',
  clientes_delete_lineaservicio = 'clientes.delete_lineaservicio',
  clientes_delete_servicioadicional = 'clientes.delete_servicioadicional',
  cobranza_delete_rubro = 'cobranza.delete_rubro',
  cobranza_delete_saldo = 'cobranza.delete_saldo',
  cobranza_delete_tarjeta = 'cobranza.delete_tarjeta',
  cobranza_delete_transaccion = 'cobranza.delete_transaccion',
  comercial_delete_consultaburo = 'comercial.delete_consultaburo',
  comercial_delete_notificacionusuario = 'comercial.delete_notificacionusuario',
  comercial_delete_notificacionventa = 'comercial.delete_notificacionventa',
  comercial_delete_preventa = 'comercial.delete_preventa',
  comercial_delete_promocion = 'comercial.delete_promocion',
  comercial_delete_solicituddesbloqueoventas = 'comercial.delete_solicituddesbloqueoventas',
  comercial_delete_solicitudservicio = 'comercial.delete_solicitudservicio',
  comercial_delete_trazabilidadventa = 'comercial.delete_trazabilidadventa',
  contenttypes_delete_contenttype = 'contenttypes.delete_contenttype',
  homepage_delete_comment = 'homepage.delete_comment',
  homepage_delete_frequent_question = 'homepage.delete_frequent_question',
  homepage_delete_publicity = 'homepage.delete_publicity',
  homepage_delete_service = 'homepage.delete_service',
  homepage_delete_social_network = 'homepage.delete_social_network',
  homepage_delete_testimonial = 'homepage.delete_testimonial',
  homepage_delete_video_tutorial = 'homepage.delete_video_tutorial',
  infraestructura_delete_grupoipv4 = 'infraestructura.delete_grupoipv4',
  infraestructura_delete_grupoipv6 = 'infraestructura.delete_grupoipv6',
  infraestructura_delete_nap = 'infraestructura.delete_nap',
  infraestructura_delete_nodo = 'infraestructura.delete_nodo',
  infraestructura_delete_olt = 'infraestructura.delete_olt',
  infraestructura_delete_radiobase = 'infraestructura.delete_radiobase',
  infraestructura_delete_router = 'infraestructura.delete_router',
  infraestructura_delete_ruta = 'infraestructura.delete_ruta',
  inventario_delete_bodega = 'inventario.delete_bodega',
  inventario_delete_catalogoproducto = 'inventario.delete_catalogoproducto',
  inventario_delete_categoriaproducto = 'inventario.delete_categoriaproducto',
  inventario_delete_egresomaterial = 'inventario.delete_egresomaterial',
  inventario_delete_ingresomaterial = 'inventario.delete_ingresomaterial',
  inventario_delete_movimientomaterial = 'inventario.delete_movimientomaterial',
  inventario_delete_producto = 'inventario.delete_producto',
  inventario_delete_solicitudcompra = 'inventario.delete_solicitudcompra',
  inventario_delete_solicitudmaterial = 'inventario.delete_solicitudmaterial',
  inventario_delete_transferenciamaterial = 'inventario.delete_transferenciamaterial',
  inventario_delete_ubicacion = 'inventario.delete_ubicacion',
  inventario_delete_ubicacionproducto = 'inventario.delete_ubicacionproducto',
  mantenimientoope_delete_flota = 'mantenimientoope.delete_flota',
  mantenimientoope_delete_planificador = 'mantenimientoope.delete_planificador',
  mantenimientoope_delete_tipoinstalacion = 'mantenimientoope.delete_tipoinstalacion',
  multicpy_delete_company = 'multicpy.delete_company',
  multicpy_delete_domain = 'multicpy.delete_domain',
  multicpy_delete_plan = 'multicpy.delete_plan',
  multicpy_delete_scheme = 'multicpy.delete_scheme',
  nomina_delete_cargo = 'nomina.delete_cargo',
  nomina_delete_empleado = 'nomina.delete_empleado',
  operaciones_delete_agendamiento = 'operaciones.delete_agendamiento',
  security_delete_module = 'security.delete_module',
  security_delete_module_type = 'security.delete_module_type',
  security_delete_user_access = 'security.delete_user_access',
  servicios_delete_planinternet = 'servicios.delete_planinternet',
  servicios_delete_servicio = 'servicios.delete_servicio',
  sessions_delete_session = 'sessions.delete_session',
  user_delete_user = 'user.delete_user',
  users_delete_customgroup = 'users.delete_customgroup',
  users_delete_profile = 'users.delete_profile',
  users_delete_user = 'users.delete_usuario',

  // // // // PRINT ---------------------------
  billing_print_credit_note = 'billing.print_credit_note',
  billing_print_invoice = 'billing.print_invoice',
  billing_print_invoice_payment = 'billing.print_invoice_payment',
}
