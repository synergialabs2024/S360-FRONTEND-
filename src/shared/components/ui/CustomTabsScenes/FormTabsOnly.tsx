import { Grid, Tabs } from '@mui/material';

import { JustifyContentType, SxPropsThemeType } from '@/shared/interfaces';

export type FormTabsOnlyProps = {
  value: number;
  onChange:
    | ((event: React.SyntheticEvent<Element, Event>, value: any) => void)
    | undefined;

  children: React.ReactNode;

  variant?: 'standard' | 'scrollable' | 'fullWidth';
  scrollButtons?: boolean | 'auto' | undefined;
  allowScrollButtonsMobile?: boolean | undefined;
  ariaLabel?: string | undefined;

  sxTabs?: SxPropsThemeType;
  justifyContent?: JustifyContentType;
};

const FormTabsOnly: React.FC<FormTabsOnlyProps> = ({
  onChange,
  value,
  children,

  variant = 'scrollable',
  scrollButtons = 'auto',
  allowScrollButtonsMobile = true,
  ariaLabel = 'scrollable form tabs only',
  sxTabs = {
    // mb: 6,
    pl: 0,
    ml: 0,
    pt: 0,
    mt: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    width: '100%',
  },
  justifyContent = 'flex-start',
}) => {
  return (
    <Grid
      item
      container
      justifyContent={justifyContent}
      xs={12}
      sx={{
        width: '100%',
      }}
    >
      <Tabs
        onChange={onChange}
        value={value}
        sx={sxTabs}
        // scrollable
        variant={variant}
        scrollButtons={scrollButtons}
        allowScrollButtonsMobile={allowScrollButtonsMobile}
        aria-label={ariaLabel}
      >
        {children}
      </Tabs>
    </Grid>
  );
};

export default FormTabsOnly;
