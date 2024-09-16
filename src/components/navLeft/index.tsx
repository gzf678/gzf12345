import {  Menu } from 'antd';
import { getMenu } from '../../api/users';
import { useState,useEffect, Children } from 'react';
import { setMenu } from '../../store/login/authSlice';
import { useDispatch } from 'react-redux';
import icons from './iconList';
import { useLocation, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./index.scss"
import logo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom';
interface MenuItem{
    key:string;
    label:string;
    icon?:React.ReactNode;
    children?:MenuItem[]
}
  
  interface MenuItemFromData{
    key:string;
    label:string;
    icon:any;
    children?:MenuItemFromData[]
  }
  
function NavLeft(){
    const { menuList } = useSelector((state: any) => state.authSlice);
    const [menuData,setMenuData]=useState<MenuItem[]>([])
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    

    useEffect(()=>{
        configMenu()
        
    },[])

    async function configMenu() {
        const {data}=await getMenu()
        console.log(123,data)
        dispatch(setMenu(data))
        const mappedMenuItems:MenuItem[]=mapMenuItems(menuList)
        setMenuData(mappedMenuItems)
        
    }
    

function mapMenuItems(items:MenuItemFromData[]):any{
    return items.map((item:MenuItemFromData)=>({
        key:item.key,
        label:item.label,
        icon:icons[item.icon],
        children:item.children ? mapMenuItems(item.children) : null //递归操作
    }))
}

function handleClick({key}:{key:string}){
    
    navigate(key)
}
    return <div className='navLeft'>
        <div className='logo'>
            <img src={logo} width={18} />
            <h1 style={{marginLeft:"10px"}} >鹏远智慧园区</h1>
        </div>
        <Menu
        defaultSelectedKeys={['/dashboard']}
       selectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
        onClick={handleClick}
        items={menuData}
      />
    </div>
}

export default NavLeft