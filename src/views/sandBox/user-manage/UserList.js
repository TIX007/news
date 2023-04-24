
import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Modal, Switch } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function UserList() {
    const [dataSource, setdataSource] = useState([])
    const [isAddVisible, setisAddVisible] = useState(false)
    const [isUpdateVisible, setisUpdateVisible] = useState(false)
    const [roleList, setroleList] = useState([])
    const [regionList, setregionList] = useState([])
    const [current, setcurrent] = useState(null)

    const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
    const addForm = useRef(null)
    const updateForm = useRef(null)

    useEffect(() => {
        axios.get("http://localhost:5000/users?_expand=role").then(res => {
            console.log(res.data)
            setdataSource(res.data)
        })
    }, [])

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => {
                return <b>{region === '' ? '全球' : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                // console.log(item);
                return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)} />
            },
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} disabled={item.default} />

                    <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} onClick={() => handleUpdate(item)} />
                </div>
            }
        }
    ]

    const handleUpdate = (item) => {
        setTimeout(() => {
            setisUpdateVisible(true)
            if (item.roleId === 1) {
                //禁用
                setisUpdateDisabled(true)
            } else {
                //取消禁用
                setisUpdateDisabled(false)
            }
            updateForm.current.setFieldsValue(item)
        }, 0)

        setcurrent(item)
    }

    const handleChange = (item) => {
        // console.log(item)
        item.roleState = !item.roleState
        setdataSource([...dataSource])

        // axios.patch(`/users/${item.id}`, {
        //     roleState: item.roleState
        // })
    }

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



    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey={(item) => item.id} pagination={{ pageSize: 5 }} />
        </div>
    )
}
