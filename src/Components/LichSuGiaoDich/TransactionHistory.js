import React, { useEffect, useState } from 'react';
import { Layout, Col, Typography, Row, Tabs } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import { getCustomerTransactionForEmployee } from './action';
import './TransactionHistory.css';
import { useAuth } from '../Routes/Context';
import ReceiverTransaction from '../LichSuNguoiDung/ReceiverTransaction/ReceiverTransaction';
import PaymentTransaction from '../LichSuNguoiDung/PaymentTransaction/PaymentTransaction';
import DebtReminderPaymentTransaction from '../LichSuNguoiDung/DebtReminderPaymentTransaction/DebtReminderTransaction';
import BeDebtReminderPaymentTransaction from '../LichSuNguoiDung/BeDebtReminderPaymentTransaction/BeDebtReminderPaymentTransaction';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const TransactionHistory = () => {
    const [receiverTransaction, setReceiverTransaction] = useState([]);
    const [paymentTransaction, setPaymentTransaction] = useState([]);
    const [debtReminderPaymentTransaction, setDebtReminderPaymentTransaction] = useState([]);
    const [beDebtReminderPaymentTransaction, setBeDebtReminderPaymentTransaction] = useState([]);
    const { authTokens } = useAuth();

    const getComplete = (res) => {
        if (res) {
            // console.log("RESSSSS",res);
            setReceiverTransaction(res.receiverTransaction);
            setPaymentTransaction(res.paymentTransaction);
            setDebtReminderPaymentTransaction(res.debtReminderPaymentTransaction);
            setBeDebtReminderPaymentTransaction(res.beDebtReminderPaymentTransaction);
        }
        else {
            // console.log("NOOOOOOOOO");
            setReceiverTransaction([]);
            setPaymentTransaction([]);
            setDebtReminderPaymentTransaction([]);
            setBeDebtReminderPaymentTransaction([]);
        }
    };

    useEffect(() => {
        getCustomerTransactionForEmployee(authTokens.accessToken, '9001454953559' , getComplete);
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
                        <WindowsFilled /> QUẢN LÝ LỊCH SỬ GIAO DỊCH (NHÂN VIÊN)
                    </Title>
                </Col>
            </Row>
            <Tabs style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '16px' }} defaultActiveKey="1">
                <TabPane tab="Giao dịch nhận tiền" key="1">
                    {<ReceiverTransaction receiverTransactionArray={receiverTransaction} />}
                </TabPane>
                <TabPane tab="Giao dịch chuyển tiền" key="2">
                    {<PaymentTransaction paymentTransactionArray={paymentTransaction} />}
                </TabPane>
                <TabPane tab="Giao dịch thanh toán nhắc nợ" key="3">
                    {<DebtReminderPaymentTransaction debtReminderPaymentTransactionArray={debtReminderPaymentTransaction} />}
                </TabPane>
                <TabPane tab="Giao dịch thanh toán nhắc nợ" key="4">
                    {<BeDebtReminderPaymentTransaction beDebtReminderPaymentTransactionArray={beDebtReminderPaymentTransaction} />}
                </TabPane>
            </Tabs>
        </Content>
    );
};

export default TransactionHistory;