import {Card,Row,Col,Image,Radio,Spin} from "antd"
import "./index.scss"
import { useState,useEffect } from "react"
import { getRoomList } from "../../api/room"
import { RadioChangeEvent } from "antd/lib";
interface RoomType{
    roomNumber:number;
    decorationType:"毛坯"|"精装";
    area:number;
    unitPrice:number
}


function Room(){
    const [visible,setVisible]=useState<boolean>(false)
    const [room,setRoom]=useState<RoomType[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    const loadRoom=async (roomid:string)=>{
        setLoading(true)
        const {data:{rooms}}=await getRoomList(roomid)
        setRoom(rooms)
        setLoading(false)
    }
    useEffect(()=>{
        loadRoom("a1")
    },[])

    const handleChange=(e:RadioChangeEvent)=>{
        const roomid:string=e.target.value
        loadRoom(roomid)
    }
    return <div>
        <Image
        width={200}
        style={{ display: 'none' }}
        preview={{
          visible,   
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          onVisibleChange: (value) => {
            setVisible(value);
          }
        }}
        ></Image>

        <Card className="mb">
            <Radio.Group defaultValue="a1" optionType="button" buttonStyle="solid" onChange={handleChange}>
                <Radio.Button value="a1">A1写字楼</Radio.Button>
                <Radio.Button value="a2">A2写字楼</Radio.Button>
                <Radio.Button value="a3">A3写字楼</Radio.Button>
                <Radio.Button value="a4">A4写字楼</Radio.Button>
                <Radio.Button value="a5">A5写字楼</Radio.Button>
                <Radio.Button value="a6">A6写字楼</Radio.Button>
                <Radio.Button value="a7">A7写字楼</Radio.Button>
                <Radio.Button value="a8">A8写字楼</Radio.Button>
            </Radio.Group>
        </Card>
        <Spin spinning={loading}>
        <Row gutter={16}>
            
            {

                room.map((item)=>{
                    return <>
                        <Col span={6} className="item">
                            <Card title="房间号" extra={<a onClick={()=>setVisible(true)}>户型图</a>}>
                                <h1>{item.roomNumber}</h1>
                                <div className="clearfix mt">
                                <p className="fl">装修情况</p> 
                                <p className="fr">{item.decorationType}</p> 
                                </div>
                                <div className="clearfix mt">
                                    <p>房间面积</p>
                                    <p>{item.area}</p>
                                </div>
                                <div className="clearfix mt">
                                    <p className="fl">出租单价</p>
                                    <p className="fr">{item.unitPrice}</p>
                                </div>
                            </Card>
                        </Col>
                    </>
                })
            }
        </Row>
        </Spin>
    </div>
}
export default Room