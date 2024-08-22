import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateSystemGroupParams,
  useCreateSystemGroup,
  useFetchSystemModulesSidenav,
  useUpdateSystemGroup,
} from '@/actions/app';
import {
  a11yProps,
  CustomTabPanel,
  CustomTextArea,
  CustomTextField,
  FormTabsOnly,
  TabsFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg10, gridSizeMdLg8 } from '@/shared/constants/ui';
import { useTabsOnly } from '@/shared/hooks';
import { SystemGroup, SystemPermission } from '@/shared/interfaces';
import { systemGroupFormSchema } from '@/shared/utils';
import { returnUrlSystemsGroupPage } from '../../../pages/tables/SystemsGroupPage';
import PermissionAndModulesScence from './PermissionAndModulesScence';

export interface SaveSystemGroupProps {
  title: string;
  systemgroup?: SystemGroup;

  allSystemPermissions: SystemPermission[];
  selectedSystemPermissions: SystemPermission[];
}

type SaveFormData = CreateSystemGroupParams & {};

const SaveSystemGroup: React.FC<SaveSystemGroupProps> = ({
  title,
  systemgroup,
  allSystemPermissions,
  selectedSystemPermissions,
}) => {
  ///* hooks ----------------
  const navigate = useNavigate();

  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* local state ----------------
  const [systemModules, setSystemModules] = useState<string[]>([]);
  const [selectedSystemModules, setSelectedSystemModules] = useState<string[]>(
    [],
  );
  const [permissions, setPermissions] = useState<SystemPermission[]>(
    allSystemPermissions.sort((a, b) => {
      const codenameA = a?.codename || '';
      const codenameB = b?.codename || '';

      return codenameA.localeCompare(codenameB);
    }),
  );
  const [selectedPermissions, setSelectedPermissions] = useState<
    SystemPermission[]
  >(selectedSystemPermissions);

  ///* form ----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(systemGroupFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data ----------------
  const {
    data: systemModulesRes,
    isLoading: isSystemModulesLoading,
    isRefetching: isSystemModulesRefetching,
  } = useFetchSystemModulesSidenav();

  ///* mutations ----------------
  const createSystemGroupMutation = useCreateSystemGroup({
    navigate,
    returnUrl: returnUrlSystemsGroupPage,
    enableErrorNavigate: false,
  });
  const updateSystemGroupMutation =
    useUpdateSystemGroup<CreateSystemGroupParams>({
      navigate,
      returnUrl: returnUrlSystemsGroupPage,
    });

  ///* handlers ----------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (systemgroup?.id) {
      updateSystemGroupMutation.mutate({
        id: systemgroup.id!,
        data: {
          name: data.name,
          description: data.description,
          permissions: selectedPermissions
            .map(item => item?.id)
            .filter(Boolean) as number[],
          system_modules: selectedSystemModules,
        },
      });
      return;
    }

    ///* create
    createSystemGroupMutation.mutate({
      name: data.name,
      description: data.description,
      permissions: selectedPermissions
        .map(item => item?.id)
        .filter(Boolean) as number[],
      system_modules: selectedSystemModules,
    });
  };

  ///* effects ----------------
  useEffect(() => {
    if (!systemgroup?.id) return;
    reset(systemgroup);
  }, [systemgroup, reset]);
  useEffect(() => {
    if (isSystemModulesLoading || isSystemModulesRefetching) return;

    const systemModules = systemModulesRes?.data || [];
    const selectedSystemModules = systemgroup?.system_modules || [];

    if (selectedSystemModules?.length) {
      // set selected modules
      setSelectedSystemModules(
        systemModules?.filter(item => selectedSystemModules.includes(item)) ||
          [],
      );

      // set available modules
      const restSystemModules = systemModules.filter(
        item => !selectedSystemModules.includes(item),
      );
      setSystemModules(restSystemModules);
      return;
    }

    setSystemModules(systemModules);
  }, [
    isSystemModulesLoading,
    isSystemModulesRefetching,
    systemModulesRes,
    systemgroup,
  ]);

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSystemsGroupPage)}
      onSave={handleSubmit(onSave, () => {})}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Información General" value={1} {...a11yProps(1)} />
          <Tab label="Módulos y Permisos" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
      formSize={gridSizeMdLg10}
    >
      <CustomTabPanel value={tabValue} index={1} gridSizeChild={gridSizeMdLg8}>
        <CustomTextField
          label="Nombre"
          name="name"
          control={form.control}
          defaultValue={form.getValues().name}
          error={errors.name}
          helperText={errors.name?.message}
        />
        <CustomTextArea
          label="Descripción"
          name="description"
          control={form.control}
          defaultValue={form.getValues().description}
          error={errors.description}
          helperText={errors.description?.message}
          required={false}
        />
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2} ptGrid="0">
        <PermissionAndModulesScence
          systemModules={systemModules}
          setSystemModules={setSystemModules}
          selectedSystemModules={selectedSystemModules}
          setSelectedSystemModules={setSelectedSystemModules}
          //
          permissions={permissions || []}
          setPermissions={setPermissions}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
        />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveSystemGroup;
