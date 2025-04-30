import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { PagoOficinaVirtualLog } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsPagoOficinaVirtual = () => {
  const pagooficinavirtualBaseColumns01 = useMemo<
    MRT_ColumnDef<PagoOficinaVirtualLog>[]
  >(
    () => [
      {
        accessorKey: 'estado',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado'),
      },
      {
        accessorKey: 'razon_social',
        header: 'RAZON SOCIAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'razon_social'),
      },
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'identificacion'),
      },
      {
        accessorKey: 'deuda',
        header: 'DEUDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'deuda'),
      },
      {
        accessorKey: 'authorization_code',
        header: 'CODIGO DE IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'authorization_code'),
      },
      {
        accessorKey: 'status',
        header: 'STATUS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'status'),
      },
      {
        accessorKey: 'reference',
        header: 'REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'reference'),
      },
      {
        accessorKey: 'client_id',
        header: 'ID DEL CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'client_id'),
      },
      {
        accessorKey: 'transaction_date',
        header: 'FECHA TRANSACCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'transaction_date'),
      },
      {
        accessorKey: 'message',
        header: 'MENSAJE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.message ? row.original.message : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Mensaje de ${row?.original?.identificacion}`}
            />
          );
        },
      },
      {
        accessorKey: 'card_type',
        header: 'TIPO DE TARJETA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'card_type'),
      },
      {
        accessorKey: 'card_token',
        header: 'TOKEN DE TARJETA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'card_token'),
      },
      {
        accessorKey: 'card_number',
        header: 'NUMERO DE TARJETA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'card_number'),
      },
      {
        accessorKey: 'card_brand',
        header: 'MARCA DE TARJETA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'card_brand'),
      },
      {
        accessorKey: 'card_holder',
        header: 'TITULAR DE TARJETA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'card_holder'),
      },
      {
        accessorKey: 'ip_address',
        header: 'DIRECCION IP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip_address'),
      },
      {
        accessorKey: 'custom_value',
        header: 'VALOR CONFIGURADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'custom_value'),
      },

      {
        accessorKey: 'expiry_month',
        header: 'MES DE EXPIRACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'expiry_month'),
      },
      {
        accessorKey: 'expiry_year',
        header: 'AÑO DE EXPIRACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'expiry_year'),
      },
      {
        accessorKey: 'number',
        header: 'NUMERO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'number'),
      },
      {
        accessorKey: 'linea_numero',
        header: 'LINEA DEL NUMERO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'linea_numero'),
      },
      {
        accessorKey: 'linea_servicio',
        header: 'LINEA DE SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'linea_servicio'),
      },
      {
        accessorKey: 'cliente',
        header: 'CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cliente'),
      },
    ],
    [],
  );

  const pagooficinavirtualColumns = useMemo<
    MRT_ColumnDef<PagoOficinaVirtualLog>[]
  >(
    () => [
      ...pagooficinavirtualBaseColumns01,
      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [pagooficinavirtualBaseColumns01],
  );

  return {
    pagooficinavirtualColumns,
  };
};
