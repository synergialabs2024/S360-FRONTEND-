export interface CedulaCitizen {
  id?: string;

  identificacion: string;
  tipoIdentificacion: string;
  fullName: string;
  nacionalidad: string;
  condicionCedulado: string;
  esDiscapacitado: boolean;
  fechaNacimiento: string;
  esTerceraEdad: boolean;
  edad: number;
  nombreMadre: string;
  nombrePadre: string;
  numeroCasa: string;
  profesion: string;
  sexo: string;
  calle: string;
  lugarNacimiento: string;
  codigoError: string;
  conyuge: string;
  domicilio: string;
  error: string;
  estadoCivil: string;
  genero: string;
  instruccion: string;
  lugarInscripcionGenero: string;
  nUI: string;
  fechaCedulacion: string;
  fechaInscripcionDefuncion: string;
  fechaInscripcionGenero: string;
  fechaLimitRefetch: Date;
}
