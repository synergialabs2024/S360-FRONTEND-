import { MRT_ColumnDef } from 'material-react-table';
import { IconSend } from '@tabler/icons-react';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { CustomSingleButton } from '@/shared/components';
import { TransaccionPichinchaPago } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

export const useColumnsTransaccionPichinchaPago = () => {
  const baseColums01 = useMemo<MRT_ColumnDef<TransaccionPichinchaPago>[]>(
    () => [
      {
        accessorKey: 'created_at',
        header: 'FECHA DE GENERACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'referencia_sobre',
        header: 'REFERENCIA SOBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'referencia_sobre'),
      },
      {
        accessorKey: 'secuencial_cobro',
        header: 'SECUENCIAL DE COBRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'secuencial_cobro'),
      },
      {
        accessorKey: 'pais_banco_cuenta',
        header: 'PAIS BANCO CUENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'pais_banco_cuenta'),
      },
      {
        accessorKey: 'contrapartida',
        header: 'CONTRA PARTIDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'contrapartida'),
      },
      {
        accessorKey: 'referencia',
        header: 'CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'referencia'),
      },
      {
        accessorKey: 'valor_procc',
        header: 'VALOR PROCESADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_procc'),
      },
      {
        accessorKey: 'valor',
        header: 'VALOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor'),
      },
      {
        accessorKey: 'moneda',
        header: 'MONEDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'moneda'),
      },
      {
        accessorKey: 'fecha_proceso',
        header: 'FECHA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_proceso'),
      },
      {
        accessorKey: 'hora_proceso',
        header: 'HORA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'hora_proceso'),
      },
      {
        accessorKey: 'referencia_adicional',
        header: 'REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'referencia_adicional'),
      },
      {
        accessorKey: 'numero_documento',
        header: 'NO. DOCUMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_documento'),
      },
      {
        accessorKey: 'numero_cuenta',
        header: 'NO. CUENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_cuenta'),
      },
      {
        accessorKey: 'estado',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado'),
      },
      {
        accessorKey: 'bitmap40',
        header: 'SMS. PROCESO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'bitmap40'),
      },
      {
        accessorKey: 'procesar',
        header: 'PROCESAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: () => {
          return (
            <CustomSingleButton
              label="Procesar"
              color="primary"
              variant="text"
              startIcon={<IconSend />}
              onClick={() => {
                console.log('true');
              }}
            />
          );
        },
      },
      /*
      {
        accessorKey: 'id_sobre',
        header: 'ID SOBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_sobre'),
      },
      {
        accessorKey: 'id_item',
        header: 'ID ITEM',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_item'),
      },
      {
        accessorKey: 'pais',
        header: 'PAIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'pais'),
      },
      {
        accessorKey: 'banco',
        header: 'BANCO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'banco'),
      },
      {
        accessorKey: 'formapago',
        header: 'FORMA PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'formapago'),
      },
      {
        accessorKey: 'mensaje',
        header: 'MENSAJE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'mensaje'),
      },
      {
        accessorKey: 'tipo_pago',
        header: 'TIPO PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_pago'),
      },
      {
        accessorKey: 'no_documento',
        header: 'NO DOCUMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'no_documento'),
      },
      {
        accessorKey: 'estado_impresion',
        header: 'ESTADO IMPRESION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_impresion'),
      },
      {
        accessorKey: 'numero_comprobante',
        header: 'NUMERO COMPROBANTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_comprobante'),
      },
      {
        accessorKey: 'bitmap39',
        header: 'BITMAP39',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'bitmap39'),
      },
      {
        accessorKey: 'bitmap40',
        header: 'BITMAP40',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'bitmap40'),
      },
      */
    ],
    [],
  );
  const baseColums02 = useMemo<MRT_ColumnDef<TransaccionPichinchaPago>[]>(
    () => [
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [],
  );

  // main columns ----------------------
  const transaccionPichinchaPagoColumns = useMemo<
    MRT_ColumnDef<TransaccionPichinchaPago>[]
  >(() => [...baseColums01, ...baseColums02], [baseColums01, baseColums02]);

  return { transaccionPichinchaPagoColumns };
};
