import { SxPropsThemeType, SystemPermission } from '@/shared/interfaces';
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
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';

export type PermisionsSelectionProps = {
  permissions: SystemPermission[];
  setPermissions: (value: SystemPermission[]) => void;
  selectedPermissions: SystemPermission[];
  setSelectedPermissions: (value: SystemPermission[]) => void;

  sxGrid?: SxPropsThemeType;
};

const PermisionsSelection: React.FC<PermisionsSelectionProps> = ({
  permissions,
  selectedPermissions,
  setPermissions,
  setSelectedPermissions,

  sxGrid,
}) => {
  const theme = useTheme();

  // ////* Permissions
  const [filter, setFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // debouncer filter ---------------------
  const [debouncedFilter, setDebouncedFilter] = useState(filter);
  const [debouncedSelectedFilter, setDebouncedSelectedFilter] =
    useState(selectedFilter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSelectedFilter(selectedFilter);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [selectedFilter]);

  // New state for multiple selection
  const [selectedItems, setSelectedItems] = useState<SystemPermission[]>([]);

  // Filter permissions using useMemo for optimization
  const filteredPermissions = useMemo(() => {
    const filterWords = debouncedFilter.toLowerCase().split(' ');
    return permissions.filter(permission => {
      const permissionName = permission?.name?.toLowerCase() || '';
      return filterWords.every(word => permissionName.includes(word));
    });
  }, [permissions, debouncedFilter]);

  const filteredSelectedPermissions = useMemo(() => {
    const selectedFilterWords = debouncedSelectedFilter
      .toLowerCase()
      .split(' ');
    return selectedPermissions.filter(permission => {
      const permissionName = permission?.name?.toLowerCase() || '';
      return selectedFilterWords.every(word => permissionName.includes(word));
    });
  }, [selectedPermissions, debouncedSelectedFilter]);

  // Function to handle multiple selection
  const handleSelectItem = (item: SystemPermission) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  // Function to handle moving selected items to the other list
  const handleMoveItems = (direction: 'left' | 'right') => {
    const itemsToMove = selectedItems.filter(item =>
      direction === 'right'
        ? permissions.includes(item)
        : selectedPermissions.includes(item),
    );

    if (direction === 'right') {
      setSelectedPermissions([...selectedPermissions, ...itemsToMove]);
      setPermissions(permissions.filter(p => !itemsToMove.includes(p)));
    } else {
      setPermissions(
        [...permissions, ...itemsToMove].sort((a, b) => {
          const codenameA = a?.name || '';
          const codenameB = b?.name || '';
          return codenameA.localeCompare(codenameB);
        }),
      );
      setSelectedPermissions(
        selectedPermissions.filter(p => !itemsToMove.includes(p)),
      );
    }
    setSelectedItems([]);
  };

  // Memoized list items to prevent unnecessary re-renders
  const PermissionsList = useMemo(
    () =>
      memo(({ items }: any) => (
        <List>
          {items.map((permission: SystemPermission, index: number) => (
            <ListItem
              key={permission.id || index}
              onClick={() => handleSelectItem(permission)}
              selected={selectedItems.includes(permission)}
            >
              <ListItemText primary={permission?.name} />
              <ListItemSecondaryAction>
                <Tooltip
                  title={
                    permissions.includes(permission) ? 'Agregar' : 'Remover'
                  }
                  placement="right-start"
                >
                  <IconButton
                    edge="end"
                    color={
                      permissions.includes(permission) ? 'primary' : 'error'
                    }
                    sx={{ '&:hover': { boxShadow: 'none' } }}
                    onClick={e => {
                      e.stopPropagation();
                      if (permissions.includes(permission)) {
                        setSelectedPermissions([
                          ...selectedPermissions,
                          permission,
                        ]);
                        setPermissions(
                          permissions.filter(p => p !== permission),
                        );
                      } else {
                        setPermissions(
                          [...permissions, permission].sort((a, b) => {
                            const codenameA = a?.name || '';
                            const codenameB = b?.name || '';
                            return codenameA.localeCompare(codenameB);
                          }),
                        );
                        setSelectedPermissions(
                          selectedPermissions.filter(p => p !== permission),
                        );
                      }
                      // Remove the item from selectedItems if it's there
                      if (selectedItems.includes(permission)) {
                        setSelectedItems(prev =>
                          prev.filter(i => i !== permission),
                        );
                      }
                    }}
                  >
                    {permissions.includes(permission) ? (
                      <AddCircleIcon />
                    ) : (
                      <DeleteForeverIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )),
    [
      selectedItems,
      permissions,
      setSelectedPermissions,
      selectedPermissions,
      setPermissions,
    ],
  );

  return (
    <Grid item xs={12} container spacing={2} sx={sxGrid}>
      {/* ====================== permisos disponibles ====================== */}
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" pb={3}>
          Permisos disponibles
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
          <PermissionsList items={filteredPermissions} />
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
              setSelectedPermissions([...selectedPermissions, ...permissions]);
              setPermissions([]);
            }}
          >
            <SyncAltIcon />
            <Typography variant="body2">Seleccionar todos</Typography>
          </IconButton>
        </Box>
      </Grid>

      {/* ------------- divider ------------- */}
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
              disabled={!selectedItems.some(item => permissions.includes(item))}
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
                !selectedItems.some(item => selectedPermissions.includes(item))
              }
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>

      {/* ====================== permisos seleccionados ====================== */}
      <Grid item xs={12} md={5}>
        <Typography variant="subtitle1" pb={3}>
          Permisos seleccionados
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
          <PermissionsList items={filteredSelectedPermissions} />
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
              setPermissions(
                [...permissions, ...selectedPermissions].sort((a, b) => {
                  const codenameA = a?.name || '';
                  const codenameB = b?.name || '';
                  return codenameA.localeCompare(codenameB);
                }),
              );
              setSelectedPermissions([]);
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

export default PermisionsSelection;
