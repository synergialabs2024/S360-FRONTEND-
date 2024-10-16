//VALIDAR SLUG
export const regexSLUG = /^[a-zA-Z0-9_-]+$/;

//VALIDAR FECHA
export const regexFECHA = /^\d{4}-\d{2}-\d{2}$/;

//VALIDAR HORA
export const regexHORA = /^\d{2}:\d{2}:\d{2}$/;

//VALIDAR BOOLEANO
export const regexBOOLEANO = /^(VERDADERO|FALSO)$/;

// Validar JSON
export const isValidJSON = (value: string | undefined) => {
  if (!value) return false;
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};
// Validar ARRAY
export const isValidArray = (value: any) => {
  if (!value) return false;
  try {
    const parsedValue = JSON.parse(value);
    return Array.isArray(parsedValue);
  } catch (error) {
    return false;
  }
};

// Validar MODELO
export const regexMODELO =
  /^[\w-]+:[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
