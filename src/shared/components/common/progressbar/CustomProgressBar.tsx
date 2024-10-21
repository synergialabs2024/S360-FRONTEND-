import {
  Box,
  lighten,
  LinearProgress,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

interface Props {
  color?: 'primary' | 'secondary';
  hex?: string;
  free_count: number;
  total_count: number;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  width: '100%',
  borderRadius: '10px',
  backgroundColor:
    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
}));

const WhiteTextTypography = styled(Typography)({
  fontWeight: 'bold',
});

const CustomProgressBar: React.FC<Props> = ({
  color = 'primary',
  hex,
  free_count,
  total_count,
}) => {
  const theme = useTheme();

  // Determinar el color interno
  let internalColor: string;
  if (hex && /^#[0-9A-F]{6}$/i.test(hex)) {
    internalColor = hex;
  } else {
    internalColor =
      color === 'primary'
        ? theme.palette.primary.main
        : theme.palette.secondary.main;
  }

  // Calcular IPs en uso y el porcentaje
  const inUseIps = total_count - free_count;

  let value: number = total_count > 0 ? (inUseIps / total_count) * 100 : 0;
  value = Number.isNaN(value) ? 0 : parseFloat(value.toFixed(2));

  if (value < 0 || value > 100) {
    console.error(`Valor inválido para el porcentaje: ${value}`);
    throw new Error(
      'Invalid value prop -- please use a number between 0 and 100.',
    );
  }

  return (
    <Box position="relative" display="inline-flex" width="100%">
      <BorderLinearProgress
        variant="determinate"
        value={value}
        color={hex ? undefined : color} // Si hex está definido, no usar color predeterminado
        sx={{
          backgroundColor: hex ? lighten(internalColor, 0.5) : undefined,
          '& .MuiLinearProgress-bar': {
            borderRadius: 20,
            backgroundColor: hex ? internalColor : undefined,
          },
        }}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <WhiteTextTypography variant="body2">
          {`${value}% (${inUseIps} de ${total_count})`}
        </WhiteTextTypography>
      </Box>
    </Box>
  );
};

export default CustomProgressBar;
