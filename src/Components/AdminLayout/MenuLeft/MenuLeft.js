import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  HistoryOutlined,
  NodeIndexOutlined,
  AuditOutlined,
  TransactionOutlined,
  TeamOutlined
} from '@ant-design/icons';

const MenuLeft = () => {
  const menu = JSON.parse(localStorage.getItem('tokens')).type;
  const [key, setKey] = useState(1);
  const [role, setRole] = useState(0);
  const handleClick = e => {
    setKey(e.key);
  };
  const configRole = () => {
    switch(menu){
      case 'user':
        setRole(1);
        break;
      case 'employee':
        setRole(2);
        break;
      case 'admin':
        setRole(3);
        break;
      default:
        setRole(3);
    }
  };
  useEffect(() => {
    configRole();
    switch (window.location.pathname) {
      case '/chuyen-tien':
        setKey('2');
        break;
      case '/lich-su-nguoi-dung':
        setKey('3');
        break;
      case '/nhac-no':
        setKey('4');
        break;
      case '/ho-so':
        setKey('5');
        break;
      case '/nap-tien':
        setKey('6');
        break;
      case '/lich-su-giao-dich':
        setKey('7');
        break;
      case '/danh-sach-giao-dich':
        setKey('9');
        break;
      case '/quan-ly-admin':
        setKey('10');
        break;
      case '/employee':
        setKey('8');
        break;
      default:
        setKey('1');
    }
  }, []);

  const MenuUser=()=>{
    return (
      <Menu 
      className="ant-menu"
      mode="inline"
      onClick={handleClick}
      defaultSelectedKeys={['1']}
      selectedKeys={[key]}
    >
      <Menu.Item key="1">
        <Link to="/dashboard">
          <HomeOutlined />
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/chuyen-tien">
          <TransactionOutlined />
          <span>Chuyển Tiền</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/lich-su-nguoi-dung">
          <HistoryOutlined />
          <span>Lịch sử giao dịch</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/nhac-no">
          <NodeIndexOutlined />
          <span>Quản Lý nhắc nợ</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/ho-so">
          <UserOutlined />
          <span>Hồ sơ</span>
        </Link>
      </Menu.Item>
    </Menu>
    );
  };

  const MenuEmployee=()=>{
    return (
      <Menu
        className="ant-menu"
        mode="inline"
        onClick={handleClick}
        defaultSelectedKeys={['8']}
        selectedKeys={[key]}
      >
        <Menu.Item key="8">
          <Link to="/dashboard">
            <MailOutlined />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/nap-tien">
            <MailOutlined />
            <span>Nạp Tiền</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/lich-su-giao-dich">
            <AuditOutlined />
            <span>Lịch sử giao dịch</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  };
  

  const MenuAdmin=()=>{
    return (
      <Menu
      className="ant-menu"
      mode="inline"
      onClick={handleClick}
      defaultSelectedKeys={['9']}
      selectedKeys={[key]}
    >
      <Menu.Item key="9">
          <Link to="/danh-sach-giao-dich">
            <AuditOutlined />
            <span>Danh sách giao dịch</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="10">
        <Link to="/quan-ly-admin">
          <TeamOutlined />
          <span>Quản lí admin </span>
        </Link>
      </Menu.Item>
    </Menu>
    );
  };
  return (
   // eslint-disable-next-line no-nested-ternary
   role === 1 ? MenuUser() : (role === 2 ? MenuEmployee() : MenuAdmin())
   // MenuAdmin()
  );
};

export default MenuLeft;
