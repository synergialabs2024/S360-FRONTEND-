/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import {
  gridSizeMdLg12,
  gridSizeMdLg6,
  MESES_TYPE_ARRAY_CHOICES,
  mesesMap,
  MesesTypeEnumChoice,
  TABLE_CONSTANTS,
  TRAFICO_TYPE_ARRAY_CHOICES,
  TraficoDetalleConsumo,
} from '@/shared';
import {
  DateRangePicker,
  ScrollableDialogProps,
  SimpleTable,
} from '@/shared/components';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useGetTraficoConsulta } from '@/actions/app';
import { cambioTiempo } from '../../pages/functions';
import {
  CustomSimpleNumber,
  Diagrama,
  SelectArrayStringSimple,
} from '../Common';

export type ModalDetalleConsumoProps = {
  modalTitle?: string;
  viewMoreText: string;
  listItems?: Record<string, any>;
};

const ModalDetalleConsumo: React.FC<ModalDetalleConsumoProps> = ({
  viewMoreText,
  modalTitle = 'Detalle del Consumo',
  listItems = {},
}) => {
  ///* local state -----------------
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [datoTrafico, setDatoTrafico] = useState<TraficoDetalleConsumo[]>([]);

  ///* form
  const { control, watch, setValue } = useForm({
    defaultValues: {
      graficos: TRAFICO_TYPE_ARRAY_CHOICES[0],
      fecha_rango: { date_1: '', date_2: '' },
      mes_inicial: 'Enero',
      anio_incial: new Date().getFullYear(),
      mes_final: 'Enero',
      anio_final: new Date().getFullYear(),
    },
  });

  const selectedGrafico = watch('graficos');
  const selectedDateRange = watch('fecha_rango');
  const selectedMesInicial = watch('mes_inicial');
  const selectedAnioInicial = watch('anio_incial');
  const selectedMesFinal = watch('mes_final');
  const selectedAnioFinal = watch('anio_final');

  const { data } = useGetTraficoConsulta(listItems?.username);

  ///* effects
  useEffect(() => {
    if (!data) return;
    data.reverse();

    setDatoTrafico([
      ...data.map((val: TraficoDetalleConsumo, index: number) => {
        return {
          id: index,
          ...val,
          acctinputoctets: val.acctinputoctets
            ? parseInt(val.acctinputoctets.toString()) / 1000000
            : 0,
          acctoutputoctets: val.acctoutputoctets
            ? parseInt(val.acctoutputoctets.toString()) / 1000000
            : 0,
        };
      }),
    ]);

    setIsLoading(true);
    setIsLoading(false);
  }, [data]);

  ///* columns
  const columns = useMemo<MRT_ColumnDef<TraficoDetalleConsumo>[]>(
    () => [
      {
        accessorKey: 'acctstarttime',
        header: 'Conectado',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => (
          <>
            {row?.original?.acctstarttime !== undefined
              ? row?.original?.acctstarttime
              : 'N/A'}{' '}
          </>
        ),
      },
      {
        accessorKey: 'acctstoptime',
        header: 'Desconectado',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => (
          <>
            {row?.original?.acctstoptime !== undefined
              ? row?.original?.acctstoptime
              : 'N/A'}{' '}
          </>
        ),
      },
      {
        accessorKey: 'acctsessiontime',
        header: 'Tiempo',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => (
          <>{cambioTiempo({ tiempoTotal: row.original.acctsessiontime })}</>
        ),
      },
      {
        accessorKey: 'acctoutputoctets',
        header: 'Descarga',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => (
          <>
            {row?.original?.acctoutputoctets !== undefined && (
              <>
                {row?.original?.acctoutputoctets > 999
                  ? (row?.original?.acctoutputoctets / 1000)?.toFixed(2) + ' GB'
                  : row?.original?.acctoutputoctets?.toFixed(2) + ' MB'}
              </>
            )}
          </>
        ),
      },
      {
        accessorKey: 'acctinputoctets',
        header: 'Subida',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return (
            <>
              {row?.original?.acctinputoctets !== undefined && (
                <>
                  {row?.original?.acctinputoctets > 999
                    ? (row?.original?.acctinputoctets / 1000)?.toFixed(2) +
                      ' GB'
                    : row?.original?.acctinputoctets?.toFixed(2) + ' MB'}
                </>
              )}
            </>
          );
        },
      },
      {
        accessorKey: 'framedipaddress',
        header: 'IPV4',
        size: TABLE_CONSTANTS?.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => (
          <>
            {row?.original?.framedipaddress !== undefined
              ? row?.original?.framedipaddress
              : 'N/A'}{' '}
          </>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Typography>
        <Button
          component="span"
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => {
            setOpen(!open);
          }}
          style={{ cursor: 'pointer' }}
        >
          {viewMoreText}
        </Button>
      </Typography>

      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => {
            setValue('fecha_rango', { date_1: '', date_2: '' });
            setOpen(false);
          }}
          minWidth="75%"
          title={modalTitle}
          contentNode={
            <>
              <Typography>CONSUMO DEL USER: {listItems?.username}</Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
              >
                <SelectArrayStringSimple
                  label="SELECCIONAR GRÁFICO"
                  options={TRAFICO_TYPE_ARRAY_CHOICES}
                  name="graficos"
                  control={control}
                  onChangeValue={() => {
                    setValue('fecha_rango', { date_1: '', date_2: '' });
                  }}
                />
              </Box>
              <Grid container>
                {selectedGrafico === 'GRÁFICO DIARIO' ? (
                  <>
                    <Grid item md={12} xs={12} sx={{ m: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <DateRangePicker
                            label="RANGO FECHA"
                            name="fecha_rango"
                            control={control}
                            size={gridSizeMdLg12}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          {selectedDateRange.date_1 &&
                          selectedDateRange.date_2 ? (
                            <Box
                              display="flex"
                              style={{ textTransform: 'uppercase' }}
                              pl={2}
                            >
                              <Typography variant="button">
                                <strong>Desde</strong> <br />
                                {selectedDateRange.date_1}
                              </Typography>
                              <Typography
                                variant="button"
                                style={{ paddingLeft: 10 }}
                              >
                                <strong>Hasta</strong> <br />
                                {selectedDateRange.date_2}
                              </Typography>
                            </Box>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid item md={12} xs={12}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                    >
                      <Grid container spacing={3}>
                        <Grid container item xs={4}>
                          <SelectArrayStringSimple
                            label="MES INICIAL"
                            options={MESES_TYPE_ARRAY_CHOICES}
                            name="mes_inicial"
                            control={control}
                          />
                          <CustomSimpleNumber
                            label="AÑO INICIAL"
                            name="anio_incial"
                            control={control}
                            size={gridSizeMdLg6}
                            min={0}
                          />
                        </Grid>
                        <Grid container item xs={4}>
                          <SelectArrayStringSimple
                            label="MES FINAL"
                            options={MESES_TYPE_ARRAY_CHOICES}
                            name="mes_final"
                            control={control}
                          />
                          <CustomSimpleNumber
                            label="AÑO FINAL"
                            name="anio_final"
                            control={control}
                            size={gridSizeMdLg6}
                            min={0}
                          />
                        </Grid>
                        <Grid container item xs={4}>
                          <Button
                            disableElevation
                            variant="contained"
                            onClick={() => {
                              // Obtén los números de los meses inicial y final
                              const mesInicialNumber =
                                mesesMap[
                                  selectedMesInicial as MesesTypeEnumChoice
                                ];
                              const mesFinalNumber =
                                mesesMap[
                                  selectedMesFinal as MesesTypeEnumChoice
                                ];

                              // Formatea las fechas
                              const date_1 = `${selectedAnioInicial}-${String(mesInicialNumber).padStart(2, '0')}`; // 'YYYY-MM'
                              const date_2 = `${selectedAnioFinal}-${String(mesFinalNumber).padStart(2, '0')}`; // 'YYYY-MM'

                              // Aquí puedes realizar cualquier acción adicional que necesites con date_1 y date_2
                              setValue('fecha_rango', { date_1, date_2 }); // Si necesitas almacenar el rango
                            }}
                          >
                            Aplicar búsqueda
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )}
                <Grid item md={12} xs={12}>
                  <Diagrama dataT={data} fecha={selectedDateRange} />
                  <SimpleTable<TraficoDetalleConsumo>
                    columns={columns}
                    data={datoTrafico || []}
                    isLoading={isLoading}
                    enableGlobalFilter={true}
                  />
                </Grid>
              </Grid>
            </>
          }
        />
      )}
    </>
  );
};

export default ModalDetalleConsumo;
