import { TabTexLabelCustomSpace } from '@/shared/components';
import EquiposSeleccionadosBeneficioMantenedorBeneficios from './EquiposSeleccionadosBeneficioMantenedorBeneficios';

export type EquiposBeneficioMantenedorBeneficiosProps = {
  productos: any[];
};

const EquiposBeneficioMantenedorBeneficios: React.FC<
  EquiposBeneficioMantenedorBeneficiosProps
> = ({ productos }) => {
  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Adicionales"
        showCustomRightSpace={true}
      />
      <>
        {
          <EquiposSeleccionadosBeneficioMantenedorBeneficios
            productos={productos}
          />
        }
      </>
    </>
  );
};

export default EquiposBeneficioMantenedorBeneficios;
