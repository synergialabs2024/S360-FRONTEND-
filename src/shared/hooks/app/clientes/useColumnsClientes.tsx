import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { Cliente } from '@/shared/interfaces';

export const useColumnsClientes = () => {
  const clientesFibraColumnsB01 = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [],
    [],
  );

  const clientesFibraColumnsActivos = useMemo<MRT_ColumnDef<Cliente>[]>(
    () => [...clientesFibraColumnsB01],
    [clientesFibraColumnsB01],
  );

  return {
    clientesFibraColumnsActivos,
  };
};
