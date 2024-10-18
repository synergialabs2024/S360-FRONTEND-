import { SxPropsThemeType } from '@/shared/interfaces';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

export type ModulesSelectionProps = {
  systemModules: string[];
  setSystemModules: (value: string[]) => void;
  selectedSystemModules: string[];
  setSelectedSystemModules: (value: string[]) => void;

  sxGrid?: SxPropsThemeType;
};

const ModulesSelection: React.FC<ModulesSelectionProps> = ({
  systemModules,
  setSystemModules,
  selectedSystemModules,
  setSelectedSystemModules,
  sxGrid,
}) => {
  const theme = useTheme();

  const [filter, setFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filterWords = filter.toLowerCase().split(' ');
  const selectedFilterWords = selectedFilter.toLowerCase().split(' ');

  const filteredPermissions = systemModules.filter(permission =>
    filterWords.every(word => permission.toLowerCase().includes(word)),
  );

  const filteredSelectedPermissions = selectedSystemModules.filter(permission =>
    selectedFilterWords.every(word => permission.toLowerCase().includes(word)),
  );

  const handleSelectItem = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  const handleMoveItems = (direction: 'left' | 'right') => {
    const itemsToMove = selectedItems.filter(item =>
      direction === 'right'
        ? systemModules.includes(item)
        : selectedSystemModules.includes(item),
    );

    if (direction === 'right') {
      setSelectedSystemModules([...selectedSystemModules, ...itemsToMove]);
      setSystemModules(systemModules.filter(p => !itemsToMove.includes(p)));
    } else {
      setSystemModules(
        [...systemModules, ...itemsToMove].sort((a, b) => a.localeCompare(b)),
      );
      setSelectedSystemModules(
        selectedSystemModules.filter(p => !itemsToMove.includes(p)),
      );
    }
    setSelectedItems([]);
  };

  return (
    <Grid item xs={12} container spacing={2} sx={sxGrid}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" pb={3}>
          Módulos disponibles
        </Typography>

        <TextField
          label="Buscar"
          variant="outlined"
          fullWidth
          sx={{
            pr: 5,
            mb: 3,
          }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        <Grid item xs={12} style={{ height: 400, overflow: 'auto' }}>
          <List>
            {filteredPermissions.map((permission, index) => (
              <ListItem
                key={index}
                onClick={() => handleSelectItem(permission)}
                selected={selectedItems.includes(permission)}
                sx={{ alignItems: 'flex-start' }}
                secondaryAction={
                  <Tooltip title="Agregar" placement="right-start">
                    <IconButton
                      edge="end"
                      color="primary"
                      sx={{ '&:hover': { boxShadow: 'none' } }}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedSystemModules([
                          ...selectedSystemModules,
                          permission,
                        ]);
                        setSystemModules(
                          systemModules.filter(p => p !== permission),
                        );
                        if (selectedItems.includes(permission)) {
                          setSelectedItems(prev =>
                            prev.filter(i => i !== permission),
                          );
                        }
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={permission}
                  sx={{ wordBreak: 'break-word' }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <IconButton
            sx={{
              mt: 'auto',
              '&:hover': {
                boxShadow: 'none',
                bgcolor: 'transparent',
                color: theme.palette.primary.main,
              },
            }}
            onClick={() => {
              setSelectedSystemModules([
                ...selectedSystemModules,
                ...systemModules,
              ]);
              setSystemModules([]);
            }}
          >
            <SyncAltIcon />
            <Typography variant="body2">Seleccionar todos</Typography>
          </IconButton>
        </Box>
      </Grid>

      <Grid item xs={12} md={1}>
        <Box
          component={Divider}
          orientation="vertical"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => handleMoveItems('right')}
              disabled={
                !selectedItems.some(item => systemModules.includes(item))
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: '100%', mx: 2 }}
            />
            <IconButton
              onClick={() => handleMoveItems('left')}
              disabled={
                !selectedItems.some(item =>
                  selectedSystemModules.includes(item),
                )
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={5}>
        <Typography variant="subtitle1" pb={3}>
          Módulos seleccionados
        </Typography>

        <TextField
          label="Buscar"
          variant="outlined"
          fullWidth
          sx={{
            pr: 5,
            mb: 3,
          }}
          value={selectedFilter}
          onChange={e => setSelectedFilter(e.target.value)}
        />

        <Grid item xs={12} style={{ height: 400, overflow: 'auto' }}>
          <List>
            {filteredSelectedPermissions.map((permission, index) => (
              <ListItem
                key={index}
                onClick={() => handleSelectItem(permission)}
                selected={selectedItems.includes(permission)}
                sx={{ alignItems: 'flex-start' }}
                secondaryAction={
                  <Tooltip title="Remover" placement="right-start">
                    <IconButton
                      edge="end"
                      sx={{ '&:hover': { boxShadow: 'none' } }}
                      color="error"
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedSystemModules(
                          selectedSystemModules.filter(p => p !== permission),
                        );
                        setSystemModules(
                          [...systemModules, permission].sort((a, b) =>
                            a.localeCompare(b),
                          ),
                        );
                        if (selectedItems.includes(permission)) {
                          setSelectedItems(prev =>
                            prev.filter(i => i !== permission),
                          );
                        }
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={permission}
                  sx={{ wordBreak: 'break-word' }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <IconButton
            sx={{
              '&:hover': {
                boxShadow: 'none',
                bgcolor: 'transparent',
                color: theme.palette.warning.dark,
              },
            }}
            onClick={() => {
              setSystemModules(
                [...systemModules, ...selectedSystemModules].sort((a, b) =>
                  a.localeCompare(b),
                ),
              );
              setSelectedSystemModules([]);
            }}
          >
            <SyncAltIcon />
            <Typography variant="body2">Eliminar todos</Typography>
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ModulesSelection;
