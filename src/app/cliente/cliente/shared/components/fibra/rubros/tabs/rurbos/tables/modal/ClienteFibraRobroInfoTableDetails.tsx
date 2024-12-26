/* eslint-disable indent */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { IoQrCodeSharp } from 'react-icons/io5';

import {
  BaseRubroDetail,
  formatCurrency,
  formatQuantity,
  Rubro,
  TipoRubroEnumChoice,
} from '@/shared';
import {
  ProductoUbicacionSeriesModal,
  SingleIconButton,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import { useRubroStore } from '@/store/app/rubros';

export type ClienteFibraRobroInfoTableDetailsProps = {
  rubro: Rubro;
};

type BaseRubroDetailProductData = BaseRubroDetail & {
  series?: string[];

  nombre?: string; // helper to show the name of the product and cuota info if exist
};

const ClienteFibraRobroInfoTableDetails: React.FC<
  ClienteFibraRobroInfoTableDetailsProps
> = ({ rubro }) => {
  const detail: BaseRubroDetailProductData[] = rubro?.detalle;
  const hasName = detail?.some(item => item?.producto_data?.nombre);
  const rubroType = rubro?.tipo_rubro;
  const hasPromociones = detail?.some(item => item?.promociones?.length);
  const has3raEdadOrDiscapacidadDetail = detail?.some(
    item =>
      (item?.es_tercera_edad || item?.es_discapacitado) &&
      item?.mayor_edad_discapacitado?.at(0)?.type,
  );

  const formattedDetailData = useMemo(() => {
    if (!hasPromociones) {
      if (rubroType === TipoRubroEnumChoice.PRODUCTOS) {
        const mappedDetail = detail.map(item => {
          const hasCuotaInfo =
            item?.descripcion?.includes('Cuota') &&
            +(item?.line_subtotal || 0) > 0;

          return {
            ...item,
            nombre: hasCuotaInfo
              ? `${item?.producto_data?.nombre} (${item?.descripcion})`
              : item?.codigo,
            precio: hasCuotaInfo ? item?.line_subtotal : item?.precio,
            cantidad: item?.cantidad,
          } as unknown as BaseRubroDetailProductData;
        });

        return mappedDetail;
      } else if (
        rubroType === TipoRubroEnumChoice.SERVICIO &&
        has3raEdadOrDiscapacidadDetail
      ) {
        const newItems3raEdadOrDiscapacidad = [];
        // agregar tanto el item original q ya tiene codigo, precio, cantidad, como los extras de mayor_edad_discapacitado array considerando el type, donde si es descuento seria q resta, si es adicional seria q suma
        const is3raEdad = detail?.at(0)?.es_tercera_edad;
        const isDiscapacidad = detail?.at(0)?.es_discapacitado;

        for (let i = 0; i < detail.length; i++) {
          const item = detail[i];
          const mayorEdadDiscapacitado = item?.mayor_edad_discapacitado || [];

          if (!mayorEdadDiscapacitado.length) {
            newItems3raEdadOrDiscapacidad.push(item);
            continue;
          }

          const mappedMayorEdadDiscapacitado = mayorEdadDiscapacitado
            .map(mayorEdadItem => {
              const type = mayorEdadItem?.type;
              const isDescuento = type === 'DESCUENTO';
              const isAdicional = type === 'ADICIONAL';
              const codigo = isDescuento ? 'Descuento' : 'Adicional';
              const codeLabel = is3raEdad
                ? 'Tercera Edad'
                : isDiscapacidad
                  ? 'Discapacidad'
                  : 'N/A';

              const precio = isDescuento
                ? -Number(mayorEdadItem?.valor_descuento)
                : isAdicional
                  ? Number(
                      mayorEdadItem?.valor_adicional_instalaciones_tercera_edad,
                    )
                  : 0;

              const isEmplyObject = Object.keys(mayorEdadItem).length === 0;
              if ((!precio && isAdicional) || isEmplyObject) return null;

              return {
                codigo: `${codigo} ${'(' + codeLabel + ')'}`,
                precio: precio,
                cantidad: 1,
              } as unknown as BaseRubroDetailProductData;
            })
            .filter(Boolean) as BaseRubroDetailProductData[];

          newItems3raEdadOrDiscapacidad.push(
            item,
            ...mappedMayorEdadDiscapacitado,
          );
        }

        return newItems3raEdadOrDiscapacidad;
      }

      return detail;
    }

    return detail.reduce((acc, item) => {
      const promociones = item?.promociones || [];
      if (!promociones.length) {
        acc.push(item);
        return acc;
      }

      const mappedPromociones = promociones.map(promo => ({
        ...promo,
        codigo: `${promo?.promo_name}  (${promo?.descripcion})`,
        precio: '-' + promo?.descuento_aplicado,
        cantidad: 1,
      }));

      acc.push(item, ...(mappedPromociones as unknown as BaseRubroDetail[]));
      return acc;
    }, [] as BaseRubroDetailProductData[]);
  }, [detail, hasPromociones]);

  ///* local state -------------------
  const [openSeriesModal, setOpenSeriesModal] = useState<boolean>(false);

  ///* global state ----------------------
  const activeOT = useRubroStore(s => s.activeOrdenTrabajo);
  const equiposUtilizados = useMemo(
    () => activeOT?.equipos_utilizados || [],
    [activeOT],
  );
  const hasSeriesOT = equiposUtilizados?.some(item => item?.series?.length);
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);

  const seriesMap = useMemo(() => {
    if (rubroType !== TipoRubroEnumChoice.PRODUCTOS || !hasSeriesOT) return {};

    return equiposUtilizados.reduce(
      (acc, item) => {
        acc[item?.codigo] = item?.series;
        return acc;
      },
      {} as Record<string, string[]>,
    );
  }, [rubroType, hasSeriesOT, equiposUtilizados]);

  return (
    <>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Código
                  </Typography>
                </TableCell>

                {hasName && (
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      Nombre
                    </Typography>
                  </TableCell>
                )}

                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Precio unitario
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Cantidad
                  </Typography>
                </TableCell>

                {rubroType === TipoRubroEnumChoice.PRODUCTOS && hasSeriesOT && (
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      Series
                    </Typography>
                  </TableCell>
                )}

                <TableCell align="right">
                  <Typography variant="h6" fontSize="14px">
                    Subtotal
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {formattedDetailData.map(
                (
                  order: BaseRubroDetailProductData,
                  index: React.Key | null | undefined,
                ) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body1">{order.codigo}</Typography>
                    </TableCell>

                    {hasName && (
                      <TableCell>
                        <Typography variant="body1">
                          {/* {order?.producto_data?.nombre || '-'} */}
                          {order?.nombre || '-'}
                        </Typography>
                      </TableCell>
                    )}

                    <TableCell>
                      <Typography variant="body1">
                        {formatCurrency(order?.precio)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body1">
                        {formatQuantity(order?.cantidad)}
                      </Typography>
                    </TableCell>

                    {rubroType === TipoRubroEnumChoice.PRODUCTOS &&
                      hasSeriesOT && (
                        <TableCell>
                          <SingleIconButton
                            label="Ver Series"
                            startIcon={<IoQrCodeSharp />}
                            color="info"
                            onClick={() => {
                              setSelectedRow({
                                ...order,
                                producto_data: {
                                  codigo: order?.codigo,
                                  series: seriesMap[order?.codigo] || [],
                                },

                                // to be used in ProductoUbicacionSeriesModal - just enjoy it
                                savedSeries: seriesMap[order?.codigo] || [],
                                selectedSeries: seriesMap[order?.codigo] || [],
                              } as any);
                              setOpenSeriesModal(true);
                            }}
                            justifyContent="center"
                          />
                        </TableCell>
                      )}

                    <TableCell align="right">
                      <Typography variant="body1">
                        {formatCurrency(
                          Number(order?.precio) * Number(order?.cantidad),
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ==================== modals ==================== */}
      <ProductoUbicacionSeriesModal
        open={openSeriesModal}
        onClose={() => {
          setOpenSeriesModal(false);
          setSelectedRow(null);
        }}
        onChangeKeyArrayStore={InstalacionesStoreKey.equiposUtilizados}
        enableEditSeries={false}
      />
    </>
  );
};

export default ClienteFibraRobroInfoTableDetails;
