
import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function UserList() {
    const [dataSource, setdataSource] = useState([])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '区域',
            dataIndex: 'region'
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                </div>
            }
        }
    ]

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                  console.log('OK');
                // deleteMethod(item)
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        axios.get("http://localhost:5000/users").then(res => {
            // console.log(res.data)
            setdataSource(res.data)
        })
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey={(item) => item.id} />;
        </div>
    )
}
