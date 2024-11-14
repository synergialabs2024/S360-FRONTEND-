import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

export const useButtonsAuditoriaConsumo = () => {
  const queryClient = useQueryClient();

  const consultaClientesSuspendidosConsumo = () => {
    queryClient.invalidateQueries({
      queryKey: ['cliente-suspendidos-consumos'],
    });
  };

  const consultaClientesActivosAltoConsumo = () => {
    queryClient.invalidateQueries({
      queryKey: ['cliente-activos-alto-consumos'],
    });
  };

  const consultaClientesActivosMoroso = () => {
    queryClient.invalidateQueries({
      queryKey: ['cliente-activos-morosos'],
    });
  };

  const consultaClientesSuspendidosConsumoMK = () => {
    queryClient.invalidateQueries({
      queryKey: ['cliente-suspendidos-consumos-mks'],
    });
  };

  const buttonClientesSuspendidosConsumo = () => {
    return (
      <Button
        sx={{ m: '5px' }}
        onClick={() => {
          consultaClientesSuspendidosConsumo();
        }}
      >
        CARGAR CLIENTES SUSPENDIDOS
      </Button>
    );
  };

  const buttonClientesActivosAltoConsumo = () => {
    return (
      <Button
        sx={{ m: '5px' }}
        onClick={() => {
          consultaClientesActivosAltoConsumo();
        }}
      >
        CARGAR CLIENTES ACTIVOS
      </Button>
    );
  };

  const buttonActivosMoroso = () => {
    return (
      <Button
        sx={{ m: '5px' }}
        onClick={() => {
          consultaClientesActivosMoroso();
        }}
      >
        CARGAR CLIENTES ACTIVOS EN MOROSO
      </Button>
    );
  };

  const buttonSuspendidosConsumoMK = () => {
    return (
      <>
        <Button
          sx={{ m: '5px' }}
          onClick={() => {
            consultaClientesSuspendidosConsumoMK();
          }}
        >
          CARGAR CLIENTES SUSPENDIDOS DE MK
        </Button>
        <Button color="warning" sx={{ m: '5px' }}>
          CCR NO CONSULTADOS
        </Button>
      </>
    );
  };

  return {
    buttonClientesSuspendidosConsumo,
    buttonClientesActivosAltoConsumo,
    buttonActivosMoroso,
    buttonSuspendidosConsumoMK,
  };
};
