export interface SearchIdentificacion {
  tipo_identificacion: string;
  identificacion: string;

  //response
  ci: string;
  nombres: string;
  contactos?: Contactos[];
  email: string;
  telefono?: string;
  movil: string;
  direccion: string;
}

interface Contactos {
  contacto: string;
  estado: string;
  tipo: string;
}
