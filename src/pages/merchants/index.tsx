import { Carousel,Card,Row,Col ,List,Avatar} from "antd"
import pic1 from "../../assets/1.jpg"
import pic2 from "../../assets/2.jpg"
import pic3 from "../../assets/3.jpg"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {  Statistic } from 'antd';
const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
function Merchants(){
    return <div>
        <Card>
            <div style={{width:"1200px",margin:"auto"}}>
                <Carousel autoplay>
                    <div>
                        <img src={pic1} />
                    </div>
                    <div>
                        <img src={pic2} />
                    </div>
                    <div>
                        <img src={pic3} />
                    </div>
                </Carousel>
            </div>
        </Card>
       
            <Row gutter={16} className="mt">
                <Col span={12}>
                    <Card>
                        <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                        ></List>
                    </Card>
                </Col>
                <Col span={12}>
                <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
                />
                </Col>
            </Row>
        
    </div>
}

export default Merchants