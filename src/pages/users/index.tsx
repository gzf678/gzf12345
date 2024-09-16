import Card from "antd/es/card/Card"
import { Row,Col,Input,Button,Table,Tag ,Popconfirm,message } from "antd"
import type { TableProps } from 'antd';
import React, { useState,useEffect, useMemo, useCallback } from "react";
import type { DataType } from "./interface";
import { getUserList } from "../../api/userList";
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd'
import { deleteUser,batchDeleteUser } from "../../api/userList";
import UserForm from "./userForm";
import { UseDispatch, useDispatch } from "react-redux";
import { setUserData } from "../../store/user/userSlice";

interface searchType{
    companyName:string;
    contact:string;
    phone:string

}
function Users(){
    const [dataList,setDataList]=useState<DataType[]>([])
    const [page,setPage]=useState<number>(1)
    const [pageSize,setPageSize]=useState<number>(10)
    const [total,setTotal]=useState<number>(0)
    const [selectedRowKeys,setSelectedRowKeys]=useState<React.Key[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    const [isModalOpen,setIsModalOpen]=useState<boolean>(false)
    const [title,setTitle]=useState<string>("")
    const dispatch=useDispatch()
    const disabled=useMemo(()=>{
        return selectedRowKeys.length?false:true
    },[selectedRowKeys])

    const [formData,setFormData]=useState<searchType>({
        companyName:"",
        contact:"",
        phone:""

    })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        console.log(765,name,value)
        setFormData(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    useEffect(()=>{
        loadData()
       
    },[page,pageSize])
    const loadData=async ()=>{
        setLoading(true)
        const {data:{list,total}}=await getUserList({...formData,page,pageSize})
        setDataList(list)
        setTotal(total)
        setLoading(false)
    }
    const onSelectChange=(selectedRowKeys:React.Key[])=>{
        setSelectedRowKeys(selectedRowKeys)
    }

    const rowSelection={
        selectedRowKeys:selectedRowKeys,
        onChange:onSelectChange
    }
    

    const onChange:PaginationProps['onChange']=(page,pageSize)=>{
        setPage(page)
        setPageSize(pageSize)

    }

    const reset=()=>{
        setSelectedRowKeys([])
        setFormData({companyName:"",
            contact:"",
            phone:""})
        setPage(1)
        setPageSize(10)
        loadData()
    }

    const confirm=async function(id:string){
       const {data}= await deleteUser(id)
       message.success(data)
       loadData()
    }

    const batchDelete=async ()=>{
        const {data}= await batchDeleteUser(selectedRowKeys)
        message.success(data)
        loadData()
    }

    const edit=(record:DataType)=>{
        setIsModalOpen(true)
        setTitle("编辑企业")
        dispatch(setUserData(record))
    }

    const add=()=>{
        setIsModalOpen(true)
        setTitle("新增企业")
        dispatch(setUserData({}))
    }

    const hideModal=useCallback(()=>{
        setIsModalOpen(false)
    },[])

    const columns:TableProps<DataType>["columns"]=[
        {
            title:"NO.",
            key:"index",
            render(value,record,index){
                return index+1
            }
        },
        {
            title:"客户名称",
            key:"name",
            dataIndex:"name"
        },
        {
            title:"经营状态",
            key:"status",
            dataIndex:"status",
            render(value){
                if(value==1){
                    return <Tag color="green">营业中</Tag>
                }else if(value==2){
                    return <Tag color="blue">暂停营业</Tag>
                }else if(value==3){
                    return <Tag color="red">停止营业</Tag>
                }
            }
        },
        {
            title:"联系电话",
            key:"tel",
            dataIndex:"tel"
        },
        {
            title:"所属行业",
            key:"business",
            dataIndex:"business"
        },
        {
            title:"邮箱",
            key:"email",
            dataIndex:"email"
        },
        {
            title:"统一信用代码",
            key:"creditCode",
            dataIndex:"creditCode"
        },
        {
            title:"工商注册号",
            key:"industryNum",
            dataIndex:"industryNum"
        },
        {
            title:"机构名称",
            key:"organizationCode",
            dataIndex:"organizationCode"
        },
        {
            title:"法人姓名",
            key:"legalPerson",
            dataIndex:"legalPerson"
        },
        {
            title:"操作",
            key:"operate",
            render(value,record,index){
                return <>
                <Button type="primary" size="small" onClick={()=>edit(record)}>编辑</Button>
                <Popconfirm
                title="删除确认"
                description="确定要删除吗"
                okText="Yes"
                cancelText="No"
                onConfirm={()=>confirm(record.id)}>
                    <Button type="primary" danger className="ml" size="small">删除</Button>
                </Popconfirm>
                
                </>
            }
        }
        
    ]
    
    return <div className="users">
       
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}>
                    <p>企业名称:</p>
                   <Input value={formData.companyName} onChange={handleChange} name="companyName"></Input>
                </Col>
                <Col span={7}>
                    <p>联系人:</p>
                    <Input value={formData.contact} onChange={handleChange} name="contact"></Input>
                </Col>
                <Col span={7}>
                    <p>联系电话:</p>
                    <Input value={formData.phone} onChange={handleChange} name="phone"></Input>
                </Col>
                <Col span={3}>
                    <Button type="primary" onClick={loadData}>查询</Button>
                    <Button className="ml" onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>

        <Card className="mt tr">
            <Button type="primary" onClick={add}>新增企业</Button>
            <Button danger type="primary" disabled={disabled} onClick={batchDelete}>批量删除</Button>
        </Card>
        <MyUserForm visible={isModalOpen} hideModal={hideModal} title={title} loadData={loadData}></MyUserForm>
        <Card className="mt">
            <Table
            columns={columns}
            dataSource={dataList}
            loading={loading}
            rowKey={(record)=>record.id}
            rowSelection={rowSelection}>
            
            </Table>
            <Pagination 
            className="mr"
            total={total}
            showTotal={(total) => `共 ${total} 条`}
            showSizeChanger
            showQuickJumper
            onChange={onChange}
            current={page}
            pageSize={pageSize}
            />
        </Card>
    </div>
}
const MyUserForm=React.memo(UserForm)
export default Users