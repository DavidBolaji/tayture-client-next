'use client'
import { useEffect, useState } from 'react'
import { Button, Card, DatePicker, Space } from 'antd'
import { Axios } from '@/request/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { closingDate, closingDate2, userFilterChart } from '@/utils/helpers'
import CardStyledWrapper from './AdminPage.style'
import LocationChart from './LocationChart'
import BarChartComponent from './BarChartComponent'
import TagChart from './TagChart'
import { AxiosResponse } from 'axios'

const { RangePicker } = DatePicker

function InfoGraphicUser() {
  const [city, setCity] = useState<string>('')
  const [lga, setLga] = useState<string>('')
  const [st, setSt] = useState<string>('')
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const [path, setPath] = useState<string[]>([])
  const queryClient = useQueryClient()
  const [filterData, setFilterData] = useState([])

  const { mutate, isPending: filterLoading } = useMutation({
    mutationFn: async ({ start, end, city, st, lga, path }: any) => {
      return Axios.get(
        `/users?start=${start}&end=${end}&city=${city}&lga=${lga}&path=${path}&st=${st}`,
      )
    },
    onSuccess: (res: AxiosResponse) => {
      queryClient.setQueryData(['allUsers'], () => res.data.user)
      queryClient.setQueryData(['allAnalyticsUsers'], () => res.data.user)
      setFilterData(res.data.user)
    },
  })

  const handleSearch = () => {
    mutate({ start, end, city, lga, st, path })
  }

  useEffect(() => {
    const stData = new Date().toISOString()
    const enDate = new Date().toISOString()
    const start = stData.slice(0, 10).concat('T00:00:00.000Z')
    const end = enDate.slice(0, 10).concat('T00:00:00.000Z')
    mutate({ start, end, city, st, lga, path })
  }, [])

  const result = userFilterChart(filterData)

  const { data, labels } = result

  const onChange = async (_value: any, dateString: any) => {
    const startDate = dateString[0].split(' ')[0]
    const endDate = dateString[1].split(' ')[0]
    setStart(startDate)
    setEnd(endDate)
  }

  const total = data.reduce((acc: number, cur: number) => {
    return (acc += cur)
  }, 0)

  return (
    <CardStyledWrapper>
      <small className="ml-1">User</small>
      <Space align="baseline" className={'flex justify-between pr-2 mb-2'}>
        <LocationChart
          setCity={(city) => setCity(city)}
          setLga={(lga) => setLga(lga)}
          setState={(state) => setSt(state)}
        />
      </Space>
      <div className="mb-2">
        <RangePicker onChange={onChange} showTime />
      </div>
      <Card
        loading={filterLoading}
        actions={[
          <TagChart
            key={'tag'}
            setPath={(path) => setPath(path)}
            placeholder="Select path"
            options={[
              { value: 'teacher' },
              { value: 'school admin' },
              { value: 'parent' },
            ]}
          />,

          <Button key={'btn'} className="w-full" onClick={handleSearch}>
            Go
          </Button>,
        ]}
      >
        
        <BarChartComponent
          key={JSON.stringify(data) ?? 0}
          data={data.reverse()}
          labels={labels.reverse()}
          options={{
            color: ['#3398DB'], // Custom color for bars
            title: {
              text: data.length ? `Total: ${total}` : 'No data',
              left: 'left',
              textStyle: {
                color: '#4a4a4a',
                fontWeight: 'bold',
                fontSize: 16,
              },
            },
            tooltip: {
              show: true,
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
              formatter: (params: any) => {
                let content = `${params[0].name}<br/>`
                params.forEach((item: any) => {
                  content += `<strong>${item.seriesName}:</strong> ${item.value}<br/>`
                })
                return content
              },
            },
            grid: {
              left: '0%',
              right: '2%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: labels.map((label) => closingDate2(label)),
              axisLabel: {
                rotate: 45, // Rotate labels for better readability
                color: '#6e6e6e',
                fontSize: 12,
              },
              axisLine: {
                lineStyle: {
                  color: '#c4c4c4',
                },
              },
            },
            yAxis: {
              type: 'value',
              minInterval: 1,
              axisLabel: {
                color: '#6e6e6e',
              },
              axisLine: {
                show: false,
              },
              splitLine: {
                lineStyle: {
                  color: '#e8e8e8',
                },
              },
            },
            series: [
              {
                name: 'Value',
                type: 'bar', // Specify bar type for the chart
                barWidth: '60%',
                data: data.map((value, index) => ({
                  name: closingDate(labels[index]),
                  value: value,
                })),
                label: {
                  show: true,
                  position: 'top',
                  color: '#000', // Color of the labels on the bars
                  formatter: '{c}',
                },
                itemStyle: {
                  barBorderRadius: [4, 4, 0, 0], // Rounded top corners for bars
                },
                emphasis: {
                  focus: 'series',
                  itemStyle: {
                    color: '#FF8C00', // Highlight bar on hover
                  },
                },
              },
            ],
          }}
        />
      </Card>
    </CardStyledWrapper>
  )
}

export default InfoGraphicUser
