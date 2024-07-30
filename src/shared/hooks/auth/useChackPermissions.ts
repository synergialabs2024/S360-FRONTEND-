import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PermissionsEnum } from '@/shared/interfaces';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { ToastWrapper } from '@/shared/wrappers';

export const useCheckPermission = (permision: PermissionsEnum) => {
  const navigate = useNavigate();
  // const logOut = useAuthStore(s => s.logout);

  useEffect(() => {
    if (!hasPermission(permision)) {
      ToastWrapper.error('No tienes permisos para ver esta página');
      navigate('/404', { replace: true });
      // logOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useCheckPermissionsArray = (permissions: PermissionsEnum[]) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasAllPermissions(permissions)) {
      ToastWrapper.error('No tienes permisos para ver esta página');
      navigate('/404', { replace: true });
    }
  }, [permissions, navigate]);
};
