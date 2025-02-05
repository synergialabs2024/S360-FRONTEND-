import { TabTexLabelCustomSpace } from '@/shared/components';
import CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios from './CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios';

export type CuotaServiciosBeneficioMantenedorBeneficiosProps = {};

const CuotaServiciosBeneficioMantenedorBeneficios: React.FC<
  CuotaServiciosBeneficioMantenedorBeneficiosProps
> = () => {
  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Servicio de internet"
        showCustomRightSpace={true}
      />
      <>{<CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios />}</>
    </>
  );
};

export default CuotaServiciosBeneficioMantenedorBeneficios;
