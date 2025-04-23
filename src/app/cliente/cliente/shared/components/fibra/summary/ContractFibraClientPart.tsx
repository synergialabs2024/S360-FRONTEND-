/* eslint-disable indent */
import { gridSize, gridSizeMdLg6, LineaServicio } from '@/shared';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import FibraClientInfoPart from './FibraClientInfoPart';
import LineStateFibraClient from './LineStateFibraClient';

export type ContractFibraClientPartProps = {
  serviceLine: LineaServicio;
};

const ContractFibraClientPart: React.FC<ContractFibraClientPartProps> = ({
  serviceLine,
}) => {
  return (
    <>
      <CustomTypoLabel text="Datos del contrato" />

      <LineStateFibraClient serviceLine={serviceLine} />
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

      {/* ------------------------- */}
      <CustomTypoLabel
        text="Datos GPON"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <>
        <CustomTextFieldNoForm
          label="Nodo"
          value={serviceLine?.contrato_data?.nodo_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="OLT"
          value={serviceLine?.contrato_data?.olt_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="NAP"
          value={serviceLine?.contrato_data?.nap_data?.name || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Puerto NAP"
          value={serviceLine?.contrato_data?.puerto_nap || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="IPv4"
          value={serviceLine?.contrato_data?.ipv4 || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="IPv6"
          value={serviceLine?.contrato_data?.ipv6 || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="PPPoE"
          value={serviceLine?.contrato_data?.pppoe || ''}
          disabled
          size={gridSize}
        />
        <CustomTextFieldNoForm
          label="PPPassword"
          value={serviceLine?.contrato_data?.pppassword || ''}
          disabled
        />
        <CustomTextFieldNoForm
          label="Serie ONT"
          value={serviceLine?.contrato_data?.serie_ont || ''}
          disabled
        />
      </>

      <FibraClientInfoPart serviceLine={serviceLine} />
    </>
  );
};

export default ContractFibraClientPart;
