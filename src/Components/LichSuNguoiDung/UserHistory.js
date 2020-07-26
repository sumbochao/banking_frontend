import React, { useEffect, useState } from 'react';
import { Layout, Col, Typography, Row, Tabs } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import { PaymentHistory } from './PaymentHistory';
import { getAllCustomerTransactionSelf } from './action';
import './PaymentManagement.css';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const UserHistory = () => {
    const [receiverTransaction, setReceiverTransaction] = useState([]);
    const [paymentTransaction, setPaymentTransaction] = useState([]);
    const [debtReminderPaymentTransaction, setDebtReminderPaymentTransaction] = useState([]);
    const [beDebtReminderPaymentTransaction, setBeDebtReminderPaymentTransaction] = useState([]);

    const getComplete = (res) => {
        if (res) {
            setReceiverTransaction(res.receiverTransaction);
            setPaymentTransaction(res.paymentTransacion);
            setDebtReminderPaymentTransaction(res.debtReminderPaymentTransaction);
            setBeDebtReminderPaymentTransaction(res.beDebtReminderPaymentTransaction);
        }
        else {
            setReceiverTransaction([]);
            setPaymentTransaction([]);
            setDebtReminderPaymentTransaction([]);
            setBeDebtReminderPaymentTransaction([]);
        }
    };

    useEffect(() => {
        getAllCustomerTransactionSelf(authTokens.accessToken, getComplete);
    }, [authTokens.accessToken]);

    return (
        <Content
            className="payment-management"
            style={{
                padding: 20,
                borderRadius: 10
            }}
        >
            <Row>
                <Col span={18}>
                    <Title level={3}>
                        <WindowsFilled /> QUẢN LÝ LỊCH SỬ GIAO DỊCH (CÁ NHÂN)
                </Title>
                </Col>
            </Row>
            <Tabs style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '16px' }} defaultActiveKey="1">
                <TabPane tab="Giao dịch" key="1">
                    <PaymentHistory />
                </TabPane>
                <TabPane tab="Khiếu nại" key="2">
                    <PaymentHistory />
                </TabPane>
            </Tabs>
        </Content>
    );
};

export default UserHistory;