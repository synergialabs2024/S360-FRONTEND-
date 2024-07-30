import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import { ScrollableDialogProps } from '../../CustomDialogs';

export type ViewMoreTextModalTableCellProps = {
  longText: string;
  limit?: number;
  modalTitle?: string;
  viewMoreText?: string;
};

const ViewMoreTextModalTableCell: React.FC<ViewMoreTextModalTableCellProps> = ({
  longText,
  limit = 42,
  modalTitle = 'Texto completo',
  viewMoreText = 'Ver más',
}) => {
  ///* local state -------------
  const [open, setOpen] = useState(false);

  if (!longText) return 'N/A';

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
              {viewMoreText}
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
