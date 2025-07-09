import React, { useEffect, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  type ChartConfiguration,
} from 'chart.js';

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
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const setupChart = () => {
      if (!canvasRef.current) return;

      const labels = data.map((entry) =>
        new Date(entry.dt * 1000).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );

      const temperatures = data.map((entry) => entry.main.temp);

      const config: ChartConfiguration = {
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
              mode: 'index' as const,
              intersect: false,
            },
          },
          interaction: {
            mode: 'nearest' as const,
            axis: 'x',
            intersect: false,
          },
        },
      };

      chartRef.current = new Chart(canvasRef.current, config);
    };
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    animationFrameId = requestAnimationFrame(setupChart);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [data]);

  return <canvas ref={canvasRef} />;
};
