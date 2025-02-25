import "./index.scss"
import logo from "../../assets/logo.png"
import bg from "../../assets/bg.jpg"
import lgbg from "../../assets/lgbg.jpg"
import type { FormProps } from 'antd';
import http from "../../utils/http";
import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined,LockOutlined } from "@ant-design/icons";
import { login } from "../../api/users";
import { UseDispatch, useDispatch } from "react-redux";
import { setToken } from "../../store/login/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
function Login(){
    const [form]=Form.useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [loading,setLoading]=useState<boolean>(false)
    function handleLogin(){
        form.validateFields().then(async (res)=>{
            setLoading(true)
            const {data:{token,username,btnAuth}}=await login(res)
            setLoading(false)
            dispatch(setToken(token))
            sessionStorage.setItem("username",username)
            sessionStorage.setItem("btnAuth",JSON.stringify(btnAuth))
            navigate("/",{replace:true})
        }).catch((err)=>{
            setLoading(false)
            console.log(err)
        })
    }

    useEffect(()=>{
        login({username:"123",password:"abc"})
    },[])
    return <div className="login" style={{backgroundImage:`url(${bg})`}}>
    <div className="lgbg" style={{backgroundImage:`url(${lgbg})`}}>
        <div className="part">
            <div className="title">
                <div className="logo">
                    <img src={logo} width={90}/>
                </div>
                <h1>鹏远智慧园区管理平台</h1>
            </div>
            <Form form={form}   
  >
    <Form.Item
     
      name="username"
      rules={[{ required: true, message: '用户名不能为空' }]}
    >
      <Input placeholder="请输入您的用户名" prefix={<UserOutlined/>}/>
    </Form.Item>

    <Form.Item
      
      name="password"
      rules={[{ required: true, message: '密码不能为空' }]}
    >
      <Input.Password placeholder="请输入您的密码" prefix={<LockOutlined />}/>
    </Form.Item>

    

    <Form.Item wrapperCol={{  span: 24 }}>
      <Button type="primary" 
      style={{width:"100%"}} 
      onClick={handleLogin}
      loading={loading}>
        提交
      </Button>
    </Form.Item>
  </Form>
        
        </div>
    </div>
    </div>
}
    


export default Login