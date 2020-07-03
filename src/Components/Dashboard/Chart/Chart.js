import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const { Title } = Typography;
const Chart = props => {
  const { data } = props;

  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  return (
    <>
      <LineChart
        width={isSmallScreen ? 350 : 550}
        height={isSmallScreen ? 200 : 300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
      <Title style={{ fontSize: '1em' }}>Tháng</Title>
    </>
  );
};

export default Chart;
