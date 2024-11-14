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
};

const ClienteFibraRobroInfoTableDetails: React.FC<
  ClienteFibraRobroInfoTableDetailsProps
> = ({ rubro }) => {
  const detail: BaseRubroDetailProductData[] = rubro?.detalle;
  const hasName = detail?.some(item => item?.producto_data?.nombre);
  const rubroType = rubro?.tipo_rubro;

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
              {detail.map(
                (
                  order: BaseRubroDetail,
                  index: React.Key | null | undefined,
                ) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body1">{order.codigo}</Typography>
                    </TableCell>

                    {hasName && (
                      <TableCell>
                        <Typography variant="body1">
                          {order?.producto_data?.nombre || '-'}
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
