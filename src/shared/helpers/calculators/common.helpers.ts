/* eslint-disable no-useless-escape */

export const calcIsValidEmail = (email: string): boolean => {
  if (!email) return false;

  return /^(([^<>()s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
};
