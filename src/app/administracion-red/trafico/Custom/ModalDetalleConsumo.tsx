import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { TRAFICO_TYPE_ARRAY_CHOICES } from '@/shared';
import { ScrollableDialogProps, SelectArrayString } from '@/shared/components';
import { Box, Button, Collapse, Grid, Typography } from '@mui/material';

export type ModalDetalleConsumoProps = {
  modalTitle?: string;
  viewMoreText: string;
  listItems?: Record<string, any>;
};

const ModalDetalleConsumo: React.FC<ModalDetalleConsumoProps> = ({
  viewMoreText,
  modalTitle = 'Detalle del Consumo',
  listItems = {},
}) => {
  ///* global state
  const [open, setOpen] = useState(false);
  const [openG, setOpenG] = useState(false);
  const [tipoGrafico, setTipoGrafico] = useState('');

  ///* form --------------------
  const { control, watch } = useForm({
    defaultValues: {
      graficos: TRAFICO_TYPE_ARRAY_CHOICES[0],
    },
  });

  const selectedGrafico = watch('graficos');

  console.log(selectedGrafico);

  return (
    <>
      <Typography>
        <Button
          component="span"
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => setOpen(!open)}
          style={{ cursor: 'pointer' }}
        >
          {viewMoreText}
        </Button>
      </Typography>

      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          title={modalTitle}
          contentNode={
            <>
              <Grid container spacing={2} mb={3}>
                <Grid item xs={12}>
                  <Typography>
                    CONSUMO DEL USER: {listItems?.username}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                  >
                    <SelectArrayString
                      label="SELECCIONAR GRÁFICO"
                      options={TRAFICO_TYPE_ARRAY_CHOICES}
                      name="graficos"
                      control={control}
                      onChangeValue={e => setTipoGrafico(e)}
                    />
                  </Box>
                  <Grid container>
                    {tipoGrafico === 'GRÁFICO DIARIO' ? (
                      <>
                        <Grid item md={12} xs={12}>
                          <Box display="flex" alignItems="center">
                            <Button onClick={() => setOpenG(!openG)}>
                              Buscar por fecha
                            </Button>
                          </Box>
                          <Collapse in={openG} timeout="auto" unmountOnExit>
                            necesito un calendario de mui donde se pueda elegir
                            la fecha1 hasta fecha2
                          </Collapse>
                        </Grid>
                      </>
                    ) : (
                      <>GRÁFICO MENSUAL</>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </>
          }
        />
      )}
    </>
  );
};

export default ModalDetalleConsumo;
