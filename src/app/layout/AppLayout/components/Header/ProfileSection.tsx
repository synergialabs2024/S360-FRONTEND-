import { useEffect, useRef, useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';

// project imports
import { MainCard } from '@/shared/components/template';
import { useUiStore } from '@/store/ui';
import {
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

// ==============================|| PROFILE MENU ||============================== //

export type ProfileSectionProps = {};

const ProfileSection: React.FC<ProfileSectionProps> = () => {
  const theme = useTheme();

  const [value, setValue] = useState('');

  const customization = useUiStore(s => s.customization);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    link: string
  ) => {
    console.log('handleListItemClick', link, event, index);
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: open
            ? theme.palette.primary.main
            : theme.palette.primary.light,
          backgroundColor: open
            ? theme.palette.primary.main
            : theme.palette.primary.light,
          color: open ? theme.palette.primary.light : undefined,
          '& svg': {
            stroke: open ? theme.palette.primary.light : undefined,
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={''}
            sx={{
              ...(theme.typography as any).mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        onClick={handleToggle}
        color="primary"
      />

      {/* ============== Popover ============== */}
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <MainCard
              border={false}
              elevation={16}
              content={false}
              boxShadow
              shadow={theme.shadows[16]}
            >
              <Box sx={{ p: 2, pb: 0 }}>
                <Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography variant="h4">Good Morning,</Typography>
                    <Typography
                      component="span"
                      variant="h4"
                      sx={{ fontWeight: 400 }}
                    >
                      Johne Doe
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">Project Admin</Typography>
                </Stack>

                <OutlinedInput
                  sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                  id="input-search-profile"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder="Search profile options"
                  startAdornment={
                    <InputAdornment position="start">
                      <IconSearch
                        stroke={1.5}
                        size="1rem"
                        color={theme.palette.grey[500]}
                      />
                    </InputAdornment>
                  }
                  aria-describedby="search-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />

                <Divider />

                <List
                  component="nav"
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 300,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: '10px',
                    [theme.breakpoints.down('md')]: {
                      minWidth: '100%',
                    },
                    '& .MuiListItemButton-root': {
                      mt: 0.5,
                    },
                  }}
                >
                  <ListItemButton
                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                    onClick={event => handleListItemClick(event, 0, '#')}
                  >
                    <ListItemIcon>
                      <IconSettings stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          Account Settings
                        </Typography>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                    onClick={event => handleListItemClick(event, 1, '#')}
                  >
                    <ListItemIcon>
                      <IconUser stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Grid
                          container
                          spacing={1}
                          justifyContent="space-between"
                        >
                          <Grid item>
                            <Typography variant="body2">
                              Social Profile
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Chip
                              label="02"
                              size="small"
                              sx={{
                                bgcolor: theme.palette.warning.dark,
                                color: theme.palette.background.default,
                              }}
                            />
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                    onClick={() => {
                      console.log('Logout');
                    }}
                  >
                    <ListItemIcon>
                      <IconLogout stroke={1.5} size="1.3rem" />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="body2">Logout</Typography>}
                    />
                  </ListItemButton>
                </List>
              </Box>
            </MainCard>
          </Paper>
        </ClickAwayListener>
      </Popover>
    </>
  );
};

export default ProfileSection;
