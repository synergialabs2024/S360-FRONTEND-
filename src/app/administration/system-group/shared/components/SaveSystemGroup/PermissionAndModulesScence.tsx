import { Tab } from '@mui/material';

import {
  a11yProps,
  CustomTabPanel,
  FormTabsOnly,
  NestedTabsScene,
} from '@/shared/components';
import { useTabsOnly } from '@/shared/hooks';
import { SystemPermission } from '@/shared/interfaces';
import ModulesSelection from './ModulesSelection';
import PermisionsSelection from './PermisionsSelection';

export type PermissionAndModulesScenceProps = {
  systemModules: string[];
  setSystemModules: (value: string[]) => void;
  selectedSystemModules: string[];
  setSelectedSystemModules: (value: string[]) => void;

  permissions: SystemPermission[];
  setPermissions: (value: SystemPermission[]) => void;
  selectedPermissions: SystemPermission[];
  setSelectedPermissions: (value: SystemPermission[]) => void;
};

const PermissionAndModulesScence: React.FC<PermissionAndModulesScenceProps> = ({
  selectedSystemModules,
  setSelectedSystemModules,
  systemModules,
  setSystemModules,

  permissions,
  setPermissions,
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const { tabValue, handleTabChange } = useTabsOnly();

  return (
    <>
      <NestedTabsScene
        tabs={
          <FormTabsOnly value={tabValue} onChange={handleTabChange}>
            <Tab label="Módulos" value={1} {...a11yProps(1)} />
            <Tab label="Permisos" value={2} {...a11yProps(2)} />
          </FormTabsOnly>
        }
      >
        {/* ================= System Modules ================= */}
        <CustomTabPanel value={tabValue} index={1} ptGrid="0">
          <ModulesSelection
            systemModules={systemModules}
            setSystemModules={setSystemModules}
            selectedSystemModules={selectedSystemModules}
            setSelectedSystemModules={setSelectedSystemModules}
          />
        </CustomTabPanel>

        {/* ================= Permissions ================= */}
        <CustomTabPanel value={tabValue} index={2} ptGrid="0">
          <PermisionsSelection
            permissions={permissions || []}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
            setPermissions={setPermissions}
          />
        </CustomTabPanel>
      </NestedTabsScene>
    </>
  );
};

export default PermissionAndModulesScence;
