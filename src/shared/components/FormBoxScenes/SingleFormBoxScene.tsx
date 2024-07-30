import { Box, Container, Grid, Stack, Typography } from '@mui/material';

import { gridSizeMdLg8 } from '@/shared/constants/ui';
import { useIsMediaQuery } from '@/shared/hooks';
import { GridSizeType, MaxWidthType } from '@/shared/interfaces';
import { CreateOrCancelButtonsForm } from '../CustomButtons';

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
  gridSizeForm = gridSizeMdLg8,
  maxWidth = 'lg',
  titleNode = null,
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: isMobile ? 4 : 8,
        pb: 8,
      }}
    >
      <Container maxWidth={maxWidth}>
        <Stack spacing={3}>
          <>
            {titleNode ? (
              titleNode
            ) : titlePage ? (
              <Typography variant="h3" component="h1" pb={isMobile ? 3 : 6}>
                {titlePage}
              </Typography>
            ) : null}
          </>

          {/* ======= form ======= */}
          <Grid container justifyContent="center" alignItems="center">
            <Grid item {...gridSizeForm}>
              <Grid item container spacing={3} justifyContent="center">
                {children}

                {/* ====== submit btn ====== */}
                <CreateOrCancelButtonsForm
                  onCancel={onCancel}
                  onSave={onSave}
                  disabled={disableSubmitBtn}
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default SingleFormBoxScene;
