import { useEffect } from 'react';

import { useUiStore } from '@/store/ui';

export const useLoaders = (isLoading: boolean) => {
  const setIsGlobalLoading = useUiStore(s => s.setIsGlobalLoading);

  useEffect(() => {
    setIsGlobalLoading(isLoading);

    return () => {
      setIsGlobalLoading(false);
    };
  }, [isLoading, setIsGlobalLoading]);
};
