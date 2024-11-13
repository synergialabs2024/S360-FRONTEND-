import { Typography, TypographyProps } from '@mui/material';
import dayjs from 'dayjs';
import {
  formatCurrency,
  formatDate,
  formatDateWithTime,
  formatQuantity,
} from './format-data.utils';

export const emptyCellOneLevel = (
  row: any,
  key: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
  defaultValue: string = 'N/A',
) => {
  const value = row?.original?.[key]?.toString()?.trim();
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? value : defaultValue}
    </Typography>
  );
};

export const emptyCellNested = (
  row: any,
  keyPath: string[],
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
  defaultValue: string = 'N/A',
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? value : defaultValue}
    </Typography>
  );
};

export const emptyCellNestedWithArray = (
  row: any,
  keyPath: string[],
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
  defaultValue: string = 'N/A',
  index: number = 0,
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value && value.length > index ? value[index] : defaultValue}
    </Typography>
  );
};

export const formatDateCell = (
  row: any,
  key: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? formatDate(value) : 'N/A'}
    </Typography>
  );
};

export const formatDateWithTimeCell = (
  row: any,
  key: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? formatDateWithTime(value) : 'N/A'}
    </Typography>
  );
};
export const formatDateWithTimeCellNested = (
  row: any,
  keyPath: string[],
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? formatDateWithTime(value) : 'N/A'}
    </Typography>
  );
};
export const formatDateWithTimeCellOnlyDate = (row: any, key: string) => {
  const value = row?.original?.[key];
  if (!value) return 'N/A';

  try {
    const date = dayjs(value).format('YYYY-MM-DD');
    return date;
  } catch {
    return '-';
  }
};

export const formatBooleanCell = (
  row: any,
  key: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? 'SI' : 'NO'}
    </Typography>
  );
};
export const formatBooleanCellNested = (
  row: any,
  keyPath: string[],
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  if (value === null || value === undefined) return 'N/A';

  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? 'SI' : 'NO'}
    </Typography>
  );
};

export const formatQuantityCell = (
  row: any,
  key: string,
  color?: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value ? formatQuantity(value) : 'N/A'}
    </Typography>
  );
};

export const formatCurrencyCell = (
  row: any,
  key: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {value ? formatCurrency(value) : 'N/A'}
    </Typography>
  );
};

export const formatConcat2valuesCell = (
  row: any,
  key1: string,
  key2: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value1 = row?.original?.[key1] || 'N/A';
  const value2 = row?.original?.[key2] || 'N/A';
  return (
    <Typography variant={variant} fontWeight={fontWeight}>
      {`${value1} ${value2}`}
    </Typography>
  );
};
