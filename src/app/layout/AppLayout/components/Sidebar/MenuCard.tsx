import { memo } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import { IconTable } from '@tabler/icons-react';

// assets

interface LinearProgressWithLabelProps {
  value: number;
  [key: string]: any; // For other props that might be passed to LinearProgress
}

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

const LinearProgressWithLabel: React.FC<LinearProgressWithLabelProps> = ({
  value,
  ...others
}) => {
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: 'primary.800' }}>
              Progress
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(
              value
            )}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <LinearProgress
          aria-label="progress of theme"
          variant="determinate"
          value={value}
          {...others}
          sx={{
            height: 10,
            borderRadius: 30,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              bgcolor: 'background.paper',
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              bgcolor: 'primary.dark',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard: React.FC = () => {
  const theme: Theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: 'primary.light',
        mb: 2.75,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 157,
          height: 157,
          bgcolor: 'primary.200',
          borderRadius: '50%',
          top: -105,
          right: -96,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <List disablePadding sx={{ m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters disablePadding>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...(theme.typography as any).commonAvatar,
                  ...(theme.typography as any).largeAvatar,
                  color: 'primary.main',
                  border: 'none',
                  borderColor: 'primary.main',
                  bgcolor: 'background.paper',
                }}
              >
                <IconTable />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0 }}
              primary={
                <Typography variant="subtitle1" sx={{ color: 'primary.800' }}>
                  Get Extra Space
                </Typography>
              }
              secondary={<Typography variant="caption"> 28/23 GB</Typography>}
            />
          </ListItem>
        </List>
        <LinearProgressWithLabel value={80} />
      </Box>
    </Card>
  );
};

export default memo(MenuCard);
