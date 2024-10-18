import {
  Card,
  Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from '@mui/material';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

import { SxPropsType } from '@/shared/interfaces';

export interface CustomSearchInterface {
  value: string;
  onChange: (value: any) => void;
  text: string; // debouncedValue

  sxContainer?: SxPropsType;

  customSpaceNode?: React.ReactNode;
}

const CustomSearch: React.FC<CustomSearchInterface> = ({
  onChange,
  value,
  text,

  sxContainer,

  customSpaceNode = null,
}) => {
  return (
    <>
      {/* <Card sx={{ p: 2 }}> */}
      <Stack spacing={2} direction="row" sx={sxContainer}>
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            margin: 'auto',
            padding: 1.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // bgcolor: '#F9FAFB',
          }}
        >
          <OutlinedInput
            fullWidth
            placeholder={`Buscar ${text}`}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <HiMiniMagnifyingGlass />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 500 }}
            className="custom-search-form__input"
            value={value}
            onChange={e => {
              onChange(e.target.value);
            }}
          />
        </Card>
        <span className="spacer"></span>

        {/* ------ custom space ------ */}

        {customSpaceNode && (
          <>
            <Grid item container justifyContent="flex-end" alignItems="center">
              {customSpaceNode}
            </Grid>
          </>
        )}
        {/* ------ Filter Date ------ */}
      </Stack>
    </>
  );
};

export default CustomSearch;
