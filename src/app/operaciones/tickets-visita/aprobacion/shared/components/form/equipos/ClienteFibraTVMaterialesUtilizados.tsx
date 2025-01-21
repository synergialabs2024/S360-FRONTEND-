import { Grid } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { MaterialesUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';
import { humanizeString, TipoProductoEnumChoice } from '@/shared';
import {
  CustomMinimalTable,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export type ClienteFibraTVMaterialesUtilizadosProps = {
  ticket: Ticket;
};

const ClienteFibraTVMaterialesUtilizados: React.FC<
  ClienteFibraTVMaterialesUtilizadosProps
> = ({ ticket }) => {
  const materialesUtilizados = ticket?.materiales_utilizados || [];

  ///* columns --------------------
  const { baseColumnsEquiposMaterialesInstallOT01 } =
    useColumnsEquiposMaterialesInstallOT({
      showCurrentStockColumn: false,
      showModelColumn: false,
      showModelOnlyViewColumn: true,
    });

  const materialesUtilizadosColumns = useMemo<
    MRT_ColumnDef<MaterialesUtilizadosOTTableType>[]
  >(
    () => [
      ...baseColumnsEquiposMaterialesInstallOT01,
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        Cell: ({ row }) => {
          return (row.original as any)?.cantidad || 0;
        },
      },

      {
        accessorKey: 'punta_inicio',
        header: 'PUNTA INICIAL',
        Cell: ({ row }) => {
          const isFibra =
            row.original?.producto_data?.tipo === TipoProductoEnumChoice.FIBRA;

          return isFibra ? ticket?.punta_inicial_fibra : '-';
        },
      },

      {
        accessorKey: 'punta_final',
        header: 'PUNTA FINAL',
        Cell: ({ row }) => {
          const isFibra =
            row.original?.producto_data?.tipo === TipoProductoEnumChoice.FIBRA;

          return isFibra ? ticket?.punta_final_fibra : '-';
        },
      },
    ],
    [baseColumnsEquiposMaterialesInstallOT01, ticket],
  );

  return (
    <>
      <CustomTypoLabel
        text="Materiales Utilizados"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      {/* ==================== TABLE ==================== */}
      <Grid item container xs={12} spacing={1}>
        <Grid item xs={12}>
          <CustomTextFieldNoForm
            label="MODELO FIBRA"
            value={humanizeString(ticket?.modelo_fibra_utilizada || 'N/A')}
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <CustomMinimalTable<MaterialesUtilizadosOTTableType>
            columns={materialesUtilizadosColumns}
            data={(materialesUtilizados as any) || []}
            enablePagination
            density="comfortable"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ClienteFibraTVMaterialesUtilizados;
