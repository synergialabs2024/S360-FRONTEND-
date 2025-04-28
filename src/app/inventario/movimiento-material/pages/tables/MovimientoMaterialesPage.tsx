import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import {
  CustomTable,
  CustomSearch,
  DateRangePicker,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useFetchMovimientoMateriales,
  ReportMovimientoMaterialExcel,
} from '@/actions/app';
import {
  gridSizeMdLg6,
  useTableFilter,
  PermissionsEnum,
  MovimientoMaterial,
  useTableServerSideFiltering,
  useColumnsMovimientoMaterial,
  TIPO_PRODUCTO_ARRAY_OBJ_INVENTARIO,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import CustomAutocompletSearchNoForm from '@/shared/components/CustomAutocompletes/CustomAutocompletSearchNoForm';

export const returnUrlMovimientoMaterialesPage =
  ROUTER_PATHS.inventario.movimientoMaterialesNav;

export type MovimientoMaterialesPageProps = {};

const MovimientoMaterialesPage: React.FC<
  MovimientoMaterialesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_movimientomaterial);

  ///* local state
  const [selectedTipoM, setSelectedTipoM] = useState<string | null>(null);

  const { control, watch } = useForm({
    defaultValues: {
      fecha_rango: { date_1: '', date_2: '' },
    },
  });

  const selectedDateRange = watch('fecha_rango');

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

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
    data: movimientoMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMovimientoMateriales({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      secuencial: searchTerm,
      ...filterObject,
      filterByState: false,

      tipo_movimiento: selectedTipoM,
      created_at__gte: selectedDateRange.date_1,
      created_at__lte: selectedDateRange.date_2,
    },
  });

  ///* columns
  const { movimientoMaterialColumns } = useColumnsMovimientoMaterial();

  const handleDownload2 = async () => {
    ReportMovimientoMaterialExcel({
      page_size: 99999999,
      name: searchTerm,
      ...filterObject,
      filterByState: false,

      tipo_movimiento: selectedTipoM,
      created_at__gte: selectedDateRange.date_1,
      created_at__lte: selectedDateRange.date_2,
    });
  };

  return (
    <SingleTableBoxScene title="Movimiento Materiales" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por Numero de Registro"
        sxContainer={{
          mb: 3,
        }}
        customSpaceNode={
          <>
            <CustomAutocompletSearchNoForm<{ id: number; nombre: string }>
              label="Buscar por Tipo Movimiento"
              options={TIPO_PRODUCTO_ARRAY_OBJ_INVENTARIO.map(u => ({
                id: u.value,
                nombre: u.nombre,
              }))}
              valueKey="nombre"
              actualValueKey="id"
              defaultValue={
                TIPO_PRODUCTO_ARRAY_OBJ_INVENTARIO[0]?.value.toString() || ''
              }
              optionLabelForEdit={
                TIPO_PRODUCTO_ARRAY_OBJ_INVENTARIO[0]?.nombre || ''
              }
              isLoadingData={false}
              size={gridSizeMdLg6}
              onChangeRawValue={tm => {
                setSelectedTipoM(tm?.nombre || null);
              }}
              required={false}
            />
            <Grid sx={{ m: '5px' }}>
              <Button onClick={handleDownload2}>Descargar Excel</Button>
            </Grid>
          </>
        }
      />
      <DateRangePicker
        sxGrid={{ m: [0, 0, 3, 1.5], width: '12.5cm' }}
        label="RANGO FECHA"
        name="fecha_rango"
        control={control}
        required={false}
        size={gridSizeMdLg6}
      />

      <CustomTable<MovimientoMaterial>
        columns={movimientoMaterialColumns}
        data={movimientoMaterialPagingRes?.data?.items || []}
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
        rowCount={movimientoMaterialPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default MovimientoMaterialesPage;
