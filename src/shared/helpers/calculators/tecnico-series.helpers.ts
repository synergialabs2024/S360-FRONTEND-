export const getFilteredSeriesOTInstall = (
  series: string[],
  tempSeries: string[],
  assignedSerie: string | null,
) => {
  if (!assignedSerie) {
    return series.filter(s => !tempSeries.includes(s));
  }

  return (
    series.filter(s => {
      // Si s es activationSerie y está en tempSeries, no se filtra
      if (s === assignedSerie && tempSeries.includes(s)) {
        return true;
      }
      // Si s no es assignedSerie, se filtra normalmente
      return !tempSeries.includes(s) && s !== assignedSerie;
    }) || []
  );
};
