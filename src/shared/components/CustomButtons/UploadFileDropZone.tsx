import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { MdDeleteForever, MdInsertDriveFile } from 'react-icons/md';

import {
  GridSizeType,
  JustifyContentType,
  SxPropsType,
} from '@/shared/interfaces';
import { gridSizeMdLg6 } from '@/shared/constants/ui';

export interface UploadFileDropZoneProps {
  buttonLabel: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedFile: File | null;
  type: 'pdf' | 'excel' | 'word' | 'p12' | 'any';
  isUpdating?: boolean;
  fileUrl?: string;
  setIsUpdatingCb?: Function;
  sizeContainer?: GridSizeType;
  justifyContentBtnLabel?: JustifyContentType;
  sxGrid?: SxPropsType;
  onClickTrash?: () => void;
  disabledInputAndRemoveBtn?: boolean;
  canRemoveFile?: boolean;
  onRemoveFile?: (fileUrl?: string, selectedFile?: File | null) => void;
  onChangeFile?: (fileUrl?: string, selectedFile?: File | null) => void;
}

const fileTypes = {
  pdf: 'application/pdf',
  excel:
    '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  word: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  any: '*/*',
  p12: '.p12,application/x-pkcs12',
};

const UploadFileDropZone: React.FC<UploadFileDropZoneProps> = ({
  buttonLabel,
  selectedFile,
  fileUrl,
  type,
  setSelectedFile,
  onClickTrash,
  disabledInputAndRemoveBtn = false,
  onRemoveFile,
  onChangeFile,
  sizeContainer = gridSizeMdLg6,
  sxGrid,
}) => {
  const [fileName, setFileName] = useState<string | undefined>(fileUrl);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selected = files[0];
      setSelectedFile(selected);
      setFileName(selected.name);
      onChangeFile && onChangeFile(fileUrl, selected);
    }
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      onChangeFile && onChangeFile(fileUrl, file);
    }
  };

  const handleDrag = (
    event: React.DragEvent<HTMLDivElement>,
    isActive: boolean,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(isActive);
  };

  return (
    <Grid item {...sizeContainer} sx={{ ...sxGrid }}>
      <Box
        onDrop={handleDrop}
        onDragOver={e => handleDrag(e, true)}
        onDragEnter={e => handleDrag(e, true)}
        onDragLeave={e => handleDrag(e, false)}
      >
        <input
          type="file"
          accept={fileTypes[type]}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id={'file-upload-input-' + buttonLabel}
          disabled={disabledInputAndRemoveBtn}
        />
        <label htmlFor={'file-upload-input-' + buttonLabel}>
          <Box
            sx={{
              border: dragActive ? '2px dashed #00AAFF' : '2px dashed #B8BDC1',
              borderRadius: '4px',
              padding: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: disabledInputAndRemoveBtn
                ? '#F5F5F5'
                : 'transparent',
            }}
          >
            {buttonLabel}
          </Box>
        </label>
      </Box>
      {selectedFile && (
        <Box sx={{ position: 'relative', marginTop: '10px' }}>
          {!disabledInputAndRemoveBtn && (
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
                sx={{
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MdInsertDriveFile size={40} color="#555" />
            <Typography>
              {selectedFile ? selectedFile.name : fileName}
            </Typography>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default UploadFileDropZone;
