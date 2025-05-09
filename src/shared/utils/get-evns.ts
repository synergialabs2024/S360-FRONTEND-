export const getEnvs = () => ({
  VITE_MODE: import.meta.env.VITE_MODE, // testing

  VITE_ERPAPI_URL: import.meta.env.VITE_ERPAPI_URL,
  VITE_STORAGEAPI_URL: import.meta.env.VITE_STORAGEAPI_URL,
  VITE_CONSULTAS_URL: import.meta.env.VITE_CONSULTAS_URL,

  VITE_SOCKETIO_URL: import.meta.env.VITE_SOCKETIO_URL,
  VITE_SOCKET_PATH: import.meta.env.VITE_SOCKET_PATH,

  VITE_MINIO_ENDPOINT: import.meta.env.VITE_MINIO_ENDPOINT,
  VITE_MINIO_BUCKET_NAME: import.meta.env.VITE_MINIO_BUCKET_NAME,

  VITE_YIGA5_RADIUS_USER: import.meta.env.VITE_YIGA5_RADIUS_USER,
  VITE_YIGA5_RADIUS_PASS: import.meta.env.VITE_YIGA5_RADIUS_PASS,
  VITE_YIGA5_URL_RADIUS: import.meta.env.VITE_YIGA5_URL_RADIUS,

  CLIENT_ID: import.meta.env.CLIENT_ID,
  CLIENT_SECRET: import.meta.env.CLIENT_SECRET,
  GRANT_TYPE: import.meta.env.GRANT_TYPE,
});
