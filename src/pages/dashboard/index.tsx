import {RadarChartOutlined} from "@ant-design/icons"
import {Row,Col,Card} from "antd"
import "./index.scss"
import ReactECharts from "echarts-for-react";
import { useEffect,useState } from "react";
import { getEnergyData } from "../../api/dashboard";
import { Flex, Progress ,Statistic,Timeline,Tag} from 'antd';
const option2={
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ['product', '2015', '2016', '2017'],
      source: [
        { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
        { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
        { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
        { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  };
function Dashboard(){
    const initialOption = {
        title: {
          text: '当日能源消耗'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        grid: {
          left: '%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
        },
        yAxis: {
          type: 'value'
        },
        series: []
      };

      const [data,setData]=useState(initialOption)
      useEffect(()=>{
        const loadData=async ()=>{
            const {data:apiData}=await getEnergyData();
            const dataList=apiData.map((item:any)=>({
                name:item.name,
                data:item.data,
                type:"line",
                stack:"Total"
            }))
            const updataOption={
                ...data,
                legend:{
                    data:dataList.map((item:any)=>item.name)
                },
                series:dataList
            }

            setData(updataOption)
        }

        loadData()
      },[])

    return <div className="dashboard">
        <Row gutter={16}>
            <Col span={6}>
                <Card className="clearfix">
                    <div className="fl area">
                        <h2>13479</h2>
                        <p>园区总面积(平方米)</p>
                    </div>
                    <div className="fr">
                        <RadarChartOutlined className="icon" />
                    </div>
                   
                </Card>
            </Col>
            <Col span={6}>
            <Card className="clearfix">
                    <div className="fl area">
                        <h2>13479</h2>
                        <p>园区总面积(平方米)</p>
                    </div>
                    <div className="fr">
                        <RadarChartOutlined className="icon" />
                    </div>
                   
                </Card>
            </Col>
            <Col span={6}>
            <Card className="clearfix">
                    <div className="fl area">
                        <h2>13479</h2>
                        <p>园区总面积(平方米)</p>
                    </div>
                    <div className="fr">
                        <RadarChartOutlined className="icon" />
                    </div>
                   
                </Card>
            </Col>
            <Col span={6}>
            <Card className="clearfix">
                    <div className="fl area">
                        <h2>13479</h2>
                        <p>园区总面积(平方米)</p>
                    </div>
                    <div className="fr">
                        <RadarChartOutlined className="icon" />
                    </div>
                   
                </Card>
            </Col>
            
        </Row>
        
        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="能源消耗情况">
                    <ReactECharts option={data}></ReactECharts>
                </Card>
            </Col>
            <Col span={12}>
            <Card title="企业资质情况">
                    <ReactECharts option={option2}></ReactECharts>
                </Card>
            </Col>
        </Row>

        <Row gutter={16} className="mt">
            <Col span={12}>
                <Card title="租赁情况">
                    <ReactECharts option={option2}></ReactECharts>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="充电桩空间统计">
                    <div className="wrap">
                    <Progress type="circle" percent={75} />
                    <Statistic title="总充电桩数" value={75}  suffix="/100" className="mt"/>
                    </div>
                
                </Card>
            </Col>
            <Col span={6}>
                <Card title="实时车辆信息" style={{height:"406px"}}>
                    <Timeline items={[
                        {
                            children:<><Tag color="green">进场</Tag>08:24车辆 京A666666</>
                        },
                        {
                            children:<><Tag color="green">进场</Tag>08:24车辆 京A666666</>
                        },
                        {
                            children:<><Tag color="green">进场</Tag>08:24车辆 京A666666</>
                        },
                        {
                            children:<><Tag color="green">进场</Tag>08:24车辆 京A666666</>
                        },
                        {
                            children:<><Tag color="green">进场</Tag>08:24车辆 京A666666</>
                        }
                    ]}/>
                </Card>
            </Col>
        </Row>


    </div>
}

export default Dashboard