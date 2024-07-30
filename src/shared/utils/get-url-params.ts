export const getUrlParams = (params: Object): string => {
  const queryParams = new URLSearchParams();

  // loop through the object and append the query params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams.toString();
};
