import dayjs from 'dayjs';
import * as yup from 'yup';

export const activacionInstallOTSchema = yup.object({
  hora_inicio: yup
    .string()
    .required('La hora de inicio de instalación es requerida'),
  hora_fin: yup
    .string()
    .required('La hora de fin de instalación es requerida')
    .test(
      'is-greater',
      'La hora de fin debe ser posterior a la hora de inicio',
      function (value) {
        const horaInicio = dayjs(this.parent.hora_inicio, 'HH:mm');
        const horaFin = dayjs(value, 'HH:mm');

        return horaFin.isAfter(horaInicio);
      },
    ),
});
