import {
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks/ui';
import { IngresoMaterial } from '@/shared/interfaces';
import { IngresosDisponiblesStoreKey, useIngresosStore } from '@/store/app';
import { useColumnsIngresosDisponibles } from '../columns/useColumnsIngresosDisponibles';
import {
  CustomAutocompleteNoForm,
  CustomSearch,
  CustomSingleButton,
  ScrollableDialogProps,
  TableWithoutActions,
} from '@/shared/components';
import {
  CATEGORIA_PRODUCTO_ARRAY_OBJ_INVENTARIO,
  CodigoCategoriaProductoEnumChoiceType,
  gridSizeMdLg6,
} from '@/shared/constants';
import { useGetIngresoMaterial } from '@/actions/app';
import { ToastWrapper } from '@/shared/wrappers';

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
              <>
                <CustomAutocompleteNoForm<CodigoCategoriaProductoEnumChoiceType>
                  label=""
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
              </>
            }
          />
          <TableWithoutActions<IngresoMaterial>
            columns={modalMaterialColumns}
            data={data?.data.productos || []}
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
        </>
      }
      cancelTextBtn="Cerrar"
      onClose={handleClose}
    />
  );
};

export default IngresoDisponiblesModal;
