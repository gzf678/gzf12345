import {Modal,Row,Col,Form,Input,RadioChangeEvent, Radio, message} from "antd"
import { useEffect } from "react"
import { UseSelector, useSelector } from "react-redux"
import { editUser } from "../../api/userList"
interface FormProps{
    visible:boolean;
    hideModal:()=>void;
    title:string;
    loadData:()=>void;
}
function UserForm(props:FormProps){
    const [form]=Form.useForm()
    const {userData}=useSelector((state:any)=>state.userSlice)
    const {visible,hideModal,title,loadData}=props
    const handleOk=()=>{
        form.validateFields().then(async (res)=>{
            const {data}=await editUser(res)
            message.success(data)
            hideModal()
            loadData()
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(()=>{
        title=="新增企业"?form.resetFields():form.setFieldsValue(userData)
    },[visible])
    return<>
        <Modal 
        open={visible}
        onCancel={hideModal}
        title={title}
        width={800}
        onOk={handleOk}
        >
           <Form
            labelCol={{span:8}}
            wrapperCol={{span:16}}
           >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    label="客户名称"
                    name="name"
                    rules={[{required:true,message:"客户名称不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    label="联系电话"
                    name="tel"
                    rules={[{required:true,message:"联系电话不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                    label="经营转态"
                    name="status"
                    rules={[{required:true,message:"经营转态不能为空"}]}
                    >
                    <Radio.Group>
                        <Radio value="1">营业中</Radio>
                        <Radio value="2">暂停营业</Radio>
                        <Radio value="3">停业</Radio>
                    </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required:true,message:"邮箱不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                    label="统一信用代码"
                    name="creditCode"
                    rules={[{required:true,message:"信用代码不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required:true,message:"邮箱不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                    label="统一信用代码"
                    name="creditCode"
                    rules={[{required:true,message:"信用代码不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required:true,message:"邮箱不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                    label="统一信用代码"
                    name="creditCode"
                    rules={[{required:true,message:"信用代码不能为空"}]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>
            </Row>
           </Form>
        </Modal>
    </>
}
export default UserForm