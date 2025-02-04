import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import { useIsMediaQuery } from '@/shared/hooks';
import {
  ColorButtonType,
  GridSizeType,
  MaxWidthType,
} from '@/shared/interfaces';
import {
  ConfirmRejectCantelButtonsForm,
  CreateOrCancelButtonsForm,
} from '../CustomButtons';
import ParentCard from './ParentCard';

export type SingleFormBoxSceneProps = {
  children: React.ReactNode;
  titlePage?: string;
  onCancel: () => void;
  onSave: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;

  disableSubmitBtn?: boolean;

  gridSizeForm?: GridSizeType;

  maxWidth?: MaxWidthType;

  titleNode?: React.ReactNode;

  onReject?: () => void;
  cancelTextBtn?: string;
  saveTextBtn?: string;
  rejectTextBtn?: string;
  cancelColorBtn?: ColorButtonType;
  rejectColotBtn?: ColorButtonType;
};

const SingleFormBoxScene: React.FC<SingleFormBoxSceneProps> = ({
  children,
  titlePage,
  onCancel,
  onSave,
  disableSubmitBtn = false,

  titleNode = null,

  onReject,
  cancelTextBtn = 'Cancelar',
  saveTextBtn = 'Guardar',
  rejectTextBtn = 'Rechazar',
  cancelColorBtn = 'inherit',
  rejectColotBtn = 'error',
}) => {
  const isMobile = useIsMediaQuery('sm');

  // Asegúrate de que el title sea siempre un string o JSX.Element
  const cardTitle: string | JSX.Element =
    typeof titleNode === 'string' || React.isValidElement(titleNode) ? (
      titleNode
    ) : titlePage ? (
      <Typography variant="h2" component="h1" pb={isMobile ? 1 : 2}>
        {titlePage}
      </Typography>
    ) : (
      <span />
    );

  return (
    <>
      <ParentCard title={cardTitle}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: isMobile ? 1 : 2,
            borderRadius: '12px',
          }}
        >
          <Stack spacing={2}>
            {/* ======= form ======= */}
            <Grid container /* justifyContent="center" alignItems="center" */>
              <Grid
                item
                container
                spacing={3}
                justifyContent="center"
                sx={{ mb: 3 }}
              >
                {children}

                {/* ====== submit btn ====== */}
                {onReject ? (
                  <ConfirmRejectCantelButtonsForm
                    onCancel={onCancel}
                    onConfirm={onSave}
                    onReject={onReject}
                    cancelTextBtn={cancelTextBtn}
                    rejectTextBtn={rejectTextBtn}
                    confirmTextBtn={saveTextBtn}
                    cancelColorBtn={cancelColorBtn}
                    rejectColotBtn={rejectColotBtn}
                  />
                ) : (
                  <CreateOrCancelButtonsForm
                    onCancel={onCancel}
                    onSave={onSave}
                    disabled={disableSubmitBtn}
                  />
                )}
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </ParentCard>
    </>
  );
};

export default SingleFormBoxScene;
