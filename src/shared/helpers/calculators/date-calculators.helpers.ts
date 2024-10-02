import dayjs from 'dayjs';

export const calcAge = (birthDate: string) => {
  const today = dayjs();
  const formattedBirthDate = dayjs(birthDate);

  const age = today.diff(formattedBirthDate, 'year');
  return age;
};

export const calcIsTerceraEdad = (birthDate: string) => {
  const age = calcAge(birthDate);

  return age >= 65;
};
