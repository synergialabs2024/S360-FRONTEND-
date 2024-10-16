import { Typography } from '@mui/material';

import { useIsMediaQuery } from '@/shared/hooks';

export type CustomTitleRefNumberProps = {
  initialText: string;
  referenceNumber: string;
};

const CustomTitleRefNumber: React.FC<CustomTitleRefNumberProps> = ({
  initialText,
  referenceNumber,
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <Typography variant="h2" component="h1" pb={isMobile ? 1 : 2}>
      {initialText}{' '}
      <span className="page-title__small">(#{referenceNumber})</span>
    </Typography>
  );
};

export default CustomTitleRefNumber;
