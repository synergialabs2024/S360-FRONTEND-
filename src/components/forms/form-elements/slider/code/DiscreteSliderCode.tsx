import CodeDialog from '@/components/shared/CodeDialog';
const DiscreteSliderCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Slider } from '@mui/material';

  const [value, setValue] = React.useState(30);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const [value2, setValue2] = React.useState([20, 37]);
  const handleChange2 = (event2: any, newValue2: any) => {
    setValue2(newValue2);
  };

<Slider
    aria-label="Temperature"
    defaultValue={30}
    getAriaValueText={valuetext}
    valueLabelDisplay="auto"
    step={10}
    marks
    min={10}
    max={110}
/>
`}
      </CodeDialog>
    </>
  );
};

export default DiscreteSliderCode;
