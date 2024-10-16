// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface CustomFormLabelProps {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}

const CustomFormLabel = styled(
  ({ required, children, ...props }: CustomFormLabelProps) => (
    <Typography
      variant="subtitle1"
      fontWeight={600}
      {...props}
      component="label"
      htmlFor={props.htmlFor}
    >
      {children} {required && '*'}
    </Typography>
  ),
)(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

export default CustomFormLabel;
