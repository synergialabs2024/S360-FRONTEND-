/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12 } from '@/shared/constants/ui';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  SingleFormBoxScene,
} from '@/shared/components';
import { promesapagoFormSchema } from '@/shared/utils/validation-schemas/app/cartera/promesa-pago';
export interface SavePromesaPagoProps {
  title: string;
}
const SavePromesaPago: React.FC<SavePromesaPagoProps> = ({ title }) => {
  const navigate = useNavigate();
  ///* form -----------------
  const form = useForm<any>({
    resolver: yupResolver(promesapagoFormSchema) as any,
  });
  const { handleSubmit } = form;
  const onSave = async () => {};
  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate('')}
      onSave={handleSubmit(onSave, () => {})}
      maxWidth="xl"
      gridSizeForm={gridSizeMdLg12}
    >
      <CustomTextFieldNoForm
        disabled
        label="Fecha de registro de promesa de pago"
      />
      <CustomTextFieldNoForm disabled label="Hora de registro" />
      <CustomTextFieldNoForm disabled label="Responsable de registro" />
      <CustomTextFieldNoForm label="Status Servicio" />
      <CustomTextFieldNoForm label="Fecha para promesa de pago" />
      <CustomTextFieldNoForm label="Calificacion de contrato" />
      <CustomTypoLabel text="Cliente" />
      <CustomTextFieldNoForm label="Nombre cliente" />
      <CustomTextFieldNoForm label="Número de contrato" />
      <CustomTextFieldNoForm label="Teléfono" />
      <CustomTextFieldNoForm label="Móvil" />
      <CustomTextFieldNoForm label="Fecha para promesa de pago" />
      <CustomTextFieldNoForm label="Observación" />
      <CustomTypoLabel text="Historial" />
      <CustomTextFieldNoForm label="Promesa registradas" />
      <CustomTextFieldNoForm label="Pago a tiempo" />
      <CustomTypoLabel text="Informacion de pago posterior a promesa" />
      <CustomTextFieldNoForm label="Monto pago" />
      <CustomTextFieldNoForm label="Fecha pago" />
      <CustomTextFieldNoForm label="Comprobando pago" />
      <CustomTextFieldNoForm label="Canal pago" />
    </SingleFormBoxScene>
  );
};

export default SavePromesaPago;
