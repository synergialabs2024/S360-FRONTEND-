import { useFetchSystemPermissions } from '@/actions/app';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { SaveSystemGroup } from '../../shared/components';

export type CreateSystemGroupPageProps = {};

const CreateSystemGroupPage: React.FC<CreateSystemGroupPageProps> = () => {
  useCheckPermission(PermissionsEnum.users_add_customgroup);

  ///* fetch data ----------------
  const {
    data: systemPermissionsRes,
    isLoading,
    isRefetching,
  } = useFetchSystemPermissions({
    params: {
      page_size: 6000,
    },
  });

  const isCustomLoading = isLoading || isRefetching;
  useLoaders(isCustomLoading);

  if (isCustomLoading) return null;

  return (
    <SaveSystemGroup
      title="Crear Grupo"
      allSystemPermissions={systemPermissionsRes?.data.items || []}
      selectedSystemPermissions={[]}
    />
  );
};

export default CreateSystemGroupPage;
