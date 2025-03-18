// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';
import { Props } from 'react-apexcharts';

import { IconArrowUpRight } from '@tabler/icons-react';

interface GrowthProps {
  label: string;
  value: number;
  icon: React.ElementType;
}

const Growth: React.FC<GrowthProps> = ({
  label,
  value,
  icon: IconComponent,
}) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: Props = {
    chart: {
      type: 'area',
      height: 25,
      fontFamily: 'inherit',
      foreColor: '#a1aab2',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    colors: [secondary],
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      data: [
        0, 10, 10, 10, 35, 45, 30, 30, 30, 50, 52, 30, 25, 45, 50, 80, 60, 65,
      ],
    },
  ];

  return (
    <DashboardCard>
      <>
        <Box
          width={38}
          height={38}
          bgcolor="secondary.light"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconComponent width={20} color="#39B69A" />
        </Box>

        <Box mt={3} mb={2}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="area"
            height="25px"
          />
        </Box>

        <Typography variant="h4">
          {value}
          <span>
            <IconArrowUpRight width={18} color="#39B69A" />
          </span>
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
      </>
    </DashboardCard>
  );
};

export default Growth;
