import { Stack, Grid, Box } from '@mui/material';

import { CustomTextFieldNoForm } from '@/shared/components';
import CarouselViewport from '@/components/shared/CarouselViewport';
import { gridSizeMdLg4, LineaServicio, useIsMediaQuery } from '@/shared';

export type ClienteFibrContratoProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrContrato: React.FC<ClienteFibrContratoProps> = ({
  serviceLine,
}) => {
  const isMobile = useIsMediaQuery('sm');

  const imageFields = [
    { key: 'url_foto_cedula_frontal', alt: 'Cédula Frontal' },
    { key: 'url_foto_cedula_trasera', alt: 'Cédula Trasera' },
    { key: 'url_foto_documento_cuenta', alt: 'Documento de Cuenta' },
    { key: 'url_foto_tarjeta', alt: 'Tarjeta' },
    { key: 'url_foto_vivienda', alt: 'Vivienda' },
    { key: 'url_foto_planilla', alt: 'Planilla' },
    { key: 'url_foto_aceptacion', alt: 'Aceptación' },
    { key: 'url_aceptacion', alt: 'URL Aceptación' },
  ];

  const renderImages = () =>
    imageFields
      .map(({ key, alt }) => {
        const url =
          serviceLine?.preventa_data?.[
            key as keyof typeof serviceLine.preventa_data
          ];
        return url ? (
          <img
            key={key}
            src={String(url)}
            alt={alt}
            style={{
              maxWidth: '5cm',
              maxHeight: '3cm',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        ) : null;
      })
      .filter(Boolean);

  return (
    <Grid sx={{ ml: 3, width: '100%' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: isMobile ? 1 : 2,
          borderRadius: '12px',
          m: 3,
        }}
      >
        <Stack spacing={1}>
          <Grid container>
            <Grid
              item
              container
              spacing={3}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <CustomTextFieldNoForm
                label="Estado Preventa"
                size={gridSizeMdLg4}
                value={serviceLine?.preventa_data?.estado_preventa}
                required={false}
                disabled
              />
              <CustomTextFieldNoForm
                label="Código"
                size={gridSizeMdLg4}
                value={serviceLine?.preventa_data?.codigo}
                required={false}
                disabled
              />
              <CustomTextFieldNoForm
                label="Número de Referencia"
                size={gridSizeMdLg4}
                value={serviceLine?.preventa_data?.numero_referencia}
                required={false}
                disabled
              />
            </Grid>
          </Grid>
        </Stack>
        <CarouselViewport label="" required>
          {renderImages()}
        </CarouselViewport>
      </Box>
    </Grid>
  );
};

export default ClienteFibrContrato;
