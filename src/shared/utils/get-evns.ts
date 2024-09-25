export const getEnvs = () => ({
  VITE_MODE: import.meta.env.VITE_MODE, // testing

  VITE_ERPAPI_URL: import.meta.env.VITE_ERPAPI_URL,
  VITE_STORAGEAPI_URL: import.meta.env.VITE_STORAGEAPI_URL,
  VITE_CONSULTAS_URL: import.meta.env.VITE_CONSULTAS_URL,

  VITE_SOCKETIO_URL: import.meta.env.VITE_SOCKETIO_URL,
  SOCKET_PATH: import.meta.env.SOCKET_PATH,

  VITE_MINIO_ENDPOINT: import.meta.env.VITE_MINIO_ENDPOINT,
  VITE_MINIO_BUCKET_NAME: import.meta.env.VITE_MINIO_BUCKET_NAME,
});
