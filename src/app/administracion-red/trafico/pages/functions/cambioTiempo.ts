export type CambioTiempoProps = {
  tiempoTotal?: string;
};

export function cambioTiempo({ tiempoTotal }: CambioTiempoProps) {
  if (!tiempoTotal) {
    return '00:00:00';
  }

  let totalSegundos = parseInt(tiempoTotal, 10);
  if (isNaN(totalSegundos)) {
    return '00:00:00';
  }

  let horas = Math.floor(totalSegundos / 3600);
  totalSegundos %= 3600;
  let minutos = Math.floor(totalSegundos / 60);
  let segundos = totalSegundos % 60;

  horas = Math.abs(horas);
  minutos = Math.abs(minutos);
  segundos = Math.abs(segundos);

  const horasFormateadas = horas < 10 ? '0' + horas : horas.toString();
  const minutosFormateados = minutos < 10 ? '0' + minutos : minutos.toString();
  const segundosFormateados =
    segundos < 10 ? '0' + segundos : segundos.toString();

  // Retornar el tiempo en formato HH:MM:SS
  return `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
}
