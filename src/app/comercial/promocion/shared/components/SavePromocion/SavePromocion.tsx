/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Tab } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { TbTableOptions } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import {
  CreatePromocionParamsBase,
  useCreatePromocion,
  useFetchCiudades,
  useFetchMetodoPagos,
  useFetchPlanInternets,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
  useUpdatePromocion,
} from '@/actions/app';
import { useColumnsEquiposPreventa } from '@/app/comercial/preventa/shared/hooks';
import {
  a11yProps,
  CustomAutocompleteMultiple,
  CustomDatePicker,
  CustomMinimalTable,
  CustomNumberTextField,
  CustomRadioButtonGroup,
  CustomSingleButton,
  CustomTabPanel,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FormTabsOnly,
  InputAndBtnGridSpace,
  SampleCheckbox,
  SingleIconButton,
  TabsFormBoxScene,
} from '@/shared/components';
import {
  DiscountTypeEnumChoice,
  FACTURAS_CUOTAS_ARRAY_OBJECT,
  FacturasCuotasObjArray,
  InvetarioCodesEnum,
  SAVE_PROMOCION_PERMISSIONS,
  valueTipoRecuerrenciaAlquilerEnumChoice,
} from '@/shared/constants/app';
import {
  gridSize,
  gridSizeMdLg6,
  TABLE_CONSTANTS,
} from '@/shared/constants/ui';
import { useLoaders, useTabsOnly } from '@/shared/hooks';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import type {
  Ciudad,
  MetodoPago,
  OpcionProductoPromocionItem,
  PlanInternet,
  Producto,
  ProductoDisccountItem,
  ProductoPromocionItem,
  Promocion,
  PromocionPremioItem,
  Provincia,
  Sector,
  Zona,
} from '@/shared/interfaces';
import { promocionFormSchema } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { useUiConfirmModalStore } from '@/store/ui';
import { returnUrlPromocionsPage } from '../../../pages/tables/PromocionsPage';
import {
  PromocionItemOptionModal,
  PromocionProductosDisponiblesModal,
} from './products';

export interface SavePromocionProps {
  title: string;
  promocion?: Promocion;
}

type SaveFormData = CreatePromocionParamsBase & {
  // helpers
  allProvincias?: boolean;
  allCities?: boolean;
  allZones?: boolean;
  allSectores?: boolean;
  allPlanes?: boolean;
  allMetodosPago?: boolean;
};

export type SelectedEqPromoctionType = Producto & {
  uuid: string;
  usedQuantity: number;
  productoOptionItemList: OpcionProductoPromocionItem[];

  // promociones
  isIncluded?: boolean;

  // preventa
  selectedUuidItem?: string;
  promocionUuid?: string;
  descuento?: string;
};

