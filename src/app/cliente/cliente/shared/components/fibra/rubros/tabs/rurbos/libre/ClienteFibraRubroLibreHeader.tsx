import { Box, Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

import { gridSizeMdLg7, LineaServicio } from '@/shared';
import { CompanyLogo, CustomDatePicker } from '@/shared/components';
import ClienteFibraRubroLibreFromTo from './ClienteFibraRubroLibreFromTo';
import { RubrosClienteFormData } from './ClienteFibraRubroLibreModal';

export type ClienteFibraRubroLibreHeaderProps = {
  form: UseFormReturn<RubrosClienteFormData>;
  serviceLine: LineaServicio;
};

const ClienteFibraRubroLibreHeader: React.FC<
  ClienteFibraRubroLibreHeaderProps
> = ({ form, serviceLine }) => {
  ///* form ----------------
  const { errors } = form.formState;

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box flex={1} textAlign="left">
          <CustomDatePicker
            label="Fecha Vencimiento"
            name="fecha_vencimiento"
            control={form.control}
            defaultValue={null}
            error={errors.fecha_vencimiento}
            helperText={errors.fecha_vencimiento?.message}
            size={gridSizeMdLg7}
            minDate={dayjs().format()}
          />
        </Box>

        <Box flex={1} display="flex" justifyContent="center">
          <CompanyLogo />
        </Box>

        <Box flex={1} display="flex" justifyContent="flex-end">
          <CustomDatePicker
            label="Fecha Emisión"
            name="fecha_emision"
            control={form.control}
            defaultValue={dayjs().format()}
            error={errors.fecha_emision}
            helperText={errors.fecha_emision?.message}
            size={gridSizeMdLg7}
            minDate={dayjs().format()}
            disabled
          />
        </Box>
      </Stack>

      <Divider></Divider>
      <ClienteFibraRubroLibreFromTo serviceLine={serviceLine} />
    </>
  );
};

export default ClienteFibraRubroLibreHeader;
