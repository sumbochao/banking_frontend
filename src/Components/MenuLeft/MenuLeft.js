import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  MailOutlined,
  UploadOutlined,
  ScheduleFilled,
  HomeOutlined,
  TeamOutlined,
  NodeIndexOutlined,
  AuditOutlined
} from '@ant-design/icons';

const MenuLeft = () => {
  const [key, setKey] = useState(1);

  const handleClick = e => {
    setKey(e.key);
  };
  // useEffect(() => {
  //   switch (window.location.pathname) {
  //     case '/company-management':
  //       setKey('2');
  //       break;
  //     case '/user-management':
  //       setKey('3');
  //       break;
  //     case '/job-management':
  //       setKey('4');
  //       break;
  //     case '/field-management':
  //         setKey('5');
  //         break;
  //     case '/post-management':
  //       setKey('6');
  //       break;
  //     case '/admin-management':
  //       setKey('7');
  //       break;
  //       case '/hashtag-management':
  //         setKey('8');
  //         break;

  //     default:
  //       setKey('1');
  //   }
  // }, []);

  return (
    <Menu
      className="ant-menu"
      mode="inline"
      onClick={handleClick}
      defaultSelectedKeys={['1']}
      selectedKeys={[key]}
    >
      <Menu.Item key="1">
        <Link to="/">
          <HomeOutlined />
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/company-management">
          <MailOutlined />
          <span>Quản lí công ty</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/user-management">
          <UserOutlined />
          <span>Quản lí tài khoản</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/job-management">
          <AuditOutlined />
          <span>Quản lí nghề nghiệp</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/field-management">
          <NodeIndexOutlined />
          <span>Quản lí lĩnh vực</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/post-management">
          <ScheduleFilled />
          <span>Quản lí bài viết </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/admin-management">
          <TeamOutlined />
          <span>Quản lí admin </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="8">
        <Link to="/hashtag-management">
          <TeamOutlined />
          <span>Quản lí HashTag </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="9">
        <UploadOutlined />
        <span>Xóa toàn bộ hệ thống</span>
      </Menu.Item>
    </Menu>
  );
};

export default MenuLeft;
