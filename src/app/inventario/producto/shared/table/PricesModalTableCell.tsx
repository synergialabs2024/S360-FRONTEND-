import { Checkbox, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IoMdEye } from 'react-icons/io';

import {
  CustomTextFieldNoForm,
  ScrollableDialogProps,
  SingleIconButton,
} from '@/shared/components';

type PrecioProducto = {
  nombre: string;
  valor: number;
  default: boolean;
  descripcion?: string;
};

type PricesModalTableCellProps = {
  precios: PrecioProducto[];
};

const PricesModalTableCell: React.FC<PricesModalTableCellProps> = ({
  precios,
}) => {
  const [open, setOpen] = useState(false);

  if (!precios || precios.length === 0) {
    return 'N/A';
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SingleIconButton
        label="Ver"
        tooltipPlacement="right"
        startIcon={<IoMdEye />}
        onClick={handleOpen}
        color={`${'none'}` as any}
      />

      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={handleClose}
          title="Precios"
          showConfirmBtn={false}
          cancelTextBtn="Cerrar"
          contentNode={
            <Grid container spacing={2}>
              {precios.map((precio, index) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  container
                  spacing={1}
                  sx={{ pt: index !== 0 ? '12px' : 0 }}
                >
                  <CustomTextFieldNoForm
                    label="Nombre"
                    value={precio.nombre}
                    disabled
                    size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                  />

                  <CustomTextFieldNoForm
                    label="Valor"
                    value={precio.valor.toString()}
                    disabled
                    type="number"
                    size={{ xs: 12, sm: 6, md: 2, lg: 2 }}
                  />

                  <CustomTextFieldNoForm
                    label="Descripción"
                    value={precio.descripcion || ''}
                    disabled
                    required={false}
                    size={{ xs: 12, sm: 12, md: 4, lg: 3 }}
                  />

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    lg={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Checkbox checked={precio.default} disabled />
                    <Typography>Default</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          }
        />
      )}
    </>
  );
};

export default PricesModalTableCell;
