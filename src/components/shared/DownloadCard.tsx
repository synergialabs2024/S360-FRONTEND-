'use client';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Tooltip, Divider, IconButton } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';
import { useUiStore } from '@/store/ui';

const DownloadCard = ({ title, children, onDownload }: any) => {
  const customizer = useUiStore(state => state.state);

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{
        padding: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
      }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      <CardHeader
        sx={{
          padding: '16px',
        }}
        title={title}
        action={
          <Tooltip title="Download" placement="left">
            <IconButton onClick={onDownload}>
              <IconDownload />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      {children}
    </Card>
  );
};
DownloadCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onDownload: PropTypes.func,
};
export default DownloadCard;
