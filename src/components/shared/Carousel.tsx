import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { useState, Children, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import type React from 'react';
('use client');

import {
  gridSize,
  GridSizeType,
  gridSizeMdLg1,
  gridSizeMdLg10,
  SxPropsThemeType,
} from '@/shared';
import { CustomFormLabel, CustomSingleButton } from '@/shared/components';

interface CarouselProps {
  children: React.ReactNode;
  infinite?: boolean;
  label?: string;
  required?: boolean;
  size?: GridSizeType;
  sxGrid?: SxPropsThemeType;
}

type InfiniteItem = {
  item: React.ReactNode;
  key: string;
  originalIndex: number;
};

export default function Carousel({
  children,
  infinite = false,
  label = '',
  required = false,
  size = gridSize,
  sxGrid,
}: CarouselProps) {
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const repositioningRef = useRef(false);

  const childrenArray = Children.toArray(children);
  const totalItems = childrenArray.length;
  const itemWidth = 176;

  const createInfiniteItems = (): InfiniteItem[] => {
    if (!infinite || totalItems === 0) {
      return childrenArray.map((item, index) => ({
        item,
        key: `${index}-copy-0`,
        originalIndex: index,
      }));
    }

    const copies: InfiniteItem[] = [];
    for (let copyIndex = 0; copyIndex < 3; copyIndex++) {
      childrenArray.forEach((item, index) => {
        copies.push({
          item,
          key: `${index}-copy-${copyIndex}`,
          originalIndex: index,
        });
      });
    }
    return copies;
  };

  const infiniteItems = createInfiniteItems();
  const centerOffset = infinite ? totalItems : 0;

  useEffect(() => {
    if (infinite && totalItems > 0) {
      const initialPosition = -(centerOffset * itemWidth) + 212;
      setTranslateX(initialPosition);
      setCurrentIndex(centerOffset);
    }
  }, [infinite, totalItems, centerOffset, itemWidth]);

  const handleNext = () => {
    if (isAnimating || repositioningRef.current) return;
    setIsAnimating(true);

    if (infinite) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setTranslateX(-(newIndex * itemWidth) + 212);

      setTimeout(() => {
        if (newIndex >= centerOffset + totalItems) {
          repositioningRef.current = true;
          setCurrentIndex(centerOffset);
          setTranslateX(-(centerOffset * itemWidth) + 212);
          setTimeout(() => {
            repositioningRef.current = false;
          }, 50);
        }
        setIsAnimating(false);
      }, 600);
    } else {
      const newIndex = (currentIndex + 1) % totalItems;
      setCurrentIndex(newIndex);
      setTranslateX(-(newIndex * itemWidth) + 212);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handlePrev = () => {
    if (isAnimating || repositioningRef.current) return;
    setIsAnimating(true);

    if (infinite) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setTranslateX(-(newIndex * itemWidth) + 212);

      setTimeout(() => {
        if (newIndex < centerOffset) {
          repositioningRef.current = true;
          setCurrentIndex(centerOffset + totalItems - 1);
          setTranslateX(-((centerOffset + totalItems - 1) * itemWidth) + 212);
          setTimeout(() => {
            repositioningRef.current = false;
          }, 50);
        }
        setIsAnimating(false);
      }, 600);
    } else {
      const newIndex = currentIndex - 1 < 0 ? totalItems - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setTranslateX(-(newIndex * itemWidth) + 212);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const renderItems = () => {
    if (infinite && Array.isArray(infiniteItems) && infiniteItems.length > 0) {
      return infiniteItems.map(({ item, key }) => (
        <div
          key={key}
          style={{ width: 'auto', margin: '0 8px', flexShrink: 0 }}
        >
          {item}
        </div>
      ));
    } else {
      const extended = [];
      for (let i = -2; i <= totalItems + 1; i++) {
        const index = ((i % totalItems) + totalItems) % totalItems;
        extended.push({
          item: childrenArray[index],
          key: `normal-${index}-${i}`,
        });
      }
      return extended.map(({ item, key }) => (
        <div
          key={key}
          style={{ width: '160px', margin: '0 8px', flexShrink: 0 }}
        >
          {item}
        </div>
      ));
    }
  };

  return (
    <Grid item {...size} sx={sxGrid}>
      <CustomFormLabel
        sx={{
          mt: 0,
        }}
        htmlFor={label}
        required={required}
      >
        {label}
      </CustomFormLabel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <CustomSingleButton
          label=""
          color="primary"
          variant="text"
          startIcon={<IconArrowNarrowLeft />}
          onClick={() => handlePrev()}
          gridSizeBtn={gridSizeMdLg1}
        />
        <Grid
          item
          {...gridSizeMdLg10}
          sx={{
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              transform: `translateX(${translateX}px)`,
              transition: repositioningRef.current
                ? 'none'
                : 'transform 0.6s ease-in-out',
            }}
          >
            {renderItems()}
          </div>
        </Grid>

        <CustomSingleButton
          label=""
          color="primary"
          variant="text"
          startIcon={<IconArrowNarrowRight />}
          onClick={() => handleNext()}
          gridSizeBtn={gridSizeMdLg1}
        />
      </div>
    </Grid>
  );
}
