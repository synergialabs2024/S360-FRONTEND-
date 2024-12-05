import { PersonaInformacion } from '@/shared/interfaces/consultas-api';
import { calcIsValidEmail } from './common.helpers';

export const getCelulcarPersoanInfo = (data: PersonaInformacion) => {
  let cel =
    data?.movil ||
    (data?.telefono && data?.telefono.startsWith('09')
      ? data?.telefono
      : undefined);

  if (!cel) {
    const contactos = data?.contactos || [];
    const celulares = contactos.filter(c =>
      c.tipo.toLowerCase().includes('celular'),
    );
    cel = celulares[celulares.length - 1]?.contacto;
  }

  return cel;
};

export const getEmailPersonaInfo = (data: PersonaInformacion) => {
  let email = data?.email;

  if (!email) {
    const contactos = data?.contactos || [];
    const emails = contactos.filter(c =>
      c.tipo.toLowerCase().includes('email'),
    );
    email = emails[emails.length - 1]?.contacto;
  }

  const isValidEmail = calcIsValidEmail(email);

  return isValidEmail ? email : undefined;
};

export const getAddressesPersonaInfo = (data: PersonaInformacion) => {
  const addressesInit = data?.direccion;
  const addressesInitLength = addressesInit?.length || 0;
  let addresses = '';
  const contactos = data?.contactos || [];

  const addressesContact = contactos.filter(c =>
    c.tipo.toLowerCase().includes('direccion'),
  );
  const addressesContactLength = addressesContact.length;
  const addressesContactLast = addressesContact[addressesContactLength - 1];
  const addressesContactLastLength =
    addressesContactLast?.contacto?.length || 0;

  if (addressesContactLastLength > addressesInitLength) {
    addresses = addressesContactLast?.contacto;
  } else {
    addresses = addressesInit;
  }

  return addresses;
};
