import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    DeleteFilled,
    SearchOutlined,
    EditFilled,
    SyncOutlined
} from '@ant-design/icons';

import { AddNewAccount } from './AddNewDebReminder';

import { getListDebt, deleteAdmin } from './action';
import './QuanLiNhacNo.css';
import { useAuth } from '../Routes/Context';

const DebtReminder = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setsearchedColumn] = useState('');
    const [userData, setUserData] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const [oldData, setOldData] = useState(false);
    const [idForPassword, setIdForPassword] = useState(false);
    const { authTokens } = useAuth();


    const deleteComplete = res => {
        if (res) {
            const temp = [...userData];
            const findID = elementId => elementId.email === res.data.email;
            temp.splice(temp.findIndex(findID), 1);
            setUserData(temp);
            message.success('Xóa thành công');
        } else message.error('Chưa xóa được');
    };
    const handleDelete = record => {
        deleteAdmin(authTokens.accessToken, record, deleteComplete);
    };

    const loadSucceed = res => {
        if (res) {
            setUserData(res.data.listDebt);
        }
    };

    useEffect(() => {
        getListDebt(authTokens.accessToken, loadSucceed);
    }, [authTokens.accessToken]);

    let searchInput = '';
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setsearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
        </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
        </Button>
                </div>
            ),
        filterIcon: filtered => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                )
    });
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            fixed: 'left',
            ...getColumnSearchProps('id')
        },
        {
            title: 'Chủ nợ',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
            width: '15%',
            ...getColumnSearchProps('accountNumber')
        },
        {
            title: 'Người nợ',
            dataIndex: 'debtReminderAccountNumber',
            key: 'debtReminderAccountNumber',
            width: '15%',
            ...getColumnSearchProps('debtReminderAccountNumber')
        },
        {
            title: 'Số tiền nợ',
            dataIndex: 'amount',
            key: 'amount',
            align: 'left',
            width: '10%',
            ...getColumnSearchProps('amount')
        },
        {
            title: 'Lời nhắn',
            dataIndex: 'description',
            key: 'description',
            align: 'left',
            ...getColumnSearchProps('description')
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: '20%',
            ...getColumnSearchProps('status')
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: record => (
                <span>
                    <Popconfirm
                        title="Bạn chắc chắn muôn xóa?"
                        onConfirm={() => handleDelete(record.email)}
                    >
                        <DeleteFilled />
                    </Popconfirm>
                </span>
            ),
            width: '5%',
        }
    ];
    return (
        <div className="DebtReminder">
            <Button type="primary" onClick={() => setModal(!modal)}>
                Thêm mới
      </Button>
            <AddNewAccount
                visible={modal}
                setVisible={setModal}
                dataControll={[userData, setUserData]}
            />
            <Table
                rowKey={i => i.id}
                columns={columns}
                dataSource={userData}
                scroll={{ x: true }}
            />
        </div>
    );
};

export default DebtReminder;