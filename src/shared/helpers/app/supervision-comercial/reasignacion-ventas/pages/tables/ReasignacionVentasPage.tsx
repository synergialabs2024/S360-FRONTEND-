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
import { gridSizeMdLg6, TABLE_CONSTANTS } from '@/shared/constants/ui';
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
import { ReassignSellerModal } from '../../shared/components';
import { useFetchSystemUsersWithDebounce } from '../../shared/hooks/useFetchSystemUsersWithDebounce';

export type ReasignacionVentasPageProps = {};

const returnUrl = ROUTER_PATHS.supervisionComercial.reasignacionVentasNav;

const ReasignacionVentasPage: React.FC<ReasignacionVentasPageProps> = () => {
  useCheckPermission(PermissionsEnum.comercial_view_solicitudservicio);

  ///* local state
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedSolService, setSelectedSolService] =
    useState<SolicitudServicio | null>(null);

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

  const { users, isLoadingUsers, selectedUser, onChangeFilterUser } =
    useFetchSystemUsersWithDebounce();

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
    setSelectedSolService(row);
    setOpenModal(true);
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
          text="por identificación del cliente"
          sxContainer={{
            mb: 5,
          }}
          customSpaceNode={
            <>
              <CustomAutocompletSearchNoForm<SystemUser>
                label="Buscar por nombre de vendedor"
                options={
                  (users.map(u => ({
                    id: u.user?.id || 0,
                    razon_social: u.user?.razon_social || '',
                  })) as unknown as SystemUser[]) || []
                }
                valueKey="razon_social"
                actualValueKey="id"
                defaultValue={selectedUser?.id?.toString() || ''}
                optionLabelForEdit={selectedUser?.username || ''}
                isLoadingData={isLoadingUsers}
                onChangeInputText={onChangeFilterUser}
                onChangeRawValue={user => {
                  setSelectedVendedor(user);
                }}
                size={gridSizeMdLg6}
                required={false}
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

      {/* ============== modals ============== */}
      <ReassignSellerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        solicitudServicio={selectedSolService!}
      />
    </SingleTableBoxScene>
  );
};

export default ReasignacionVentasPage;
