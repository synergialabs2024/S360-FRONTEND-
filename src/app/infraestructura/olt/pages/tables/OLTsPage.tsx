import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import {
  CustomTable,
  CustomSearch,
  CustomSingleButton,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  useColumnsOLT,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { SAVE_OLT_PERMISSIONS } from '@/shared';
import { useGenericPOST } from '@/actions/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';
import { OLTTSQEnum, useFetchOLTs } from '@/actions/app';
import { OLT, PermissionsEnum } from '@/shared/interfaces';
import { ConfigOLTCustomButtons } from '../../shared/components';
import { useUiConfirmModalStore } from '@/store/ui/confirm-modal.store';

export const returnUrlOLTsPage = ROUTER_PATHS.infraestructura.oltsNav;

export type OLTsPageProps = {};

const OLTsPage: React.FC<OLTsPageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_view_olt);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const syncOlt = useGenericPOST<any, any>('/olt/sync-qgis/', OLTTSQEnum.OLTS, {
    customMessageToast: 'OLT sincronizadas correctamente',
    customOnSuccess() {
      setConfirmDialogIsOpen(false);
    },
  });

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
    data: OsLTPagingRes,
    isLoading,
    isRefetching,
  } = useFetchOLTs({
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
  const onEdit = (olt: OLT) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar OLT',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlOLTsPage}/editar/${olt.uuid}`);
      },
    });
  };

  ///* columns
  const { oltColumns } = useColumnsOLT();

  return (
    <SingleTableBoxScene
      title="OLT"
      createPageUrl={`${returnUrlOLTsPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.infraestructura_add_olt,
        ...SAVE_OLT_PERMISSIONS,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
        //
        customSpaceNode={
          <Grid item>
            <CustomSingleButton
              label="Sincronizar OLT"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Sincronizar información de Nodos y OLT',
                  subtitle:
                    '¿Está seguro que desea sincronizar la información de los NODOS y OLT existentes en QGIS?',
                  onConfirm: () => {
                    syncOlt.mutate({} as any);
                  },
                  confirmTextBtn: 'Si, sincronizar',
                });
              }}
              variant="outlined"
            />
          </Grid>
        }
      />

      <CustomTable<OLT>
        columns={oltColumns}
        data={OsLTPagingRes?.data?.items || []}
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
        rowCount={OsLTPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.infraestructura_change_olt,
          ...SAVE_OLT_PERMISSIONS,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.infraestructura_change_olt,
          ...SAVE_OLT_PERMISSIONS,
        ])}
        onEdit={onEdit}
        canDelete={false}
        showCustomButtonsSpace
        customButtonsSpace={olt => {
          return (
            <>
              <ConfigOLTCustomButtons olt={olt!} />
            </>
          );
        }}
      />
    </SingleTableBoxScene>
  );
};

export default OLTsPage;
