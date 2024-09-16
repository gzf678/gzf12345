import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import {UserOutlined,PoweroffOutlined,} from '@ant-design/icons'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {useDispatch } from 'react-redux';
import { clearToken } from '../../store/login/authSlice';
import { useNavigate } from 'react-router-dom';
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" >
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" >
          退出登录
        </a>
      ),
      icon: <SmileOutlined />,
     
    },
    
  ];
function MyHeader(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onClick:MenuProps["onClick"]=({key})=>{
        if(key==="1"){
            navigate("/personal")
        }else{
            dispatch(clearToken())
            sessionStorage.clear()
            navigate("/login")
        }
    }
    return <div>
        <Dropdown menu={{ items ,onClick}}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        欢迎您{sessionStorage.getItem("username")}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
    </div>
}
export default MyHeader