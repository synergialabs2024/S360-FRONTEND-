import { useMemo, useState } from 'react';

import {
  UploadImageDropZone,
  UploadImagePreviewBtn,
} from '@/shared/components';

export const useUploadImageGeneric = () => {
  ///* local state -----------
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);

  ///* upload component
  const UploadImageBtnComponent = useMemo(() => UploadImagePreviewBtn, []);

  const UploadImageDropZoneComponent = useMemo(() => UploadImageDropZone, []);

  return {
    UploadImageBtnComponent,
    UploadImageDropZoneComponent,
    image1,
    setImage1,
    image2,
    setImage2,
    image3,
    setImage3,
  };
};
