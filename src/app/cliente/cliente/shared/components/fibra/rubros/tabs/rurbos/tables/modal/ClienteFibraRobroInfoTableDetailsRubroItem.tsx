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
  formatCurrency,
  formatQuantity,
  Rubro,
  TipoRubroEnumChoice,
} from '@/shared';
import {
  ProductoUbicacionSeriesModal,
  SingleIconButton,
} from '@/shared/components';
import { RubroItemData } from '@/shared/interfaces';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';

export type ClienteFibraRobroInfoTableDetailsRubroItemProps = {
  rubro: Rubro;
};

const ClienteFibraRobroInfoTableDetailsRubroItem: React.FC<
  ClienteFibraRobroInfoTableDetailsRubroItemProps
> = ({ rubro }) => {
  const items = (rubro?.rubro_items_data as RubroItemData[]) || [];
  const rubroType = rubro?.tipo_rubro;

  // to reuse the series modal ---------
  const setSelectedRow = useInstalacionesStore(s => s.setSelectedRow);
  const [openSeriesModal, setOpenSeriesModal] = useState<boolean>(false);

  const equiposUtilizados = useMemo(
    () => rubro?.orden_trabajo_data?.equipos_utilizados || [],
    [rubro],
  );
  const hasSeriesOT = equiposUtilizados.some(item => item?.series?.length);
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
                    Descripción
                  </Typography>
                </TableCell>
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
              {items.map(item => {
                const subtotal =
                  Number(item.valor_base) * Number(item.cantidad);
                return (
                  <TableRow key={item.uuid}>
                    <TableCell>
                      <Typography variant="body1">
                        {item.descripcion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {formatCurrency(item.valor_base)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {formatQuantity(item.cantidad)}
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
                                ...item,
                                series: seriesMap[item.descripcion] || [],
                                savedSeries: seriesMap[item.descripcion] || [],
                                selectedSeries:
                                  seriesMap[item.descripcion] || [],
                              } as any);
                              setOpenSeriesModal(true);
                            }}
                            justifyContent="center"
                          />
                        </TableCell>
                      )}

                    <TableCell align="right">
                      <Typography variant="body1">
                        {formatCurrency(subtotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
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

export default ClienteFibraRobroInfoTableDetailsRubroItem;
