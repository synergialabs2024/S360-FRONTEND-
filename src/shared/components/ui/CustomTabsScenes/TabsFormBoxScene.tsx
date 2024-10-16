import { Box, Container, Grid, Typography } from '@mui/material';

import { useIsMediaQuery } from '@/shared';
import { gridSize } from '@/shared/constants';
import { GridSizeType, MaxWidthType } from '@/shared/interfaces';
import {
  ConfirmRejectCantelButtonsForm,
  CreateOrCancelButtonsForm,
} from '../CustomButtons';

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
  // formSize = gridSizeMdLg8,
  formSize = gridSize,

  showCustomBtns = false,
  customBtns,

  maxWidth = 'lg',

  onReject,
  rejectTextBtn = 'Rechazar',
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 0,
      }}
    >
      <Grid container spacing={3} direction="column" alignItems="center">
        {/* =========== title =========== */}
        <Grid item xs={12}>
          {titlePageNode ? (
            titlePageNode
          ) : (
            <Typography variant="h3" component="h1" pb={isMobile ? 3 : 6}>
              {titlePage}
            </Typography>
          )}
        </Grid>

        {/* =========== form =========== */}
        <Grid item container justifyContent="center">
          <Grid
            item
            {...formSize}
            container
            spacing={3}
            justifyContent="center"
          >
            {/* ======== tabs ======= */}
            <Grid item xs={12}>
              {tabs}
            </Grid>

            {/* ======== tab panel ======= */}
            <Grid item xs={12}>
              {children}
            </Grid>

            {/* ====== reject btn ====== */}
            {onReject && onCancel && onSave && (
              <Grid item xs={12}>
                <Box sx={{ pr: '9px' }}>
                  <ConfirmRejectCantelButtonsForm
                    onCancel={onCancel}
                    onConfirm={onSave}
                    onReject={onReject}
                    cancelTextBtn={cancelTextBtn}
                    rejectTextBtn={rejectTextBtn}
                    confirmTextBtn={saveTextBtn}
                  />
                </Box>
              </Grid>
            )}

            {/* ====== submit btn ====== */}
            {showBtns && onCancel && onSave && !onReject && (
              <Grid item xs={12}>
                <Box sx={{ pr: '9px' }}>
                  <CreateOrCancelButtonsForm
                    onCancel={onCancel}
                    onSave={onSave}
                    disabled={disableSubmitBtn}
                    cancelTextBtn={cancelTextBtn}
                    saveTextBtn={saveTextBtn}
                  />
                </Box>
              </Grid>
            )}

            {/* ====== custom btns ====== */}
            {showCustomBtns && customBtns && (
              <Grid item xs={12}>
                {customBtns}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TabsFormBoxScene;
