import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconFileSettings } from '@tabler/icons-react';

import { OLT } from '@/shared';
import { SingleIconButton } from '@/shared/components';
import { returnUrlOLTsPage } from '../../../pages/tables/OLTsPage';

export type ConfigOLTCustomButtonsProps = { olt: OLT };

const ConfigOLTCustomButtons: React.FC<ConfigOLTCustomButtonsProps> = ({
  olt,
}) => {
  ///* hooks ------------------------
  const navigate = useNavigate();

  return (
    <Grid container item xs={12} spacing={4}>
      {olt?.uuid && (
        <Grid item xs={2}>
          <SingleIconButton
            startIcon={<IconFileSettings />}
            label="Infraestructura"
            color="inherit"
            onClick={() => {
              navigate(`${returnUrlOLTsPage}/configurar/${olt?.uuid}`);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ConfigOLTCustomButtons;
