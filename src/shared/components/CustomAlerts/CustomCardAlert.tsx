import { Alert, AlertTitle, Grid, Typography } from '@mui/material';

import { gridSize } from '@/shared/constants';
import {
  AlertSeverityType,
  AlertVariantType,
  GridSizeType,
  SxPropsThemeType,
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

  sxAlert?: SxPropsThemeType;
  sxTypo?: SxPropsThemeType;
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

  sxAlert = {},
  sxTypo = {},
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
        <Alert
          variant={alertVariant}
          severity={alertSeverity}
          sx={{ ...sxAlert }}
        >
          {alertContentNode || (
            <Typography variant="body1" component="div" sx={{ ...sxTypo }}>
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
        <Alert
          severity={alertSeverity}
          variant={alertVariant}
          sx={{ ...sxAlert }}
        >
          <AlertTitle sx={{ ...sxTypo }}>{alertTitle}</AlertTitle>

          <Grid container>
            <Grid item xs={12}>
              {alertContentNode ? (
                alertContentNode
              ) : (
                <Typography variant="body1" sx={{ ...sxTypo }}>
                  {alertMessage}
                </Typography>
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
