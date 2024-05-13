import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChartComponent: React.FC<BarChartProps & { options: any }> = ({
  data,
  labels,
  options,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);
    }
  }, [data, labels]);

  return (
    <div className={`${data.length > 4 ? 'no-s overflow-auto' : ''} relative`}>
      <div
        ref={chartRef}
        className="bar-chart-container no-s w-screen"
        style={{
          width: `${data.length * 200}px`,
          height: '250px',
          paddingLeft: `-${data.length * 85}px`,
          // position: 'absolute',
          zIndex: 1000
        }}
      />
    </div>
  );
};

export default BarChartComponent;
