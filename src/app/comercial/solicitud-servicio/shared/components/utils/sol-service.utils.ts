import { Nullable } from '@/shared';
import { ClienteExist } from '@/shared/interfaces/app/comercial/solicitud-servicio/client-mikrowisp.interface';

export const formatDataClienteMikro = (
  clienteExist: Nullable<ClienteExist>,
) => {
  const globalServices = clienteExist?.services || [];
  const globalServiceStatesArray = globalServices.map(
    service => service.estado,
  );
  const lastServiciosServices = globalServices?.at(-1)?.servicios || [];

  // asignar estado a los servicios
  if (globalServices.length > 0 && lastServiciosServices.length > 0) {
    lastServiciosServices.forEach((servicio, index) => {
      const estadoCorrespondiente = globalServiceStatesArray[index];
      if (estadoCorrespondiente) {
        servicio.estado = estadoCorrespondiente;
      }
    });
  }

  return clienteExist;
};
