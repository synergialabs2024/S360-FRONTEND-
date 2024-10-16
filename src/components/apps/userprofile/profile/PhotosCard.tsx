// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import {
  Typography,
  ImageList,
  ImageListItem,
  Skeleton,
  Box,
} from '@mui/material';

import img1 from '@/assets/images/products/s1.jpg';
import img2 from '@/assets/images/products/s2.jpg';
import img3 from '@/assets/images/products/s3.jpg';
import img4 from '@/assets/images/products/s4.jpg';
import img5 from '@/assets/images/products/s5.jpg';
import img6 from '@/assets/images/products/s6.jpg';
import img7 from '@/assets/images/products/s11.jpg';
import img8 from '@/assets/images/products/s8.jpg';
import ChildCard from '@/components/shared/ChildCard';

interface photoType {
  img: string;
  id: number;
}

const photos: photoType[] = [
  {
    img: img1,
    id: 1,
  },
  {
    img: img2,
    id: 2,
  },
  {
    img: img3,
    id: 3,
  },
  {
    img: img4,
    id: 4,
  },
  {
    img: img5,
    id: 5,
  },
  {
    img: img6,
    id: 6,
  },
  {
    img: img7,
    id: 7,
  },
  {
    img: img8,
    id: 8,
  },
  {
    img: img1,
    id: 9,
  },
];

const PhotosCard = () => {
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChildCard>
      <Typography variant="h4">Photos</Typography>
      <ImageList cols={3} gap={20}>
        {photos.map(photo => (
          <Box key={photo.id}>
            {isLoading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={93}
                  key={photo.id}
                ></Skeleton>
              </>
            ) : (
              <ImageListItem key={photo.id}>
                <img
                  srcSet={`${photo.img} 1x, ${photo.img} 2x`}
                  alt={photo.img}
                  loading="lazy"
                  style={{ borderRadius: 8 }}
                />
              </ImageListItem>
            )}
          </Box>
        ))}
      </ImageList>
    </ChildCard>
  );
};

export default PhotosCard;
