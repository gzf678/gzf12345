import { RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { useEffect, useState, Suspense } from "react";
import { generatesRoutes } from "./utils/generatesRoutes";
import { Spin } from "antd";
import { createBrowserRouter } from "react-router-dom";
import { getMenu } from "./api/users";
import { useDispatch } from 'react-redux';
import { setMenu } from "./store/login/authSlice";
import { useSelector } from "react-redux";
function App() {
 
  const { token } = useSelector((state: any) => state.authSlice);
  const [routerss, setRouter] = useState<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadData() {
      const { data } = await getMenu();
     
        dispatch(setMenu(data))
        const routers = generatesRoutes(data)//动态创建的路由表
        const myRoutes = [...routes];
        myRoutes[0].children = routers;
        if(myRoutes[0].children[0]){
          myRoutes[0].children[0].index = true;
        }
        
        const router = createBrowserRouter(myRoutes)
        setRouter(router);
      
    }
    loadData()
  },[token])
  if (routerss) {
    return (
      <div className="App">
        <Suspense fallback={<Spin></Spin>}>
          <RouterProvider router={routerss}></RouterProvider>
        </Suspense>
      </div>
    );
  } else {
    return <Spin></Spin>
  }
//       const {token}=useSelector((state:any)=>state.authSlice)
//       const dispatch=useDispatch()
//       const [routerss,setRouterss]=useState<any>(null)
      
//       useEffect(()=>{
//          async function loadData(){
//           const {data}=await getMenu()
//           if(data.length){
//             console.log(267,data)
//             dispatch(setMenu(data))
//             const myRoutes=[...routes]
//             myRoutes[0].children=generatesRoutes(data)
//             if(myRoutes[0].children[0]){
//               myRoutes[0].children[0].index=true
//             }
            
//             const routers=createBrowserRouter(myRoutes)
//             setRouterss(routers)
//           }else{
//             const router=createBrowserRouter(routes)
//             setRouterss(router)
//           }
          
//          }
//          loadData()
          
//       },[token])
      
//         return(<div className="App">
//           <Suspense fallback={<Spin></Spin>}>
//               <RouterProvider router={routerss}></RouterProvider>
//           </Suspense>
//       </div>
//       )
      
      

 }

export default App