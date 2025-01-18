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
const SaveCambioPlan: React.FC<SavePromesaPagoProps> = ({ title }) => {
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
      <CustomTextFieldNoForm label="Cliente" />
      <CustomTextFieldNoForm disabled label="Numero de contrato" />
      <CustomTextFieldNoForm label="Plan actual" />
      <CustomTextFieldNoForm disabled label="Nuevo plan actual" />

      <CustomTextFieldNoForm
        label="Adicional prox factura"
        size={gridSizeMdLg12}
      />
      <CustomTypoLabel text="DETALLE DE PORPORCIONAL POR CAMBIO DE PLAN" />
      <CustomTextFieldNoForm size={gridSizeMdLg12} label="Precio plan actual" />
      <CustomTextFieldNoForm size={gridSizeMdLg12} label="Costo por dia" />
      <CustomTextFieldNoForm size={gridSizeMdLg12} label="Precio plan nuevo" />
      <CustomTextFieldNoForm
        size={gridSizeMdLg12}
        label="Costo por dia plan nuevo"
      />
      <CustomTextFieldNoForm size={gridSizeMdLg12} label="Fecha pago" />

      <CustomTextFieldNoForm size={gridSizeMdLg12} label="Fecha de cambio" />
      <CustomTextFieldNoForm
        size={gridSizeMdLg12}
        label="Fecha de diferencia"
      />
      <CustomTextFieldNoForm size={gridSizeMdLg12} label="Porporcional" />
      <CustomTextFieldNoForm
        size={gridSizeMdLg12}
        label="Valor total en pagar en fecha de pago"
      />
    </SingleFormBoxScene>
  );
};

export default SaveCambioPlan;
