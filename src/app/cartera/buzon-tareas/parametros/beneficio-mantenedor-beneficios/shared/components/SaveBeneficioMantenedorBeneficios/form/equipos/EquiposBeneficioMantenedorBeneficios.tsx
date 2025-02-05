import { TabTexLabelCustomSpace } from '@/shared/components';
import EquiposSeleccionadosBeneficioMantenedorBeneficios from './EquiposSeleccionadosBeneficioMantenedorBeneficios';

export type EquiposBeneficioMantenedorBeneficiosProps = {};

const EquiposBeneficioMantenedorBeneficios: React.FC<
  EquiposBeneficioMantenedorBeneficiosProps
> = () => {
  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Adicionales"
        showCustomRightSpace={true}
      />
      <>{<EquiposSeleccionadosBeneficioMantenedorBeneficios />}</>
    </>
  );
};

export default EquiposBeneficioMantenedorBeneficios;
