import { Grid, Typography } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useState } from 'react';

import {
  gridSize,
  LineaServicio,
  useIsMediaQuery,
  PermissionsEnum,
  ClientLimiTypeData,
} from '@/shared';
import {
  SingleIconButton,
  CustomAutocompleteNoForm,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlAlquiler } from '../../../pages/tables/AlquilerPages';

export interface AlquilerTitleProps {
  alquiler?: LineaServicio & {
    celular_adicional?: string;
  };
}

const AlquilerTitle: React.FC<AlquilerTitleProps> = ({ alquiler }) => {
  useCheckPermission(PermissionsEnum.clientes_view_cliente);

  const [selectedOption, setSelectedOption] = useState<string | null>(
    alquiler?.uuid || null,
  );

  ///* hooks ----------------
  const navigate = useNavigate();
  const isMobile = useIsMediaQuery('sm');

  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="space-between"
      alignItems="start"
    >
      <Grid item container xs={12} md={8} alignItems="start" spacing={1}>
        <Grid item xs={2} sm="auto">
          <SingleIconButton
            startIcon={<FaArrowLeft />}
            label="Volver"
            tooltipPlacement="left"
            onClick={() => {
              navigate(returnUrlAlquiler);
            }}
            color="inherit"
            size={gridSize}
          />
        </Grid>

        <Grid item xs>
          <Typography variant="h3" pb={isMobile ? 1 : 1}>
            {alquiler?.cliente_data?.razon_social}
            <span className="cliente__page--title">
              (#{alquiler?.contrato_data?.numero_contrato})
            </span>
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} md={3}>
        <CustomAutocompleteNoForm<ClientLimiTypeData>
          label="Línea de servicio"
          inLineLabel
          value={selectedOption}
          actualValueKey="uuid"
          onChange={newValue => {
            setSelectedOption(newValue as string);
            navigate(`${returnUrlAlquiler}/crear/${newValue}`);
          }}
          options={alquiler?.client_lines_data || []}
          getOptionLabel={option =>
            option?.contrato_data?.identificacion_pago || ''
          }
          loading={false}
          required
          error={false}
          disableClearable
          size={gridSize}
        />
      </Grid>
    </Grid>
  );
};

export default AlquilerTitle;
