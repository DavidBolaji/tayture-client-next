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

      const defaultOptions = {
        title: {
          text: 'Data Overview',
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#2c3e50',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor: '#34495e',
          textStyle: {
            color: '#ecf0f1',
          },
          formatter: (params: any) => {
            return `${params[0].name}: ${params[0].data.value}`;
          },
        },
        xAxis: {
          type: 'category',
          data: labels.map((lab) => lab),
          axisLine: {
            lineStyle: {
              color: '#7f8c8d',
            },
          },
          axisLabel: {
            color: '#2c3e50',
            rotate: 45, // Rotate for better fit if labels are long
            fontSize: 12,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#7f8c8d',
            },
          },
          axisLabel: {
            color: '#2c3e50',
            fontSize: 12,
          },
          minInterval: 1, // Ensure y-axis doesn't skip small values
        },
        series: [
          {
            name: 'Data Value',
            type: 'bar',
            data: data.map((value, index) => ({
              name: labels[index],
              value: value,
            })),
            itemStyle: {
              color: '#3398DB',
              barBorderRadius: [4, 4, 0, 0], // Smooth edges
            },
            barWidth: '80%', // Increase the width of each bar
            label: {
              show: true,
              position: 'top',
              formatter: '{c}', // Show data value on top of bars
              fontSize: 12,
              color: '#2c3e50',
            },
            emphasis: {
              itemStyle: {
                color: '#2980b9', // Change color on hover
              },
            },
            animationDuration: 1500, // Smooth animation duration
            animationEasing: 'cubicOut', // Smooth easing for entry
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true, // Ensure it fits within container
        },
      };

      chart.setOption({ ...defaultOptions, ...options });

      // Make chart responsive
      const resizeHandler = () => {
        chart.resize();
      };

      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
        chart.dispose(); // Clean up on component unmount
      };
    }
  }, [data, labels, options]);

  return (
    <div className="relative w-full overflow-x-auto">
      <div
        ref={chartRef}
        className="bar-chart-container"
        style={{
          width: `${labels.length * 80}px`, // Set the width based on the number of labels (80px per bar)
          height: '400px',
        }}
      />
    </div>
  );
};

export default BarChartComponent;
