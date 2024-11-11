import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

import {
  ClientLimiTypeData,
  gridSize,
  LineaServicio,
  useIsMediaQuery,
} from '@/shared';
import {
  CustomAutocompleteNoForm,
  SingleIconButton,
} from '@/shared/components';
import { returnUrlClientesFibraPage } from '../../../pages/tables/ClientesFibraMainPage';

export type ClienteFibraTitleProps = {
  serviceLine: LineaServicio;
};

const ClienteFibraTitle: React.FC<ClienteFibraTitleProps> = ({
  serviceLine,
}) => {
  ///* hooks ----------------
  const navigate = useNavigate();
  const isMobile = useIsMediaQuery('sm');

  const [selectedOption, setSelectedOption] = useState<string | null>(
    serviceLine?.uuid || null,
  );

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
              navigate(returnUrlClientesFibraPage);
            }}
            color="inherit"
            size={gridSize}
          />
        </Grid>

        <Grid item xs>
          <Typography variant="h3" pb={isMobile ? 1 : 1}>
            {serviceLine?.cliente_data?.razon_social}
            <span className="cliente__page--title">
              (#{serviceLine?.contrato_data?.numero_contrato})
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
            navigate(`${returnUrlClientesFibraPage}/${newValue}`);
          }}
          options={serviceLine?.client_lines_data || []}
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

export default ClienteFibraTitle;
