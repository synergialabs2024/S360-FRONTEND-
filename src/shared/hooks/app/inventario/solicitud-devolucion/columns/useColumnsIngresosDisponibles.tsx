/* eslint-disable indent */
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useCallback, useMemo } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { TextField } from '@mui/material';

import { SeriesIngresoModal } from '../modal';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { IngresoMaterial } from '@/shared/interfaces';
import { SingleIconButton } from '@/shared/components';
import { emptyCellNested, emptyCellOneLevel } from '@/shared/utils';
import { IngresosDisponiblesStoreKey, useIngresosStore } from '@/store/app';

export type IngresosDisponiblesTableType = IngresoMaterial & {
  cantidad?: number;
  cantidad_pedida?: number;
  requiere_series?: boolean;
  codigo?: string;
  descripcion?: string;
  nombre?: string;
  codigo_auxiliar?: string;
  categoria?: string;
  categoria_data?: string[];
  series?: string[];
  tipo?: string;

  usedQuantity?: number;
  selectedSeries?: string[];
  savedSeries?: string[];
};

type UseColumnsEquiposIngreso = {
  showActionColumn?: boolean;
  onActionIngresosRowNode?: (
    item: IngresosDisponiblesTableType,
  ) => React.ReactNode;
};

type MRTIngresoTableType = {
  row: MRT_Row<IngresosDisponiblesTableType>;
};

export const useColumnsIngresosDisponibles = ({
  showActionColumn = false,
  onActionIngresosRowNode,
}: UseColumnsEquiposIngreso = {}) => {
  ///* global state --------------------
  const removeSelectedItem = useIngresosStore(s => s.removeSelectedItem);
  const updateSelectedItemValue = useIngresosStore(
    s => s.updateSelectedItemValue,
  );
  const onChangePuntaInit = useCallback(
    (value: string, item: IngresosDisponiblesTableType) => {
      const usedQuantity = (item.cantidad || 0) - +value;

      updateSelectedItemValue({
        keyStore: IngresosDisponiblesStoreKey.ingresosDisponibles,
        updatedItem: {
          ...item,
          cantidad: +value,
          usedQuantity: usedQuantity > 0 ? usedQuantity : 0,
        } as any,
      });
    },
    [updateSelectedItemValue],
  );
  const onChangeSerieInit = useCallback(
    (value: string[], item: IngresosDisponiblesTableType) => {
      updateSelectedItemValue({
        keyStore: IngresosDisponiblesStoreKey.ingresosDisponibles,
        updatedItem: {
          ...item,
          series: value ? value : [],
        } as any,
      });
    },
    [updateSelectedItemValue],
  );

  ///* base columns -------------------------------
  const ingresoBaseColumns01 = useMemo<
    MRT_ColumnDef<IngresosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'categoria_data__name',
        header: 'CATEGORIA',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellNested(row, ['categoria_data', 'nombre']),
      },
      {
        accessorKey: 'codigo',
        header: 'CÓDIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
    ],
    [],
  );

  const ingresoBaseColumns02 = useMemo<
    MRT_ColumnDef<IngresosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          const cantidad = row.original.cantidad;

          function obtenerValor(valueCantidad: number | undefined): boolean {
            if (valueCantidad !== undefined) {
              return false;
            }
            return true;
          }

          return (
            <SeriesIngresoModal
              tipoSerie={row.original.requiere_series}
              Arrays={row.original}
              modalTitle={`Serie para ${row?.original?.codigo}`}
              cantidadBoolean={obtenerValor(cantidad)}
              onDataChange={newData => onChangeSerieInit(newData, row.original)}
            />
          );
        },
      },
    ],
    [onChangeSerieInit],
  );

  const crearMaterialColumnsRecepcion = useMemo<
    MRT_ColumnDef<IngresosDisponiblesTableType>[]
  >(
    () => [
      ...ingresoBaseColumns01,
      {
        accessorKey: 'cantidad_pedida',
        header: 'CANTIDAD PEDIDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original.cantidad_pedida || ''}
              type="number"
              disabled
            />
          );
        },
      },
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD APROBADA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original.cantidad || ''}
              onChange={e => onChangePuntaInit(e.target.value, row.original)}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },
      ...ingresoBaseColumns02,
      {
        accessorKey: 'remove',
        header: 'ACCIONES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => (
          <SingleIconButton
            label="Remover"
            startIcon={<IoMdTrash />}
            color="error"
            tooltipPlacement="right-end"
            onClick={() => {
              removeSelectedItem({
                item: row.original,
                keyStore: IngresosDisponiblesStoreKey.ingresosDisponibles,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [
      ingresoBaseColumns01,
      ingresoBaseColumns02,
      onChangePuntaInit,
      removeSelectedItem,
    ],
  );

  const modalMaterialColumns = useMemo<
    MRT_ColumnDef<IngresosDisponiblesTableType>[]
  >(
    () => [
      ...ingresoBaseColumns01,
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return (
            <TextField
              variant="outlined"
              value={row.original.cantidad || ''}
              onChange={e => onChangePuntaInit(e.target.value, row.original)}
              type="number"
              inputProps={{
                min: 0,
                step: 1,
              }}
            />
          );
        },
      },

      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
              header: 'ACCIÓN',
              Cell: ({ row }: MRTIngresoTableType) =>
                onActionIngresosRowNode?.(row.original),
            },
          ]
        : []),
    ],
    [
      ingresoBaseColumns01,
      onActionIngresosRowNode,
      onChangePuntaInit,
      showActionColumn,
    ],
  );

  return {
    modalMaterialColumns,
    crearMaterialColumnsRecepcion,
  };
};
