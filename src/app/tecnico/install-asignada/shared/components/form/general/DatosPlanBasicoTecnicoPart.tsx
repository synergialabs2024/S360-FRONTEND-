import { gridSize, gridSizeMdLg6, OrdenTrabajo } from '@/shared';
import { CustomTextFieldNoForm } from '@/shared/components';

export type DatosPlanBasicoTecnicoPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const DatosPlanBasicoTecnicoPart: React.FC<DatosPlanBasicoTecnicoPartProps> = ({
  ordenTrabajo,
}) => {
  return (
    <>
      <CustomTextFieldNoForm
        label="N° de contrato"
        value={
          ordenTrabajo?.linea_servicio_data?.contrato_data?.numero_contrato
        }
        disabled
        size={gridSize}
      />
      <CustomTextFieldNoForm
        label="Tipo de servicio"
        value={ordenTrabajo?.preventa_data?.tipo_servicio}
        disabled
      />
      <CustomTextFieldNoForm
        label="Tipo de plan"
        value={ordenTrabajo?.preventa_data?.tipo_plan}
        disabled
      />
      <CustomTextFieldNoForm
        label="Plan contratado"
        value={
          ordenTrabajo?.linea_servicio_data?.contrato_data
            ?.plan_internet_ingreso_data?.name
        }
        disabled
        size={gridSize}
      />

      <CustomTextFieldNoForm
        label="Velocidad descarga máxima"
        value={
          ordenTrabajo?.linea_servicio_data?.contrato_data
            ?.plan_internet_ingreso_data?.velocidad_descarga_maxima
        }
        disabled
        size={gridSizeMdLg6}
        endAdornment={
          ordenTrabajo?.linea_servicio_data?.contrato_data
            ?.plan_internet_ingreso_data?.unidad_velocidad
        }
      />
      <CustomTextFieldNoForm
        label="Velocidad subida máxima"
        value={
          ordenTrabajo?.linea_servicio_data?.contrato_data
            ?.plan_internet_ingreso_data?.velocidad_subida_maxima
        }
        disabled
        size={gridSizeMdLg6}
        endAdornment={
          ordenTrabajo?.linea_servicio_data?.contrato_data
            ?.plan_internet_ingreso_data?.unidad_velocidad
        }
      />
    </>
  );
};

export default DatosPlanBasicoTecnicoPart;
