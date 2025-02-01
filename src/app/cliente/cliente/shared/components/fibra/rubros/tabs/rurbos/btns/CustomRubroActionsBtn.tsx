import { Grid } from '@mui/material';
import { MdEditDocument } from 'react-icons/md';

import { EstadoRubroEnumChoice, Rubro } from '@/shared';
import { SingleIconButton } from '@/shared/components';

export type CustomRubroActionsBtnProps = {
  rubro: Rubro;
};

const CustomRubroActionsBtn: React.FC<CustomRubroActionsBtnProps> = ({
  rubro,
}) => {
  return (
    <>
      <Grid container item xs={12} spacing={4}>
        <>
          {rubro?.estado_rubro === EstadoRubroEnumChoice.NO_PAGADO ? (
            <>
              <Grid item>
                <SingleIconButton
                  label="Editar"
                  startIcon={<MdEditDocument />}
                  color="inherit"
                  onClick={() => {}}
                />
              </Grid>
              <Grid item></Grid>
            </>
          ) : null}
        </>
      </Grid>
    </>
  );
};

export default CustomRubroActionsBtn;
