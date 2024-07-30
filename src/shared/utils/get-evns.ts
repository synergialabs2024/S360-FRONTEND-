export const getEnvs = () => ({
  VITE_MODE: import.meta.env.VITE_MODE, // testing

  VITE_ERPAPI_URL: import.meta.env.VITE_ERPAPI_URL,

  VITE_STORAGEAPI_URL: import.meta.env.VITE_STORAGEAPI_URL,

  VITE_CONSULTAAPI_URL: import.meta.env.VITE_CONSULTAAPI_URL,
});
