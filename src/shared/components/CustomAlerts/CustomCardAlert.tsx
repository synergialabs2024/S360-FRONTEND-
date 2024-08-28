import { Alert, AlertTitle, Grid, Typography } from '@mui/material';

import { gridSize } from '@/shared/constants';
import {
  AlertSeverityType,
  AlertVariantType,
  GridSizeType,
} from '@/shared/interfaces';
import { CustomCircularPorgress } from '../Loaders';

export type CustomCardAlertProps = {
  alertTitle?: string;
  alertMessage?: string;
  alertContentNode?: React.ReactNode;
  alertVariant?: AlertVariantType;
  alertSeverity?: AlertSeverityType;

  sizeType?: 'small' | 'medium';
  gridSizeCard?: GridSizeType;

  isLoading?: boolean;
};

const CustomCardAlert: React.FC<CustomCardAlertProps> = ({
  alertTitle,
  alertMessage,
  alertContentNode,
  alertVariant = 'outlined',
  alertSeverity = 'info',
  gridSizeCard = gridSize,
  isLoading = false,
  sizeType = 'small',
}) => {
  if (isLoading) {
    return (
      <>
        <Grid item xs={12}>
          <CustomCircularPorgress />
        </Grid>
      </>
    );
  }

  if (sizeType === 'small') {
    return (
      <Grid item {...gridSizeCard}>
        <Alert variant={alertVariant} severity={alertSeverity}>
          {alertContentNode || (
            <Typography variant="body1" component="div">
              {alertMessage}
            </Typography>
          )}
        </Alert>
      </Grid>
    );
  }

  if (sizeType === 'medium') {
    return (
      <Grid item {...gridSizeCard}>
        <Alert severity={alertSeverity} variant={alertVariant}>
          <AlertTitle>{alertTitle}</AlertTitle>

          <Grid container>
            <Grid item xs={12}>
              {alertContentNode ? (
                alertContentNode
              ) : (
                <Typography variant="body1">{alertMessage}</Typography>
              )}
            </Grid>
          </Grid>
        </Alert>
      </Grid>
    );
  }

  return 'Not allowed';
};

export default CustomCardAlert;
