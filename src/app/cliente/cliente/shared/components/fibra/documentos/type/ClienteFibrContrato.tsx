import { Stack, Grid, Box } from '@mui/material';

import {
  gridSizeMdLg2,
  gridSizeMdLg6,
  LineaServicio,
  gridSizeMdLg10,
  useIsMediaQuery,
} from '@/shared';
import {
  PDFIconButton,
  CustomFormLabel,
  CustomTextFieldNoForm,
} from '@/shared/components';

export type ClienteFibrInfoPreventaProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrInfoPreventa: React.FC<ClienteFibrInfoPreventaProps> = ({
  serviceLine,
}) => {
  const isMobile = useIsMediaQuery('sm');
  return (
    <Grid sx={{ ml: 3, width: '100%' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: isMobile ? 1 : 2,
          borderRadius: '12px',
        }}
      >
        <Stack spacing={2}>
          <Grid container>
            <Grid
              item
              container
              spacing={3}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <CustomTextFieldNoForm
                label="Estado Contrato"
                size={gridSizeMdLg6}
                value={serviceLine?.contrato_data?.estado_contrato}
                required={false}
                disabled
              />
              <CustomTextFieldNoForm
                label="Código"
                size={gridSizeMdLg6}
                value={serviceLine?.contrato_data?.codigo}
                required={false}
                disabled
              />
              <CustomTextFieldNoForm
                label="Número de Contrato"
                size={gridSizeMdLg10}
                value={serviceLine?.contrato_data?.numero_contrato}
                required={false}
                disabled
              />
              <Grid item {...gridSizeMdLg2}>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor="Contrato"
                  required={false}
                >
                  Contrato
                </CustomFormLabel>

                <PDFIconButton
                  url={serviceLine?.contrato_data?.url_contrato ?? ''}
                  disabled={!serviceLine?.contrato_data?.url_contrato}
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Grid>
  );
};

export default ClienteFibrInfoPreventa;
