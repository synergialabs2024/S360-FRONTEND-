export const reorderOptionsPks = (data: {
  optionsPks: number[];
  flotaPk: number;
}) => {
  const { optionsPks, flotaPk } = data;
  const filteredOptionsPks = optionsPks.filter(pk => pk !== flotaPk);
  const reorderedOptionsPks = [flotaPk, ...filteredOptionsPks];

  return reorderedOptionsPks;
};
