// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Theme,
  Tooltip,
  Fab,
  Stack,
  //   Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

// import breadcrumbImg from '@/assets/images/breadcrumb/ChatBc.png';
import { IconCircle } from '@tabler/icons-react';

import { IconPlus } from '@tabler/icons-react';
// import { IconTrash } from '@tabler/icons-react';

import { useIsMediaQuery } from '@/shared/hooks';
import { useNavigate } from 'react-router-dom';

interface BreadCrumbType {
  subtitle?: string;
  title: string;
  children?: JSX.Element;
  createPageUrl?: string;
  onClickCreateBtn?: () => void;
  showCreateBtn?: boolean;
}

const Breadcrumb = ({
  subtitle,
  title,
  children,
  createPageUrl,
  onClickCreateBtn,
  showCreateBtn,
}: BreadCrumbType) => {
  const isMobile = useIsMediaQuery('sm');
  const navigate = useNavigate();
  const BCrumb = [
    {
      to: '/',
      title: 'Inicio',
    },
    {
      title: title,
    },
  ];
  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: 'primary.light',
          borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
          p: '30px 25px 20px',
          marginBottom: '30px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Grid item xs={12} sm={6} lg={8} mb={1}>
          <Typography variant="h4">{title}</Typography>
          <Typography
            color="textSecondary"
            variant="h6"
            fontWeight={400}
            mt={0.8}
            mb={0}
          >
            {subtitle}
          </Typography>
          <Breadcrumbs
            separator={
              <IconCircle
                size="5"
                fill="textSecondary"
                fillOpacity={'0.6'}
                style={{ margin: '0 5px' }}
              />
            }
            sx={{ alignItems: 'center', mt: BCrumb ? '10px' : '' }}
            aria-label="breadcrumb"
          >
            {BCrumb
              ? BCrumb.map(item => (
                <div key={item.title}>
                  {item.to ? (
                    <Link
                      underline="none"
                      color="inherit"
                      component={NavLink}
                      to={item.to}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <Typography color="textPrimary">{item.title}</Typography>
                  )}
                </div>
              ))
              : ''}
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
          <Box
            sx={{
              ...(isMobile
                ? {}
                : {
                  display: { xs: 'none', md: 'block', lg: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  width: '100%',
                }),
            }}
          >
            {children ? (
              <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>
            ) : (
              <>
                {/* <imgrelative src={breadcrumbImg} alt={breadcrumbImg} width={'165px'} /> */}
                <Stack spacing={1} direction="row" justifyContent="center">
                  {showCreateBtn && (
                    <Tooltip title="Nuevo">
                      <Fab
                        color="secondary"
                        aria-label="plus"
                        onClick={
                          onClickCreateBtn ||
                          (() => createPageUrl && navigate(createPageUrl))
                        }
                      >
                        <IconPlus width={20} />
                      </Fab>
                    </Tooltip>
                  )}
                </Stack>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Breadcrumb;
