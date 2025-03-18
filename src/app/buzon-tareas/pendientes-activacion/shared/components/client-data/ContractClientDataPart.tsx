/* eslint-disable indent */
import FibraClientInfoPart from '@/app/cliente/cliente/shared/components/fibra/summary/FibraClientInfoPart';
import { gridSize, gridSizeMdLg6, LineaServicio } from '@/shared';
import { CustomTextFieldNoForm, CustomTypoLabel } from '@/shared/components';
import LineStateClient from './LineStateClient';

export type ContractClientDataPartProps = {
  serviceLine: LineaServicio;
};

const ContractClientDataPart: React.FC<ContractClientDataPartProps> = ({
  serviceLine,
}) => {
  return (
    <>
      <CustomTypoLabel text="Datos del contrato" />

      <LineStateClient serviceLine={serviceLine} />
      {/* <ClienteFibraPerfilPagos serviceLine={serviceLine} /> */}

      <CustomTextFieldNoForm
        label="Número de contrato"
        value={serviceLine?.contrato_data?.numero_contrato}
        disabled
      />
      <CustomTextFieldNoForm
        label="Identificación de pago"
        value={serviceLine?.contrato_data?.identificacion_pago}
        disabled
      />

      <CustomTextFieldNoForm
        label="Tipo de servicio"
        value={serviceLine?.preventa_data?.tipo_servicio}
        disabled
      />
      <CustomTextFieldNoForm
        label="Tipo de plan"
        value={serviceLine?.preventa_data?.tipo_plan}
        disabled
      />

      {serviceLine?.contrato_data?.plan_internet_ingreso_data?.name !=
      serviceLine?.contrato_data?.plan_internet_actual_data?.name ? (
        <>
          <CustomTextFieldNoForm
            label="Plan internet ingreso"
            value={
              serviceLine?.contrato_data?.plan_internet_ingreso_data
                ?.name_valor_base
            }
            disabled
          />
          <CustomTextFieldNoForm
            label="Plan internet actual"
            value={
              serviceLine?.contrato_data?.plan_internet_actual_data
                ?.name_valor_base
            }
            disabled
          />
        </>
      ) : (
        <CustomTextFieldNoForm
          label="Plan internet contratado"
          value={
            serviceLine?.contrato_data?.plan_internet_actual_data
              ?.name_valor_base
          }
          disabled
          size={gridSize}
        />
      )}

      <CustomTextFieldNoForm
        label="Velocidad descarga máxima"
        value={
          serviceLine?.contrato_data?.plan_internet_actual_data
            ?.velocidad_descarga_maxima
        }
        disabled
        size={gridSizeMdLg6}
        endAdornment={
          serviceLine?.contrato_data?.plan_internet_actual_data
            ?.unidad_velocidad
        }
      />
      <CustomTextFieldNoForm
        label="Velocidad subida máxima"
        value={
          serviceLine?.contrato_data?.plan_internet_actual_data
            ?.velocidad_subida_maxima
        }
        disabled
        size={gridSizeMdLg6}
        endAdornment={
          serviceLine?.contrato_data?.plan_internet_actual_data
            ?.unidad_velocidad
        }
      />
      <CustomTextFieldNoForm
        label="Valor"
        value={serviceLine?.contrato_data?.plan_internet_actual_data?.valor}
        disabled
        startAdornment="$"
      />
      <CustomTextFieldNoForm
        label="Permanencia"
        value={
          serviceLine?.contrato_data?.plan_internet_actual_data?.permanencia
        }
        disabled
      />

      <FibraClientInfoPart serviceLine={serviceLine} />
    </>
  );
};

export default ContractClientDataPart;
