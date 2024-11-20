import { gridSize, OrdenTrabajo } from '@/shared';
import {
  CustomTextAreaNoForm,
  CustomTextFieldNoForm,
  CustomTypoLabel,
} from '@/shared/components';

export type DatosUbicacionTabPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const DatosUbicacionTabPart: React.FC<DatosUbicacionTabPartProps> = ({
  ordenTrabajo,
}) => {
  const coors = ordenTrabajo?.solicitud_servicio_data?.coordenadas;

  return (
    <>
      <CustomTypoLabel text="Ubicacion" />

      <CustomTextFieldNoForm
        label="Coordenadas"
        value={coors}
        disabled
        size={gridSize}
      />

      <CustomTextFieldNoForm
        label="Sector"
        value={ordenTrabajo?.sector_data?.name}
        disabled
        size={gridSize}
      />
      <CustomTextFieldNoForm
        label="Zona"
        value={ordenTrabajo?.zona_data?.name}
        disabled
        size={gridSize}
      />
      <CustomTextFieldNoForm
        label="Ciudad"
        value={ordenTrabajo?.ciudad_data?.name}
        disabled
      />
      <CustomTextFieldNoForm
        label="Provincia"
        value={ordenTrabajo?.provincia_data?.name}
        disabled
      />
      <CustomTextAreaNoForm
        label="Dirección"
        value={ordenTrabajo?.sector_data?.name}
        disabled
        size={gridSize}
      />
    </>
  );
};

export default DatosUbicacionTabPart;
