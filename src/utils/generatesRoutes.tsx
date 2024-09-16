import { RouteObject } from "react-router-dom";
import { componentMap } from "../router/routerMap";

interface MenuType{
    icon:string;
    key:string;
    label:string;
    children?:MenuType[]
}

// export function generatesRoutes(menu:MenuType[]):RouteObject[]{
    
//     return menu.map((item:MenuType)=>{
//         const hasChildren=item.children
//         let routerObj:RouteObject={
//             path:item.key,
//             element:hasChildren?null:<>{componentMap[item.key]}</>
//         }
//         if(item.children){
//             routerObj.children=generatesRoutes(item.children)
//         }
//         return routerObj
//     })
// }

export function generatesRoutes(menu:MenuType[]):RouteObject[]{
    return menu.map((item:MenuType)=>{
        const hasChildren=item.children
        let obj:RouteObject={
           path:item.key,
           element:hasChildren?null:<>{componentMap[item.key]}</>
        }
        if(hasChildren){
             obj.children=generatesRoutes(hasChildren)

        }
        return obj
    })
}

