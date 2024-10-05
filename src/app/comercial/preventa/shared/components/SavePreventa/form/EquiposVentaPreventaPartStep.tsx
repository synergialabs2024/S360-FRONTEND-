import { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

import { SolicitudServicio } from '@/shared';
import { SingleIconButton, TabTexLabelCustomSpace } from '@/shared/components';

export type EquiposVentaPreventaPartStepProps = {
  solicitudServicio: SolicitudServicio;
};

const EquiposVentaPreventaPartStep: React.FC<
  EquiposVentaPreventaPartStepProps
> = () => {
  ///* local state ---------------------
  const [showEquiposPart, setShowEquiposPart] = useState<boolean>(false);

  ///* fetch data ---------------------

  ///* handlers ---------------------
  const onTrash = () => {
    console.log('onTrash');
  };

  return (
    <>
      <TabTexLabelCustomSpace
        textContent="Equipos de venta"
        showCustomRightSpace={true}
        customRightSpace={
          <SingleIconButton
            newCustomButton
            color={!showEquiposPart ? 'primary' : 'error'}
            startIcon={showEquiposPart ? <IoMdTrash /> : <MdAddCircle />}
            label={showEquiposPart ? 'CANCELAR' : 'AGREGAR'}
            onClick={() => {
              setShowEquiposPart(prev => !prev);
              if (!showEquiposPart) {
                onTrash();
              }
            }}
          />
        }
      />
      <>
        {showEquiposPart && (
          <>
            <p>Equipos de venta</p>
          </>
        )}
      </>
    </>
  );
};

export default EquiposVentaPreventaPartStep;
