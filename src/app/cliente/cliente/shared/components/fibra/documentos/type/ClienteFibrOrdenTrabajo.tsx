import { Stack, Grid, Box } from '@mui/material';

import { CustomTextFieldNoForm } from '@/shared/components';
import CarouselViewport from '@/components/shared/CarouselViewport';
import { gridSizeMdLg4, LineaServicio, useIsMediaQuery } from '@/shared';

export type ClienteFibrOrdenTrabajoProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrOrdenTrabajo: React.FC<ClienteFibrOrdenTrabajoProps> = ({
  serviceLine,
}) => {
  const isMobile = useIsMediaQuery('sm');

  const imageFields = [
    { key: 'url_foto_ont', alt: 'Foto Ont' },
    { key: 'url_foto_potencia_ont', alt: 'Foto Potencia Ont' },
    { key: 'url_foto_ont_encontrado_casa', alt: 'Foto Ont encontrada en casa' },
    { key: 'url_foto_etiqueta', alt: 'Foto Etiqueta' },
    { key: 'url_foto_nap', alt: 'Foto Nap' },
    { key: 'url_foto_potencia_nap', alt: 'Foto Potencia Nap' },
    { key: 'url_foto_premio', alt: 'Foto Premio' },
    { key: 'url_foto_test_speed', alt: 'Foto test speed' },
    { key: 'url_foto_acta_entrega_ups', alt: 'Foto acta entrega ups' },
    { key: 'url_foto_wifi_mesh', alt: 'Foto wifi mesh' },
  ];

  const renderImages = () =>
    imageFields
      .map(({ key, alt }) => {
        const url =
          serviceLine?.orden_trabajo_data?.[
            key as keyof typeof serviceLine.orden_trabajo_data
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
                label="Estado orden trabajo"
                size={gridSizeMdLg4}
                value={serviceLine?.orden_trabajo_data?.estado_orden_trabajo}
                required={false}
                disabled
              />
              <CustomTextFieldNoForm
                label="Código"
                size={gridSizeMdLg4}
                value={serviceLine?.orden_trabajo_data?.codigo}
                required={false}
                disabled
              />
              <CustomTextFieldNoForm
                label="Número de Referencia"
                size={gridSizeMdLg4}
                value={serviceLine?.orden_trabajo_data?.numero_referencia}
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

export default ClienteFibrOrdenTrabajo;
