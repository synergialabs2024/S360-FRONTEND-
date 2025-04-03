import { TabTexLabelCustomSpace } from '@/shared/components';
import CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios from './CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios';

export type CuotaServiciosBeneficioMantenedorBeneficiosProps = {
  planesInternet: any[];
};

const CuotaServiciosBeneficioMantenedorBeneficios: React.FC<
  CuotaServiciosBeneficioMantenedorBeneficiosProps
> = ({ planesInternet }) => {
  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Servicio de internet"
        showCustomRightSpace={true}
      />
      <>
        {
          <CuotaServiciosSeleccionadosBeneficioMantenedorBeneficios
            planesInternet={planesInternet}
          />
        }
      </>
    </>
  );
};

export default CuotaServiciosBeneficioMantenedorBeneficios;
