import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

import {
  gridSizeMdLg8,
  GridSizeType,
  MaxWidthType,
  useIsMediaQuery,
} from '@/shared';

///* custom styles for stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#6366F1',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#6366F1',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#6366F1',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#6366F1',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: '#6366F1',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <div className="QontoStepIcon-circle" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export type StepperBoxSceneProps = {
  steps: any[];
  activeStep: any;

  // btns
  onCancel: () => void;
  onSave: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  handleNext: () => void;
  handleBack: () => void;
  disableNextStepBtn: boolean;

  titlePage?: string;
  titleNode?: React.ReactNode;

  children: React.ReactNode;

  size?: GridSizeType;

  py?: number;

  maxWidth?: MaxWidthType;
};

const StepperBoxScene: React.FC<StepperBoxSceneProps> = ({
  steps,
  activeStep,

  // actions btns
  onCancel,
  onSave,
  handleNext,
  handleBack,
  disableNextStepBtn,

  titlePage,
  size = gridSizeMdLg8,

  children,
  py = 8,

  titleNode,

  maxWidth = 'lg',
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          pt: 2,

          backgroundColor: '#fff',
          borderRadius: '12px',
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack>
            {titleNode ? (
              titleNode
            ) : (
              <Typography variant="h2" component="h1" pb={isMobile ? 1 : 2}>
                {titlePage}
              </Typography>
            )}
          </Stack>
        </Container>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: py,

          mt: 3,
          backgroundColor: '#fff',
          borderRadius: '12px',
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack spacing={2}>
            {/* ================ main conent ================ */}
            <Grid container justifyContent="center" alignItems="center">
              <Grid item {...size}>
                {/* ============ stepper labels ============ */}
                <Stepper
                  activeStep={activeStep}
                  sx={{ mb: '38px', overflowX: 'auto' }}
                  connector={<QontoConnector />}
                >
                  {steps.map(label => {
                    // labels
                    return (
                      <Step key={label}>
                        {/* label for linear */}
                        <StepLabel StepIconComponent={QontoStepIcon}>
                          {label}
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>

                {/* ============ stepper conentent & handlers ============ */}
                {/* ======= actual content ======= */}
                <Grid item container justifyContent="center" spacing={3}>
                  {children}
                </Grid>

                {/* ======= handler btns ======= */}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 6 }}>
                  <Button
                    onClick={onCancel}
                    sx={{
                      color: '#4D5761',
                    }}
                  >
                    Cancelar
                  </Button>

                  <span className="spacer"></span>

                  <Button
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    disabled={activeStep === 0}
                  >
                    Atrás
                  </Button>

                  {activeStep !== steps.length - 1 && (
                    <Button onClick={handleNext} disabled={disableNextStepBtn}>
                      Siguiente
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button onClick={onSave} variant="contained">
                      Guardar
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default StepperBoxScene;
