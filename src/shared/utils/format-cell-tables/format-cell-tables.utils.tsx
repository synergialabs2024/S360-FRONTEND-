import { Typography, TypographyProps } from '@mui/material';
import {
  formatCurrency,
  formatDate,
  formatDateWithTime,
  formatQuantity,
} from '../format-data/format-data.utils';

export const emptyCellOneLevelCustom = (
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

export const emptyCellNestedCustom = (
  row: any,
  keyPath: string[],
  color: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
  defaultValue: string = 'N/A',
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value ? value : defaultValue}
    </Typography>
  );
};

export const emptyCellNestedWithArray = (
  row: any,
  keyPath: string[],
  color: string,
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
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value && value.length > index ? value[index] : defaultValue}
    </Typography>
  );
};

export const formatDateCellCustom = (
  row: any,
  key: string,
  color: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value ? formatDate(value) : 'N/A'}
    </Typography>
  );
};

export const formatDateWithTimeCellCustom = (
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

export const formatDateWithTimeCellNestedCustom = (
  row: any,
  keyPath: string[],
  color: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value ? formatDateWithTime(value) : 'N/A'}
    </Typography>
  );
};

export const formatBooleanCellCustom = (
  row: any,
  key: string,
  color: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value ? 'SI' : 'NO'}
    </Typography>
  );
};

export const formatBooleanCellNestedCustom = (
  row: any,
  keyPath: string[],
  color: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = keyPath.reduce(
    (obj, key) => (obj && obj[key] != null ? obj[key] : null),
    row?.original,
  );
  if (value === null || value === undefined) return 'N/A';

  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value ? 'SI' : 'NO'}
    </Typography>
  );
};

export const formatQuantityCellCustom = (
  row: any,
  key: string,
  color: string,
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

export const formatCurrencyCellCustom = (
  row: any,
  key: string,
  color: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value = row?.original?.[key];
  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {value ? formatCurrency(value) : 'N/A'}
    </Typography>
  );
};

export const formatConcat2valuesCellCustom = (
  row: any,
  key1: string,
  key2: string,
  color: string,
  variant: TypographyProps['variant'] = 'h6',
  fontWeight: number = 400,
) => {
  const value1 = row?.original?.[key1] || 'N/A';
  const value2 = row?.original?.[key2] || 'N/A';
  return (
    <Typography color={color} variant={variant} fontWeight={fontWeight}>
      {`${value1} ${value2}`}
    </Typography>
  );
};
