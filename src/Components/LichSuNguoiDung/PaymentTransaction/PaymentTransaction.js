import React, { useState, useEffect } from 'react';
import { Table, Input, Button, DatePicker, Descriptions } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
} from '@ant-design/icons';
import './PaymentTransaction.css';

const PaymentTransaction = props => {
    const [isFetching, setIsFetching] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredInfo, setFilteredInfo] = useState(null);

    const { paymentTransactionArray } = props;
    // console.log("ARRRR ",props.paymentTransactionArray);

    useEffect(() => {
        setIsFetching(false);
    }, []);

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    let searchInput = '';

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
                ),
    });

    const getColumnSearchCreatedDateProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <DatePicker
                    ref={node => {
                        searchInput = node;
                    }}
                    value={selectedKeys[0]}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    showTime
                    onChange={value => setSelectedKeys(value ? [value] : [])}
                    onOk={() => handleSearch(selectedKeys, confirm, dataIndex)}

                />
                {/* <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                /> */}
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            return new Date(record.createdDate).toLocaleString('en-GB') === new Date(value).toLocaleString('en-GB');
        },
        onFilterDropdownVisibleChange: visible => {
            // if (visible) {
            //     setTimeout(() => searchInput.select());
            // }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={new Date(text).toLocaleString('en-GB')}
                />
            ) : (
                    new Date(text).toLocaleString('en-GB')
                ),

    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'STK',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
            ...getColumnSearchProps('accountNumber'),
        },
        {
            title: 'Chuyển đến',
            dataIndex: 'receiverNumber',
            key: 'receiverNumber',
            ...getColumnSearchProps('receiverNumber'),
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            ...getColumnSearchProps('amount'),
        },
        {
            title: 'Nội dung',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Loại giao dịch',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Ngày tạo GD',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
            defaultSortOrder: 'ascend',
            render: text => {
                const d = new Date(text);
                return d.toLocaleString('en-GB');
            },
            ...getColumnSearchCreatedDateProps('createdAt'),
        }
    ];

    const onShowSizeChange = (current, pageSizeProp) => {
        setPageSize(pageSizeProp);
        setCurrentPage(1);
    };

    return (
        <Table
            columns={columns}
            rowKey="id"
            dataSource={paymentTransactionArray}
            loading={isFetching}
            scroll={{ x: true }}
            onChange={handleChange}
            expandable={{
                expandedRowRender: record => (
                    <Descriptions title="Chi tiết">
                        <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
                        <Descriptions.Item label="STK">{record.accountNumber}</Descriptions.Item>
                        <Descriptions.Item label="Chuyển đến">{record.receiverNumber}</Descriptions.Item>
                        <Descriptions.Item label="Số tiền">{record.amount}</Descriptions.Item>
                        <Descriptions.Item label="Nội dung">{record.description}</Descriptions.Item>
                        <Descriptions.Item label="Loại giao dịch">{record.type}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo GD">{new Date(record.createdAt).toLocaleString('en-GB')}</Descriptions.Item>
                    </Descriptions>
                ),
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            pagination={{
                hideOnSinglePage: true,
                total: paymentTransactionArray.length,
                pageSize,
                onShowSizeChange,
                current: currentPage,
                showQuickJumper: true,
                onChange: value => setCurrentPage(value),
            }}
        />
    );
};

export default PaymentTransaction;