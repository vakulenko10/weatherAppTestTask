import React, { useMemo, useRef } from 'react';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  type ChartConfiguration,
  Chart,
} from 'chart.js';
import { formatTime, formatTooltipTitle } from '../utils/forecastChartUtils';
import { useForecastChart } from '../hooks/useForecastChart';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

interface ForecastChartProps {
  data: Array<{
    dt: number;
    main: {
      temp: number;
    };
  }>;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const labels = useMemo(() => data.map((e) => formatTime(e.dt)), [data]);
  const temperatures = useMemo(() => data.map((e) => e.main.temp), [data]);

  const config: ChartConfiguration = useMemo(() => ({
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Hourly Temperature Forecast',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (items) =>
              formatTooltipTitle(data[items[0].dataIndex].dt),
            label: (item) => `Temp: ${item.formattedValue} °C`,
          },
        },
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
    },
  }), [labels, temperatures, data]);

  useForecastChart(canvasRef, config);

  return <canvas ref={canvasRef} />;
};