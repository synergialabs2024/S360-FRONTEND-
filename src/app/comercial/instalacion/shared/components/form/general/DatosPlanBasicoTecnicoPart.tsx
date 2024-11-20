import { gridSize, gridSizeMdLg6, OrdenTrabajo } from '@/shared';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';

export type DatosPlanBasicoTecnicoPartProps = {
  ordenTrabajo: OrdenTrabajo;
};

const DatosPlanBasicoTecnicoPart: React.FC<DatosPlanBasicoTecnicoPartProps> = ({
  ordenTrabajo,
}) => {
  return (
    <>
      <CustomTypoLabel text="Plan de internet" />

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

      <CustomTypoLabel
        text="Metodo de pago"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <CustomTextFieldNoForm
        label="Método de pago"
        value={ordenTrabajo?.preventa_data?.metodo_pago_data?.name}
        disabled
      />
      <CustomTextFieldNoForm
        label="Entidad financiera"
        value={ordenTrabajo?.preventa_data?.entidad_financiera_data?.name}
        disabled
      />

      <CustomTextFieldNoForm
        label="Tipo cuenta bancaria"
        value={ordenTrabajo?.preventa_data?.tipo_cuenta_bancaria}
        disabled
      />
      <CustomTextFieldNoForm
        label="Número cuenta bancaria"
        value={ordenTrabajo?.preventa_data?.numero_cuenta_bancaria}
        disabled
      />
    </>
  );
};

export default DatosPlanBasicoTecnicoPart;
