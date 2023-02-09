import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setdataSource] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/roles").then(res => {
            // console.log(res.data)
            setdataSource(res.data)
        })
    }, [])

    // const dataSource = [
    //     {
    //         id: '1',
    //         roleName: '胡彦斌',
    //         age: 32,
    //         address: '西湖区湖底公园1号',
    //     },
    //     {
    //         id: '2',
    //         roleName: '胡彦祖',
    //         age: 42,
    //         address: '西湖区湖底公园1号',
    //     },
    // ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName'
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                    {/* <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
                        setisModalVisible(true)
                        setcurrentRights(item.rights)
                        setcurrentId(item.id)
                    }} /> */}
                </div>
            }
        }
    ]

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                console.log('OK');
                // deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                rowKey={(item) => item.id} ></Table>
        </div>
    )
}
