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

  isMainTableStates?: boolean;
};

const FormTabsOnly: React.FC<FormTabsOnlyProps> = ({
  onChange,
  value,
  children,

  variant = 'scrollable',
  scrollButtons = 'auto',
  allowScrollButtonsMobile = true,
  ariaLabel = 'scrollable form tabs only',
  isMainTableStates = false,
  sxTabs = {
    mb: isMainTableStates ? 2 : 6,
    pl: 0,
    ml: 0,
  },
  justifyContent = 'flex-start',
}) => {
  return (
    <Grid item container justifyContent={justifyContent} xs={12}>
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
