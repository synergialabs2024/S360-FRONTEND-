import { useCallback, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import {
  SingleIconButton,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { TransferenciaMaterial } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { TextField } from '@mui/material';
import { ProductosDisponiblesStoreKey, useProductosStore } from '@/store/app';
import { IoMdTrash } from 'react-icons/io';
import SeriesSolicitudTranferenciaModal from './modal/SeriesSolicitudTransferenciaModal';
import { ProductosDisponiblesTableType } from '../useColumnsProductosDisponibles';
import { ShowSeriesModal } from '../modals';

export const useColumnsTransferenciaMaterial = () => {
  ///* global state --------------------
  const removeSelectedItem = useProductosStore(s => s.removeSelectedItem);
  const updateSelectedItemValue = useProductosStore(
    s => s.updateSelectedItemValue,
  );

  const onChangePuntaInit = useCallback(
    (value: string, item: ProductosDisponiblesTableType) => {
      const usedQuantity = (item.cantidad || 0) - +value;

      updateSelectedItemValue({
        keyStore: ProductosDisponiblesStoreKey.productosDisponibles,
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
    (value: string[], item: ProductosDisponiblesTableType) => {
      updateSelectedItemValue({
        keyStore: ProductosDisponiblesStoreKey.productosDisponibles,
        updatedItem: {
          ...item,
          series: value ? value : [],
        } as any,
      });
    },
    [updateSelectedItemValue],
  );

  const transferenciaProductoBaseColumns = useMemo<
    MRT_ColumnDef<TransferenciaMaterial>[]
  >(
    () => [
      {
        accessorKey: 'secuencial',
        header: 'NUMERO REGISTRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'secuencial'),
      },
      {
        accessorKey: 'productos',
        header: 'PRODUCTOS',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          return <ShowSeriesModal Arrays={row.original} />;
        },
      },
    ],
    [],
  );

  const transferenciaMaterialBaseColumns01 = useMemo<
    MRT_ColumnDef<TransferenciaMaterial>[]
  >(
    () => [
      {
        accessorKey: 'observacion',
        header: 'OBSERVACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.observacion
            ? row.original.observacion
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Observacion"
            />
          );
        },
      },
      {
        accessorKey: 'bodega_origen__name',
        header: 'BODEGA ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['bodega_origen_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion_origen__name',
        header: 'UBICACIÓN ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['ubicacion_origen_data', 'nombre']),
      },
      {
        accessorKey: 'bodega_destino__name',
        header: 'BODEGA DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['bodega_destino_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion_destino__name',
        header: 'UBICACIÓN DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['ubicacion_destino_data', 'nombre']),
      },
      {
        accessorKey: 'motivo_transferencia__name',
        header: 'MOTIVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['motivo_transferencia_data', 'nombre']),
      },
      {
        accessorKey: 'user_create__name',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['user_create']),
      },
    ],
    [],
  );

  const transferenciaMaterialColumns = useMemo<
    MRT_ColumnDef<TransferenciaMaterial>[]
  >(
    () => [
      ...transferenciaProductoBaseColumns,
      ...transferenciaMaterialBaseColumns01,
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
    [transferenciaMaterialBaseColumns01, transferenciaProductoBaseColumns],
  );

  const baseColumnsTransferencia01 = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
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

  const crearMaterialColumnsRecepcion = useMemo<
    MRT_ColumnDef<ProductosDisponiblesTableType>[]
  >(
    () => [
      ...baseColumnsTransferencia01,
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
        accessorKey: 'cantidad_aprobada',
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
      {
        accessorKey: 'producto__requiere_series',
        header: 'CONTIENE SERIE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          const requiereSeries = row?.original?.requiere_series;
          return <>{requiereSeries ? 'Con permiso' : 'Sin permiso'}</>;
        },
      },
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
            <SeriesSolicitudTranferenciaModal
              tipoSerie={row.original.requiere_series}
              Arrays={row.original}
              modalTitle={`Serie para ${row?.original?.codigo}`}
              cantidadBoolean={obtenerValor(cantidad)}
              randomButton={true}
              onDataChange={newData => {
                onChangeSerieInit(newData, row.original);
              }}
            />
          );
        },
      },
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
                keyStore: ProductosDisponiblesStoreKey.productosDisponibles,
              });
            }}
            justifyContent="center"
          />
        ),
      },
    ],
    [
      baseColumnsTransferencia01,
      onChangePuntaInit,
      removeSelectedItem,
      onChangeSerieInit,
    ],
  );
  return {
    transferenciaMaterialColumns,
    crearMaterialColumnsRecepcion,
  };
};
