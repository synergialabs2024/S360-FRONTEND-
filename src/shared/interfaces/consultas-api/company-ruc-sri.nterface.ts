export interface CompanyRUCSRI {
  id_company?: string;

  ruc: string;
  razon_social: string;
  estadoContribuyenteRuc: string;
  actividadEconomicaPrincipal: string;
  tipoContribuyente: string;
  regimen: string;
  categoria: string;
  obligadoLlevarContabilidad: string;
  agenteRetencion: string;
  contribuyenteEspecial: string;
  informacionFechasContribuyente: string;
  establecimientos: string;
  representantesLegales: string;
  motivoCancelacionSuspension: string;
  contribuyenteFantasma: string;
  transaccionesInexistente: string;
  email: string;
  telefono: string;
  estado: boolean;

  state: boolean;
  codigo: string;

  created_at?: string;
  edited_at?: string;
}
