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
  registro_res?: RegistroRes;
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

export interface RegistroRes {
  calle: string;
  codigoError: string;
  condicionCedulado: string;
  conyuge: string;
  domicilio: string;
  edad: number;
  error: string;
  esDiscapacitado: boolean;
  esTerceraEdad: boolean;
  estadoCivil: string;
  fechaCedulacion: string;
  fechaInscripcionDefuncion: string;
  fechaInscripcionGenero: string;
  fechaLimitRefetch: string;
  fechaNacimiento: string;
  fullName: string;
  genero: string;
  id?: string;
  identificacion: string;
  instruccion: string;
  lugarInscripcionGenero: string;
  lugarNacimiento: string;
  nUI: string;
  nacionalidad: string;
  nombreMadre: string;
  nombrePadre: string;
  numeroCasa: string;
  profesion: string;
  sexo: string;
  tipoIdentificacion: string;
}
