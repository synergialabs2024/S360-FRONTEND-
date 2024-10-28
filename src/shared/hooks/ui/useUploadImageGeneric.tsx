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
  const [image4, setImage4] = useState<File | null>(null);
  const [image5, setImage5] = useState<File | null>(null);
  const [image6, setImage6] = useState<File | null>(null);
  const [image7, setImage7] = useState<File | null>(null);
  const [image8, setImage8] = useState<File | null>(null);
  const [image9, setImage9] = useState<File | null>(null);
  const [image10, setImage10] = useState<File | null>(null);
  const [image11, setImage11] = useState<File | null>(null);
  const [image12, setImage12] = useState<File | null>(null);

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
    image4,
    setImage4,
    image5,
    setImage5,
    image6,
    setImage6,
    image7,
    setImage7,
    image8,
    setImage8,
    image9,
    setImage9,
    image10,
    setImage10,
    image11,
    setImage11,
    image12,
    setImage12,
  };
};
