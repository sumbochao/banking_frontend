import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col } from 'antd';
import {
  UsergroupAddOutlined,
  EyeFilled,
  UpOutlined,
  MoneyCollectOutlined,
  LaptopOutlined,
  DownOutlined,
  BankOutlined
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Chart } from './Chart';
import { PieCharts } from './PieCharts';
import {
  getUsersList,
  getTotalRevenue,
  getTotalStatistic,
  getCompanyData
} from '../../Reducers/Actions/Home';
import { PhoneAndPCIcon, PhoneIcon } from './icons';

const Dashboard = () => {
  const { Title } = Typography;
  const [userData, setUserData] = useState({ todate: 0, total: 0 });
  const [revenueData, setRevenueData] = useState({ toRevenue: 0, medium: 0 });
  const [companyData, setCompanyData] = useState({ todate: 0, total: 0 });
  const [chartData, setChartData] = useState([]);
  const [deviceData, setDeviceData] = useState([
    { name: 'Desktop', value: 50 },
    { name: 'Moblie', value: 50 }
  ]);
  useEffect(() => {
    getUsersList(setUserData);
    getTotalRevenue(setRevenueData);
    getCompanyData(setCompanyData);
    getTotalStatistic(v => {
      if (v) {
        setChartData(v.access);
        setDeviceData([
          { name: 'Desktop', value: v.device.desktop },
          { name: 'Moblie', value: v.device.mobile }
        ]);
      }
    });
  }, []);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  return (
    <div>
      <Row style={{ minHeight: 200 }} gutter={20}>
        <Col span={isSmallScreen ? 24 : 8}>
          <Card bordered style={{ verticalAlign: 'center', minHeight: 170 }}>
            <Title level={4}>
              <UsergroupAddOutlined />
              {` Người dùng mới`}
            </Title>
            <Title level={3} style={{ fontWeight: 'bold', marginTop: 0 }}>
              {userData.todate}
            </Title>
            <Title
              level={4}
              style={{
                fontWeight: 'light',
                marginTop: 0,
                color: '#F55D3E'
              }}
            >
              {userData.total >= 0 ? <UpOutlined /> : <DownOutlined />}
              {Math.abs(userData.total)}% so với hôm qua
            </Title>
          </Card>
        </Col>
        <Col span={isSmallScreen ? 24 : 8}>
          <Card bordered style={{ verticalAlign: 'center', minHeight: 170 }}>
            <Title level={4}>
              <MoneyCollectOutlined />
              {` Tổng doanh thu`}
            </Title>
            <Title level={3} style={{ fontWeight: 'bold', marginTop: 0 }}>
              {revenueData.toRevenue}
            </Title>
            <Title
              level={4}
              style={{
                fontWeight: 'light',
                marginTop: 0,
                color: '#F55D3E'
              }}
            >
              {revenueData.medium >= 0 ? <UpOutlined /> : <DownOutlined />}
              {revenueData
                ? `${Math.abs(revenueData.medium)}% so với hôm qua}`
                : `Chưa có dữ liệu`}
            </Title>
          </Card>
        </Col>
        <Col span={isSmallScreen ? 24 : 8}>
          <Card bordered style={{ verticalAlign: 'center', minHeight: 170 }}>
            <Title level={4}>
              <BankOutlined />
              {` Doanh nghiệp mới`}
            </Title>
            <Title level={3} style={{ fontWeight: 'bold', marginTop: 0 }}>
              {companyData.todate}
            </Title>
            <Title
              level={4}
              style={{
                fontWeight: 'light',
                marginTop: 0,
                color: '#F55D3E'
              }}
            >
              {companyData.total >= 0 ? <UpOutlined /> : <DownOutlined />}
              {Math.abs(companyData.total)}% so với hôm qua
            </Title>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col span={isSmallScreen ? 24 : 14} style={{ textAlign: 'center' }}>
          <Title level={4}>
            <EyeFilled />
            Tổng số lượng truy cập
          </Title>
          <Row style={{ marginLeft: '0%' }} justify="center">
            <Chart data={chartData} />
          </Row>
        </Col>

        <Col span={isSmallScreen ? 24 : 10} style={{ textAlign: 'center' }}>
          <Title level={4}>
            <PhoneAndPCIcon /> {` Người dùng theo thiết bị`}
          </Title>
          <Row style={{ marginLeft: '0%' }} justify="center">
            <PieCharts data={deviceData} />
          </Row>
          <Row>
            <Col span={12} style={{ fontSize: '2em', textAlign: 'center' }}>
              <LaptopOutlined />
              <Title style={{ fontSize: '20px', marginTop: 0 }}>
                {deviceData[0].name}
              </Title>
              <Title
                style={{ color: '#15181c', fontSize: '20px', marginTop: 0 }}
              >
                {deviceData[0].value}%
              </Title>
            </Col>
            <Col span={12} style={{ fontSize: '2em', textAlign: 'center' }}>
              <PhoneIcon />
              <Title style={{ fontSize: '20px', marginTop: 0 }}>
                {deviceData[1].name}
              </Title>
              <Title
                style={{ color: '#f55d3e', fontSize: '20px', marginTop: 0 }}
              >
                {deviceData[1].value}%
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
