import React, { forwardRef } from 'react';
import Flatpickr from 'react-flatpickr';
import { Options } from 'flatpickr/dist/types/options';

interface FlatGraficProps {
  options: Options;
  value: Date[];
  style?: React.CSSProperties;
}

const FlatGrafic = forwardRef<Flatpickr, FlatGraficProps>(
  ({ options, value, style }, ref) => {
    return (
      <Flatpickr ref={ref} options={options} value={value} style={style} />
    );
  },
);

export default FlatGrafic;
