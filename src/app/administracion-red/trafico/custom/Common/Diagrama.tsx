import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';

export type DiagramaProps = {
  fecha?: Record<string, string>;
  dataT?: string[];
};

type ChartSeries = {
  name: string;
  data: number[];
};

const Diagrama: React.FC<DiagramaProps> = ({ fecha, dataT }) => {
  useEffect(() => {
    if (!fecha || !dataT) return;

    const date1 = new Date(fecha?.date_1);
    const date2 = new Date(fecha?.date_2);

    const filteredData = dataT.filter((item: any) => {
      const startTime = new Date(item?.acctstarttime);
      const stopTime = new Date(item?.acctstoptime);
      return (
        (startTime >= date1 && startTime <= date2) ||
        (stopTime >= date1 && stopTime <= date2)
      );
    });

    const fechas = filteredData.map((item: any) => item.acctstarttime);
    const bajada = filteredData.map(
      (item: any) => item.acctinputoctets / 1_000_000,
    );
    const subida = filteredData.map(
      (item: any) => item.acctoutputoctets / 1_000_000,
    );

    setChartData({
      series: [
        { name: 'Consumo Bajada (MB)', data: bajada },
        { name: 'Consumo Subida (MB)', data: subida },
      ],
      xAxisCategories: fechas,
    });
  }, [fecha, dataT]);

  const [chartData, setChartData] = React.useState<{
    series: ChartSeries[];
    xAxisCategories: string[];
  }>({
    series: [],
    xAxisCategories: [],
  });

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        tools: {
          zoom: true,
          pan: true,
        },
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: chartData?.xAxisCategories,
      labels: {
        formatter: (value: string) => {
          const date = new Date(value);
          // Determinar si el formato de fecha es diario o mensual basado en la longitud de la cadena de fecha
          const isDaily = fecha?.date_1 && fecha?.date_1.length === 10; // 'YYYY-MM-DD' -> 10 caracteres

          // Si es diario, formatear como 'DD MMM', si es mensual, formatear como 'MMM YYYY'
          return isDaily
            ? date?.toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
            }) // Formato diario: "DD MMM"
            : date?.toLocaleDateString('es-ES', {
              month: 'short',
              year: 'numeric',
            }); // Formato mensual: "MMM YYYY"
        },
      },
      min: fecha?.date_1 ? new Date(fecha.date_1).getTime() : undefined, // Inicio del rango de fechas
      max: fecha?.date_2 ? new Date(fecha.date_2).getTime() : undefined, // Fin del rango de fechas
    },
    yaxis: {
      labels: {
        formatter: (value: number) =>
          value > 999
            ? `${(value / 1000)?.toFixed(2)} GB`
            : `${value?.toFixed(2)} MB`,
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM',
      },
    },
  };

  return (
    <Chart
      type="area"
      options={options}
      series={chartData?.series}
      height={385}
    />
  );
};

export default Diagrama;
