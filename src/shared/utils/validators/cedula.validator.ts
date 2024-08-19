/**
 * Algoritmo para validar cédulas de Ecuador.
 * @Author : Victor Diaz De La Gasca.
 * @Fecha  : Quito, 15 de Marzo del 2013
 * @Email  : vicmandlagasca@gmail.com
 * @Pasos  del algoritmo:
 * 1.- Validar que tenga 10 números.
 * 2.- Extraer los dos primeros dígitos y verificar que pertenecen a una región válida.
 * 3.- Extraer el último dígito de la cédula.
 * 4.- Sumar los pares.
 * 5.- Multiplicar los impares por 2, restando 9 si el resultado es mayor a 9.
 * 6.- Sumar pares e impares.
 * 7.- Obtener la decena inmediata superior y restar la suma total.
 * 8.- Comparar el dígito resultante con el último dígito de la cédula.
 */

export const validarCedulaEcuador = (cedula: string): boolean => {
  if (cedula.length !== 10) {
    console.log('Esta cédula tiene menos o más de 10 dígitos');
    return false;
  }

  const digitoRegion = parseInt(cedula.substring(0, 2), 10);

  if (digitoRegion < 1 || digitoRegion > 24) {
    console.log('Esta cédula no pertenece a ninguna región');
    return false;
  }

  const ultimoDigito = parseInt(cedula.substring(9, 10), 10);

  const pares =
    parseInt(cedula.substring(1, 2)) +
    parseInt(cedula.substring(3, 4)) +
    parseInt(cedula.substring(5, 6)) +
    parseInt(cedula.substring(7, 8));

  const calcularImpar = (numero: number) => {
    const resultado = numero * 2;
    return resultado > 9 ? resultado - 9 : resultado;
  };

  const impares =
    calcularImpar(parseInt(cedula.substring(0, 1))) +
    calcularImpar(parseInt(cedula.substring(2, 3))) +
    calcularImpar(parseInt(cedula.substring(4, 5))) +
    calcularImpar(parseInt(cedula.substring(6, 7))) +
    calcularImpar(parseInt(cedula.substring(8, 9)));

  const sumaTotal = pares + impares;
  const decenaInmediata = Math.ceil(sumaTotal / 10) * 10;
  let digitoValidador = decenaInmediata - sumaTotal;

  if (digitoValidador === 10) digitoValidador = 0;

  if (digitoValidador === ultimoDigito) {
    return true;
  } else {
    return false;
  }
};
