import { Navigate, useParams } from 'react-router-dom';

import {
  useFetchSystemPermissions,
  useFetchSystemPermissionsGroup,
  useGetSystemGroup,
} from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSystemGroup } from '../../shared/components';
import { returnUrlSystemsGroupPage } from '../tables/SystemsGroupPage';

export type UpdateSystemGroupPageProps = {};

const UpdateSystemGroupPage: React.FC<UpdateSystemGroupPageProps> = () => {
  useCheckPermission(PermissionsEnum.users_change_customgroup);

  const { uuid } = useParams();
  const { data, isLoading, isRefetching } = useGetSystemGroup(uuid!);

  ///* fetch data ----------------
  const {
    data: systemPermissionsRes,
    isLoading: isLoadingPermissions,
    isRefetching: isRefetchingPermissions,
  } = useFetchSystemPermissions({
    params: {
      page_size: 6000,
    },
  });
  const {
    data: systemGroupPermissionsRes,
    isLoading: isLoadingGroupPermissions,
    isRefetching: isRefetchingGroup,
  } = useFetchSystemPermissionsGroup({
    enabled: !!data?.data?.id,
    params: {
      page_size: 6000,
      id: data?.data?.id!,
    },
  });

  const isCustomLoading =
    isLoadingPermissions ||
    isRefetchingPermissions ||
    isLoading ||
    isRefetching ||
    isLoadingGroupPermissions ||
    isRefetchingGroup;
  useLoaders(isCustomLoading);

  if (isCustomLoading) return null;
  if (!data?.data?.id) return <Navigate to={returnUrlSystemsGroupPage} />;

  return (
    <SaveSystemGroup
      title="Editar Grupo"
      systemgroup={data.data}
      allSystemPermissions={
        // filter permissions that already have the group
        systemPermissionsRes?.data?.items?.filter(permission =>
          systemGroupPermissionsRes?.data?.items?.every(
            groupPermission => groupPermission?.id !== permission?.id,
          ),
        ) || []
      }
      selectedSystemPermissions={
        // pass only the permissions that the group already has as object[]
        systemPermissionsRes?.data?.items?.filter(
          permission =>
            systemGroupPermissionsRes?.data?.items?.some(
              groupPermission => groupPermission?.id === permission?.id,
            ) || false,
        ) || []
      }
    />
  );
};

export default UpdateSystemGroupPage;
