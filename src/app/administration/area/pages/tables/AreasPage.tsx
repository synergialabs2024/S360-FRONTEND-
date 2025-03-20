import { useNavigate } from 'react-router-dom';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumnsArea,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useFetchAreas } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Area, PermissionsEnum } from '@/shared/interfaces';

export const returnUrlAreasPage = ROUTER_PATHS.administracion.areasNav;

export type AreasPageProps = {};

const AreasPage: React.FC<AreasPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_area);

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
    data: areasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAreas({
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
  const onEdit = (area: Area) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Area',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlAreasPage}/editar/${area.uuid}`);
      },
    });
  };

  ///* columns
  const { areaColumns } = useColumnsArea();

  return (
    <SingleTableBoxScene
      title="Area"
      createPageUrl={`${returnUrlAreasPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.administration_add_area,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Area>
        columns={areaColumns}
        data={areasPagingRes?.data?.items || []}
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
        rowCount={areasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.administration_change_area,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.administration_change_area,
        ])}
        onEdit={onEdit}
        canDelete={false}
        // onDelete={onDelete}
      />
    </SingleTableBoxScene>
  );
};

export default AreasPage;
