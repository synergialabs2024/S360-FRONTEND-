import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { formatQuantity, IPv4Detail } from '@/shared';
import { ScrollableDialogProps, SingleIconButton } from '@/shared/components';
import { HiOutlineTrash } from 'react-icons/hi2';

export type IPDetailsCellProps = {
  availableIps: IPv4Detail[];

  title?: string;
};

// memorized component for performance
const Row = memo(({ index, style, data }: ListChildComponentProps) => {
  const { availableIps, columnCount } = data;
  const startIndex = index * columnCount;
  const items = availableIps.slice(startIndex, startIndex + columnCount);

  return (
    <div style={style}>
      <Grid container spacing={2}>
        {items.map((ip: IPv4Detail, subIndex: number) => (
          <Grid item xs={12 / columnCount} key={startIndex + subIndex}>
            <ListItem divider>
              <ListItemIcon>
                {ip?.available ? (
                  <LockOpenIcon color="success" />
                ) : (
                  <LockPersonIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textPrimary">
                    {ip.ip}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {ip.available ? 'Disponible' : 'Ocupado'}
                  </Typography>
                }
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
});

const IPDetailsCell: React.FC<IPDetailsCellProps> = ({
  availableIps,
  title = 'Detalle de IPs',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<
    'all' | 'available' | 'occupied'
  >('all');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isFiltering, setIsFiltering] = useState(false);

  ///* Debouncer ----------
  useEffect(() => {
    setIsFiltering(true);

    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsFiltering(false);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // filter with debounced search term and availability filter
  const filteredIps = useMemo(() => {
    return availableIps.filter(ip => {
      const matchesSearch = ip.ip
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesAvailability =
        availabilityFilter === 'all'
          ? true
          : availabilityFilter === 'available'
            ? ip.available
            : !ip.available;
      return matchesSearch && matchesAvailability;
    });
  }, [availableIps, debouncedSearchTerm, availabilityFilter]);

  // calc rows and columns
  const columnCount = 3;
  const rowHeight = 80;
  const rowCount = Math.ceil(filteredIps.length / columnCount);

  //* Handlers ----------
  const handleClearSearch = () => setSearchTerm('');
  const handleClearAvailability = () => setAvailabilityFilter('all');
  const handleClearAllFilters = () => {
    handleClearSearch();
    handleClearAvailability();
  };

  return (
    <>
      <SingleIconButton
        startIcon={<VisibilityIcon />}
        color={'default' as any}
        label="Ver detalle"
        onClick={() => setIsOpen(true)}
      />

      <ScrollableDialogProps
        title={title}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        cancelTextBtn="Cerrar"
        contentNode={
          <Box>
            {/* ================== filters ================== */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Buscar IP"
                  variant="outlined"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="availability-filter-label">
                    Disponibilidad
                  </InputLabel>
                  <Select
                    labelId="availability-filter-label"
                    label="Disponibilidad"
                    value={availabilityFilter}
                    onChange={e =>
                      setAvailabilityFilter(
                        e.target.value as 'all' | 'available' | 'occupied',
                      )
                    }
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="available">Disponible</MenuItem>
                    <MenuItem value="occupied">Ocupado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* ================== filter chips ================== */}
            <Box mb={2}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Grid
                  item
                  container
                  alignItems="center"
                  spacing={1}
                  xs={12}
                  sm={8}
                >
                  {debouncedSearchTerm && (
                    <Grid item>
                      <Chip
                        label={`IP: ${debouncedSearchTerm}`}
                        onDelete={handleClearSearch}
                        color="primary"
                      />
                    </Grid>
                  )}
                  {availabilityFilter !== 'all' && (
                    <Grid item>
                      <Chip
                        label={`Disponibilidad: ${
                          availabilityFilter === 'available'
                            ? 'Disponible'
                            : 'Ocupado'
                        }`}
                        onDelete={handleClearAvailability}
                        color="primary"
                      />
                    </Grid>
                  )}
                  {(debouncedSearchTerm || availabilityFilter !== 'all') && (
                    <Grid item>
                      <SingleIconButton
                        startIcon={<HiOutlineTrash />}
                        color={'error'}
                        label="Limpiar filtros"
                        onClick={handleClearAllFilters}
                      />
                    </Grid>
                  )}
                </Grid>

                <Grid item>
                  <Typography variant="subtitle1" fontWeight="normal">
                    Total:{' '}
                    <strong>
                      {formatQuantity(filteredIps.length)?.slice(0, -3)}
                    </strong>
                  </Typography>
                </Grid>
              </Grid>

              {/* --------- loader --------- */}
              {isFiltering && (
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <CircularProgress size={24} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">Filtrando...</Typography>
                  </Grid>
                </Grid>
              )}
            </Box>

            {/* ================== main content ================== */}
            {filteredIps.length === 0 ? (
              <Typography variant="body1">
                No hay IPs que coincidan con los filtros.
              </Typography>
            ) : (
              <>
                <FixedSizeList
                  height={600}
                  width="100%"
                  itemSize={rowHeight}
                  itemCount={rowCount}
                  itemData={{ availableIps: filteredIps, columnCount }}
                  overscanCount={5} // Número de filas adicionales a renderizar fuera de la vista
                >
                  {Row}
                </FixedSizeList>
              </>
            )}
          </Box>
        }
      />
    </>
  );
};

export default IPDetailsCell;
