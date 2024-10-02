export interface ClienteMikro {
  estado: string; // exito
  datos: ClienteData[];
}

export interface ClienteData {
  id: number;
  nombre: string;
  estado: string;
  correo: string;
  telefono: string;
  movil: string;
  cedula: string;
  pasarela: string;
  codigo: string;
  direccion_principal: string;
  INSTALADOR: string;
  REFERENCIA: string;
  ROUTER_MAC: string;
  ROUTER_MODELO: string;
  DATOS_GPON: string;
  codigo_pago: string;
  NUM_CONTRATO: string;
  AGENTE_VENDEDOR: string;
  FORMA_DE_PAGO: string;
  mantenimiento: boolean;
  fecha_suspendido: string;

  servicios: Servicio[];
  facturacion: Facturacion;
}

export interface Servicio {
  id: number;
  idperfil: number;
  nodo: number;
  costo: string;
  ipap: string;
  mac: string;
  ip: string;
  instalado: Date;
  pppuser: string;
  ppppass: string;
  emisor: string;
  tiposervicio: string;
  status_user: string;
  coordenadas: string;
  direccion: string;
  snmp_comunidad: string;
  firewall_state: string;
  smartolt: string;
  limitado: number;
  ppp_routes: string;
  ppp_localaddress: string;
  idnap: number;
  portnap: number;
  onu_sn: string;
  onu_ssid_wifi: string;
  onu_password_wifi: string;
  personalizados: string;
  smartolt_catv: number;
  ipv6: string;
  ipv6_duid: string;
  last_connected: string;
  perfil: string;
}

export interface Facturacion {
  facturas_nopagadas: number;
  total_facturas: string;
}
