import { Grid } from '@mui/material';
import { HiDocumentPlus } from 'react-icons/hi2';
import { MdCancel } from 'react-icons/md';

import { Preventa } from '@/shared';
import { SingleIconButton } from '@/shared/components';

export type EsperaAgendaPreventaCustomButtonsProps = { preventa: Preventa };

const EsperaAgendaPreventaCustomButtons: React.FC<
  EsperaAgendaPreventaCustomButtonsProps
> = ({ preventa }) => {
  ///* hooks ------------------------
  console.log({ preventa });

  return (
    <Grid container item xs={12} spacing={4}>
      <Grid item xs={2}>
        <SingleIconButton
          startIcon={<HiDocumentPlus />}
          label="Crear agenda"
          color="inherit"
          onClick={() => {}}
        />
      </Grid>

      <Grid item xs={2}>
        <SingleIconButton
          startIcon={<MdCancel />}
          label="Cancelar preventa"
          color="error"
          onClick={() => {}}
        />
      </Grid>
    </Grid>
  );
};

export default EsperaAgendaPreventaCustomButtons;
