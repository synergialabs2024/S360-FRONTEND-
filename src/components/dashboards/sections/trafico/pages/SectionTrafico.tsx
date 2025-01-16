import React, { useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DashboardCard from '@/components/shared/DashboardCard';
import CustomAutocompletSearchNoForm from '@/shared/components/CustomAutocompletes/CustomAutocompletSearchNoForm';
import { gridSizeMdLg5, Trafico } from '@/shared';
import { useGetTraficoConsulta } from '@/actions/app';
import { UseFetchTraficosWithDebounceParams } from '../hooks/UseFetchTraficosWithDebounceParams';

type ChartSeries = {
  name: string;
  data: number[];
};

const SectionTrafico = () => {
  const theme = useTheme();

  const [traficoUser, setTraficoUser] = React.useState<Trafico | null>(null);
  const { data } = useGetTraficoConsulta(traficoUser?.username || '');
  const [chartData, setChartData] = React.useState<{
    series: ChartSeries[];
    xAxisCategories: string[];
  }>({
    series: [],
    xAxisCategories: [],
  });

  const handleTraficoChange = (data: Trafico | null) => {
    setTraficoUser(data);
  };

  // Memoizar los valores calculados de 'subida' y 'bajada' para mejorar el rendimiento
  const subida = useMemo(() => {
    return (
      data?.map((item: any) => (item?.acctinputoctets ?? 0) / 1_000_000) || []
    );
  }, [data]);

  const bajada = useMemo(() => {
    return (
      data?.map((item: any) => (item?.acctoutputoctets ?? 0) / 1_000_000) || []
    );
  }, [data]);

  // Actualizar el estado solo si los datos cambian
  useEffect(() => {
    if (!data) return;

    const xAxisCategories = data.map((item: any) => item.acctstarttime);
    setChartData({
      series: [
        { name: 'Consumo Subida', data: subida },
        { name: 'Consumo Bajada', data: bajada },
      ],
      xAxisCategories,
    });
  }, [data, subida, bajada]);

  const {
    traficos,
    isLoadingTraficos,
    selectedTrafico,
    onChangeFilterTrafico,
  } = UseFetchTraficosWithDebounceParams();

  // Memoizar las opciones del gráfico para evitar re-renderizados innecesarios
  const options = useMemo(
    () => ({
      chart: {
        height: 350,
        type: 'area' as const, // Solucionado
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: { show: false },
      },
      stroke: { curve: 'smooth' as const, width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0,
          stops: [20, 180],
        },
      },
      markers: { size: 0 },
      dataLabels: { enabled: false },
      grid: {
        padding: { right: 30, left: 20 },
      },
      xaxis: {
        type: 'datetime' as const, // Asegurarse de usar el literal correcto
        categories: chartData.xAxisCategories,
      },

      yaxis: {
        labels: {
          formatter: (value: number) =>
            value > 999
              ? `${(value / 1000).toFixed(2)} GB`
              : `${value.toFixed(2)} MB`,
        },
      },
      tooltip: {
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        x: { show: false },
      },
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
    }),
    [chartData.xAxisCategories, theme],
  );

  return (
    <DashboardCard
      title="Consumo de Tráfico"
      subtitle="Auditoria de Trafico"
      action={
        <CustomAutocompletSearchNoForm<Trafico>
          label="Buscar por Cliente"
          options={
            traficos.map((u: any) => ({
              id: u?.id || 0,
              username: u.username || '',
            })) as Trafico[]
          }
          valueKey="username"
          actualValueKey="id"
          defaultValue={selectedTrafico?.id?.toString() || ''}
          optionLabelForEdit={selectedTrafico?.username || ''}
          isLoadingData={isLoadingTraficos}
          onChangeInputText={onChangeFilterTrafico}
          onChangeRawValue={handleTraficoChange}
          required={false}
          size={gridSizeMdLg5}
        />
      }
    >
      <Box className="rounded-bars">
        <Chart
          type="area"
          options={options}
          series={chartData.series}
          height={385}
        />
      </Box>
    </DashboardCard>
  );
};

export default SectionTrafico;
