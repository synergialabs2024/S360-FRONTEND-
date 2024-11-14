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

import {
  BaseRubroDetail,
  formatCurrency,
  formatQuantity,
  Rubro,
} from '@/shared';

export type ClienteFibraRobroInfoTableDetailsProps = {
  rubro: Rubro;
};

const ClienteFibraRobroInfoTableDetails: React.FC<
  ClienteFibraRobroInfoTableDetailsProps
> = ({ rubro }) => {
  const detail: BaseRubroDetail[] = rubro?.detalle;
  const hasName = detail?.some(item => item?.producto_data?.nombre);

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
    </>
  );
};

export default ClienteFibraRobroInfoTableDetails;
