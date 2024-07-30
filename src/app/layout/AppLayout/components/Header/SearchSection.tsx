import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popover from '@mui/material/Popover';
import { forwardRef, useState, MouseEvent } from 'react';
import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { Transitions } from '@/shared/components/common';

const HeaderAvatar = forwardRef(({ children, ...others }: any, ref) => {
  const theme = useTheme();

  return (
    <Avatar
      ref={ref}
      variant="rounded"
      sx={{
        ...(theme.typography as any).commonAvatar,
        ...(theme.typography as any).mediumAvatar,
        bgcolor: 'secondary.light',
        color: 'secondary.dark',
        '&:hover': {
          bgcolor: 'secondary.dark',
          color: 'secondary.light',
        },
      }}
      {...others}
    >
      {children}
    </Avatar>
  );
});

// ==============================|| SEARCH INPUT - MOBILE||============================== //

interface MobileSearchProps {
  value: string;
  setValue: (value: string) => void;
  handleClose: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ value, setValue, handleClose }) => {
  const theme = useTheme();

  return (
    <OutlinedInput
      id="input-search-header"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <IconSearch stroke={1.5} size="16px" />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <HeaderAvatar>
            <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
          </HeaderAvatar>
          <Box sx={{ ml: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...(theme.typography as any).commonAvatar,
                ...(theme.typography as any).mediumAvatar,
                bgcolor: 'orange.light',
                color: 'orange.dark',
                '&:hover': {
                  bgcolor: 'orange.dark',
                  color: 'orange.light',
                },
              }}
              onClick={handleClose}
            >
              <IconX stroke={1.5} size="20px" />
            </Avatar>
          </Box>
        </InputAdornment>
      }
      aria-describedby="search-helper-text"
      inputProps={{
        'aria-label': 'weight',
        sx: { bgcolor: 'transparent', pl: 0.5 },
      }}
      sx={{ width: '100%', ml: 0.5, px: 2, bgcolor: 'background.paper' }}
    />
  );
};

// ==============================|| SEARCH INPUT ||============================== //

export type SearchSectionProps = {};

const SearchSection: React.FC<SearchSectionProps> = () => {
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ ml: 2 }}>
          <HeaderAvatar onClick={handleClick}>
            <IconSearch stroke={1.5} size="19.2px" />
          </HeaderAvatar>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{
            zIndex: 1100,
            width: '99%',
            top: '-55px !important',
            px: { xs: 1.25, sm: 1.5 },
          }}
        >
          <Transitions
            type="zoom"
            in={open}
            sx={{ transformOrigin: 'center left' }}
          >
            <Card
              sx={{
                bgcolor: 'background.default',
                border: 0,
                boxShadow: 'none',
              }}
            >
              <Box sx={{ p: 2 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs>
                    <MobileSearch
                      value={value}
                      setValue={setValue}
                      handleClose={handleClose}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Transitions>
        </Popover>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlinedInput
          id="input-search-header"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="16px" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <HeaderAvatar>
                <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
              </HeaderAvatar>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{
            'aria-label': 'weight',
            sx: { bgcolor: 'transparent', pl: 0.5 },
          }}
          sx={{ width: { md: 250, lg: 434 }, ml: 2, px: 2 }}
        />
      </Box>
    </>
  );
};

export default SearchSection;
