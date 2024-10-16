import { Box, Grid, Stack, Typography } from '@mui/material';

import { useIsMediaQuery } from '@/shared/hooks';
import { GridSizeType, MaxWidthType } from '@/shared/interfaces';
import { CreateOrCancelButtonsForm } from '../CustomButtons';
import ParentCard from './ParentCard';
import React from 'react';

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
};

const SingleFormBoxScene: React.FC<SingleFormBoxSceneProps> = ({
  children,
  titlePage,
  onCancel,
  onSave,
  disableSubmitBtn = false,

  titleNode = null,
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
                <CreateOrCancelButtonsForm
                  onCancel={onCancel}
                  onSave={onSave}
                  disabled={disableSubmitBtn}
                />
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </ParentCard>
    </>
  );
};

export default SingleFormBoxScene;
