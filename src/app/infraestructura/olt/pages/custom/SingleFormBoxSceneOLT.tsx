import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useIsMediaQuery } from '@/shared/hooks';
import { GridSizeType, MaxWidthType } from '@/shared/interfaces';
import React from 'react';
import ParentCard from '@/shared/components/FormBoxScenes/ParentCard';
import { ChipModelState } from '@/shared/components';
import { gridSizeMdLg1 } from '@/shared';
import ViewNotificacionModal from './ViewNotificacionModal';

export type SingleFormBoxSceneOLTProps = {
  children: React.ReactNode;
  titlePage?: string;
  onCancel: () => void;

  gridSizeForm?: GridSizeType;

  maxWidth?: MaxWidthType;

  titleNode?: React.ReactNode;
  pt?: number;

  listItems?: Record<string, any>;
};

const SingleFormBoxSceneOLT: React.FC<SingleFormBoxSceneOLTProps> = ({
  children,
  titlePage,
  onCancel,

  titleNode = null,
  pt = 6,
  listItems = {},
}) => {
  const isMobile = useIsMediaQuery('sm');

  const calculateColorState = (state: boolean) => {
    return state ? 'success' : 'error';
  };
  const calculateLabelState = (state: boolean) => {
    return state ? 'Activo' : 'Inactivo';
  };

  console.log(listItems);

  const cardTitle: JSX.Element = (
    <Grid container alignItems="center">
      <Grid item xs={9}>
        {typeof titleNode === 'string' || React.isValidElement(titleNode) ? (
          <>{titleNode}</>
        ) : titlePage ? (
          <Typography variant="h2" component="h1" pb={isMobile ? 1 : 2}>
            {titlePage}
          </Typography>
        ) : (
          <span />
        )}
      </Grid>

      <Grid item xs={3} display="flex" justifyContent="flex-end">
        <ViewNotificacionModal listItems={listItems} />
      </Grid>
    </Grid>
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
            <Grid display="flex" justifyContent="flex-start">
              <ChipModelState
                size={gridSizeMdLg1}
                label={calculateLabelState(listItems.state)}
                color={calculateColorState(listItems.state)}
              />
            </Grid>
            {/* ======= form ======= */}
            <Grid container>
              <Grid
                item
                container
                spacing={1}
                justifyContent="center"
                sx={{ mb: 1 }}
              >
                {children}
                {/* ====== submit btn ====== */}
                <Grid container spacing={1} justifyContent="end" pt={pt}>
                  <Button
                    onClick={onCancel}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </ParentCard>
    </>
  );
};

export default SingleFormBoxSceneOLT;
