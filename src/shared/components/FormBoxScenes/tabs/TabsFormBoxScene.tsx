import { Box, Container, Grid, Stack, Typography } from '@mui/material';

import { gridSizeMdLg8 } from '@/shared/constants/ui';
import { useIsMediaQuery } from '@/shared/hooks';
import { GridSizeType, MaxWidthType } from '@/shared/interfaces';
import {
  ConfirmRejectCantelButtonsForm,
  CreateOrCancelButtonsForm,
} from '../../CustomButtons';

export type TabsFormBoxSceneProps = {
  children: React.ReactNode;
  titlePage?: string;
  titlePageNode?: React.ReactNode;

  /// save and cancel btn
  showBtns?: boolean;
  onCancel?: () => void;
  onSave?: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  cancelTextBtn?: string;
  saveTextBtn?: string;

  disableSubmitBtn?: boolean;

  ///* tabs
  tabs: any;

  formSize?: GridSizeType;

  showCustomBtns?: boolean;
  customBtns?: React.ReactNode;

  maxWidth?: MaxWidthType;

  onReject?: () => void;
  rejectTextBtn?: string;
};

const TabsFormBoxScene: React.FC<TabsFormBoxSceneProps> = ({
  children,
  titlePage,
  titlePageNode,

  showBtns = true,
  onCancel,
  onSave,
  disableSubmitBtn = false,
  cancelTextBtn = 'Cancelar',
  saveTextBtn = 'Guardar',

  tabs,
  formSize = gridSizeMdLg8,

  showCustomBtns = false,
  customBtns,

  maxWidth = 'lg',

  onReject,
  rejectTextBtn = 'Rechazar',
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          pt: isMobile ? 1 : 2,

          backgroundColor: '#fff',
          borderRadius: '12px',
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack>
            {/* =========== title =========== */}
            {titlePageNode ? (
              titlePageNode
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
          pt: isMobile ? 1 : 2,
          pb: 8,
          mt: 3,

          backgroundColor: '#fff',
          borderRadius: '12px',
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack spacing={3}>
            {/* =========== form =========== */}
            <Grid container justifyContent="center" alignItems="center">
              <Grid item {...formSize}>
                {/* ======== tabs ======= */}
                {tabs}

                {/* ======== tab panel ======= */}
                {children}

                {/* ====== reject btn ====== */}
                {onReject && onCancel && onSave && (
                  <Box
                    sx={{
                      pr: '9px',
                    }}
                  >
                    <ConfirmRejectCantelButtonsForm
                      onCancel={onCancel}
                      onConfirm={onSave}
                      onReject={onReject}
                      cancelTextBtn={cancelTextBtn}
                      rejectTextBtn={rejectTextBtn}
                      confirmTextBtn={saveTextBtn}
                    />
                  </Box>
                )}

                {/* ====== submit btn ====== */}
                {showBtns && onCancel && onSave && !onReject && (
                  <Box
                    sx={{
                      pr: '9px',
                    }}
                  >
                    <CreateOrCancelButtonsForm
                      onCancel={onCancel}
                      onSave={onSave}
                      disabled={disableSubmitBtn}
                      cancelTextBtn={cancelTextBtn}
                      saveTextBtn={saveTextBtn}
                    />
                  </Box>
                )}

                {/* ====== custom btns ====== */}
                {showCustomBtns && customBtns}
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default TabsFormBoxScene;
