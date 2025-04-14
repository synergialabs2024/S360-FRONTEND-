import { Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { MdCloudUpload, MdDeleteForever } from 'react-icons/md';

import { gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  GridSizeType,
  JustifyContentType,
  SxPropsType,
} from '@/shared/interfaces';

interface UploadFilePreviewBtnProps {
  buttonLabel: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedFile: File | null;
  accept?: string;

  isUpdating?: boolean;
  fileUrl?: string;
  setIsUpdatingCb?: Function;

  sizeContainer?: GridSizeType;
  justifyContentBtnLabel?: JustifyContentType;
  sxGrid?: SxPropsType;

  onClickTrash?: () => void;

  disabledInputAndRemoveBtn?: boolean;
  canRemoveFile?: boolean;
  onRemoveFile?: (fileUrl?: any, selectedFile?: any) => void;
  onChangeFile?: (fileUrl?: any, selectedFile?: any) => void;
}

const UploadFilePreviewBtn: React.FC<UploadFilePreviewBtnProps> = ({
  buttonLabel,
  selectedFile,
  fileUrl,
  accept = '.pdf,.doc,.docx,.xls,.xlsx',
  setSelectedFile,
  onClickTrash,
  disabledInputAndRemoveBtn = false,
  onRemoveFile,
  onChangeFile,
  sizeContainer = gridSizeMdLg6,
  justifyContentBtnLabel = 'center',
  sxGrid,
}) => {
  const [fileName, setFileName] = useState<string | undefined>(fileUrl);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedFile(selectedFile);
      setFileName(selectedFile.name);
    }
    event.target.value = '';
  };

  return (
    <Grid item {...sizeContainer} sx={{ ...sxGrid }}>
      <input
        type="file"
        accept={accept}
        onChange={e => {
          if (disabledInputAndRemoveBtn) return;
          handleFileChange(e);
          onChangeFile && onChangeFile(fileUrl, selectedFile);
        }}
        style={{ display: 'none' }}
        id={'file-upload-input-' + buttonLabel}
        disabled={!!disabledInputAndRemoveBtn}
      />

      <label htmlFor={'file-upload-input-' + buttonLabel}>
        <Button
          variant="contained"
          component="span"
          fullWidth
          size="small"
          startIcon={<MdCloudUpload />}
          style={{
            width: '100%',
            padding: '5.5px 14px',
            backgroundColor: '#f9fafb00',
            border: '1px solid #b8bdc1',
            color: '#747474',
            textTransform: 'none',
            fontWeight: '400',
            fontSize: '1.08rem',
            justifyContent: justifyContentBtnLabel,
            minHeight: '52px',
          }}
        >
          {buttonLabel}
        </Button>
      </label>

      {(selectedFile || fileName) && (
        <div style={{ position: 'relative', marginTop: '10px' }}>
          {disabledInputAndRemoveBtn ? null : (
            <Tooltip title="Remover" arrow>
              <IconButton
                aria-label="Eliminar"
                color="error"
                onClick={() => {
                  setSelectedFile(null);
                  setFileName(undefined);
                  onClickTrash && onClickTrash();
                  onRemoveFile && onRemoveFile(fileUrl, selectedFile);
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <MdDeleteForever />
              </IconButton>
            </Tooltip>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #b8bdc1',
              borderRadius: '5px',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {selectedFile ? selectedFile.name : fileName}
            </Typography>
          </div>
        </div>
      )}
    </Grid>
  );
};

export default UploadFilePreviewBtn;
