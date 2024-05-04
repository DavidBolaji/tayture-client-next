import useAddress from '@/hooks/useAddress';
import { Select, Space } from 'antd';


interface ILocationChart {
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setLga: (lga: string) => void;
}

function LocationChart({ setState, setCity, setLga }: ILocationChart) {
  const { states, lga, city, fetchCity, fetchLga } = useAddress();

  const handleStateChange = (value: string) => {
    setState(value);
    fetchCity(value);
    fetchLga(value);
  };

  const onSecondCityChange = (value: string) => {
    setCity(value);
  };
  const onThirdLgaChange = (value: string) => {
    setLga(value);
  };

  return (
    <Space wrap>
      <Select
        allowClear
        showSearch
        placeholder="Select state"
        style={{ width: 120 }}
        onChange={handleStateChange}
        options={states}
      />
      <Select
        allowClear
        showSearch
        placeholder="Select city"
        style={{ width: 120 }}
        onChange={onSecondCityChange}
        options={city}
      />
      <Select
        allowClear
        showSearch
        placeholder="Select LGA"
        style={{ width: 120 }}
        onChange={onThirdLgaChange}
        options={lga}
      />
    </Space>
  );
}

export default LocationChart;
