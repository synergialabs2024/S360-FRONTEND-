import { Grid, SxProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { forwardRef, ReactNode } from 'react';

// constant
const headerSX: SxProps = {
  '& .MuiCardHeader-action': { mr: 0 },
};

interface MainCard2Props {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: SxProps;
  darkTitle?: boolean;
  secondary?: ReactNode;
  shadow?: string | number;
  sx?: SxProps;
  title?: ReactNode | string;
  elevation?: number;

  //
  gridContentSpacing?: number;
  isMultiTabsView?: boolean;
}

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard2 = forwardRef<HTMLDivElement, MainCard2Props>(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref,

    gridContentSpacing = 3,
    isMultiTabsView = false
  ) => {
    return (
      <>
        <Card
          sx={{
            // py: 2,
            mb: 3,
          }}
        >
          {/* card header and action */}
          {!darkTitle && title && (
            <CardHeader sx={headerSX} title={title} action={secondary} />
          )}
          {darkTitle && title && (
            <CardHeader
              sx={headerSX}
              title={<Typography variant="h3">{title}</Typography>}
              action={secondary}
            />
          )}
        </Card>

        <Card
          ref={ref}
          {...others}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: border ? '1px solid' : 'none',
            borderColor: 'divider',
            ':hover': {
              boxShadow: boxShadow
                ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)'
                : 'inherit',
            },
            ...sx,
          }}
        >
          {/* content & header divider */}
          {title && <Divider />}

          {/* card content */}
          {content && (
            <CardContent
              sx={{ flex: 1, overflow: 'auto', ...contentSX }}
              className={contentClass}
            >
              {isMultiTabsView ? (
                <>{children}</>
              ) : (
                <Grid container spacing={gridContentSpacing}>
                  {children}
                </Grid>
              )}
            </CardContent>
          )}
          {!content && children}
        </Card>
      </>
    );
  }
);

export default MainCard2;
