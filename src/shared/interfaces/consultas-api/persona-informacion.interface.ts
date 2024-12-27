import { CedulaCitizen } from './cedula-citizen.interface';

export interface PersonaInformacion {
  id: string;
  nombres: string;
  defuncion: null;
  ci: string;
  email: string;
  ciudad: string;
  provincia: string;
  nacimiento: Date;
  estadocivil: string;
  idCliente: string;
  sexo: string;
  direccion: string;
  telefono: string;
  movil: null;
  info_adicional?: null;
  Informacion?: null;
  laboral?: Laboral[];
  Buro?: Buro[];
  Family?: Family[];
  Credit?: null;
  contactos?: Contacto[];
  es_tercera_edad: boolean;
  edad: number;
  registro_res?: CedulaCitizen;
  registro_civil_down?: boolean;
}

export interface Buro {
  fecha: Date;
  riesgo: string;
  calificacion: string;
  saldo_vigente: string;
  mora: string;
  saldo_mora: string;
  nom_banco: string;
}

export interface Family {
  nombres: string;
  ci: string;
  relacion: string;
  id_call_tipo_relacion: string;
  sexo: string;
  fecha: null;
  nacimiento: Date;
  id: string;
  defuncion: null;
}

export interface Contacto {
  contacto: string;
  tipo: string;
  estado: string;
}

export interface Laboral {
  ingreso: Date;
  salario: string;
  empresa: string;
  ocupacion: string;
  salida: string;
}
