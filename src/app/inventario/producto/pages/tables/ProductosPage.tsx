/* eslint-disable indent */
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchProductos, useUpdateProducto } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import {
  MODEL_BOOLEAN,
  MODEL_STATE_BOOLEAN,
  TABLE_CONSTANTS,
} from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Producto } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { PricesModalTableCell } from '../../shared/table';

export const returnUrlProductosPage = ROUTER_PATHS.inventario.productosNav;

export type ProductosPageProps = {};

const ProductosPage: React.FC<ProductosPageProps> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_producto);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateProducto({
    enableNavigate: false,
  });
  const changeEsParaVenta = useUpdateProducto<{ es_para_venta: boolean }>({
    enableNavigate: false,
  });
  const changeAplicaPromocion = useUpdateProducto<{
    aplica_promocion: boolean;
  }>({
    enableNavigate: false,
  });
  const changeReporteArcotel = useUpdateProducto<{
    considera_reporte_arcotel: boolean;
  }>({
    enableNavigate: false,
  });

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data
  const {
    data: ProductosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchProductos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (producto: Producto) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Producto',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlProductosPage}/editar/${producto.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Producto>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },

      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return (
            <ViewMoreTextModalTableCell
              longText={row?.original?.codigo}
              limit={27}
              modalTitle={`Código: ${row?.original?.nombre}`}
            />
          );
        },
      },
      {
        accessorKey: 'codigo_auxiliar',
        header: 'CODIGO AUXILIAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return (
            <ViewMoreTextModalTableCell
              longText={row?.original?.codigo_auxiliar}
              limit={27}
              modalTitle={`Código Auxiliar: ${row?.original?.nombre}`}
            />
          );
        },
      },

      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return (
            <ViewMoreTextModalTableCell
              longText={row?.original?.descripcion}
              limit={27}
              modalTitle={`Descripción de ${row?.original?.nombre}`}
            />
          );
        },
      },

      {
        accessorKey: 'es_para_venta',
        header: 'ES PARA VENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableSorting: false,
        enableColumnFilter: true,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.es_para_venta === 'boolean' ? (
            <CustomSwitch
              title="es_para_venta"
              checked={row.original?.es_para_venta}
              isSimpleBoolean
              onChangeChecked={() => {
                if (!hasPermission(PermissionsEnum.inventario_change_producto))
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar es_para_venta',
                  subtitle:
                    '¿Está seguro que desea cambiar el es_para_venta de este registro?',
                  onConfirm: () => {
                    changeEsParaVenta.mutate({
                      id: row.original.id!,
                      data: {
                        es_para_venta: !row.original.es_para_venta,
                      },
                    });
                    setConfirmDialogIsOpen(false);
                  },
                });
              }}
            />
          ) : (
            'N/A'
          );
        },
      },
      {
        accessorKey: 'aplica_promocion',
        header: 'APLICA PROMOCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableSorting: false,
        enableColumnFilter: true,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.aplica_promocion === 'boolean' ? (
            <CustomSwitch
              title="aplica_promocion"
              checked={row.original?.aplica_promocion}
              isSimpleBoolean
              onChangeChecked={() => {
                if (!hasPermission(PermissionsEnum.inventario_change_producto))
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar Aplica Promocion',
                  subtitle:
                    '¿Está seguro que desea cambiar el aplica_promocion de este registro?',
                  onConfirm: () => {
                    changeAplicaPromocion.mutate({
                      id: row.original.id!,
                      data: {
                        aplica_promocion: !row.original.aplica_promocion,
                      },
                    });
                    setConfirmDialogIsOpen(false);
                  },
                });
              }}
            />
          ) : (
            'N/A'
          );
        },
      },
      {
        accessorKey: 'considera_reporte_arcotel',
        header: 'CONSIDERA REPORTE ARCOTEL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableSorting: false,
        enableColumnFilter: true,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.considera_reporte_arcotel ===
            'boolean' ? (
            <CustomSwitch
              title="considera_reporte_arcotel"
              checked={row.original?.considera_reporte_arcotel}
              isSimpleBoolean
              onChangeChecked={() => {
                if (!hasPermission(PermissionsEnum.inventario_change_producto))
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar Consideración de Reporte de Arcotel',
                  subtitle:
                    '¿Está seguro que desea cambiar el reporte arcotel de este registro?',
                  onConfirm: () => {
                    changeReporteArcotel.mutate({
                      id: row.original.id!,
                      data: {
                        considera_reporte_arcotel:
                          !row.original.considera_reporte_arcotel,
                      },
                    });
                    setConfirmDialogIsOpen(false);
                  },
                });
              }}
            />
          ) : (
            'N/A'
          );
        },
      },

      {
        accessorKey: 'precios',
        header: 'PRECIOS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => (
          <PricesModalTableCell precios={row.original?.precios || []} />
        ),
      },

      {
        accessorKey: 'tipo',
        header: 'TIPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo'),
      },
      {
        accessorKey: 'modelo',
        header: 'MODELO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['modelo_data', 'nombre']),
      },
      {
        accessorKey: 'categoria__nombre',
        header: 'CATEGORIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['categoria_data', 'nombre']),
      },
      {
        accessorKey: 'iva',
        header: 'IVA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return row.original?.iva_data?.percentage
            ? `${row.original?.iva_data?.percentage}%`
            : 'N/A';
        },
      },

      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.state === 'boolean' ? (
            <CustomSwitch
              title="state"
              checked={row.original?.state}
              onChangeChecked={() => {
                if (!hasPermission(PermissionsEnum.inventario_change_producto))
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar state',
                  subtitle:
                    '¿Está seguro que desea cambiar el state de este registro?',
                  onConfirm: () => {
                    changeState.mutate({
                      id: row.original.id!,
                      data: {
                        state: !row.original.state,
                      },
                    });
                    setConfirmDialogIsOpen(false);
                  },
                });
              }}
            />
          ) : (
            'N/A'
          );
        },
      },
      {
        accessorKey: 'requiere_series',
        header: 'REQUIERE SERIE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.requiere_series === 'boolean' ? (
            <CustomSwitch
              title="requiere_series"
              checked={row.original?.requiere_series}
              onChangeChecked={() => {}}
            />
          ) : (
            'N/A'
          );
        },
      },
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
    [
      changeState,
      changeEsParaVenta,
      changeAplicaPromocion,
      changeReporteArcotel,
      setConfirmDialog,
      setConfirmDialogIsOpen,
    ],
  );

  return (
    <SingleTableBoxScene
      title="Productos | Inventariables"
      createPageUrl={`${returnUrlProductosPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.inventario_change_producto,
        PermissionsEnum.inventario_view_categoriaproducto,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Producto>
        columns={columns}
        data={ProductosPagingRes?.data?.items || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // filters - server side
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={ProductosPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.inventario_change_producto,
          PermissionsEnum.inventario_view_categoriaproducto,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.inventario_change_producto,
          PermissionsEnum.inventario_view_categoriaproducto,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default ProductosPage;
