import { TabTexLabelCustomSpace } from '@/shared/components';
import ActivacionesSeleccionadosMantenedorActivacionesBase from './ActivacionesSeleccionadosMantenedorActivacionesBase';

export type ActivacionesMantenedorActivacionesBaseProps = {
  motivoMantenedorActivacion: number;
};

const ActivacionesMantenedorActivacionesBase: React.FC<
  ActivacionesMantenedorActivacionesBaseProps
> = ({ motivoMantenedorActivacion }) => {
  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Activaciones base"
        showCustomRightSpace={true}
      />
      <>
        {
          <ActivacionesSeleccionadosMantenedorActivacionesBase
            motivoMantenedorActivacion={motivoMantenedorActivacion}
          />
        }
      </>
    </>
  );
};

export default ActivacionesMantenedorActivacionesBase;
