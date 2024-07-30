import {
  formatCurrency,
  formatDate,
  formatDateWithTime,
  formatQuantity,
} from './format-data.utils';

export const emptyCellOneLevel = (
  row: any,
  key: string,
  defaultValue: string = 'N/A',
) => {
  const value = row?.original?.[key]?.toString()?.trim();
  return value ? value : defaultValue;
};

export const emptyCellNested = (
  row: any,
  keyPath: string[],
  defaultValue: string = 'N/A',
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  return value ? value : defaultValue;
};

export const formatDateCell = (row: any, key: string) => {
  const value = row?.original?.[key];
  return value ? formatDate(value) : 'N/A';
};

export const formatDateWithTimeCell = (row: any, key: string) => {
  const value = row?.original?.[key];
  return value ? formatDateWithTime(value) : 'N/A';
};
export const formatDateWithTimeCellNested = (row: any, keyPath: string[]) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  return value ? formatDateWithTime(value) : 'N/A';
};

export const formatBooleanCell = (row: any, key: string) => {
  const value = row?.original?.[key];
  return value ? 'SI' : 'NO';
};
export const formatBooleanCellNested = (row: any, keyPath: string[]) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  if (value === null || value === undefined) return 'N/A';

  return value ? 'SI' : 'NO';
};

export const formatQuantityCell = (row: any, key: string) => {
  const value = row?.original?.[key];
  return value ? formatQuantity(value) : 'N/A';
};

export const formatCurrencyCell = (row: any, key: string) => {
  const value = row?.original?.[key];
  return value ? formatCurrency(value) : 'N/A';
};

export const formatConcat2valuesCell = (
  row: any,
  key1: string,
  key2: string,
) => {
  const value1 = row?.original?.[key1] || 'N/A';
  const value2 = row?.original?.[key2] || 'N/A';
  return `${value1} ${value2}`;
};
