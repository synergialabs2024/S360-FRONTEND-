import { Box, Chip, Stack, Typography } from '@mui/material';

import { formatDateLong, Rubro } from '@/shared';
import { CompanyLogo } from '@/shared/components';
import ClienteFibraRubroChipState from '../ClienteFibraRubroChipState';

export type ClienteFibraRobroInfoHeaderProps = {
  rubro: Rubro;
};

const ClienteFibraRobroInfoHeader: React.FC<
  ClienteFibraRobroInfoHeaderProps
> = ({ rubro }) => {
  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box
          sx={{
            textAlign: {
              xs: 'center',
              sm: 'left',
            },
          }}
        >
          <Typography variant="h5"># {rubro?.numero_rubro}</Typography>

          <Box mt={1}>
            <Chip
              size="small"
              color="secondary"
              variant="outlined"
              label={formatDateLong(rubro?.fecha_emision)}
            ></Chip>
          </Box>
        </Box>

        {/*  */}
        <CompanyLogo />

        {/*  */}
        <Box textAlign="right">
          <ClienteFibraRubroChipState state={rubro?.estado_rubro!} />
        </Box>
      </Stack>
    </>
  );
};

export default ClienteFibraRobroInfoHeader;
