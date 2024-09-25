import { Box, Container, Grid, Stack, Typography } from '@mui/material';

import { gridSizeMdLg8 } from '@/shared/constants/ui';
import { useIsMediaQuery } from '@/shared/hooks';
import { GridSizeType, MaxWidthType } from '@/shared/interfaces';

export type SingleFormBoxSceneNoActionsProps = {
  children: React.ReactNode;
  titlePage?: string;

  gridSizeForm?: GridSizeType;

  maxWidth?: MaxWidthType;

  titleNode?: React.ReactNode;
};

const SingleFormBoxSceneNoActions: React.FC<
  SingleFormBoxSceneNoActionsProps
> = ({
  children,
  titlePage,
  gridSizeForm = gridSizeMdLg8,
  maxWidth = 'lg',
  titleNode = null,
}) => {
  const isMobile = useIsMediaQuery('sm');

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          pt: isMobile ? 1 : 2,

          backgroundColor: '#fff',
          borderRadius: '15px',
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack>
            {/* ======= Title ======= */}
            {titleNode ? (
              titleNode
            ) : titlePage ? (
              <Typography variant="h2" component="h1" pb={isMobile ? 1 : 2}>
                {titlePage}
              </Typography>
            ) : null}
          </Stack>
        </Container>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: isMobile ? 1 : 2,
          mt: 3,

          backgroundColor: '#fff',
          borderRadius: '12px',
        }}
      >
        <Container maxWidth={maxWidth}>
          <Stack spacing={2}>
            {/* ======= form ======= */}
            <Grid container justifyContent="center" alignItems="center">
              <Grid item {...gridSizeForm}>
                <Grid
                  item
                  container
                  spacing={3}
                  justifyContent="center"
                  sx={{ mb: 3, mt: 1 }}
                >
                  {children}
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default SingleFormBoxSceneNoActions;
