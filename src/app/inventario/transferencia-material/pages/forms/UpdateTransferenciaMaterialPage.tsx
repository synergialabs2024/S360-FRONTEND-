import { Navigate, useLocation, useParams } from 'react-router';

import { PermissionsEnum } from '@/shared';
import { useAuthStore } from '@/store/auth';
import {
  useFetchProductos,
  useGetSolicitudMaterial_Transferencia,
  useGetsolicitudDevolucion_Transferencia,
  useGetSolicitudTransferenciaMaterial_Transferencia,
} from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { SaveTransferenciaMaterial } from '../../shared/components';
import { returnUrlTransferenciaMaterialesPage } from '../tables/TransferenciaMaterialPage';

export type UpdateTransferenciaMaterialPageProps = {};

const UpdateTransferenciaMaterialPage: React.FC<
  UpdateTransferenciaMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_change_transferenciamaterial);
  const user = useAuthStore(s => s.user);

  const { uuid } = useParams();
  const location = useLocation();
  const fromSolicitud = location.state?.solicitud;

  const isSolicitudMaterial = fromSolicitud === 'solicitud_material';
  const isSolicitudDevolucion = fromSolicitud === 'solicitud_devolucion';
  const isSolicitudTransferencia = fromSolicitud === 'solicitud_transferencia';

  const { data: dataMaterial } = useGetSolicitudMaterial_Transferencia(uuid!, {
    enabled: isSolicitudMaterial,
  });
  const { data: dataDevolucion } = useGetsolicitudDevolucion_Transferencia(
    uuid!,
    {
      enabled: isSolicitudDevolucion,
    },
  );
  const { data: dataTransferencia } =
    useGetSolicitudTransferenciaMaterial_Transferencia(uuid!, {
      enabled: isSolicitudTransferencia,
    });

  const { data: equiposDisponiblesPaging } = useFetchProductos({
    params: {
      page_size: 999999,
    },
  });

  const data =
    dataMaterial?.data || dataDevolucion?.data || dataTransferencia?.data;

  let dato: any = null;

  const resultado = data?.productos.map(d => {
    const productoEncontrado = equiposDisponiblesPaging?.data?.items.find(
      i => i.id === d.producto,
    );
    return {
      ...d,
      ...productoEncontrado,
    };
  });

  if (isSolicitudMaterial) {
    dato = {
      observacion: data?.observacion,
      productos: resultado,
      bodega_destino: data?.bodega,
      ubicacion_destino: data?.ubicacion,
      ubicacion_origen_data: { uuid: '' },
      state: true,
      user_create: user?.id,
    };
  } else if (isSolicitudDevolucion) {
    dato = {
      observacion: data?.observacion,
      productos: resultado,
      bodega_origen: data?.bodega,
      ubicacion_origen: data?.ubicacion,
      ubicacion_origen_data: data?.ubicacion_data,
      state: true,
      user_create: user?.id,
    };
  } else if (isSolicitudTransferencia) {
    dato = {
      observacion: data?.observacion,
      productos: resultado,
      bodega_destino: data?.bodega_destino,
      ubicacion_destino: data?.ubicacion_destino,
      bodega_origen: data?.bodega_origen,
      ubicacion_origen: data?.ubicacion_origen,
      ubicacion_origen_data: data?.ubicacion_origen_data,
      state: true,
      user_create: user?.id,
    };
  }

  if (!data?.id) {
    return <Navigate to={returnUrlTransferenciaMaterialesPage} />;
  }

  return (
    <SaveTransferenciaMaterial
      title="Editar Transferencia Material"
      transferenciaMaterial={dato}
    />
  );
};

export default UpdateTransferenciaMaterialPage;
