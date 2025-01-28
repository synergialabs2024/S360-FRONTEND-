import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchMotivoRubroAdicionals } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { MotivoRubroAdicional } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { useUiConfirmModalStore } from '@/store/ui';

// TODO: change this to the correct url
export const returnUrlMotivosRubroAdicionalPage =
  ROUTER_PATHS.administracion.areasNav;

export type MotivosRubroAdicionalPageProps = {};

const MotivosRubroAdicionalPage: React.FC<
  MotivosRubroAdicionalPageProps
> = () => {
  // useCheckPermission(PermissionsEnum.cobranza_view_motivo_rubro_adicional);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state ---------------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations ---------------------
  // const changeState = useUpdateMotivoRubroAdicional({
  //   enableNavigate: false,
  // });

  ///* table ---------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ---------------------
  const {
    data: MotivosRubroAdicionalPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMotivoRubroAdicionals({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers ---------------------
  const onEdit = (motivorubroadicional: MotivoRubroAdicional) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar MotivoRubroAdicional',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlMotivosRubroAdicionalPage}/editar/${motivorubroadicional.uuid}`,
        );
      },
    });
  };

  ///* columns ---------------------
  const columns = useMemo<MRT_ColumnDef<MotivoRubroAdicional>[]>(
    () => [
      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },

      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },

      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },

      {
        accessorKey: 'valor',
        header: 'VALOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor'),
      },

      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },

      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Motivo Rubro Adicional"
      createPageUrl={`${returnUrlMotivosRubroAdicionalPage}/crear`}
      // showCreateBtn={hasPermission(
      //   // PermissionsEnum.cobranza_add_motivo_rubro_adicional,
      // )}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<MotivoRubroAdicional>
        columns={columns}
        data={MotivosRubroAdicionalPagingRes?.data?.items || []}
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
        rowCount={MotivosRubroAdicionalPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // enableActionsColumn={hasPermission(
        //   PermissionsEnum.cobranza_change_motivo_rubro_adicional,
        // )}
        // // crud
        // canEdit={hasPermission(
        //   PermissionsEnum.cobranza_change_motivo_rubro_adicional,
        // )}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default MotivosRubroAdicionalPage;
