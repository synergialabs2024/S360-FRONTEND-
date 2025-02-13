import { TabTexLabelCustomSpace } from '@/shared/components';
import ActivacionesSeleccionadosMantenedorActivacionesBase from './ActivacionesSeleccionadosMantenedorActivacionesBase';

export type ActivacionesMantenedorActivacionesBaseProps = {};

const ActivacionesMantenedorActivacionesBase: React.FC<
  ActivacionesMantenedorActivacionesBaseProps
> = () => {
  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Activaciones base"
        showCustomRightSpace={true}
      />
      <>{<ActivacionesSeleccionadosMantenedorActivacionesBase />}</>
    </>
  );
};

export default ActivacionesMantenedorActivacionesBase;
