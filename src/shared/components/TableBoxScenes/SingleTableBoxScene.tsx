import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export type SingleTableBoxSceneProps = {
  title: string;
  createPageUrl?: string;
  children: React.ReactNode;
  showCreateBtn?: boolean;

  createBtnText?: string;
  onClickCreateBtn?: () => void;

  showCustomBtns?: boolean;
  customBtns?: React.ReactNode;

  showCustomHeader?: boolean;
  customHeader?: React.ReactNode;

  showImportExportBtns?: boolean;
  importExportBtns?: React.ReactNode;

  isMainTableStates?: boolean;
};

const SingleTableBoxScene: React.FC<SingleTableBoxSceneProps> = ({
  title,
  createPageUrl,
  children,
  showCreateBtn = true,
  createBtnText = 'Crear',
  onClickCreateBtn,

  showCustomBtns = false,
  customBtns,
  showCustomHeader = false,
  customHeader,

  showImportExportBtns = false,
  importExportBtns,

  isMainTableStates = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 1,
          pb: 2,
          backgroundColor: '#fff',
          borderRadius: '15px',
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            {/* ========= title & create btn ========= */}
            {showCustomHeader && customHeader ? (
              <>{customHeader}</>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                pb={isMainTableStates ? 0 : 2}
              >
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Stack spacing={1}>
                      <Typography variant="h2" component="h1">
                        {title}
                      </Typography>
                      {showImportExportBtns && (
                        <Grid item>{importExportBtns}</Grid>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item>
                    {showCreateBtn && createPageUrl && (
                      <Button
                        startIcon={
                          <SvgIcon fontSize="small">
                            <FaPlus />
                          </SvgIcon>
                        }
                        variant="contained"
                        onClick={
                          onClickCreateBtn ||
                          (() => createPageUrl && navigate(createPageUrl))
                        }
                      >
                        {createBtnText}
                      </Button>
                    )}
                    {showCustomBtns && <div>{customBtns}</div>}
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
          pb: 2,
          mt: 3,
          backgroundColor: '#fff',
          borderRadius: '15px',
        }}
      >
        <Container maxWidth="xl">
          {/* ========= Search & Table ========= */}
          <Stack spacing={3}>{children}</Stack>
        </Container>
      </Box>
    </>
  );
};

export default SingleTableBoxScene;