const SavePromocion: React.FC<SavePromocionProps> = ({ title, promocion }) => {
  ///* State Global ----------------------
  const [loadingArray, setLoadingArray] = useState(true);

  useCheckPermissionsArray(SAVE_PROMOCION_PERMISSIONS);

  ///* local state ----------------
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isOpenProductOptionsModal, setIsOpenProductOptionsModal] =
    useState(false);
  const [isOpenDisccountProductModal, setIsOpenDisccountProductModal] =
    useState(false);
  const [isOpenPremioProductModal, setIsOpenPremioProductModal] =
    useState(false);

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const {
    items: equiposPromocion,
    removeSelectedItem,
    setSelectedRow,
    clearAllStore,
    setItems: setEquiposPromocion,
  } = useTypedGenericInventoryStore<SelectedEqPromoctionType>(
    GenericInventoryStoreKey.equiposPromocion,
  );
  const {
    items: disccountItems,
    removeSelectedItem: removeDisccountItem,
    setItems: setDisccountItems,
  } = useTypedGenericInventoryStore<SelectedEqPromoctionType>(
    GenericInventoryStoreKey.descuentosPromocion,
  );
  const {
    items: premiosItems,
    removeSelectedItem: removePremioItem,
    setItems: setPremiosItems,
  } = useTypedGenericInventoryStore<SelectedEqPromoctionType>(
    GenericInventoryStoreKey.premiosPromocion,
  );

  ///* hooks ----------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    // initialTabValue: 2,
  });

  ///* form ----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(promocionFormSchema) as any,
    defaultValues: {
      state: true,
      allCities: false,
      tipo_descuento: DiscountTypeEnumChoice.PORCENTAJE,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const watchedAllProvincias = form.watch('allProvincias');
  const watchedAllCities = form.watch('allCities');
  const watchedAllZones = form.watch('allZones');
  const watchedAllSectores = form.watch('allSectores');
  const watchedTipoDescuento = form.watch('tipo_descuento');
  const watchedAllPlanes = form.watch('allPlanes');
  const watchedAllMetodosPago = form.watch('allMetodosPago');

  const watchedFechaInicio = form.watch('fecha_inicio');
  const watchedProvincias = form.watch('provincias');
  const watchedCiudades = form.watch('ciudades');
  const watchedZonas = form.watch('zonas');

  ///* fetch data ----------------
  const {
    data: provinciasPaging,
    isLoading: isLoadingProvincias,
    isRefetching: isRefetchingProvincias,
  } = useFetchProvincias({
    params: {
      has_coverage: true,
      page_size: 600,
    },
  });
  const {
    data: ciudadesPaging,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    enabled: !!watchedProvincias,
    params: {
      has_coverage: true,
      page_size: 600,
      provinces: watchedAllProvincias
        ? watchedProvincias?.join(',')
        : watchedProvincias?.length
          ? watchedProvincias.join(',')
          : undefined,
    },
  });
  const {
    data: zonasPaging,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    enabled: !!watchedCiudades,
    params: {
      has_coverage: true,
      page_size: 600,
      cities: watchedAllCities
        ? watchedCiudades?.join(',')
        : watchedCiudades?.length
          ? watchedCiudades.join(',')
          : undefined,
    },
  });
  const {
    data: sectoresPaging,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    enabled: !!watchedZonas,
    params: {
      has_coverage: true,
      page_size: 600,

      zones: watchedAllZones
        ? watchedZonas?.join(',')
        : watchedZonas?.length
          ? watchedZonas.join(',')
          : undefined,
    },
  });
  const {
    data: planesPaging,
    isLoading: isLoadingPlanes,
    isRefetching: isRefetchingPlanes,
  } = useFetchPlanInternets({
    params: {
      page_size: 600,
    },
  });
  const {
    data: metodoPagosPaging,
    isLoading: isLoadingMetodoPagos,
    isRefetching: isRefetchingMetodoPagos,
  } = useFetchMetodoPagos({
    params: {
      page_size: 1100,
    },
  });

  ///* mutations ----------------
  const createPromocionMutation = useCreatePromocion<CreatePromocionParamsBase>(
    {
      navigate,
      returnUrl: returnUrlPromocionsPage,
      enableErrorNavigate: false,
      customOnSuccess: () => {
        clearAllStore();
      },
    },
  );
  const updatePromocionMutation = useUpdatePromocion<CreatePromocionParamsBase>(
    {
      navigate,
      returnUrl: returnUrlPromocionsPage,
      customOnSuccess: () => {
        clearAllStore();
      },
    },
  );

  ///* handlers ----------------
  const onSave = async (data: SaveFormData) => {
    const { fecha_fin, ...restData } = data;

    //* productos ===============
    // validate if there are products without options
    let thereAreProductsWithOutOptions = false;
    const equiposPromocionWithOutOptions = equiposPromocion?.filter(
      item => !item.productoOptionItemList.length,
    );
    if (equiposPromocionWithOutOptions?.length) {
      thereAreProductsWithOutOptions = true;
    }
    if (thereAreProductsWithOutOptions) {
      ToastWrapper.warning(
        'Existen productos promocionales sin opciones seleccionadas.',
      );
      return;
    }

    const disccountItemsCode = disccountItems?.map(item => item.codigo);
    const filteredEquiposPromocion = equiposPromocion?.filter(item =>
      disccountItemsCode?.includes(item.codigo),
    );
    if (
      filteredEquiposPromocion?.length <= 0 &&
      disccountItemsCode?.length > 0
    ) {
      ToastWrapper.warning(
        'No se han encontrado productos promocionales asociados a productos con descuento.',
      );
      return;
    }
    if (filteredEquiposPromocion?.length !== disccountItemsCode?.length) {
      ToastWrapper.warning(
        'No se han encontrado productos promocionales asociados a productos con descuento.',
      );
      return;
    }

    if (filteredEquiposPromocion?.length) {
      let productNames = '';
      const thereAreProductsWithOutOptions = filteredEquiposPromocion?.some(
        item => {
          const thereAreOptions = item.productoOptionItemList?.some(
            option =>
              option.tipo_pago ===
                valueTipoRecuerrenciaAlquilerEnumChoice.MENSUAL ||
              (option.tipo_pago ===
                valueTipoRecuerrenciaAlquilerEnumChoice.CUOTAS &&
                +(option?.cuotas || 0) === 1),
          );
          if (!thereAreOptions) {
            productNames += `${item.nombre}, `;
          }
          return !thereAreOptions;
        },
      );
      if (thereAreProductsWithOutOptions) {
        ToastWrapper.warning(
          `El producto ${productNames} no tiene una opción de pago acorde.`,
        );
        return;
      }
    }

    const formattedEquiposPromocion: ProductoPromocionItem[] =
      equiposPromocion?.map(item => ({
        codigo: item.codigo,
        nombre: item.nombre,
        opciones: item.productoOptionItemList?.map(opt => ({
          ...opt,
          cantidad: +(opt.cantidad || 0),
          cuotas: +(opt.cuotas || 0),
        })),
        categoria: item.categoria_data?.code!,
      }));
    const formattedDisccountItems: ProductoDisccountItem[] =
      disccountItems?.map(item => ({
        codigo: item.codigo,
        nombre: item.nombre,
        descuento: '100',
        categoria: item.categoria_data?.code!,
      }));
    const formattedPremiosItems: PromocionPremioItem[] = premiosItems?.map(
      item => ({
        codigo: item.codigo,
        nombre: item.nombre,
        descuento: '100',
        categoria: item.categoria_data?.code!,
        uuid: item.uuid,
      }),
    );

    ///* upd
    if (promocion?.id) {
      updatePromocionMutation.mutate({
        id: promocion.id!,
        data: {
          ...restData,
          ...(fecha_fin && { fecha_fin }),
          opciones_productos_incluye: formattedEquiposPromocion,
          opciones_productos_descuento: formattedDisccountItems,
          opciones_productos_premio: formattedPremiosItems,
        } as unknown as CreatePromocionParamsBase,
      });
      return;
    }

    ///* create
    setConfirmDialog({
      isOpen: true,
      title: 'Crear Promoción',
      subtitle:
        'Una vez creada la promoción, esta no podrá ser modificada más allá de su fecha de finalización y/o estado. ¿Está seguro de proceder cons la creación de la promoción?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);

        createPromocionMutation.mutate({
          ...restData,
          ...(fecha_fin && { fecha_fin }),
          opciones_productos_incluye: formattedEquiposPromocion,
          opciones_productos_descuento: formattedDisccountItems,
          opciones_productos_premio: formattedPremiosItems,
        } as unknown as CreatePromocionParamsBase);
      },
    });
  };

  ///* effects
  useEffect(() => {
    setLoadingArray(false);
    if (!promocion?.id) return;

    const allProvincias = (promocion.provincias as any[])?.includes('*');
    const allCities = (promocion.ciudades as any[])?.includes('*');
    const allZones = (promocion.zonas as any[])?.includes('*');
    const allSectores = (promocion.sectores as any[])?.includes('*');
    const allPlanes = (promocion.planes as any[])?.includes('*');
    const allMetodosPago = (promocion.metodo_pagos as any[])?.includes('*');

    const eqP = promocion?.opciones_productos_incluye?.map(op => ({
      ...op,
      productoOptionItemList: op.opciones,
    }));
    setEquiposPromocion((eqP as any) || []);
    setDisccountItems((promocion?.opciones_productos_descuento as any) || []);
    setPremiosItems((promocion?.opciones_productos_premio as any) || []);

    reset({
      ...promocion,
      allProvincias,
      allCities,
      allZones,
      allSectores,
      allPlanes,
      allMetodosPago,
      facturas_gratis: promocion?.facturas_gratis || [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promocion, reset]);

  useEffect(() => {
    return () => {
      clearAllStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customLoading =
    isLoadingCiudades ||
    isLoadingZonas ||
    isLoadingSectores ||
    isRefetchingCiudades ||
    isRefetchingZonas ||
    isRefetchingSectores ||
    isLoadingProvincias ||
    isRefetchingProvincias ||
    isLoadingPlanes ||
    isRefetchingPlanes ||
    isLoadingMetodoPagos ||
    isRefetchingMetodoPagos;
  useLoaders(customLoading);

  //
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
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        header: 'OPCIONES',
        Cell: ({ row }) => (
          <SingleIconButton
            startIcon={<TbTableOptions />}
            label="Opciones"
            tooltipPlacement="right-end"
            color="info"
            onClick={() => {
              setSelectedRow(row?.original);
              setIsOpenProductOptionsModal(true);
            }}
          />
        ),
      },
      {
        accessorKey: 'action',
        enableColumnFilter: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        header: 'ACCIÓN',
        Cell: ({ row }) => (
          <SingleIconButton
            startIcon={<MdDelete />}
            label="Remover"
            color="error"
            onClick={() => {
              removeSelectedItem({
                item: {
                  ...row?.original,
                  productoOptionItemList: [],
                },
                idKey: 'id',
              });
            }}
            disabled={!!promocion?.id}
          />
        ),
      },
    ],
    [productsBaseColumns, promocion?.id, removeSelectedItem, setSelectedRow],
  );

  const selectedItemsDisccountColumns = useMemo<
    MRT_ColumnDef<SelectedEqPromoctionType>[]
  >(
    () => [
      ...(productsBaseColumns as any),

      {
        accessorKey: 'opciones',
        enableColumnFilter: false,
        header: 'INCLUIDO',
        Cell: ({ row }) => {
          const isIncluded =
            row?.original?.isIncluded || row?.original?.descuento == '100';

          return isIncluded ? 'SI (1)' : 'NO';
        },
      },
      {
        accessorKey: 'action',
        enableColumnFilter: false,
        header: 'ACCIÓN',
        Cell: ({ row }) => (
          <SingleIconButton
            startIcon={<MdDelete />}
            label="Remover"
            color="error"
            onClick={() => {
              removeDisccountItem({
                item: {
                  ...row?.original,
                  productoOptionItemList: [],
                },
                idKey: 'id',
              });
            }}
            disabled={!!promocion?.id}
          />
        ),
      },
    ],
    [productsBaseColumns, promocion?.id, removeDisccountItem],
  );

  const selectedItemsPremioColumns = useMemo<
    MRT_ColumnDef<SelectedEqPromoctionType>[]
  >(
    () => [
      ...(productsBaseColumns as any),

      {
        accessorKey: 'opciones',
        enableColumnFilter: false,
        header: 'INCLUIDO',
        Cell: ({ row }) => {
          const isIncluded =
            row?.original?.isIncluded || row?.original?.descuento == '100';

          return isIncluded ? 'SI (1)' : 'NO';
        },
      },
      {
        accessorKey: 'action',
        enableColumnFilter: false,
        header: 'ACCIÓN',
        Cell: ({ row }) => (
          <SingleIconButton
            startIcon={<MdDelete />}
            label="Remover"
            color="error"
            onClick={() => {
              removePremioItem({
                item: {
                  ...row?.original,
                  productoOptionItemList: [],
                },
                idKey: 'id',
              });
            }}
            disabled={!!promocion?.id}
          />
        ),
      },
    ],
    [productsBaseColumns, promocion?.id, removePremioItem],
  );

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPromocionsPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos requeridos por completar');
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Datos Generales" value={1} {...a11yProps(1)} />

          <Tab label="Matriz" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
    >
      {/* ======================== General Info ======================== */}
      <CustomTabPanel index={1} value={tabValue}>
        <CustomTextField
          label="Nombre"
          name="name"
          control={form.control}
          defaultValue={form.getValues().name}
          error={errors.name}
          helperText={errors.name?.message}
          disabled={!!promocion?.id}
        />

        {/* ============== tipo descuento ============== */}
        <CustomRadioButtonGroup
          label="Tipo descuento"
          control={form.control}
          name="tipo_descuento"
          defaultValue={form.getValues().tipo_descuento || ''}
          options={[
            {
              value: DiscountTypeEnumChoice.PORCENTAJE,
              label: 'Porcentaje',
            },
            { value: DiscountTypeEnumChoice.VALOR, label: 'Valor' },
          ]}
          onChangeValue={() => {
            form.setValue('valor_descuento', '');
          }}
          disabled={!!promocion?.id}
        />
        {watchedTipoDescuento === DiscountTypeEnumChoice.PORCENTAJE ? (
          <CustomNumberTextField
            label="Porcentaje descuento"
            name="valor_descuento"
            control={form.control}
            defaultValue={form.getValues().valor_descuento}
            error={errors.valor_descuento}
            helperText={errors.valor_descuento?.message}
            customType="percentage"
            disabled={!!promocion?.id}
          />
        ) : (
          <CustomNumberTextField
            label="Valor descuento"
            name="valor_descuento"
            control={form.control}
            defaultValue={form.getValues().valor_descuento}
            error={errors.valor_descuento}
            helperText={errors.valor_descuento?.message}
            customType="currency"
            disabled={!!promocion?.id}
          />
        )}

        {/* ----- Meses Gratuitos ----- */}
        <CustomAutocompleteMultiple<FacturasCuotasObjArray>
          label="Facturas gratuitas"
          name="facturas_gratis"
          textFieldKey="nombre"
          valueKey="label"
          actualValueKey="value"
          // options
          options={FACTURAS_CUOTAS_ARRAY_OBJECT}
          defaultValue={
            form.getValues().facturas_gratis?.length
              ? FACTURAS_CUOTAS_ARRAY_OBJECT.filter(
                  (factura: FacturasCuotasObjArray) =>
                    (form.getValues().facturas_gratis as any[])?.includes(
                      factura?.value,
                    ),
                )
              : []
          }
          isLoadingData={loadingArray}
          // errors
          control={form.control}
          error={errors.facturas_gratis as any}
          helperText={errors.facturas_gratis?.message}
          onlyActualValueKey
          required={false}
          size={gridSizeMdLg6}
          disabled={!!promocion?.id}
        />

        {/* ----- Meses Descuento ----- */}
        <CustomAutocompleteMultiple<FacturasCuotasObjArray>
          label="Facturas con descuento"
          name="facturas_descuento"
          textFieldKey="nombre"
          valueKey="label"
          actualValueKey="value"
          // options
          options={FACTURAS_CUOTAS_ARRAY_OBJECT}
          defaultValue={
            form.getValues().facturas_descuento?.length
              ? FACTURAS_CUOTAS_ARRAY_OBJECT.filter(
                  (factura: FacturasCuotasObjArray) =>
                    (form.getValues().facturas_descuento as any[])?.includes(
                      factura?.value,
                    ),
                )
              : []
          }
          isLoadingData={loadingArray}
          // errors
          control={form.control}
          error={errors.facturas_descuento as any}
          helperText={errors.facturas_descuento?.message}
          onlyActualValueKey
          required={false}
          size={gridSizeMdLg6}
          disabled={!!promocion?.id}
        />

        <CustomDatePicker
          label="Fecha inicio"
          name="fecha_inicio"
          control={form.control}
          defaultValue={form.getValues().fecha_inicio}
          error={errors.fecha_inicio}
          helperText={errors.fecha_inicio?.message}
          size={gridSizeMdLg6}
          disabled={!!promocion?.id}
        />
        <CustomDatePicker
          label="Fecha fin"
          name="fecha_fin"
          control={form.control}
          defaultValue={form.getValues().fecha_fin}
          error={errors.fecha_fin}
          helperText={errors.fecha_fin?.message}
          size={gridSizeMdLg6}
          required={false}
          minDate={watchedFechaInicio}
        />

        <SampleCheckbox
          label="Estado"
          name="state"
          control={form.control}
          defaultValue={form.getValues().state}
          isState
        />
      </CustomTabPanel>

      {/* ======================== Select ======================== */}
      <CustomTabPanel index={2} value={tabValue}>
        <>
          {/* --------- provinces --------- */}
          <InputAndBtnGridSpace
            mainGridSize={gridSize}
            inputNode={
              <CustomAutocompleteMultiple<Provincia>
                label="Provincias"
                name="provincias"
                textFieldKey="nombre"
                valueKey="name"
                actualValueKey="id"
                // options
                options={provinciasPaging?.data?.items || []}
                defaultValue={
                  form.getValues().provincias?.length
                    ? provinciasPaging?.data?.items?.filter(
                        (provincia: Provincia) =>
                          (form.getValues().provincias as any[])?.includes(
                            provincia?.id!,
                          ),
                      )
                    : []
                }
                isLoadingData={isLoadingProvincias || isRefetchingProvincias}
                // errors
                control={form.control}
                error={undefined}
                helperText={errors.provincias?.message}
                disabled={watchedAllProvincias || !!promocion?.id}
                onlyActualValueKey
                required={false}
              />
            }
            overrideBtnNode
            customBtnNode={
              <SampleCheckbox
                label="TODOS"
                name="allProvincias"
                control={form.control}
                defaultValue={!!form.getValues().allProvincias}
                onChangeValue={value => {
                  if (value) return form.setValue('provincias', ['*']);
                  form.setValue('provincias', []);
                }}
                // disabled
                disabled={
                  !provinciasPaging?.data?.items?.length || !!promocion?.id
                }
                onClickDisabled={() => {
                  if (promocion?.id) return;

                  ToastWrapper.warning(
                    'No se puede seleccionar todas las provincias ya que no se tienen registros disponibles',
                  );
                }}
              />
            }
          />

          {/* --------- cities --------- */}
          <InputAndBtnGridSpace
            mainGridSize={gridSize}
            inputNode={
              <CustomAutocompleteMultiple<Ciudad>
                label="Ciudades"
                name="ciudades"
                textFieldKey="nombre"
                valueKey="name"
                actualValueKey="id"
                // options
                options={ciudadesPaging?.data?.items || []}
                defaultValue={
                  form.getValues().ciudades?.length
                    ? ciudadesPaging?.data?.items?.filter((ciudad: Ciudad) =>
                        (form.getValues().ciudades as any[])?.includes(
                          ciudad?.id!,
                        ),
                      )
                    : []
                }
                isLoadingData={isLoadingCiudades || isRefetchingCiudades}
                // errors
                control={form.control}
                error={undefined}
                helperText={errors.ciudades?.message}
                disabled={
                  watchedAllCities ||
                  !watchedProvincias?.length ||
                  !!promocion?.id
                }
                onlyActualValueKey
                required={false}
              />
            }
            overrideBtnNode
            customBtnNode={
              <SampleCheckbox
                label="TODOS"
                name="allCities"
                control={form.control}
                defaultValue={!!form.getValues().allCities}
                onChangeValue={value => {
                  if (value) return form.setValue('ciudades', ['*']);
                  form.setValue('ciudades', []);
                }}
                // disabled
                disabled={
                  !provinciasPaging?.data?.items?.length ||
                  !watchedProvincias?.length ||
                  !!promocion?.id
                }
                onClickDisabled={() => {
                  if (promocion?.id) return;

                  if (!watchedProvincias?.length)
                    return ToastWrapper.warning(
                      'Seleccione al menos una provincia',
                    );

                  ToastWrapper.warning(
                    'No se puede seleccionar todas las ciudades ya que no se tienen registros disponibles',
                  );
                }}
              />
            }
          />

          {/* --------- zones --------- */}
          <InputAndBtnGridSpace
            mainGridSize={gridSize}
            inputNode={
              <CustomAutocompleteMultiple<Zona>
                label="Zonas"
                name="zonas"
                textFieldKey="nombre"
                valueKey="name"
                actualValueKey="id"
                // options
                options={zonasPaging?.data?.items || []}
                defaultValue={
                  form.getValues().zonas?.length
                    ? zonasPaging?.data?.items?.filter((zona: Zona) =>
                        (form.getValues().zonas as any[])?.includes(zona?.id!),
                      )
                    : []
                }
                isLoadingData={isLoadingZonas || isRefetchingZonas}
                // errors
                control={form.control}
                error={undefined}
                helperText={errors.zonas?.message}
                disabled={
                  watchedAllZones || !watchedCiudades?.length || !!promocion?.id
                }
                onlyActualValueKey
                required={false}
              />
            }
            overrideBtnNode
            customBtnNode={
              <SampleCheckbox
                label="TODOS"
                name="allZones"
                control={form.control}
                defaultValue={!!form.getValues().allZones}
                onChangeValue={value => {
                  if (value) return form.setValue('zonas', ['*']);
                  form.setValue('zonas', []);
                }}
                // disabled
                disabled={
                  !ciudadesPaging?.data?.items?.length ||
                  !watchedCiudades?.length ||
                  !!promocion?.id
                }
                onClickDisabled={() => {
                  if (promocion?.id) return;

                  if (!watchedCiudades?.length)
                    return ToastWrapper.warning(
                      'Seleccione al menos una ciudad',
                    );

                  ToastWrapper.warning(
                    'No se puede seleccionar todas las zonas ya que no se tienen registros disponibles',
                  );
                }}
              />
            }
          />

          {/* --------- sectores --------- */}
          <InputAndBtnGridSpace
            mainGridSize={gridSize}
            inputNode={
              <CustomAutocompleteMultiple<Sector>
                label="Sectores"
                name="sectores"
                textFieldKey="nombre"
                valueKey="name"
                actualValueKey="id"
                // options
                options={sectoresPaging?.data?.items || []}
                defaultValue={
                  form.getValues().sectores?.length
                    ? sectoresPaging?.data?.items?.filter((sector: Sector) =>
                        (form.getValues().sectores as any[])?.includes(
                          sector?.id!,
                        ),
                      )
                    : []
                }
                isLoadingData={isLoadingSectores || isRefetchingSectores}
                // errors
                control={form.control}
                error={undefined}
                helperText={errors.sectores?.message}
                disabled={
                  watchedAllSectores || !watchedZonas?.length || !!promocion?.id
                }
                onlyActualValueKey
                required={false}
              />
            }
            overrideBtnNode
            customBtnNode={
              <SampleCheckbox
                label="TODOS"
                name="allSectores"
                control={form.control}
                defaultValue={!!form.getValues().allSectores}
                onChangeValue={value => {
                  if (value) return form.setValue('sectores', ['*']);
                  form.setValue('sectores', []);
                }}
                // disabled
                disabled={
                  !zonasPaging?.data?.items?.length ||
                  !watchedZonas?.length ||
                  !!promocion?.id
                }
                onClickDisabled={() => {
                  if (promocion?.id) return;

                  if (!watchedZonas?.length)
                    return ToastWrapper.warning('Seleccione al menos una zona');

                  ToastWrapper.warning(
                    'No se puede seleccionar todos los sectores ya que no se tienen registros disponibles',
                  );
                }}
              />
            }
          />

          {/* --------- PLANES --------- */}
          <InputAndBtnGridSpace
            mainGridSize={gridSize}
            inputNode={
              <CustomAutocompleteMultiple<PlanInternet>
                label="Planes"
                name="planes"
                textFieldKey="nombre"
                valueKey="name"
                actualValueKey="id"
                // options
                options={planesPaging?.data?.items || []}
                defaultValue={
                  form.getValues().planes?.length
                    ? planesPaging?.data?.items?.filter((plan: PlanInternet) =>
                        (form.getValues().planes as any[])?.includes(plan?.id!),
                      )
                    : []
                }
                isLoadingData={isLoadingPlanes || isRefetchingPlanes}
                // errors
                control={form.control}
                error={undefined}
                helperText={errors.planes?.message}
                disabled={watchedAllPlanes || !!promocion?.id}
                onlyActualValueKey
                required={false}
              />
            }
            overrideBtnNode
            customBtnNode={
              <SampleCheckbox
                label="TODOS"
                name="allPlanes"
                control={form.control}
                defaultValue={!!form.getValues().allPlanes}
                onChangeValue={value => {
                  if (value) return form.setValue('planes', ['*']);
                  form.setValue('planes', []);
                }}
                // disabled
                disabled={!planesPaging?.data?.items?.length || !!promocion?.id}
                onClickDisabled={() => {
                  if (promocion?.id) return;

                  ToastWrapper.warning(
                    'No se puede seleccionar todos los planes ya que no se tienen registros disponibles',
                  );
                }}
              />
            }
          />

          {/* --------- Payment methods --------- */}
          <InputAndBtnGridSpace
            mainGridSize={gridSize}
            inputNode={
              <CustomAutocompleteMultiple<MetodoPago>
                label="Métodos de pago"
                name="metodo_pagos"
                textFieldKey="nombre"
                valueKey="name"
                actualValueKey="id"
                // options
                options={metodoPagosPaging?.data?.items || []}
                defaultValue={
                  form.getValues().metodo_pagos?.length
                    ? metodoPagosPaging?.data?.items?.filter(
                        (metodoPago: MetodoPago) =>
                          (form.getValues().metodo_pagos as any[])?.includes(
                            metodoPago?.id!,
                          ),
                      )
                    : []
                }
                isLoadingData={isLoadingMetodoPagos || isRefetchingMetodoPagos}
                // errors
                control={form.control}
                error={undefined}
                helperText={errors.metodo_pagos?.message}
                onlyActualValueKey
                required={false}
                disabled={watchedAllMetodosPago || !!promocion?.id}
              />
            }
            overrideBtnNode
            customBtnNode={
              <SampleCheckbox
                label="TODOS"
                name="allMetodosPago"
                control={form.control}
                defaultValue={!!form.getValues().allMetodosPago}
                onChangeValue={value => {
                  if (value) return form.setValue('metodo_pagos', ['*']);
                  form.setValue('metodo_pagos', []);
                }}
                // disabled
                disabled={
                  !metodoPagosPaging?.data?.items?.length || !!promocion?.id
                }
                onClickDisabled={() => {
                  if (promocion?.id) return;

                  ToastWrapper.warning(
                    'No se puede seleccionar todos los métodos de pago ya que no se tienen registros disponibles',
                  );
                }}
              />
            }
          />
        </>

        {/* ==================== PRODUCTOS ==================== */}
        {/* ------------- Inventariables EQUIPOS ------------- */}
        <>
          <Grid item xs={12} container justifyContent="flex-end" pb={3}>
            <CustomTypoLabel
              text="Productos Promocionables"
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />

            <CustomSingleButton
              label="AGREGAR PRODUCTO"
              color="primary"
              variant="text"
              startIcon={<FiPlus />}
              onClick={() => {
                setIsOpenProductModal(true);
              }}
              justifyContent="flex-end"
              disabled={!!promocion?.id}
            />

            <Grid item xs={12}>
              <CustomMinimalTable<SelectedEqPromoctionType>
                columns={selectedItemsColumns}
                data={equiposPromocion || []}
                enablePagination
              />
            </Grid>
          </Grid>

          <PromocionProductosDisponiblesModal
            open={isOpenProductModal}
            onClose={() => {
              setIsOpenProductModal(false);
            }}
          />
          <PromocionItemOptionModal
            open={isOpenProductOptionsModal}
            onClose={() => {
              setIsOpenProductOptionsModal(false);
              setSelectedRow(null);
            }}
            isEdditingForm={!!promocion?.id}
          />
        </>

        {/* ------------- Disccount ------------- */}
        <>
          <Grid item xs={12} container justifyContent="flex-end" pb={3}>
            <CustomTypoLabel
              text="Descuentos incluidos a productos"
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />

            <CustomSingleButton
              label="AGREGAR DESCUENTO"
              color="primary"
              variant="text"
              startIcon={<FiPlus />}
              onClick={() => {
                setIsOpenDisccountProductModal(true);
              }}
              justifyContent="flex-end"
              disabled={!!promocion?.id}
            />

            <Grid item xs={12}>
              <CustomMinimalTable<SelectedEqPromoctionType>
                columns={selectedItemsDisccountColumns}
                data={disccountItems || []}
                enablePagination
              />
            </Grid>
          </Grid>

          <PromocionProductosDisponiblesModal
            open={isOpenDisccountProductModal}
            onClose={() => {
              setIsOpenDisccountProductModal(false);
            }}
            genericStorageKey={GenericInventoryStoreKey.descuentosPromocion}
          />
        </>

        {/* ------------- premiso ------------- */}
        <>
          <Grid item xs={12} container justifyContent="flex-end" pb={3}>
            <CustomTypoLabel
              text="Premios incluidos"
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />
            <CustomSingleButton
              label="AGREGAR PREMIO"
              color="primary"
              variant="text"
              startIcon={<FiPlus />}
              onClick={() => {
                setIsOpenPremioProductModal(true);
              }}
              justifyContent="flex-end"
              disabled={!!promocion?.id}
            />

            <Grid item xs={12}>
              <CustomMinimalTable<SelectedEqPromoctionType>
                columns={selectedItemsPremioColumns}
                data={premiosItems || []}
                enablePagination
              />
            </Grid>
          </Grid>

          <PromocionProductosDisponiblesModal
            open={isOpenPremioProductModal}
            onClose={() => {
              setIsOpenPremioProductModal(false);
            }}
            genericStorageKey={GenericInventoryStoreKey.premiosPromocion}
            defaultProductCategory={InvetarioCodesEnum.PREMIO}
          />
        </>
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SavePromocion;
