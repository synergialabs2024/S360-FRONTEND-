/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { gridSizeMdLg12, gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  CustomTextFieldNoForm,
  CustomTypoLabel,
  SingleFormBoxScene,
} from '@/shared/components';
import { promesapagoFormSchema } from '@/shared/utils/validation-schemas/app/cartera/promesa-pago';
import { Grid } from '@mui/material';
import { LocationZonePolygonFormPart } from '@/app/operaciones/agedamiento/shared/components/form';
export interface SavePromesaPagoProps {
  title: string;
}
const SaveCambioPropietario: React.FC<SavePromesaPagoProps> = ({ title }) => {
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
      <Grid item container {...gridSizeMdLg12}>
        <Grid item container {...gridSizeMdLg6} spacing={2}>
          <CustomTextFieldNoForm disabled label="Tipo de identificación" />
          <CustomTextFieldNoForm disabled label="Identificación" />
        </Grid>
      </Grid>
      <Grid item container {...gridSizeMdLg6}>
        <CustomTextFieldNoForm
          size={gridSizeMdLg12}
          label="Nombre y Apellido"
        />
        <CustomTextFieldNoForm
          disabled
          size={gridSizeMdLg6}
          label="Fecha de nacimiento"
        />
        <CustomTextFieldNoForm label="Edad" size={gridSizeMdLg6} />
        <CustomTextFieldNoForm label="Pais" />
        <CustomTextFieldNoForm label="Nacionalidad" />
        <CustomTextFieldNoForm label="Email" />
        <CustomTextFieldNoForm label="Celular" />
        <CustomTypoLabel text="Cliente" />
      </Grid>
      {/* ------------- location ------------- */}
      <Grid item container {...gridSizeMdLg6} spacing={2}>
        <LocationZonePolygonFormPart
          form={form}
          initialCoords={''}
          isEdit={false}
          // ptLabel={CustomTypoLabelEnum.ptMiddlePosition}
        />
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveCambioPropietario;
