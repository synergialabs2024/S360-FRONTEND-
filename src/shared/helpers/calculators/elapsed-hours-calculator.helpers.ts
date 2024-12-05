import dayjs from 'dayjs';

export const hasExceededHours = (
  fechaAceptacion: string,
  fechaLimiteAceptacion: string,
): boolean => {
  const fechaActual = dayjs();
  const inicioRango = dayjs(fechaAceptacion);
  const finRango = dayjs(fechaLimiteAceptacion);

  return fechaActual.isAfter(inicioRango) && fechaActual.isBefore(finRango);
};
