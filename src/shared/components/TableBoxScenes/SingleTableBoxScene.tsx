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
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pb: 8,
        // pt: 10,
        pt: 7,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {/* ========= title & create btn ========= */}
          {showCustomHeader && customHeader ? (
            <>{customHeader}</>
          ) : (
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
              pb={isMainTableStates ? 0 : 4}
            >
              <Stack spacing={1} pb={isMainTableStates ? 1 : 5}>
                <Typography variant="h3" component="h1">
                  {title}
                </Typography>
                <>
                  <Grid item>{showImportExportBtns && importExportBtns}</Grid>
                </>
              </Stack>

              {showCreateBtn && createPageUrl && (
                <div>
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
                </div>
              )}

              {showCustomBtns && <div>{customBtns}</div>}
            </Stack>
          )}

          {/* ========= Search & Table ========= */}
          {children}
        </Stack>
      </Container>
    </Box>
  );
};

export default SingleTableBoxScene;
