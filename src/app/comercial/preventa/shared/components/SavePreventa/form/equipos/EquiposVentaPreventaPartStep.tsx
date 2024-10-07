import { useState } from 'react';
import { MdAddCircle, MdCancel } from 'react-icons/md';

import { ToastWrapper, type SolicitudServicio } from '@/shared';
import { SingleIconButton, TabTexLabelCustomSpace } from '@/shared/components';
import {
  GenericInventoryStoreKey,
  usePreventaStore,
  useTypedGenericInventoryStore,
} from '@/store/app';
import EquiposSeleccionadosPreventa from './EquiposSeleccionadosPreventa';

export type EquiposVentaPreventaPartStepProps = {
  solicitudServicio: SolicitudServicio;
};

const EquiposVentaPreventaPartStep: React.FC<
  EquiposVentaPreventaPartStepProps
> = () => {
  ///* local state ---------------------
  const [showEquiposPart, setShowEquiposPart] = useState<boolean>(false);

  ///* global state ---------------------
  const serviceScore = usePreventaStore(s => s.scoreServicio);
  const { clearOneRecord } = useTypedGenericInventoryStore(
    GenericInventoryStoreKey.equiposVentaPreventa,
  );

  ///* fetch data ---------------------

  ///* handlers ---------------------
  const onTrash = () => {
    clearOneRecord();
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
            startIcon={showEquiposPart ? <MdCancel /> : <MdAddCircle />}
            label={showEquiposPart ? 'CANCELAR' : 'AGREGAR'}
            onClick={() => {
              if (!serviceScore)
                return ToastWrapper.warning(
                  'Antes debes realizar la consulta al servicio del buró de crédito',
                );

              setShowEquiposPart(prev => !prev);
              if (showEquiposPart) {
                onTrash();
              }
            }}
          />
        }
      />
      <>{showEquiposPart && <EquiposSeleccionadosPreventa />}</>
    </>
  );
};

export default EquiposVentaPreventaPartStep;
