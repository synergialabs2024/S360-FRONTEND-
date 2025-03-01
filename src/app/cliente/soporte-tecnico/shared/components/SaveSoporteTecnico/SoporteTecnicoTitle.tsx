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
import { returnUrlSoporteTecnico } from '../../../pages/tables/SoporteTecnicoPages';

export interface SoporteTecnicoTitleProps {
  soporte_tecnico?: LineaServicio & {
    celular_adicional?: string;
  };
}

const SoporteTecnicoTitle: React.FC<SoporteTecnicoTitleProps> = ({
  soporte_tecnico,
}) => {
  useCheckPermission(PermissionsEnum.clientes_view_cliente);

  const [selectedOption, setSelectedOption] = useState<string | null>(
    soporte_tecnico?.uuid || null,
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
              navigate(returnUrlSoporteTecnico);
            }}
            color="inherit"
            size={gridSize}
          />
        </Grid>

        <Grid item xs>
          <Typography variant="h3" pb={isMobile ? 1 : 1}>
            {soporte_tecnico?.cliente_data?.razon_social}
            <span className="cliente__page--title">
              (#{soporte_tecnico?.contrato_data?.numero_contrato})
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
            navigate(`${returnUrlSoporteTecnico}/${newValue}`);
          }}
          options={soporte_tecnico?.client_lines_data || []}
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

export default SoporteTecnicoTitle;
