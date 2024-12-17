import { useNavigate } from 'react-router-dom';

import { useFetchPromocions } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { SAVE_PROMOCION_PERMISSIONS } from '@/shared/constants/app';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsPromocion,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, Promocion } from '@/shared/interfaces';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlPromocionsPage = ROUTER_PATHS.comercial.promocionesNav;

export type PromocionsPageProps = {};

const PromocionsPage: React.FC<PromocionsPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_view_promocion);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

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
    data: PromocionsPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPromocions({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (promocion: Promocion) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Promocion',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlPromocionsPage}/editar/${promocion.uuid}`);
      },
    });
  };

  ///* columns
  const { promocionsColumns } = useColumnsPromocion();

  return (
    <SingleTableBoxScene
      title="Promociones"
      createPageUrl={`${returnUrlPromocionsPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.comercial_add_promocion,
        ...SAVE_PROMOCION_PERMISSIONS,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Promocion>
        columns={promocionsColumns}
        data={PromocionsPagingRes?.data?.items || []}
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
        rowCount={PromocionsPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.comercial_change_promocion,
          ...SAVE_PROMOCION_PERMISSIONS,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.comercial_change_promocion,
          ...SAVE_PROMOCION_PERMISSIONS,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default PromocionsPage;
