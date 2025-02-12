import { Grid } from '@mui/material';
import { useState } from 'react';
import { MdUnfoldMore } from 'react-icons/md';

import {
  gridSizeMdLg1,
  gridSizeMdLg11,
  Promocion,
  useColumnsPromocion,
} from '@/shared';
import {
  CustomMinimalTable,
  CustomTextFieldNoForm,
  SingleIconButton,
} from '@/shared/components';

export type PromocionPreventaComponentProps = { promocion: Promocion };

const PromocionPreventaComponent: React.FC<PromocionPreventaComponentProps> = ({
  promocion = {} as Promocion,
}) => {
  ///* local state ----------------
  const [isVissible, setIsVissible] = useState(true);

  ///* columns ----------------
  const { promocionPreventaColumns } = useColumnsPromocion();

  return (
    <>
      <Grid
        item
        container
        xs={12}
        spacing={2}
        alignItems="end"
        justifyContent="center"
        pb={4}
      >
        <CustomTextFieldNoForm
          label="Promoción aplicada"
          value={promocion?.name || 'N/A'}
          disabled
          size={gridSizeMdLg11}
        />

        <SingleIconButton
          startIcon={<MdUnfoldMore />}
          onClick={() => {
            setIsVissible(!isVissible);
          }}
          label={isVissible ? 'Ocultar detalles' : 'Ver detalles de promoción'}
          size={gridSizeMdLg1}
        />
      </Grid>

      {/* --------- table --------- */}
      <Grid item xs={12}>
        {isVissible && promocion?.id && (
          <>
            <CustomMinimalTable<Promocion>
              columns={promocionPreventaColumns}
              data={[promocion]}
              enablePagination
              density="comfortable"
            />
          </>
        )}
      </Grid>

      {/* --------------- */}
      <Grid item xs={12}>
        <pre>
          {JSON.stringify(promocion?.opciones_productos_incluye, null, 3)}
        </pre>

        <pre>
          {JSON.stringify(promocion?.opciones_productos_descuento, null, 3)}
        </pre>
      </Grid>
    </>
  );
};

export default PromocionPreventaComponent;
