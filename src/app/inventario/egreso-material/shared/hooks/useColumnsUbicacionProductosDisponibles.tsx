/* eslint-disable indent */
import { TextField } from '@mui/material';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { UbicacionProductosDisponiblesTableType } from '../components/SaveEgresoMaterial/SaveEgresoMaterial';
import { useCallback, useMemo } from 'react';
import { emptyCellNested, formatQuantityCell, TABLE_CONSTANTS } from '@/shared';
import {
  UbicacionProductosDisponiblesStoreKey,
  useUbicacionProductosStore,
} from '@/store/app';
import SeriesUbicacionProductoModal from '../../pages/modal/SeriesUbicacionProductoModal';
import { SingleIconButton } from '@/shared/components';
import { IoMdTrash } from 'react-icons/io';

type UseColumnsEquiposEgresoMaterial = {
  showActionColumn?: boolean;
  showCurrentStockColumn?: boolean;
  onActionProductosRowNode?: (
    item: UbicacionProductosDisponiblesTableType,
  ) => React.ReactNode;
};

type MRTUbicacionProductoTableType = {
  row: MRT_Row<UbicacionProductosDisponiblesTableType>;
};

export const useColumnsUbicacionProductosDisponibles = ({
  showActionColumn = false,
  onActionProductosRowNode,
  showCurrentStockColumn = true,
}: UseColumnsEquiposEgresoMaterial = {}) => {
  ///* global state --------------------
  const removeSelectedItem = useUbicacionProductosStore(
    s => s.removeSelectedItem,
  );
  const updateSelectedItemValue = useUbicacionProductosStore(
    s => s.updateSelectedItemValue,
  );

  const onChangePuntaInit = useCallback(
    (value: string, item: UbicacionProductosDisponiblesTableType) => {
      const usedQuantity = (item.cantidad || 0) - +value;

      updateSelectedItemValue({
        keyStore:
          UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
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
    (value: string[], item: UbicacionProductosDisponiblesTableType) => {
      updateSelectedItemValue({
        keyStore:
          UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
        updatedItem: {
          ...item,
          series: value ? value : [],
        } as any,
      });
    },
    [updateSelectedItemValue],
  );

  ///* base columns -------------------------------
  const baseColumnsUbicacionProductosDisponibles01 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'codigo',
        header: 'CÓDIGO',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'codigo']),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'codigo']),
      },
      ...(showCurrentStockColumn
        ? [
            {
              accessorKey: 'stock_actual',
              header: 'STOCK',
              enableColumnFilter: false,
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                formatQuantityCell(row, 'stock_actual'),
            },
          ]
        : []),
    ],
    [showCurrentStockColumn],
  );
  const baseColumnsUbicacionProductosDisponibles02 = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__series',
        header: 'SERIES',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => {
          return (
            <SeriesUbicacionProductoModal
              requiereSerie={row.original.producto_data?.requiere_series}
              dataArray={row?.original?.series || []}
              modalTitle={`Serie para ${row?.original?.producto_data?.codigo}`}
              onDataChange={newData => onChangeSerieInit(newData, row.original)}
            />
          );
        },
      },
    ],
    [onChangeSerieInit],
  );

  const modalMaterialColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles01,

      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              header: 'ACCIÓN',
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                onActionProductosRowNode?.(row.original),
            },
          ]
        : []),
    ],
    [
      baseColumnsUbicacionProductosDisponibles01,
      onActionProductosRowNode,
      showActionColumn,
    ],
  );

  const crearMaterialColumns = useMemo<
    MRT_ColumnDef<UbicacionProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsUbicacionProductosDisponibles01,
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
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
      ...baseColumnsUbicacionProductosDisponibles02,
      {
        accessorKey: 'remove',
        header: 'ACCIONES',
        Cell: ({ row }) => (
          <SingleIconButton
            label="Remover"
            startIcon={<IoMdTrash />}
            color="error"
            tooltipPlacement="right-end"
            onClick={() => {
              removeSelectedItem({
                item: row.original,
                keyStore:
                  UbicacionProductosDisponiblesStoreKey.ubicacionProductosDisponibles,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [
      baseColumnsUbicacionProductosDisponibles01,
      baseColumnsUbicacionProductosDisponibles02,
      onChangePuntaInit,
      removeSelectedItem,
    ],
  );

  return {
    baseColumnsUbicacionProductosDisponibles01,
    modalMaterialColumns,
    crearMaterialColumns,
  };
};
