import {Card,Table,Row,Col,Input,Pagination,Statistic,DatePicker,Select, Button,Tag} from "antd"
import { TableProps } from "antd";
import { getBillList } from "../../api/contract";
import React, { useEffect, useMemo, useState } from "react";
import { exportToExcel } from "../../utils/exportToExcel";

interface DataType{
    key:string;
    accountNo:string;
    status:string;
    roomNo:string;
    carNo:string;
    tel:string;
    cost1:string;
    cost2:string;
    cost3:string;
    startDate:string;
    endDate:string;
    preferential:string;
    money:string;
    pay:string;
}

interface searchType{
    date:string[];
    no:string;
    status:string;
    page:number;
    pageSize:number
}
const { RangePicker } = DatePicker;
function Bill(){
    const columns:TableProps<DataType>["columns"]=[
        {
            title:"No.",
            key:"index",
            render(value,record,index){
                return index+1
            },
            width:100,
            fixed:"left"
        },
        {
            title:"账单号",
            dataIndex:"accountNo",
            key:"accountNo",
            width:150,
        },
        {
            title:"缴费状态",
            dataIndex:"status",
            key:"status",
            width:100,
            render(value){
                return value==1?<Tag color="green">已缴费</Tag>:<Tag color="red">未缴费</Tag>
            }
        },
        {
            title:"房屋号",
            dataIndex:"roomNo",
            key:"roomNo",
            width:100,
        },
        {
            title:"车位号",
            dataIndex:"carNo",
            key:"carNo",
            width:100,
        },
        {
            title:"手机号",
            dataIndex:"tel",
            key:"tel",
            width:150,
        },
        {
            title:"物业费(年)",
            dataIndex:"costName1",
            key:"costName1",
            width:150,
        },

        {
            title:"车位费",
            dataIndex:"costName2",
            key:"costName2",
            width:150,
        },
        {
            title:"房屋租金",
            dataIndex:"costName3",
            key:"costName3",
            width:150,
        },

        {
            title:"开始时间",
            dataIndex:"startDate",
            key:"startDate",
            width:150,
        },
        {
            title:"结束时间",
            dataIndex:"endDate",
            key:"endDate",
            width:150,
        },
        {
            title:"优惠金额",
            dataIndex:"preferential",
            key:"preferential",
            width:150,
        },
        {
            title:"合计应收金额",
            dataIndex:"money",
            key:"money",
            width:150,
        },
        {
            title:"支付方式",
            dataIndex:"pay",
            key:"pay",
            width:100,
        },
        {
            title:"操作",
            width:230,
            key:"operate",
            fixed:"right",
            render(value){
                return <>
                    <Button type="primary" size="small">打印</Button>
                    <Button type="primary" size="small" danger className="ml mr">账单作废</Button>
                    <Button type="primary" size="small">退款</Button>
                </>
            }
        }
    ]
    
    const [formData,setFormData]=useState<searchType>({
        date:[],
        no:"",
        status:"",
        page:1,
        pageSize:10
    })
    const [dataList,setDataList]=useState<DataType[]>([])
    const [page,setPage]=useState<number>(1)
    const [pageSize,setPageSize]=useState<number>(10)
    const [loading,setLoading]=useState<boolean>(false)
    const [total,setTotal]=useState<number>(0)
    
    
    const [selectedRowKeys,setSelectedRowKeys]=useState<React.Key[]>([])
    const [selectedRows,setSelectedRows]=useState<any>([])
    const onSelectChange=(selectedRowKeys:any,selectedRows:any)=>{
        console.log(selectedRowKeys)
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
    }
    const rowSelection={
        selectedRowKeys,
        onChange:onSelectChange,
        preserveSelectedRowKeys:true
    }
    const handleChange=(value:any,dateString:any)=>{
        console.log(value,dateString)
        setFormData(prevState=>({
            ...prevState,
            date:dateString
        }))
    }

    const handleChange1=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(222,e.target.value)
        const {value}=e.target
        setFormData(prevState=>({
            ...prevState,
            no:value
        }))
    }

    const handleChange2=(value:string)=>{
            setFormData(prevState=>({
                ...prevState,
                status:value
            }))
    }
    const onChange=(page:number,pageSize:number)=>{
        setPage(page)
        setPageSize(pageSize)
    }

    const disabled=useMemo(()=>{
        return selectedRowKeys.length?false:true
    },[selectedRowKeys])

    const loadData=async ()=>{
        setLoading(true)
        const {data:{list,total}}=await getBillList({page,pageSize,startDate:formData.date[0],endDate:formData.date[1],no:formData.no,status:formData.status})
        setLoading(false)
        setDataList(list)
        setTotal(total)
    }
    useEffect(()=>{
        loadData()
    },[page,pageSize])

    const header=["accountNo","status","roomNo","carNo","tel",'costName1','costName2','costName3','startDate','endDate','preferential','money','pay']
    
    return <div>
        <Card>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="应收账单集合" value={113455}></Statistic>
                </Col>
                <Col span={6}>
                    <Statistic title="应收账单集合" value={113455}></Statistic>
                </Col>
                <Col span={6}>
                    <Statistic title="应收账单集合" value={113455}></Statistic>
                </Col>
                <Col span={6}>
                    <Statistic title="应收账单集合" value={113455}></Statistic>
                </Col>
            </Row>
        </Card>
        <Card className="mt search">
            <Row gutter={16}>
                <Col span={6}>
                    <p>账单日期</p>
                    <RangePicker style={{width:"100%"}} onChange={handleChange}></RangePicker>
                </Col>
                <Col span={6}>
                    <p>账单日期</p>
                    <Input placeholder="请输入门牌号" onChange={handleChange1} value={formData.no}></Input>
                </Col>
                <Col span={6}>
                    <p>缴费情况</p>
                    <Select 
                    style={{width:"100%"}}
                    options={[
                        {value:1,label:"全部"},
                        {value:2,label:"已缴纳"},
                        {value:3,label:"未缴纳"}
                    ]}
                    onChange={handleChange2}
                    ></Select>
                </Col>
                <Col span={6}>
                    <Button type="primary" className="mr" onClick={loadData}>查询</Button>
                    <Button>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Button type="primary" disabled={disabled} onClick={()=>exportToExcel(selectedRows,header)}>导出为Excel</Button>
            <Button danger className="ml" type="primary" disabled={disabled}>批量作废</Button>
        </Card>
        <Card className="mt">
            <Table
            
            columns={columns}
            pagination={false}
            rowKey={(record)=>record.accountNo}
            dataSource={dataList}
            scroll={{x:1200}}
            rowSelection={rowSelection}
            ></Table>
            <Pagination className="fr mt" showQuickJumper current={page} pageSize={pageSize} total={total} onChange={onChange}></Pagination>
        </Card>
    </div>
}
export default Bill