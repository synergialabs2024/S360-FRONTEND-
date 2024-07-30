import { useCallback, useState } from 'react';

type UseTabsOnlyProps = {
  initialTabValue?: number;
};

export const useTabsOnly = ({ initialTabValue = 1 }: UseTabsOnlyProps = {}) => {
  const [tabValue, setTabValue] = useState(initialTabValue);
  const handleTabChange = useCallback((_event: any, newValue: number) => {
    setTabValue(newValue);
  }, []);

  return {
    tabValue,
    handleTabChange,
  };
};
