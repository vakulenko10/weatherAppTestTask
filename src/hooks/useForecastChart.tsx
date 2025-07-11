import { useEffect, useRef } from 'react';
import { Chart, type ChartConfiguration } from 'chart.js';

export const useForecastChart = (
  canvasRef: React.RefObject<HTMLCanvasElement|null>,
  config: ChartConfiguration
) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new Chart(canvasRef.current, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [config, canvasRef]);
};
