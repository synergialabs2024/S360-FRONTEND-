import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  ShowPingModal,
  ShowTraceModal,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { Trafico } from '@/shared/interfaces';
import { useFetchTraficos } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { emptyCellOneLevel } from '@/shared/utils';
import { ModalDetalleConsumo } from '../../custom';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { SimpleTable, SingleTableBoxScene } from '@/shared/components';

export const returnUrlTraficosPage = ROUTER_PATHS.administracionRed.traficosNav;

export type TraficosPageProps = {};

const TraficosPage: React.FC<TraficosPageProps> = () => {
  ///* Pendiente a cambio
  //useCheckPermission(PermissionsEnum.administration_view_pais);

  // server side filters - colums table
  const { filterObject } = useTableServerSideFiltering();

  ///* fetch data
  const {
    data: TraficosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTraficos({
    enabled: true,
    params: {
      ...filterObject,
    },
  });

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Trafico>[]>(
    () => [
      {
        accessorKey: 'username',
        header: 'PPP NAME',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'username'),
      },
      {
        accessorKey: 'consumo',
        header: '',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <ModalDetalleConsumo
              viewMoreText="CONSUMO"
              listItems={row.original}
            />
          );
        },
      },
      {
        accessorKey: 'trace',
        header: '',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <ShowTraceModal
              typeBtn="button"
              ipItem={row.original.ip_address || ''}
              modalTitle="TRACING"
            />
          );
        },
      },
      {
        accessorKey: 'ping',
        header: '',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <ShowPingModal
              typeBtn="button"
              ipItem={row.original.ip_address || ''}
              modalTitle="PING"
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene title="Traficos" showCreateBtn={false}>
      <SimpleTable<Trafico>
        columns={columns}
        data={TraficosPagingRes?.data?.items || []}
        isLoading={isLoading || isRefetching}
        enableGlobalFilter={true}
        showTotal={false}
      />
    </SingleTableBoxScene>
  );
};

export default TraficosPage;
