import { GetSystemUsersParams, useFetchSystemUsers } from '@/actions/app';
import {
  PermissionsEnum,
  SAVE_USER_PROFILE_PERMISSIONS,
  SystemUserItem,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useSystemUsersColumns } from '../../shared/hooks/useSystemUsersColumns';
import { returnUrlSystemUserPage } from './SystemUserPage';
import CustomUserTableBtns from './CustomUserTableBtns';

export type CommonSystemUsersPageProps = {
  title: string;
  createUrl?: string;
  customShowCreateBtn?: boolean;
  customParams?: GetSystemUsersParams;
  custoEditIcon?: React.ReactNode;
  customEditIconToolTipTitle?: string;
  customOnEdit?: (systemUserItem: SystemUserItem) => void;
};

const CommonSystemUsersPage: React.FC<CommonSystemUsersPageProps> = ({
  title,
  createUrl,
  customShowCreateBtn = true,
  customParams = {},
  custoEditIcon = <MdEdit />,
  customEditIconToolTipTitle = 'Editar',
  customOnEdit,
}) => {
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
    data: useresProfilePagingRes,
    isLoading,
    isRefetching,
  } = useFetchSystemUsers({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      razon_social: searchTerm,
      ...filterObject,
      filterByState: false,
      ...customParams,
    },
  });

  ///* handlers
  const onEdit = (systemUserItem: SystemUserItem) => {
    if (customOnEdit) {
      customOnEdit(systemUserItem);
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Usuario',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlSystemUserPage}/editar/${systemUserItem?.user?.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { userColumns } = useSystemUsersColumns();

  return (
    <>
      <SingleTableBoxScene
        title={title}
        createPageUrl={createUrl}
        showCreateBtn={
          hasPermission(PermissionsEnum.users_add_user) && customShowCreateBtn
        }
      >
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<SystemUserItem>
          columns={userColumns}
          data={useresProfilePagingRes?.data?.items || []}
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
          rowCount={useresProfilePagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          // crud
          canEdit={hasAllPermissions([
            ...SAVE_USER_PROFILE_PERMISSIONS,
            PermissionsEnum.users_change_user,
          ])}
          onEdit={onEdit}
          canDelete={false}
          editIcon={custoEditIcon}
          editIconToolTipTitle={customEditIconToolTipTitle}
          showCustomButtonsSpaceEnd
          customButtonsSpaceEnd={(sui: SystemUserItem) => (
            <>
              <CustomUserTableBtns sui={sui} />
            </>
          )}
        />
      </SingleTableBoxScene>
    </>
  );
};

export default CommonSystemUsersPage;
