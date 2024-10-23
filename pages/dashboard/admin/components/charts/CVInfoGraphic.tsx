import React from 'react'
import { Card } from 'antd'
import ReactECharts from 'echarts-for-react'

interface CVStats {
  totalDownloads: number
  completedDownloads: number
}

interface Props {
  stats: CVStats
}

const CVInfoGraphic: React.FC<Props> = ({ stats }) => {
  const option = {
    title: {
      text: 'CV Downloads',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Downloads',
        type: 'pie',
        radius: '50%',
        data: [
          { value: stats.completedDownloads, name: 'Completed Downloads' },
          { value: stats.totalDownloads - stats.completedDownloads, name: 'Incomplete Downloads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return (
    <Card className="mb-4">
      <ReactECharts option={option} style={{ height: '300px' }} />
    </Card>
  )
}

export default CVInfoGraphic