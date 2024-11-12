import { Grid } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { MaterialesUtilizadosOTTableType } from '@/app/tecnico/install-asignada/shared/components/form';
import { useColumnsEquiposMaterialesInstallOT } from '@/app/tecnico/install-asignada/shared/hooks';
import { gridSize, OrdenTrabajo, TipoProductoEnumChoice } from '@/shared';
import {
  CustomMinimalTable,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
} from '@/shared/components';

export type ClienteFibraOTMaterialesUtilizadosProps = {
  ordenTrabajo: OrdenTrabajo;
};

const ClienteFibraOTMaterialesUtilizados: React.FC<
  ClienteFibraOTMaterialesUtilizadosProps
> = ({ ordenTrabajo }) => {
  const materialesUtilizados = ordenTrabajo?.materiales_utilizados || [];

  ///* columns --------------------
  const { baseColumnsEquiposMaterialesInstallOT01 } =
    useColumnsEquiposMaterialesInstallOT({
      showCurrentStockColumn: false,
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

          return isFibra ? ordenTrabajo?.punta_inicial_fibra : '-';
        },
      },

      {
        accessorKey: 'punta_final',
        header: 'PUNTA FINAL',
        Cell: ({ row }) => {
          const isFibra =
            row.original?.producto_data?.tipo === TipoProductoEnumChoice.FIBRA;

          return isFibra ? ordenTrabajo?.punta_final_fibra : '-';
        },
      },
    ],
    [baseColumnsEquiposMaterialesInstallOT01, ordenTrabajo],
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
          <CustomMinimalTable<MaterialesUtilizadosOTTableType>
            columns={materialesUtilizadosColumns}
            data={(materialesUtilizados as any) || []}
            enablePagination
            density="comfortable"
          />
        </Grid>
      </Grid>

      {/* ==================== FORM ==================== */}
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        mt={3}
      >
        <CustomTextFieldNoForm
          label="Metraje Autorizado Fibra"
          value={ordenTrabajo?.ciudad_data?.metraje_autorizado}
          disabled
        />
        <CustomTextFieldNoForm
          label="Metraje Exedente Fibra"
          value={ordenTrabajo?.metraje_exedente_fibra || '0.00'}
          disabled
        />
        <CustomTextFieldNoForm
          label="Punta Inicial Fibra"
          value={ordenTrabajo?.punta_inicial_fibra || '0.00'}
          disabled
        />
        <CustomTextFieldNoForm
          label="Punta Final Fibra"
          value={ordenTrabajo?.punta_final_fibra || '0.00'}
          disabled
        />
        <CustomTextFieldNoForm
          label="Metraje Utilizado Fibra"
          value={ordenTrabajo?.metraje_utilizado_fibra || '0.00'}
          disabled
          size={gridSize}
        />
      </Grid>
    </>
  );
};

export default ClienteFibraOTMaterialesUtilizados;
