import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import { ScrollableDialogProps } from '../../CustomDialogs';
import { IconEye } from '@tabler/icons-react';

export type ViewMoreTextModalTableCellProps = {
  longText: string;
  limit?: number;
  modalTitle?: string;
  viewMoreText?: string;
  defaultText?: string;
  iconEyes?: boolean;
};

const ViewMoreTextModalTableCell: React.FC<ViewMoreTextModalTableCellProps> = ({
  longText,
  limit = 42,
  modalTitle = 'Texto completo',
  viewMoreText = 'Ver más',
  iconEyes = false,
  defaultText = 'N/A',
}) => {
  ///* local state -------------
  const [open, setOpen] = useState(false);

  if (!longText) return defaultText;

  return (
    <>
      <Typography>
        {longText.length > limit ? (
          <>
            {`${longText.substring(0, limit)}...`}

            <Button
              component="span"
              color="primary"
              variant="text"
              size="small"
              onClick={() => setOpen(!open)}
              style={{ cursor: 'pointer' }}
            >
              {iconEyes ? <IconEye /> : viewMoreText}
            </Button>
          </>
        ) : (
          longText
        )}
      </Typography>

      {open && (
        <ScrollableDialogProps
          open={open}
          onClose={() => setOpen(false)}
          title={modalTitle}
          contentNode={
            <>
              <Grid container spacing={2} mt={2} mb={3}>
                <Grid item xs={12}>
                  <Typography>{longText}</Typography>
                </Grid>
              </Grid>
            </>
          }
        />
      )}
    </>
  );
};

export default ViewMoreTextModalTableCell;
