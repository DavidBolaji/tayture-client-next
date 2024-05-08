"use client"
import { useEffect, useState } from 'react';
import { Button, Card, DatePicker, Space } from 'antd';
import { Axios } from '@/request/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { closingDate, closingDate2, userFilterChart } from '@/utils/helpers';
import CardStyledWrapper from './AdminPage.style';
import LocationChart from './LocationChart';
import BarChartComponent from './BarChartComponent';
import TagChart from './TagChart';
import { AxiosResponse } from 'axios';


const { RangePicker } = DatePicker;

function InfoGraphicSchool() {

  const [city, setCity] = useState<string>('');
  const [lga, setLga] = useState<string>('');
  const [st, setSt] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [path, setPath] = useState<string[]>([]);
  const queryClient = useQueryClient()
  const [filterData, setFilterData] = useState([])


  const { mutate, isPending: filterLoading } = useMutation({
    mutationFn: async ({start, end, city, st, lga, path}: any) => {
      return Axios.get(`/users?start=${start}&end=${end}&city=${city}&lga=${lga}&path=${'school admin'}&st=${st}`)
    },
    onSuccess: (res: AxiosResponse) => {
      queryClient.setQueryData(['allSchoolUsers'], () => res.data.user)
      queryClient.setQueryData(['allAnalyticsSchool'], () => res.data.user)
      setFilterData(res.data.user)
    }
  })

  const handleSearch = () => {
    mutate({ start, end, city, lga, st, path });
  };

  useEffect(() => {
    const stData = new Date().toISOString();
    const enDate = new Date().toISOString();
    const start = stData.slice(0, 10).concat('T00:00:00.000Z')
    const end = enDate.slice(0, 10).concat('T00:00:00.000Z')
    mutate({ start, end,  city, st, lga, path})
    
  }, [])

  const result = userFilterChart(filterData);

  const { data, labels } = result;

  const onChange = async (_value: any, dateString: any) => {
    const startDate = dateString[0].split(' ')[0];
    const endDate = dateString[1].split(' ')[0];
    setStart(startDate);
    setEnd(endDate);
  };


  const total = data.reduce((acc: number, cur: number) => {
    return (acc += cur);
  }, 0);

  return (
    <CardStyledWrapper>
      <small className="ml-1">School</small>
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
          <Button key={'btn'}  className="w-full" onClick={handleSearch}>
            Go
          </Button>,
        ]}
      >
        {data.length === 0 && `No data`}
        <BarChartComponent
          key={JSON.stringify(filterData)}
          data={data}
          
          labels={labels.reverse()}
          options={{
            color: ["#3398DB"],
            title: {
              text: data.length > 0 ? `Total: ${total}` : 'No data',
            },
            tooltip: {
              show: true,
              trigger: 'axis', // Change trigger to 'axis' for bar chart
              axisPointer: {
                type: 'shadow', // Change axisPointer type for bar chart
              },
              formatter: '{a} <br/>{b}',
            },
            xAxis: {
              type: 'category', // Specify the axis type as 'category' for bar chart
              data: labels.map(lab => closingDate2(lab)),
            },
            yAxis: {
              type: 'value', // Specify the axis type as 'value' for bar chart
              minInterval: 1
            },

            series: [
              {
                name: 'Value',
                type: 'line', // Change type to 'bar' for bar chart
                data: data.map((value, index) => ({
                  name: closingDate(labels[index]),
                  value: value,
                })),
                label: {
                  show: true,
                  formatter: '{c}',
                },
              },
            ],
          }}
        />
      </Card>
    </CardStyledWrapper>
  );
}

export default InfoGraphicSchool;
