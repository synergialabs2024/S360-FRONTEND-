import { IconCategory } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import {
  CustomSearch,
  CustomSingleButton,
  TableWithoutActions,
  ScrollableDialogProps,
  CustomAutocompleteNoForm,
} from '@/shared/components';
import {
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks/ui';
import {
  gridSizeMdLg6,
  CodigoCategoriaProductoEnumChoiceType,
  CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO,
} from '@/shared/constants';
import { ToastWrapper } from '@/shared/wrappers';
import { IngresoMaterial } from '@/shared/interfaces';
import { useFetchProductos, useGetIngresoMaterial } from '@/actions/app';
import { IngresosDisponiblesStoreKey, useIngresosStore } from '@/store/app';
import { useColumnsIngresosDisponibles } from '../columns/useColumnsIngresosDisponibles';

export type IngresoDisponiblesModalProps = {
  open: boolean;
  uuid_ingreso?: string;
  onClose: () => void;
};

const IngresoDisponiblesModal: React.FC<IngresoDisponiblesModalProps> = ({
  onClose,
  open,
  uuid_ingreso,
}) => {
  ///* hooks ---------------------
  const { columnFilters, setColumnFilters } = useTableServerSideFiltering();

  const {
    pagination,
    globalFilter,
    //searchTerm,
    setPagination,
    onChangeFilter,
  } = useTableFilter();

  ///* local state ---------------------
  const [dataFilter, setDataFilter] = useState<any[]>([]);

  ///* global state ---------------------
  const addSelectedItem = useIngresosStore(s => s.addSelectedItem);
  const selectedCategoria = useIngresosStore(s => s.selectedCategoriaModel);
  const setSelectedCategoriaModel = useIngresosStore(
    s => s.setSelectedCategoriaModel,
  );

  ///* Get data ---------------------
  const { data, isLoading, isRefetching } = useGetIngresoMaterial(
    uuid_ingreso ?? '',
  );
  const { data: productosPaging } = useFetchProductos({
    enabled: open,
    params: {
      page_size: 90000,
      categoria_uuid: selectedCategoria ?? undefined,
    },
  });

  useLoaders(isLoading || isRefetching);

  ///* handlers ---------------------
  const handleClose = () => {
    onClose();
  };

  ///* columns ---------------------
  const { modalMaterialColumns } = useColumnsIngresosDisponibles({
    showActionColumn: true,
    onActionIngresosRowNode(item) {
      return (
        <CustomSingleButton
          label="AGREGAR"
          variant="text"
          color="primary"
          onClick={() => {
            if (item.cantidad === undefined || item.cantidad <= 0) {
              ToastWrapper.error(`
                El producto de código ${item.codigo} no puede ser
                procesado por su falta de stock.
              `);
              return;
            }
            addSelectedItem({
              keyStore: IngresosDisponiblesStoreKey.ingresosDisponibles,
              item: {
                ...item,
                usedQuantity: 1,
                selectedSeries: [],
                savedSeries: [],
              },
              showToast: true,
            });
          }}
        />
      );
    },
  });

  useEffect(() => {
    if (!data?.data) return;

    const productos = Array.isArray(data.data.productos)
      ? data.data.productos.map(prod => ({
        cantidad: (prod as any).cantidad ?? 0,
        producto: (prod as any).producto ?? null,
        cantidad_pedida: (prod as any).cantidad ?? 0,
        cantidad_aprobada: (prod as any).cantidad ?? 0,
        series: (prod as any).series ?? [],
      }))
      : [];

    const detallesArray = productos
      .map(prod => {
        const detalle = productosPaging?.data?.items?.find(
          item => item.id === prod.producto,
        );
        return detalle ? { ...detalle, ...prod } : null;
      })
      .filter(Boolean);

    setDataFilter(detallesArray);
  }, [data, productosPaging]);

  return (
    <ScrollableDialogProps
      open={open}
      title="Productos"
      minWidth="60%"
      contentNode={
        <>
          <CustomSearch
            onChange={onChangeFilter}
            value={globalFilter}
            text="por código"
            sxContainer={{
              mb: 5,
            }}
            customSpaceNode={
              <CustomAutocompleteNoForm<CodigoCategoriaProductoEnumChoiceType>
                label="Categoria"
                value={selectedCategoria}
                actualValueKey="value"
                onChange={v => {
                  setSelectedCategoriaModel(v as string);
                }}
                options={CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO}
                getOptionLabel={o => o.label}
                loading={false}
                error={false}
                disableClearable
                size={gridSizeMdLg6}
              />
            }
          />
          {selectedCategoria ? (
            <TableWithoutActions<IngresoMaterial>
              columns={modalMaterialColumns}
              data={dataFilter || []}
              isLoading={isLoading}
              isRefetching={isRefetching}
              // search
              enableGlobalFilter={false}
              // // filters - server side
              enableManualFiltering={true}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
              // // pagination
              pagination={pagination}
              onPaging={setPagination}
            />
          ) : (
            <Box
              sx={{
                backgroundColor: 'info.light',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconCategory />
              <Grid sx={{ margin: '10px' }}>Seleccione un categoria.</Grid>
            </Box>
          )}
        </>
      }
      cancelTextBtn="Cerrar"
      onClose={handleClose}
    />
  );
};

export default IngresoDisponiblesModal;
