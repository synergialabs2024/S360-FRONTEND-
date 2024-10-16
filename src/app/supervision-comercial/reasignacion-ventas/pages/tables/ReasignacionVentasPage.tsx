import { AiOutlineUserSwitch } from 'react-icons/ai';

import { useFetchSolicitudServicios } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  EstadoSolicitudServicioEnumChoice,
  ToastWrapper,
  UserRolesEnumChoice,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
  SingleTableBoxScene,
} from '@/shared/components';
import CustomAutocompletSearchNoForm from '@/shared/components/CustomAutocompletes/CustomAutocompletSearchNoForm';
import { gridSize, TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsSolicitusService,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  PermissionsEnum,
  SolicitudServicio,
  SystemUser,
} from '@/shared/interfaces';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useFetchSystemUsersWithDebounce } from '../../shared/hooks/useFetchSystemUsersWithDebounce';

export type ReasignacionVentasPageProps = {};

const returnUrl = ROUTER_PATHS.supervisionComercial.reasignacionVentasNav;

const ReasignacionVentasPage: React.FC<ReasignacionVentasPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_view_solicitudservicio);

  ///* global state
  const user = useAuthStore(s => s.user);
  const [selectedVendedor, setSelectedVendedor] = useState<SystemUser | null>(
    null,
  );

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  const {
    users,
    isLoadingUsers,
    selectedUser,
    onChangeUser,
    onChangeFilterUser,
  } = useFetchSystemUsersWithDebounce();

  ///* fetch data
  const {
    data: SolicitudsServicioPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudServicios({
    enabled: true,
    params: {
      identificacion: searchTerm,
      ...filterObject,
      estado_solicitud: EstadoSolicitudServicioEnumChoice.INGRESADO,
      page_size: pageSize,
      page: pageIndex + 1,
      vendedor: selectedVendedor?.id,
    },
  });

  ///* handlers
  const onEdit = (row: SolicitudServicio) => {
    console.log('onEdit', row);
  };

  ///* columns
  const { solicitudServicioBase } = useColumnsSolicitusService();

  ///* effects
  useEffect(() => {
    if (!user) return;
    user.role === UserRolesEnumChoice.AGENTE &&
      ToastWrapper.error('No autorizado');
  }, [user]);
  const customLoading = isLoading || isRefetching || isLoadingUsers;
  useLoaders(customLoading);

  if (user?.role === UserRolesEnumChoice.AGENTE)
    return <Navigate to="/" replace />;

  return (
    <SingleTableBoxScene
      title="Reasignación de Ventas"
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.comercial_add_solicitudservicio,
      ])}
      createPageUrl={`${returnUrl}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por identificación"
          sxContainer={{
            mb: 5,
          }}
          customSpaceNode={
            <>
              {/* TODO: FIX */}
              <CustomAutocompletSearchNoForm<SystemUser>
                label="Vendedor"
                options={
                  (users.map(u => ({
                    id: u.user?.id || 0,
                    razon_social: u.user?.razon_social || '',
                  })) as any) || []
                }
                valueKey="razon_social"
                actualValueKey="id"
                defaultValue={selectedUser?.id?.toString() || ''}
                optionLabelForEdit={selectedUser?.username || ''}
                isLoadingData={isLoadingUsers}
                onChangeValue={onChangeUser}
                onChangeInputText={onChangeFilterUser}
                onChangeRawValue={user => {
                  setSelectedVendedor(user);
                }}
                size={gridSize}
              />
            </>
          }
        />

        <CustomTable<SolicitudServicio>
          columns={solicitudServicioBase}
          data={SolicitudsServicioPagingRes?.data?.items || []}
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
          rowCount={SolicitudsServicioPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasPermission(
            PermissionsEnum.comercial_change_solicitudservicio,
          )}
          // crud
          canEdit={hasPermission(
            PermissionsEnum.comercial_change_solicitudservicio,
          )}
          onEdit={onEdit}
          editIcon={<AiOutlineUserSwitch />}
          editIconToolTipTitle="Reasignar"
          canDelete={false}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default ReasignacionVentasPage;
