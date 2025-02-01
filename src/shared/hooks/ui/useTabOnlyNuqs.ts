import { useQueryState } from 'nuqs';

export const useTabOnlyNuqs = () => {
  const [tabValue, setTabValue] = useQueryState('tab', { defaultValue: '1' });

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    return setTabValue(newValue.toString());
  };

  return {
    tabValue: parseInt(tabValue) || 1,
    handleTabChange,
  };
};
