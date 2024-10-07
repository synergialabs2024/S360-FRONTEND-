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
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
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
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },

      {
        accessorKey: 'codigo_auxiliar',
        header: 'CODIGO AUXILIAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo_auxiliar'),
      },

      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
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
                    changeState.mutate({
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
        accessorKey: 'precios',
        header: 'PRECIOS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'precios'),
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
        accessorKey: 'categoria',
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
        Cell: ({ row }) =>
          `${emptyCellNested(row, ['iva_data', 'percentage'])}%`,
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
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
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
