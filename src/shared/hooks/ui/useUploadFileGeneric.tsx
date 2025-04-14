import { useMemo, useState } from 'react';

import { UploadFileDropZone, UploadFilePreviewBtn } from '@/shared/components';

export const useUploadFileGeneric = () => {
  ///* local state -----------
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [file4, setFile4] = useState<File | null>(null);
  const [file5, setFile5] = useState<File | null>(null);
  const [file6, setFile6] = useState<File | null>(null);
  const [file7, setFile7] = useState<File | null>(null);
  const [file8, setFile8] = useState<File | null>(null);
  const [file9, setFile9] = useState<File | null>(null);
  const [file10, setFile10] = useState<File | null>(null);
  const [file11, setFile11] = useState<File | null>(null);
  const [file12, setFile12] = useState<File | null>(null);

  ///* upload component
  const UploadFileBtnComponent = useMemo(() => UploadFilePreviewBtn, []);

  const UploadFileDropZoneComponent = useMemo(() => UploadFileDropZone, []);

  return {
    UploadFileBtnComponent,
    UploadFileDropZoneComponent,
    file1,
    setFile1,
    file2,
    setFile2,
    file3,
    setFile3,
    file4,
    setFile4,
    file5,
    setFile5,
    file6,
    setFile6,
    file7,
    setFile7,
    file8,
    setFile8,
    file9,
    setFile9,
    file10,
    setFile10,
    file11,
    setFile11,
    file12,
    setFile12,
  };
};
