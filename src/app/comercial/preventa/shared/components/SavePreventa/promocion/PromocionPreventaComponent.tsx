import { Grid } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { MdUnfoldMore } from 'react-icons/md';

import { SelectedEqPromoctionType } from '@/app/comercial/promocion/shared/components/SavePromocion/SavePromocion';
import {
  GenericAutocompleteNoFormType,
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  Promocion,
  TABLE_CONSTANTS,
  useColumnsPromocion,
  valueTipoRecuerrenciaAlquilerEnumChoice,
} from '@/shared';
import {
  CustomAutocompleteNoForm,
  CustomMinimalTable,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  SingleIconButton,
} from '@/shared/components';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { useColumnsEquiposPreventa } from '../../../hooks';

export type PromocionPreventaComponentProps = { promocion: Promocion };

const PromocionPreventaComponent: React.FC<PromocionPreventaComponentProps> = ({
  promocion = {} as Promocion,
}) => {
  ///* local state ----------------
  const [isVissible, setIsVissible] = useState(true);

  ///* columns ----------------
  const { promocionPreventaColumns } = useColumnsPromocion();

  // ----------------------------------
  const { items: equiposPromocion, updateSelectedItemValue } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.equiposPromocion,
    );

  const { productsBaseColumns } = useColumnsEquiposPreventa({
    showActionColumn: false,
  });
  const selectedItemsColumns = useMemo<
    MRT_ColumnDef<SelectedEqPromoctionType>[]
  >(
    () => [
      ...(productsBaseColumns as any),

      {
        accessorKey: 'opciones',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        header: 'OPCIONES',
        Cell: ({ row }) => {
          const name = row.original?.nombre;
          const productOptions = row.original.productoOptionItemList?.map(
            opt => {
              const tipoPago = opt.tipo_pago;
              const additionalLabel =
                tipoPago === valueTipoRecuerrenciaAlquilerEnumChoice.CUOTAS
                  ? `en ${opt.cuotas} cuotas)`
                  : valueTipoRecuerrenciaAlquilerEnumChoice.MENSUAL
                    ? 'mensual)'
                    : '-';
              const label = name + ' (' + `$${opt?.valor} ` + additionalLabel;

              return {
                ...opt,
                labelName: label,
              };
            },
          );

          const optsSelect: GenericAutocompleteNoFormType[] =
            productOptions.map(opt => ({
              label: opt.labelName,
              value: opt.uuid,
            }));

          return (
            <>
              <CustomAutocompleteNoForm<GenericAutocompleteNoFormType>
                label="Recurrencia"
                value={row?.original?.selectedUuidItem || ''}
                actualValueKey="value"
                onChange={v => {
                  updateSelectedItemValue({
                    idKey: 'codigo', // unique to upd specific item
                    updatedItem: {
                      codigo: row.original.codigo,
                      selectedUuidItem: v as any,
                    } as any,
                  });
                }}
                options={optsSelect}
                getOptionLabel={o => o.label}
                loading={false}
                required
                error={false}
                size={gridSize}
                disabled={false}
                showLabel={false}
              />
            </>
          );
        },
      },
    ],
    [productsBaseColumns, updateSelectedItemValue],
  );

  const { items: promoDisccounts } =
    useTypedGenericInventoryStore<SelectedEqPromoctionType>(
      GenericInventoryStoreKey.descuentosPromocion,
    );
  const selectedPromoDisccounts = useMemo<
    MRT_ColumnDef<SelectedEqPromoctionType>[]
  >(
    () => [
      ...(productsBaseColumns as any),
      {
        accessorKey: 'opciones',
        enableColumnFilter: false,
        header: 'INCLUIDO',
        Cell: ({ row }) => {
          const isIncluded = row?.original?.descuento === '100%';

          return isIncluded ? 'SI' : 'NO';
        },
      },
    ],
    [productsBaseColumns],
  );

  return (
    <>
      <Grid
        item
        container
        xs={12}
        spacing={2}
        alignItems="end"
        justifyContent="center"
        pb={4}
      >
        <CustomTextFieldNoForm
          label="Promoción aplicada"
          value={promocion?.name || 'N/A'}
          disabled
          size={gridSizeMdLg11}
        />

        <SingleIconButton
          startIcon={<MdUnfoldMore />}
          onClick={() => {
            setIsVissible(!isVissible);
          }}
          label={isVissible ? 'Ocultar detalles' : 'Ver detalles de promoción'}
          size={gridSizeMdLg1}
        />
      </Grid>

      {/* --------- table --------- */}
      <Grid item xs={12}>
        {isVissible && promocion?.id && (
          <>
            <CustomMinimalTable<Promocion>
              columns={promocionPreventaColumns}
              data={[promocion]}
              enablePagination
              density="comfortable"
            />
          </>
        )}
      </Grid>

      {/* --------------- */}
      <Grid item xs={12}>
        <CustomTypoLabel text="Equipos promocionados" />

        <CustomMinimalTable<SelectedEqPromoctionType>
          columns={selectedItemsColumns}
          data={equiposPromocion || []}
          enablePagination
          density="comfortable"
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTypoLabel text="Equipos promocionados con descuento" />

        <CustomMinimalTable<SelectedEqPromoctionType>
          columns={selectedPromoDisccounts}
          data={promoDisccounts || []}
          enablePagination
          density="comfortable"
        />
      </Grid>
    </>
  );
};

export default PromocionPreventaComponent;
