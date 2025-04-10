import { SaveIngresoMateriales } from '../../shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared';
import { useLocation } from 'react-router';

export type CreateIngresoMaterialPageProps = {};

const CreateIngresoMaterialPage: React.FC<
  CreateIngresoMaterialPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_add_ingresomaterial);
  const location = useLocation();
  const fromSolicitud = location.state?.solicitud;

  return (
    <SaveIngresoMateriales
      title="Crear Ingreso Material"
      solicitud={fromSolicitud}
    />
  );
};

export default CreateIngresoMaterialPage;
